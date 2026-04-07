import { useEffect, useState } from 'react';
import { fetchData } from '../../../mocks/CallingAPI.js';
import { questions, simulationScenarios } from '../../../mocks/DataSample.js';

const STATUS_LABELS = {
    '-1': 'Pending',
    '0': 'Inactive/SoftDelete',
    '1': 'Binh thuong',
    '2': 'Delete',
    '3': 'Reject/Disapprove',
};

const readDtoField = (dto, lower, upper) => dto?.[lower] ?? dto?.[upper] ?? null;

const DB_FIELDS = {
    question: ['id', 'questionLessonId', 'questionTopicId', 'questionCategoryId', 'parentId', 'content', 'image', 'explanation', 'type', 'index', 'createAt', 'updateAt', 'status'],
    simulation: ['id', 'simulationChapterId', 'simulationCategoryId', 'simulationDifficultyLevelId', 'name', 'description', 'video', 'totalTime', 'startPoint', 'endPoint', 'index', 'createAt', 'updateAt', 'status'],
    forumpost: ['id', 'forumTopicId', 'userId', 'name', 'title', 'content', 'viewCount', 'createAt', 'updateAt', 'status'],
    forumcomment: ['id', 'replyId', 'forumPostId', 'userId', 'content', 'createAt', 'updateAt', 'status'],
};

const getStatusLabel = (status) => STATUS_LABELS[String(status)] || String(status ?? 'Khong xac dinh');

const normalizeFieldPayload = (entityType, raw) => {
    const fields = DB_FIELDS[entityType] || [];
    const normalized = {};

    fields.forEach((field) => {
        const pascal = field.charAt(0).toUpperCase() + field.slice(1);
        const value = readDtoField(raw, field, pascal);
        if (value !== undefined && value !== null) {
            normalized[field] = value;
        }
    });

    return normalized;
};

const toMetaRows = (entityType, data) => {
    const fields = DB_FIELDS[entityType] || [];
    const excluded = new Set(['title', 'name', 'content']);

    return fields
        .filter((field) => !excluded.has(field) && Object.prototype.hasOwnProperty.call(data, field))
        .map((field) => {
            const rawValue = data[field];
            const value = field === 'status' ? getStatusLabel(rawValue) : String(rawValue);
            return { label: field, value };
        });
};

const toEntityTitle = (entityType, entityId) => {
    if (entityType === 'question') return `Cau hoi #${entityId}`;
    if (entityType === 'simulation') return `Tinh huong mo phong #${entityId}`;
    if (entityType === 'forumpost') return `Bai viet #${entityId}`;
    if (entityType === 'forumcomment') return `Binh luan #${entityId}`;
    return `Doi tuong #${entityId}`;
};

export default function EntityDetails({ entityType, entityId }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [entity, setEntity] = useState(null);

    useEffect(() => {
        let active = true;

        (async () => {
            setLoading(true);
            setError('');

            try {
                if (entityType === 'question') {
                    const question = questions.find((item) => Number(item.id) === Number(entityId));
                    if (!question) {
                        throw new Error('Khong tim thay cau hoi');
                    }

                    const normalized = normalizeFieldPayload('question', question);

                    if (active) {
                        setEntity({
                            title: `Cau hoi #${entityId}`,
                            content: normalized.content || 'Khong co noi dung',
                            meta: toMetaRows('question', normalized),
                        });
                    }
                    return;
                }

                if (entityType === 'simulation') {
                    const simulation = simulationScenarios.find((item) => Number(item.id) === Number(entityId));
                    if (!simulation) {
                        throw new Error('Khong tim thay tinh huong mo phong');
                    }

                    const normalized = normalizeFieldPayload('simulation', simulation);

                    if (active) {
                        setEntity({
                            title: normalized.name || `Tinh huong mo phong #${entityId}`,
                            content: normalized.description || 'Khong co mo ta',
                            meta: toMetaRows('simulation', normalized),
                        });
                    }
                    return;
                }

                if (entityType === 'forumpost') {
                    const post = await fetchData(`ForumPosts/${entityId}`, '');
                    const normalized = normalizeFieldPayload('forumpost', post);

                    if (active) {
                        setEntity({
                            title: normalized.title || `Bai viet #${entityId}`,
                            content: normalized.content || 'Khong co noi dung',
                            meta: toMetaRows('forumpost', normalized),
                        });
                    }
                    return;
                }

                if (entityType === 'forum-comment') {
                    const comment = await fetchData(`ForumComments/${entityId}`, '');
                    const normalized = normalizeFieldPayload('forum-comment', comment);

                    if (active) {
                        setEntity({
                            title: `Binh luan #${entityId}`,
                            content: normalized.content || 'Khong co noi dung',
                            meta: toMetaRows('forum-comment', normalized),
                        });
                    }
                    return;
                }

                throw new Error('Loai doi tuong khong hop le');
            } catch (loadError) {
                if (active) {
                    setError(loadError.message || 'Khong the tai chi tiet doi tuong');
                    setEntity(null);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        })();

        return () => {
            active = false;
        };
    }, [entityType, entityId]);

    if (loading) {
        return <div className='ins-form-static'>Dang tai chi tiet doi tuong...</div>;
    }

    if (error) {
        return (
            <div className='ins-form-static'>
                {error}
            </div>
        );
    }

    if (!entity) {
        return <div className='ins-form-static'>Khong co du lieu doi tuong.</div>;
    }

    return (
        <div className='ins-report-entity-detail'>
            <div className='entity-header'>{entity.title || toEntityTitle(entityType, entityId)}</div>
            <div className='entity-content'>{entity.content}</div>
            {Array.isArray(entity.meta) && entity.meta.length > 0 && (
                <div className='entity-meta'>
                    {entity.meta.map((item) => (
                        <div key={`${item.label}-${item.value}`} className='meta-row'>
                            <span className='meta-label'>{item.label}:</span>
                            <span className='meta-value'>{item.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

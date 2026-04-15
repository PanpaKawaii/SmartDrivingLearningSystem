import { useEffect, useRef, useState } from 'react';
import { fetchData, postData, uploadMedia, deleteMedia } from '../../../mocks/CallingAPI';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import AutoResizeTextarea from '../AutoResizeTextarea/AutoResizeTextarea';
import CloudsBackground from '../CloudsBackground/CloudsBackground';
import TrafficLight from '../TrafficLight/TrafficLight';

import './ReportModal.css';

export default function ReportModal({
    data = {},
    onClose = () => { },
}) {
    const { user, refreshNewToken } = useAuth();

    const refContent = useRef(null);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [REPORTCATEGORIes, setREPORTCATEGORIes] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [imageUrl, setImageUrl] = useState(null);
    const fileInputRef = useRef(null);
    const handleRemove = () => {
        fileInputRef.current.value = null;
    };
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        console.log('file', file);

        // if (!file) return;
        // const ImageData = {
        //     EntityId: user?.id,
        //     ImageTarget: 'ReportImage',
        //     Files: [...[], file],
        // };
        // console.log('ImageData', ImageData);
        // // const formData = new FormData();
        // // formData.append('EntityId', user?.id);
        // // formData.append('ImageTarget', crypto.randomUUID());
        // // formData.append('Files', file);
        // // console.log('formData', formData);

        setError(null);
        setLoading(true);
        const token = user?.token || '';
        try {
            const result = await uploadMedia([file], user?.id, 'ReportImage', token);
            //const result = await postData('media/upload', ImageData, token);
            //console.log('result', result);
            console.log('result', result[0]?.url);
            setImageUrl(result[0]?.url);
        } catch (error) {
            console.error('Error', error);
            setError(error);
            if (error.status == 401) refreshNewToken(user);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            setCategory('');
            setError(null);
            setLoading(true);
            const token = user?.token || '';
            try {
                const reportCategoryQuery = new URLSearchParams({
                    status: 1,
                });
                const ReportCategoryResponse = await fetchData(`ReportCategories/all?${reportCategoryQuery.toString()}`, token);
                console.log('ReportCategoryResponse', ReportCategoryResponse);

                setREPORTCATEGORIes(ReportCategoryResponse);
            } catch (error) {
                console.error('Error', error);
                setError(error);
                if (error.status == 401) refreshNewToken(user);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh, user?.token]);

    const CreateReport = async (Content) => {
        const ReportData = {
            ...data,
            reportCategoryId: category,
            title: title,
            content: Content,
            image: imageUrl || '',
        };
        console.log('ReportData:', ReportData);

        setLoading(true);
        const token = user?.token || '';
        try {
            const result = await postData('Reports', ReportData, token);
            console.log('result', result);

            onClose();
        } catch (error) {
            console.error('Error', error);
            setError(error);
            if (error.status == 401) refreshNewToken(user);
        } finally {
            setLoading(false);
        };
    };

    const handleSubmitReport = (refContent) => {
        const Content = refContent;
        console.log({
            Content,
            category,
        });
        if (!Content || !category) return;
        CreateReport(Content);
    };

    if (loading) return <div><CloudsBackground /><TrafficLight text={'loading'} setRefresh={() => { }} /></div>
    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>
    return (
        <div className='report-modal-container'>
            <div className='report-information'>
                <input type='text' value={data.simulationId || data.forumPostId || data.forumCommentId || data.questionId} readOnly />
            </div>
            <div className='report-information'>
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Tiêu đề' />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value='' disabled>Chọn loại báo cáo</option>
                    {REPORTCATEGORIes?.map((report, index) => (
                        <option key={index} value={report.id}>{report.name}</option>
                    ))}
                </select>
                <button className='btn' onClick={() => setRefresh(p => p + 1)}>Refresh</button>
            </div>
            <div className='upload-image'>
                <div className='file-input'>
                    <input type='file' ref={fileInputRef} accept='png' onChange={handleUpload} />
                    <button className='btn' onClick={() => handleRemove()}>Gỡ</button>
                </div>
                {imageUrl &&
                    <div className='image'>
                        <img src={imageUrl} alt='Uploaded' />
                    </div>
                }
            </div>
            <form className='content-area'>
                <AutoResizeTextarea
                    refer={refContent}
                    placeholder={user ? 'Nội dung báo cáo' : 'Vui lòng đăng nhập để báo cáo...'}
                    disable={!user}
                    propContent={content}
                    setContent={setContent}
                />
                <button type='button' className='btn' onClick={() => handleSubmitReport(refContent.current.value, null)} disabled={loading || !title || !content || !category}>
                    GỬI BÁO CÁO
                </button>
            </form>
        </div>
    )
}

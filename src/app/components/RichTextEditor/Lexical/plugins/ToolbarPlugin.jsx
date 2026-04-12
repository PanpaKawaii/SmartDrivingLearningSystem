// src/app/components/RichTextEditor/plugins/ToolbarPlugin.jsx
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    $getSelection,
    $isRangeSelection,
    FORMAT_TEXT_COMMAND,
    UNDO_COMMAND,
    REDO_COMMAND,
} from 'lexical';
import {
    $createHeadingNode,
    $createQuoteNode,
} from '@lexical/rich-text';
import {
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { $setBlocksType } from '@lexical/selection';
import { $createParagraphNode } from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { INSERT_IMAGE_COMMAND } from './ImagePlugin';

export default function ToolbarPlugin({
    enableImage = false,
    imageFeatures = {},
    imageUploadConfig = {},
}) {
    const [editor] = useLexicalComposerContext();
    const fileInputRef = useRef(null);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrike, setIsStrike] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const canUploadImage = Boolean(
        enableImage
        && imageFeatures?.upload
        && imageUploadConfig?.entityId
        && imageUploadConfig?.imageTarget
        && typeof imageUploadConfig?.uploadHandler === 'function'
    );
    const canInsertImageByUrl = Boolean(enableImage && imageFeatures?.url);

    const resolveUploadedImageUrl = (payload) => {
        if (!payload) return '';

        if (typeof payload === 'string') {
            return payload.trim();
        }

        if (Array.isArray(payload)) {
            return resolveUploadedImageUrl(payload[0]);
        }

        if (typeof payload === 'object') {
            return (
                payload.fileUrl
                || payload.url
                || payload.path
                || payload.secureUrl
                || payload.location
                || ''
            ).toString().trim();
        }

        return '';
    };

    const insertImageByUrl = (src, alt = '') => {
        if (!src) return;
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
            src,
            alt,
            width: '100%',
            height: 'auto',
        });
    };

    const handleUploadImageFiles = async (rawFiles) => {
        const files = Array.from(rawFiles || []).filter((file) => file?.type?.startsWith('image/'));
        if (files.length === 0 || !canUploadImage || isUploadingImage) return;

        setIsUploadingImage(true);
        try {
            const uploadResult = await imageUploadConfig.uploadHandler({
                files,
                entityId: imageUploadConfig.entityId,
                imageTarget: imageUploadConfig.imageTarget,
            });

            const uploadedImageUrl = resolveUploadedImageUrl(uploadResult);
            if (!uploadedImageUrl) {
                throw new Error('Upload succeeded but no image URL returned.');
            }

            insertImageByUrl(uploadedImageUrl, files[0]?.name || 'Image');
        } catch (error) {
            console.error('Image upload failed:', error);
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleInsertImageByUrl = () => {
        if (!canInsertImageByUrl) return;

        const input = window.prompt('Input image URL (http/https)');
        const imageUrl = (input || '').trim();
        if (!imageUrl) return;

        if (!/^https?:\/\//i.test(imageUrl)) {
            console.error('Invalid image URL. URL must start with http:// or https://');
            return;
        }

        insertImageByUrl(imageUrl, 'Image');
    };

    const handleSelectImageFile = () => {
        if (!canUploadImage || isUploadingImage) return;
        fileInputRef.current?.click();
    };

    const handleFileInputChange = async (event) => {
        await handleUploadImageFiles(event.target.files);
        event.target.value = '';
    };

    // Sync trạng thái các nút khi selection thay đổi
    const updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrike(selection.hasFormat('strikethrough'));
        }
    }, []);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    updateToolbar();
                });
            })
        );
    }, [editor, updateToolbar]);

    // Đổi block type (paragraph / heading / quote)
    const formatBlock = (type) => {
        editor.update(() => {
            const selection = $getSelection();
            if (!$isRangeSelection(selection)) return;
            if (type === 'paragraph') {
                $setBlocksType(selection, () => $createParagraphNode());
            } else if (type === 'quote') {
                $setBlocksType(selection, () => $createQuoteNode());
            } else {
                $setBlocksType(selection, () => $createHeadingNode(type));
            }
        });
    };

    return (
        <div className='rte-toolbar'>
            {/* Undo / Redo */}
            <button type='button' title='Undo' onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>
                <i className='fa-solid fa-rotate-left' />
            </button>
            <button type='button' title='Redo' onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>
                <i className='fa-solid fa-rotate-right' />
            </button>

            <span className='rte-divider' />

            {/* Block type */}
            <select onChange={(e) => formatBlock(e.target.value)} defaultValue='paragraph'>
                <option value='paragraph'>Paragraph</option>
                <option value='h1'>Heading 1</option>
                <option value='h2'>Heading 2</option>
                <option value='h3'>Heading 3</option>
                <option value='quote'>Quote</option>
            </select>

            <span className='rte-divider' />

            {/* Inline format */}
            <button
                type='button'
                title='Bold'
                className={isBold ? 'active' : ''}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
            >
                <i className='fa-solid fa-bold' />
            </button>
            <button
                type='button'
                title='Italic'
                className={isItalic ? 'active' : ''}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
            >
                <i className='fa-solid fa-italic' />
            </button>
            <button
                type='button'
                title='Underline'
                className={isUnderline ? 'active' : ''}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
            >
                <i className='fa-solid fa-underline' />
            </button>
            <button
                type='button'
                title='Strikethrough'
                className={isStrike ? 'active' : ''}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
            >
                <i className='fa-solid fa-strikethrough' />
            </button>

            <span className='rte-divider' />

            {/* Lists */}
            <button
                type='button'
                title='Unordered list'
                onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
            >
                <i className='fa-solid fa-list-ul' />
            </button>
            <button
                type='button'
                title='Ordered list'
                onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
            >
                <i className='fa-solid fa-list-ol' />
            </button>
            <button
                type='button'
                title='Remove list'
                onClick={() => editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)}
            >
                <i className='fa-solid fa-list' />
            </button>

            {enableImage && (canUploadImage || canInsertImageByUrl) && (
                <>
                    <span className='rte-divider' />

                    {canUploadImage && (
                        <>
                            <button
                                type='button'
                                title='Upload image'
                                onClick={handleSelectImageFile}
                                disabled={isUploadingImage}
                            >
                                <i className='fa-solid fa-image' />
                            </button>
                            <input
                                ref={fileInputRef}
                                type='file'
                                accept='image/*'
                                multiple={false}
                                style={{ display: 'none' }}
                                onChange={handleFileInputChange}
                            />
                        </>
                    )}

                    {canInsertImageByUrl && (
                        <button
                            type='button'
                            title='Insert image by URL'
                            onClick={handleInsertImageByUrl}
                            disabled={isUploadingImage}
                        >
                            <i className='fa-solid fa-link' />
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
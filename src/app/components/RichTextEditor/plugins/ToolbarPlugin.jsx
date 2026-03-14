// src/app/components/RichTextEditor/plugins/ToolbarPlugin.jsx
import { useCallback, useEffect, useState } from 'react';
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

export default function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrike, setIsStrike] = useState(false);

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
            <button title='Undo' onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>
                <i className='fa-solid fa-rotate-left' />
            </button>
            <button title='Redo' onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>
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
                title='Bold'
                className={isBold ? 'active' : ''}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
            >
                <i className='fa-solid fa-bold' />
            </button>
            <button
                title='Italic'
                className={isItalic ? 'active' : ''}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
            >
                <i className='fa-solid fa-italic' />
            </button>
            <button
                title='Underline'
                className={isUnderline ? 'active' : ''}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
            >
                <i className='fa-solid fa-underline' />
            </button>
            <button
                title='Strikethrough'
                className={isStrike ? 'active' : ''}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
            >
                <i className='fa-solid fa-strikethrough' />
            </button>

            <span className='rte-divider' />

            {/* Lists */}
            <button
                title='Unordered list'
                onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
            >
                <i className='fa-solid fa-list-ul' />
            </button>
            <button
                title='Ordered list'
                onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
            >
                <i className='fa-solid fa-list-ol' />
            </button>
            <button
                title='Remove list'
                onClick={() => editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)}
            >
                <i className='fa-solid fa-list' />
            </button>
        </div>
    );
}
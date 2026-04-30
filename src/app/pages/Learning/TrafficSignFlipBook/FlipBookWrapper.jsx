import React, { useRef, useState } from 'react';
import FlipBook from '../../../components/FlipBook/FlipBook';
import Page from '../../../components/FlipBook/Page';
import MovingLabelInput from '../../../components/MovingLabelInput/MovingLabelInput';

export default function FlipBookWrapper({
    pages = [],
}) {
    const [inputPage, setInputPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const book = {
        width: 500,
        height: 600,
        space: 2,
    };

    const debounceRef = useRef(null);
    const handleChange = (value) => {
        setInputPage(value);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setCurrentPage(value);
        }, 500);
    };

    return (
        <>
            <div className='action-controls'>
                <div className='btns'>
                    <button className='btn' onClick={() => {
                        setCurrentPage(0);
                        setInputPage(0);
                    }}>
                        <i className='fa-solid fa-angles-left' />
                    </button>
                    <button className='btn' onClick={() => {
                        setCurrentPage(p => Math.max(p - 2, 0));
                        setInputPage(p => Math.max(p - 2, 0));
                    }}>
                        <i className='fa-solid fa-chevron-left' />
                    </button>
                </div>
                <div className='form-group'>
                    <MovingLabelInput
                        type={'text'}
                        value={inputPage ?? 0}
                        onValueChange={(propE) => handleChange(Math.max(Math.min(propE, pages?.length), 0) || 0)}
                        label={'Trang'}
                        labelStyle={'left moving'}
                    />
                </div>
                <div className='btns'>
                    <button className='btn' onClick={() => {
                        setCurrentPage(p => Math.min(p + 2, pages?.length));
                        setInputPage(p => Math.min(p + 2, pages?.length));
                    }}>
                        <i className='fa-solid fa-chevron-right' />
                    </button>
                    <button className='btn' onClick={() => {
                        setCurrentPage(pages?.length);
                        setInputPage(pages?.length);
                    }}>
                        <i className='fa-solid fa-angles-right' />
                    </button>
                </div>
            </div >
            <div className='flip-book-wrapper'>
                <FlipBook
                    pages={pages}
                    width={book.width}
                    height={book.height}
                    space={book.space}
                    currentPage={currentPage % 2 == 0 ? currentPage : currentPage + 1}
                >
                    {pages.map((p, i) =>
                        <React.Fragment key={i}>
                            <Page
                                pages={pages}
                                width={book.width}
                                height={book.height}
                                space={book.space}
                                currentPage={currentPage % 2 == 0 ? currentPage : currentPage + 1}
                                index={i + 1}
                                color={'#FAEBC9'}
                                // color={`hsl(${(360 / pages.length) * i}, 97%, 70%)`}
                                opacity={((i >= (currentPage % 2 == 0 ? currentPage : currentPage + 1) - 6 && i <= (currentPage % 2 == 0 ? currentPage : currentPage + 1) + 2) || i <= 1 || i >= pages.length - 2) ? 1 : 0}
                                // opacity={0.5}
                            >
                                {p.contentHTML}
                            </Page>
                        </React.Fragment>
                    )}
                    {/* {pages.map((p, i) => (
                        <React.Fragment key={i}>
                            <Page
                                pages={pages}
                                width={book.width}
                                height={book.height}
                                space={book.space}
                                currentPage={0}
                                index={i + 1}
                                color={`hsla(${(360 / pages.length) * i}, 97%, 70%, 0.3)`}
                                // opacity={((i >= currentPage - 3 && i <= currentPage + 2) || i <= 1 || i >= pages.length - 2) ? 1 : 0}
                                opacity={1}
                            >
                                <div>
                                    <h1>{p.title}</h1>
                                    <p>{p.content}</p>
                                    <div>{p.title ? `Page: ${i + 1}` : ''}</div>
                                </div>
                            </Page>
                        </React.Fragment>
                    ))} */}
                </FlipBook>
            </div>
        </>
    )
}

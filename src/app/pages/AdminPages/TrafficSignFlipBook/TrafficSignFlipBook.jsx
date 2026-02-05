import React, { useState } from 'react';
import FlipBook from '../../../components/FlipBook/FlipBook';
import Page from '../../../components/FlipBook/Page';

import './TrafficSignFlipBook.css';

export default function TrafficSignFlipBook() {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        { index1: 1, index2: 1, title: 'BOOK', content: 'Made by Trieu', },
        { index1: 1, index2: 1, title: 'Hello', content: 'Nice to meet you!', },
        { index1: 1, index2: 2, title: 'Chapter 1', content: 'This is content of chapter 1!', },
        { index1: 1, index2: 2, title: 'Chapter 2', content: 'This is content of chapter 2!', },
        { index1: 1, index2: 2, title: 'Chapter 3', content: 'This is content of chapter 3!', },
        { index1: 1, index2: 2, title: 'Chapter 4', content: 'This is content of chapter 4!', },
        { index1: 1, index2: 2, title: 'Chapter 5', content: 'This is content of chapter 5!', },
        { index1: 1, index2: 2, title: 'Chapter 6', content: 'This is content of chapter 6!', },
        { index1: 1, index2: 2, title: 'Chapter 7', content: 'This is content of chapter 7!', },
        { index1: 1, index2: 2, title: 'Chapter 8', content: 'This is content of chapter 8!', },
        { index1: 1, index2: 2, title: 'Chapter 9', content: 'This is content of chapter 9!', },
        { index1: 1, index2: 2, title: 'Chapter 10', content: 'This is content of chapter 10!', },
        { index1: 1, index2: 2, title: 'Chapter 1', content: 'This is content of chapter 1!', },
        { index1: 1, index2: 2, title: 'Chapter 2', content: 'This is content of chapter 2!', },
        { index1: 1, index2: 2, title: 'Chapter 3', content: 'This is content of chapter 3!', },
        { index1: 1, index2: 2, title: 'Chapter 4', content: 'This is content of chapter 4!', },
        { index1: 1, index2: 2, title: 'Chapter 5', content: 'This is content of chapter 5!', },
        { index1: 1, index2: 2, title: 'Chapter 6', content: 'This is content of chapter 6!', },
        { index1: 1, index2: 2, title: 'Chapter 7', content: 'This is content of chapter 7!', },
        { index1: 1, index2: 2, title: 'Chapter 8', content: 'This is content of chapter 8!', },
        { index1: 1, index2: 2, title: 'Chapter 9', content: 'This is content of chapter 9!', },
        { index1: 1, index2: 2, title: 'Chapter 10', content: 'This is content of chapter 10!', },
        { index1: 1, index2: 2, title: 'Chapter 1', content: 'This is content of chapter 1!', },
        { index1: 1, index2: 2, title: 'Chapter 2', content: 'This is content of chapter 2!', },
        { index1: 1, index2: 2, title: 'Chapter 3', content: 'This is content of chapter 3!', },
        { index1: 1, index2: 2, title: 'Chapter 4', content: 'This is content of chapter 4!', },
        { index1: 1, index2: 2, title: 'Chapter 5', content: 'This is content of chapter 5!', },
        { index1: 1, index2: 2, title: 'Chapter 6', content: 'This is content of chapter 6!', },
        { index1: 1, index2: 2, title: 'Chapter 7', content: 'This is content of chapter 7!', },
        { index1: 1, index2: 2, title: 'Chapter 8', content: 'This is content of chapter 8!', },
        { index1: 1, index2: 2, title: 'Chapter 9', content: 'This is content of chapter 9!', },
        { index1: 1, index2: 2, title: 'Chapter 10', content: 'This is content of chapter 10!', },
        { index1: 1, index2: 2, title: 'Chapter 1', content: 'This is content of chapter 1!', },
        { index1: 1, index2: 2, title: 'Chapter 2', content: 'This is content of chapter 2!', },
        { index1: 1, index2: 2, title: 'Chapter 3', content: 'This is content of chapter 3!', },
        { index1: 1, index2: 2, title: 'Chapter 4', content: 'This is content of chapter 4!', },
        { index1: 1, index2: 2, title: 'Chapter 5', content: 'This is content of chapter 5!', },
        { index1: 1, index2: 2, title: 'Chapter 6', content: 'This is content of chapter 6!', },
        { index1: 1, index2: 2, title: 'Chapter 7', content: 'This is content of chapter 7!', },
        { index1: 1, index2: 2, title: 'Chapter 8', content: 'This is content of chapter 8!', },
        { index1: 1, index2: 2, title: 'Chapter 9', content: 'This is content of chapter 9!', },
        { index1: 1, index2: 2, title: 'Chapter 10', content: 'This is content of chapter 10!', },
        { index1: 1, index2: 2, title: 'Chapter 1', content: 'This is content of chapter 1!', },
        { index1: 1, index2: 2, title: 'Chapter 2', content: 'This is content of chapter 2!', },
        { index1: 1, index2: 2, title: 'Chapter 3', content: 'This is content of chapter 3!', },
        { index1: 1, index2: 2, title: 'Chapter 4', content: 'This is content of chapter 4!', },
        { index1: 1, index2: 2, title: 'Chapter 5', content: 'This is content of chapter 5!', },
        { index1: 1, index2: 2, title: 'Chapter 6', content: 'This is content of chapter 6!', },
        { index1: 1, index2: 2, title: 'Chapter 7', content: 'This is content of chapter 7!', },
        { index1: 1, index2: 2, title: 'Chapter 8', content: 'This is content of chapter 8!', },
        { index1: 1, index2: 2, title: 'Chapter 9', content: 'This is content of chapter 9!', },
        { index1: 1, index2: 2, title: 'Chapter 10', content: 'This is content of chapter 10!', },
        { index1: 1, index2: 1, title: 'End', content: 'See you again!', },
        { index1: 1, index2: 2, title: 'THANK YOU', content: 'Thanks for reading!', },
    ];

    return (
        <div className='traffic-sign-flip-book-container container'>
            <input type='number' value={currentPage || 0} onChange={(e) => setCurrentPage(Math.max(Math.min(e.target.value, pages?.length), 0) || 0)} />
            <button className='btn' onClick={() => setCurrentPage(p => Math.max(p - 2, 0))}><i className='fa-solid fa-chevron-left' /></button>
            <FlipBook
                pages={pages}
            >
                {pages.map((p, i) => (
                    <React.Fragment key={i}>
                        <Page
                            pages={pages}
                            currentPage={currentPage}
                            index={i + 1}
                            color={`hsl(${(360 / pages.length) * i}, 97%, 70%)`}
                        >
                            <div>
                                <h1>{p.title}</h1>
                                <p>{p.content}</p>
                                <div>Page: {i + 1}</div>
                            </div>
                        </Page>
                    </React.Fragment>
                ))}
                {/* {pages.map((p, i) => (
                    <React.Fragment key={i}>
                        <Page
                            pages={pages}
                            currentPage={0}
                            index={i + 1}
                            color={`hsla(${(360 / pages.length) * i}, 97%, 70%, 0.3)`}
                        >
                            <div>
                                <h1>{p.title}</h1>
                                <p>{p.content}</p>
                                <div>Page: {i + 1}</div>
                            </div>
                        </Page>
                    </React.Fragment>
                ))} */}
            </FlipBook>
            <button className='btn' onClick={() => setCurrentPage(p => Math.min(p + 2, pages?.length))}><i className='fa-solid fa-chevron-right' /></button>
        </div>
    )
}

import { useState } from 'react';

import './ForumCard.css';

export default function ForumCard({
    post = { title: '', content: '' },
    setSelectedPost = () => { },
}) {
    const [reaction, setReaction] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClickReact = (reaction) => {
        console.log(reaction);
        setReaction(p => reaction.force ? reaction : (p != null ? null : reaction));
        setOpen(false);
    };

    const actions = [
        { id: 'Like', icon: 'fa-solid fa-thumbs-up', color: '#538DFF', background: 'linear-gradient(to bottom, #538DFF, #538DFF)', force: true, },
        { id: 'Heart', icon: 'fa-solid fa-heart', color: '#F74C61', background: 'linear-gradient(to bottom, #F74C61, #F74C61)', force: true, },
        { id: 'Haha', icon: 'fa-solid fa-face-laugh-squint', color: '#FFDA61', background: 'linear-gradient(to bottom, #FFDA61, #FFDA61)', force: true, },
        { id: 'Wow', icon: 'fa-solid fa-face-surprise', color: '#FFDA61', background: 'linear-gradient(to bottom, #FFDA61, #FFDA61)', force: true, },
        { id: 'Sad', icon: 'fa-solid fa-face-frown', color: '#FFDA61', background: 'linear-gradient(to bottom, #FFDA61, #FFDA61)', force: true, },
        { id: 'Angry', icon: 'fa-solid fa-angry', color: '#FA8662', background: 'linear-gradient(to bottom, #F74D61, #FFDA61)', force: true, },
    ];

    return (
        <div className='forum-card-container'>
            <div className='content'>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
            </div>
            <div className='react-count'>
                <i />
            </div>
            <div className='react-comment'>
                <div
                    className='button-wrapper'
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                >
                    <button
                        className='main-btn'
                        style={{ backgroundColor: reaction ? reaction?.color + '66' : '#2D3644' }}
                        onClick={() => handleClickReact({ id: 'Like', icon: 'fa-solid fa-thumbs-up', color: '#538DFF', background: 'linear-gradient(to bottom, #538DFF, #538DFF)', force: false, })}
                    >
                        {reaction ?
                            <>
                                <i className={reaction.icon} style={{ color: reaction.color, '--background': reaction.background }} />
                                <span style={{ color: reaction.color }}>{reaction.id}</span>
                            </>
                            :
                            <i className='fa-regular fa-thumbs-up' />
                        }
                    </button>

                    {open && (
                        <div className='reaction-popup'>
                            {actions.map((item, index) => (
                                <div
                                    key={item.id}
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                    className='reaction-item'
                                >
                                    <button
                                        className='btn-item'
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                        onClick={() => handleClickReact(item)}
                                    >
                                        <i className={item.icon} style={{ color: item.color, animationDelay: `${index * 0.1}s`, '--background': item.background }} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='button-wrapper'>
                    <button className='main-btn' onClick={() => setSelectedPost(post)}>
                        <i className='fa-regular fa-comment' />
                    </button>
                </div>
            </div>
        </div>
    )
}

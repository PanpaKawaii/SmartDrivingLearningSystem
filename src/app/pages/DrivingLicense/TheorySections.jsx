

import './TheorySections.css';

export default function TheorySections({
    theorySections = '',
    selectedTheory = '',
    setSelectedTheory = '',
    progress = '',
    markTheoryComplete = '',
}) {
    return (
        <div className='theory-sections-container'>
            <div className='header'>
                <div className='title'>
                    <div className='icon-box'>
                        <i className='fa-solid fa-book-open' />
                    </div>
                    <div>
                        <h2>Theory Sections</h2>
                        <p>
                            {theorySections?.length} sections available
                        </p>
                    </div>
                </div>
                {progress?.theory_completed && (
                    <div className='completed'>
                        {/* <CheckCircle2 className='check' /> */}
                        <span>Completed</span>
                    </div>
                )}
            </div>
            {theorySections.length > 0 ? (
                <>
                    <div className='section-list'>
                        {theorySections.map((section, index) => {
                            const active = selectedTheory?.id === section.id
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => setSelectedTheory(section)}
                                    className={`section ${active ? 'active' : ''}`}
                                >
                                    <div className='row'>
                                        <div className={`number ${active ? 'active' : ''}`}>
                                            {index + 1}
                                        </div>
                                        <div className='text'>
                                            <h3 className={active ? 'active' : ''}>
                                                {section.title}
                                            </h3>
                                        </div>
                                        {/* <List className={`list-icon ${active ? 'active' : ''}`} /> */}
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                    {selectedTheory && (
                        <div className='theory-content'>
                            <h3>{selectedTheory.title}</h3>
                            <div className='text'>
                                {selectedTheory.content}
                            </div>
                        </div>
                    )}
                    {!progress?.theory_completed && (
                        <div className='footer'>
                            <button
                                onClick={markTheoryComplete}
                                className='complete-button'
                            >
                                {/* <CheckCircle2 className='btn-icon' /> */}
                                Mark Theory as Complete
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className='empty'>
                    <div className='empty-icon'>
                        {/* <BookOpen /> */}
                    </div>
                    <p>No theory sections available</p>
                </div>
            )}
        </div>
    )
}
import './EmptyNotification.css';

export default function EmptyNotification({
    icon = 'book-open',
    name = 'No Data Available',
    description = 'Check back soon for available data.',
}) {
    return (
        <div className='empty-notification-container'>
            <div className='empty-icon'>
                <i className={`fa-solid fa-${icon}`} />
            </div>
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    )
}

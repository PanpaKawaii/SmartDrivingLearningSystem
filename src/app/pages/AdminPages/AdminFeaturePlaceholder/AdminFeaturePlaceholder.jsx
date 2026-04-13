import './AdminFeaturePlaceholder.css';

export default function AdminFeaturePlaceholder({ title, description }) {
    return (
        <div className='admin-placeholder-card'>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}

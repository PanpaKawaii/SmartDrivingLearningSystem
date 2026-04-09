import './FeaturePlaceholder.css';

export default function FeaturePlaceholder({ title, description }) {
    return (
        <div className='feature-placeholder-card'>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}

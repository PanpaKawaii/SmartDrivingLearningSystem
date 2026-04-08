import { useRef } from 'react';
import './ImageUpload.css';

export default function ImageUpload({
  imageUrl,
  onImageChange,
  disabled = false,
  className = '',
  style = {},
  label = 'Tải ảnh lên',
}) {
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        onImageChange && onImageChange({
          file,
          preview: ev.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`image-upload-wrapper ${className}`} style={style}>
      <div className='image-preview'>
        <img src={imageUrl} alt='avatar' />
        <button
          className='upload-btn'
          type='button'
          disabled={disabled}
          onClick={() => !disabled && inputRef.current.click()}
        >
          <i className='fa-solid fa-camera'></i>
          {label && (
            <span className='upload-label-tooltip'>{label}</span>
          )}
        </button>
        <input
          ref={inputRef}
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={handleFileChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

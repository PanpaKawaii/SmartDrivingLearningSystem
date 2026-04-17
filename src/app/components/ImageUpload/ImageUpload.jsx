import { useRef } from 'react';
import './ImageUpload.css';

function resizeImageFile(file, maxImageSide) {
  return new Promise((resolve, reject) => {
    const sourceUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const maxSide = Math.max(image.width, image.height);
      const scale = Math.min(1, maxImageSide / maxSide);

      URL.revokeObjectURL(sourceUrl);

      if (scale === 1) {
        resolve(file);
        return;
      }

      const targetWidth = Math.max(1, Math.round(image.width * scale));
      const targetHeight = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement('canvas');

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const context = canvas.getContext('2d');
      if (!context) {
        resolve(file);
        return;
      }

      context.drawImage(image, 0, 0, targetWidth, targetHeight);

      const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      const quality = outputType === 'image/jpeg' ? 0.9 : undefined;

      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(file);
          return;
        }

        const ext = outputType === 'image/png' ? 'png' : 'jpg';
        const baseName = file.name.replace(/\.[^/.]+$/, '');
        resolve(new File([blob], `${baseName}-resized.${ext}`, {
          type: outputType,
          lastModified: Date.now(),
        }));
      }, outputType, quality);
    };

    image.onerror = () => {
      URL.revokeObjectURL(sourceUrl);
      reject(new Error('Không thể xử lý ảnh đã chọn'));
    };

    image.src = sourceUrl;
  });
}

export default function ImageUpload({
  imageUrl,
  onImageChange,
  disabled = false,
  className = '',
  style = {},
  label = 'Tải ảnh lên',
  maxImageSide,
}) {
  const inputRef = useRef();
  const hasImage = Boolean(imageUrl);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      let processedFile = file;

      try {
        if (typeof maxImageSide === 'number' && maxImageSide > 0) {
          processedFile = await resizeImageFile(file, maxImageSide);
        }
      } catch (error) {
        processedFile = file;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        onImageChange && onImageChange({
          file: processedFile,
          preview: ev.target.result,
        });
      };
      reader.readAsDataURL(processedFile);

      e.target.value = '';
    }
  };

  return (
    <div className={`image-upload-wrapper ${className}`} style={style}>
      <div className='image-preview'>
        {hasImage ? (
          <img src={imageUrl} alt='preview' />
        ) : (
          <div className='image-empty-placeholder' aria-hidden='true'>
            <i className='fa-solid fa-cloud-arrow-up' />
            <span>Nhấn để tải ảnh</span>
          </div>
        )}
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

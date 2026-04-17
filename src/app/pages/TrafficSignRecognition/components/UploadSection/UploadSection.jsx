import ImageUpload from '../../../../components/ImageUpload/ImageUpload';
import './UploadSection.css';

export default function UploadSection({ previewUrl, handleImageChange, handleReset, handleAnalyze, selectedFile, loading }) {
    return (
        <div className='upload-section'>
            <div className={`drop-zone ${previewUrl ? 'has-image' : ''}`}>
                <ImageUpload
                    imageUrl={previewUrl}
                    onImageChange={handleImageChange}
                    disabled={loading}
                    className='traffic-sign-upload'
                    label={previewUrl ? 'Đổi ảnh' : 'Tải ảnh lên'}
                    maxImageSide={2048}
                />

                {!previewUrl && (
                    <div className='drop-zone-helper'>
                        <p className='drop-title'>Nhấn biểu tượng camera để chọn ảnh</p>
                        <p className='drop-hint'>Hỗ trợ JPG, PNG, WEBP • Tối đa 3MB</p>
                    </div>
                )}

                {previewUrl && (
                    <div className='preview-actions'>
                        <button className='btn remove-btn' onClick={handleReset}>
                            <i className='fa-solid fa-trash' />
                            <span>Xóa</span>
                        </button>
                    </div>
                )}
            </div>

            <button
                className='btn analyze-btn'
                onClick={handleAnalyze}
                disabled={!selectedFile || loading}
                id='recognition-analyze-btn'
            >
                {loading ? (
                    <>
                        <i className='fa-solid fa-spinner fa-spin' />
                        <span>Đang nhận diện...</span>
                    </>
                ) : (
                    <>
                        <i className='fa-solid fa-magnifying-glass' />
                        <span>Nhận diện biển báo</span>
                    </>
                )}
            </button>
        </div>
    );
}

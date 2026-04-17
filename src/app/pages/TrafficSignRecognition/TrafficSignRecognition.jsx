import { useState, useEffect } from 'react';
import { uploadMedia, fetchRoboflowData } from '../../../mocks/CallingAPI';
import StarsBackground from '../../components/StarsBackground/StarsBackground';
import CloudsBackground from '../../components/CloudsBackground/CloudsBackground';
import HeadingComponent from '../../components/HeadingComponent/HeadingComponent';
import TrafficLight from '../../components/TrafficLight/TrafficLight';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import DetectionResults from './components/DetectionResults/DetectionResults';
import UploadSection from './components/UploadSection/UploadSection';


import './TrafficSignRecognition.css';

export default function TrafficSignRecognition() {
    const { user } = useAuth();

    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [responseRoboflow, setResponseRoboflow] = useState(null);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);

    const handleImageChange = ({ file, preview }) => {
        if (!file) {
            setError('Vui lòng chọn file ảnh hợp lệ (JPG, PNG, ...)');
            return;
        }

        setSelectedFile(file);
        setPreviewUrl(preview || null);
        setResponseRoboflow(null);
        setError(null);
    };

    useEffect(() => {
        if (!selectedFile || refresh === 0) {
            setLoading(false);
            return;
        }

        const analyzeImage = async () => {
            setLoading(true);
            setError(null);
            setResponseRoboflow(null);

            try {
                const entityId = crypto.randomUUID();
                const mediaItems = await uploadMedia([selectedFile], entityId, 'TrafficSign', user?.token || '');
                const imageUrl = mediaItems?.[0]?.url || mediaItems?.[0]?.fileUrl || mediaItems?.[0];
                console.log('Media items:', mediaItems);
                console.log('Image URL:', imageUrl);
                if (!imageUrl) {
                    throw new Error('Không lấy được URL ảnh sau khi upload');
                }
                const data = await fetchRoboflowData(imageUrl);
                console.log('Roboflow result:', data);
                setResponseRoboflow(data);
            } catch (err) {
                console.error('Recognition error:', err);
                setError(err.message || 'Đã có lỗi xảy ra khi nhận diện');
            } finally {
                setLoading(false);
            }
        };

        analyzeImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh, selectedFile]);

    const handleAnalyze = () => {
        if (selectedFile) {
            setRefresh(r => r + 1);
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setResponseRoboflow(null);
        setError(null);
    };

    const getRawOutput = () => {
        if (!responseRoboflow) return null;
        const outputs = responseRoboflow?.outputs;
        if (Array.isArray(outputs) && outputs.length > 0) return outputs[0];
        return responseRoboflow;
    };

    if (error) return <div><CloudsBackground /><TrafficLight text={'error'} status={error?.status} setRefresh={setRefresh} /></div>;

    return (
        <div className='traffic-sign-recognition-container'>
            <StarsBackground />

            <div className='recognition-content container'>
                <HeadingComponent
                    title='Nhận diện biển báo'
                    subtitle='Sử dụng công nghệ AI và thị giác máy tính, hệ thống tự động nhận diện biển báo giao thông và cung cấp tức thì: ý nghĩa biển hiệu, mức xử phạt liên quan cùng hướng dẫn lái xe an toàn. Đây là giải pháp đột phá giúp người lái xe nắm vững luật lệ và tham gia giao thông an toàn hơn.'
                    badge='AI Traffic Vision'
                    back={false}
                    titlePosition='center'
                />

                <div className='recognition-workspace'>
                    <UploadSection
                        previewUrl={previewUrl}
                        handleImageChange={handleImageChange}
                        handleReset={handleReset}
                        handleAnalyze={handleAnalyze}
                        selectedFile={selectedFile}
                        loading={loading}
                    />

                    <div className='result-section'>
                        {loading && (
                            <div className='result-trafficlight-loading'>
                                <TrafficLight text={'loading'} setRefresh={() => { }} />
                            </div>
                        )}

                        {!loading && !responseRoboflow && (
                            <div className='result-placeholder'>
                                <div className='placeholder-icon'>
                                    <i className='fa-solid fa-triangle-exclamation' />
                                </div>
                                <p>Kết quả nhận diện sẽ xuất hiện ở đây</p>
                                <p className='hint-text'>Tải ảnh biển báo lên và nhấn <strong>Nhận diện biển báo</strong></p>
                            </div>
                        )}

                        {!loading && responseRoboflow && (
                            <div className='result-content'>
                                <div className='result-header'>
                                    <i className='fa-solid fa-circle-check' />
                                    <span>Nhận diện hoàn tất</span>
                                </div>

                                <DetectionResults rawOutput={getRawOutput()} />
                            </div>
                        )}
                    </div>
                </div>

                <div className='info-banner'>
                    <i className='fa-solid fa-circle-info' />
                    <p>
                        <strong>Mẹo tối ưu:</strong> Để hệ thống nhận diện đạt kết quả tốt nhất, bạn nên <strong>chỉ chụp một loại biển báo rõ ràng</strong> tại một thời điểm, không nên chụp nhiều biển báo chung một khung hình.
                        <br />
                        <strong>Lưu ý:</strong> Kết quả chỉ mang tính tham khảo, độ chính xác phụ thuộc vào chất lượng ảnh.
                    </p>
                </div>
                <div className='info-banner info-banner-limit'>
                    <i className='fa-solid fa-compress' />
                    <p>
                        <strong>Lưu ý về kích thước ảnh:</strong> Hosted API hỗ trợ tối đa 3MB và độ phân giải 2048x2048. Nếu ảnh của bạn vượt quá giới hạn này, hệ thống sẽ tự động thực hiện tiến trình <strong>resize ảnh (ví dụ từ 3024x4032 xuống 1536x2048)</strong> để tối ưu cho phân tích. Bạn không cần phải thao tác thủ công.
                    </p>
                </div>
            </div>
        </div>
    );
}


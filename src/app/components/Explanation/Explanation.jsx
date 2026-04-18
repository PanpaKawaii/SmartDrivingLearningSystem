import { useState } from 'react';
import { ask_ai } from '../../../mocks/blocks.js';
import { postData } from '../../../mocks/CallingAPI.js';
import { useAuth } from '../../hooks/AuthContext/AuthContext';
import Cube from '../Cube/Cube';

import './Explanation.css';

export default function Explanation({
    questionProp = '',
    answersProp = [],
    explanation = '',
}) {
    const { user, refreshNewToken } = useAuth();

    // console.log('questionProp', questionProp);
    // console.log('answersProp', answersProp);

    const [aiExplanation, setAiExplanation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const AskAI = async (newMessage) => {
        const SendMessage = {
            prompt: newMessage,
            userIdentifier: user?.id,
        };
        setLoading(true);
        const token = user?.token;
        try {
            const result = await postData('Chat/ask', SendMessage, token);
            console.log('result', result);
            if (result.reply?.includes('The model is overloaded. Please try again later.')) {
                setAiExplanation('Kết nối không ổn định, bạn hãy thử lại sau nhé!');
            } else {
                setAiExplanation(result.reply);
            }
        } catch (error) {
            setAiExplanation('Kết nối không ổn định, bạn hãy thử lại sau nhé!');
            console.error('Error', error);
            setError(error);
        } finally {
            setLoading(false);
        };
    };

    const renderFormattedText = (text) => {
        const lines = text.split(/(?<=\s)\*(?=\s)/);

        return lines.map((line, idx) => {
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
                <div key={idx}>
                    {parts.map((part, i) =>
                        part.startsWith('**') && part.endsWith('**') ? (
                            <strong key={i}>{part.slice(2, -2)}</strong>
                        ) : (
                            <span key={i}>{part}</span>
                        )
                    )}
                </div>
            );
        });
    };

    const handleAskAI = () => {
        console.log('Ask');
        const newMessage = `Trong các đáp án ${answersProp?.map(a => (`"${a.content}"`))}, tại sao đáp án ${answersProp?.filter(a => a.isCorrect)?.map(a => (`"${a.content}"`))} lại là đáp án đúng cho câu hỏi "${questionProp}"?`;
        console.log(newMessage);
        AskAI(newMessage);
    };

    // console.log('aiExplanation', aiExplanation);

    return (
        <div className='explanation-container'>
            <div className='explanation-box fix-explanation'>
                <h4>Giải thích:</h4>
                {explanation ?
                    <p>{explanation}</p>
                    :
                    <p className='no-explanation'>Không có giải thích</p>
                }
                <button className='btn cube-wrapper' onClick={() => handleAskAI()} disabled={!user || loading}>
                    <Cube
                        color={'#68FCFF'}
                        onClickCube={() => { }}
                        faces={ask_ai || []}
                    />
                    <div className='text'>HỎI AI</div>
                </button>
            </div>
            {aiExplanation &&
                <div className='explanation-box ai-explanation'>
                    <h4>AI giải đáp:</h4>
                    <div>{renderFormattedText(aiExplanation)}</div>
                </div>
            }
        </div>
    )
}

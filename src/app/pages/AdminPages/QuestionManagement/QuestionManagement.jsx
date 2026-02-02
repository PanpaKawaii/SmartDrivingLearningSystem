import { useState } from 'react';
import MovingLabelInput from '../../../components/MovingLabelInput/MovingLabelInput';

import './QuestionManagement.css';

export default function QuestionManagement() {
    const [text, setText] = useState('');

    return (
        <div className='admin-container'>
            <div className='inner-container management-container question-management-container'>

                <MovingLabelInput
                    type={'text'}
                    value={text || ''}
                    onValueChange={(propE) => setText(propE.value)}
                    extraClassName={''}
                    extraStyle={{}}
                    label={'Name'}
                    labelStyle={'left moving'}
                />
            </div>
        </div>
    )
}

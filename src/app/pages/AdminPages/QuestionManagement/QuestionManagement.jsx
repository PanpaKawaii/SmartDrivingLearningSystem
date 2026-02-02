import { useState } from 'react';
import MovingLabelInput from '../../../components/MovingLabelInput/MovingLabelInput';
import StyleLabelSelect from '../../../components/StyleLabelSelect/StyleLabelSelect';

import './QuestionManagement.css';

export default function QuestionManagement() {
    const [text, setText] = useState('');
    const [select, setSelect] = useState('a');

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

                <br />

                <StyleLabelSelect
                    id={`select`}
                    list={[{ id: 'a', name: 'a' }, { id: 'b', name: 'b' }]}
                    value={select}
                    onValueChange={(propE) => {
                        setSelect(propE);
                    }}
                    extraClassName={''}
                    extraStyle={{}}
                    label={'Select'}
                    labelStyle={'center'}
                />
            </div>
        </div>
    )
}

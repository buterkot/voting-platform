import React, { useState } from 'react';

const CreateVote = () => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [options, setOptions] = useState([{ optionText: '' }]);
    const [status, setStatus] = useState('active');

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'optionText') {
            const newOptions = [...options];
            newOptions[index].optionText = value;
            setOptions(newOptions);
        } else {
            switch (name) {
                case 'title':
                    setTitle(value);
                    break;
                case 'startDate':
                    setStartDate(value);
                    break;
                case 'endDate':
                    setEndDate(value);
                    break;
                default:
                    break;
            }
        }
    };

    const addOption = () => {
        if (options.length >= 10) {
            alert('Максимальное количество вариантов голосования — 10.');
            return;
        }
        setOptions([...options, { optionText: '' }]);
    };

    const removeOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !startDate || !endDate || options.some(option => !option.optionText)) {
            alert('Пожалуйста, заполните все обязательные поля!');
            return;
        }

        const voteData = {
            title,
            startDate,
            endDate,
            options: options.map(option => option.optionText),
        };

        console.log('Голосование создано:', voteData);
    };

    return (
        <div className='form-frame'>
            <h2>Создать голосование</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-case'>
                    Название голосования:
                    <input className='login-input'
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className='form-case'>
                    Дата начала:
                    <input className='login-input'
                        type="datetime-local"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className='form-case'>
                    Дата окончания:
                    <input className='login-input'
                        type="datetime-local"
                        name="endDate"
                        value={endDate}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className='form-case'>
                    Варианты голосования
                    {options.map((option, index) => (
                        <div className='vote-option' key={index}>
                            <input className='login-input'
                                type="text"
                                name="optionText"
                                value={option.optionText}
                                onChange={(e) => handleChange(e, index)}
                                required
                                placeholder={`Вариант ${index + 1}`}
                            />
                            <button className='form-button' type="button" onClick={() => removeOption(index)}>Удалить</button>
                        </div>
                    ))}
                    <button className='form-button' type="button" onClick={addOption}>Добавить вариант</button>
                </div>
                <div>
                    <button className='form-button' type="submit">Создать голосование</button>
                </div>
            </form>
        </div>
    );
};

export default CreateVote;

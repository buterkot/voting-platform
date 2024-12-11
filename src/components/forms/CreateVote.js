import React, { useState } from 'react';
import axios from 'axios';

const CreateVote = () => {
    const [title, setTitle] = useState('');
    const [options, setOptions] = useState([{ optionText: '' }, { optionText: '' }]);
    const [anonymous, setAnonymous] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'optionText') {
            const newOptions = [...options];
            newOptions[index].optionText = value;
            setOptions(newOptions);
        } else {
            setTitle(value);
        }
    };

    const addOption = () => {
        if (options.length >= 10) {
            setError('Максимальное количество вариантов — 10.');
            return;
        }
        setOptions([...options, { optionText: '' }]);
    };

    const removeOption = (index) => {
        if (options.length <= 2) {
            setError('Минимальное количество вариантов — 2.');
            return;
        }
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title || options.some(option => !option.optionText)) {
            setError('Пожалуйста, заполните все обязательные поля.');
            return;
        }

        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user || !user.id) {
            setError('Не удалось определить пользователя. Авторизуйтесь заново.');
            return;
        }

        const voteData = {
            title,
            startDate: new Date().toISOString(),
            endDate: null,
            userId: user.id,
            anonymous: anonymous ? 1 : 0,
            options: options.map(option => option.optionText),
        };

        try {
            await axios.post('http://localhost:3000/votes/add', voteData);
            alert('Голосование успешно создано!');
            setTitle('');
            setOptions([{ optionText: '' }, { optionText: '' }]);
            setAnonymous(false);
        } catch (error) {
            setError(error.response?.data?.message || 'Ошибка при создании голосования.');
        }
    };

    return (
        <div className='form-frame'>
            <div className='form-title'>Создать голосование</div>
            <form onSubmit={handleSubmit}>
                <div className='form-case'>
                    <div className='form-subtitle'>Вопрос:</div>
                    <input
                        className='login-input'
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => handleChange(e)}
                        required
                        maxLength={100}
                        placeholder="Введите вопрос"
                    />
                </div>
                <div className='form-case'>
                    <div className='form-subtitle'>Варианты:</div>
                    {options.map((option, index) => (
                        <div className='vote-option-create' key={index}>
                            <input
                                className='login-input'
                                type="text"
                                name="optionText"
                                value={option.optionText}
                                onChange={(e) => handleChange(e, index)}
                                required
                                maxLength={20}
                                placeholder={`Вариант ${index + 1}`}
                            />
                            <button
                                className='form-button-delete'
                                type="button"
                                onClick={() => removeOption(index)}
                            >
                                Удалить
                            </button>
                        </div>
                    ))}
                    <button
                        className='form-button'
                        type="button"
                        onClick={addOption}
                    >
                        Добавить вариант
                    </button>
                </div>
                <div className='form-case-checkbox'>
                    <div className='form-subtitle'>Анонимное:</div>
                    <input className='checkbox'
                        type="checkbox"
                        checked={anonymous}
                        onChange={() => setAnonymous(!anonymous)}
                    />
                </div>
                {error && <div className='error-message'>{error}</div>}
                <div className='button-block'>
                    <button className='form-button' type="submit">Создать голосование</button>
                </div>
            </form>
        </div>
    );
};

export default CreateVote;

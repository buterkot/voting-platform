import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateVote = () => {
    const [title, setTitle] = useState('');
    const [options, setOptions] = useState([{ optionText: '' }, { optionText: '' }]);
    const [anonymous, setAnonymous] = useState(false);
    const [multiple, setMultiple] = useState(false);
    const [isTemporary, setIsTemporary] = useState(false);
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [userGroups, setUserGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');

    useEffect(() => {
        const fetchGroups = async () => {
            const user = JSON.parse(sessionStorage.getItem('user'));
            if (user && user.id && isPrivate) {
                try {
                    const response = await axios.get(`http://localhost:3000/groups/user/${user.id}`);
                    setUserGroups(response.data);
                } catch (error) {
                    console.error('Ошибка при загрузке групп:', error);
                }
            }
        };

        fetchGroups();
    }, [isPrivate]);

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
            alert('Максимальное количество вариантов — 10.');
            return;
        }
        setOptions([...options, { optionText: '' }]);
    };

    const removeOption = (index) => {
        if (options.length <= 2) {
            alert('Минимальное количество вариантов — 2.');
            return;
        }
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title || options.some(option => !option.optionText)) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }

        if (isTemporary && !endDate) {
            alert('Пожалуйста, выберите дату окончания голосования.');
            return;
        }

        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user || !user.id) {
            alert('Не удалось определить пользователя. Авторизуйтесь заново.');
            return;
        }

        const voteData = {
            title,
            startDate: new Date().toISOString(),
            endDate: isTemporary ? new Date(endDate).toISOString() : null,
            userId: user.id,
            anonymous: anonymous ? 1 : 0,
            multiple: multiple ? 1 : 0,
            options: options.map(option => option.optionText),
            groupId: isPrivate ? selectedGroup : null,
        };

        if (isPrivate && !selectedGroup) {
            alert('Выберите группу для закрытого голосования.');
            return;
        }        

        try {
            await axios.post('http://localhost:3000/votes/add', voteData);
            alert('Голосование успешно создано!');
            setTitle('');
            setOptions([{ optionText: '' }, { optionText: '' }]);
            setAnonymous(false);
            setMultiple(false);
            setIsTemporary(false);
            setEndDate('');
        } catch (error) {
            setError(error.response?.data?.message || 'Ошибка при создании голосования.');
        }
    };

    return (
        <div className='form-frame'>
            <div className='form-title'>Новое голосование</div>
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
                    <label>
                        <input
                            type="checkbox"
                            checked={anonymous}
                            onChange={() => setAnonymous(!anonymous)}
                        />
                        Анонимное голосование
                    </label>
                </div>
                <div className='form-case-checkbox'>
                    <div>
                        <input
                            type="checkbox"
                            checked={multiple}
                            onChange={() => setMultiple(!multiple)}
                        />
                        Несколько вариантов
                    </div>
                </div>
                <div className='form-case-checkbox'>
                    <div>
                        <input
                            type="checkbox"
                            checked={isTemporary}
                            onChange={() => setIsTemporary(!isTemporary)}
                        />
                        Временное голосование
                    </div>
                </div>
                {isTemporary && (
                    <div className='form-case'>
                        <input
                            className='login-input'
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div className='form-case-checkbox'>
                    <label>
                        <input
                            type="checkbox"
                            checked={isPrivate}
                            onChange={() => {
                                setIsPrivate(!isPrivate);
                                if (!isPrivate) setSelectedGroup('');
                            }}
                        />
                        Закрытое голосование
                    </label>
                </div>

                {isPrivate && (
                    <div className='form-case'>
                        <select
                            className='login-input'
                            value={selectedGroup}
                            onChange={(e) => setSelectedGroup(e.target.value)}
                            required
                        >
                            <option value="">Выберите группу</option>
                            {userGroups.map(group => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {error && <div className='error-message'>{error}</div>}
                <div className='button-block'>
                    <button className='form-button' type="submit">Создать голосование</button>
                </div>
            </form>
        </div>
    );
};

export default CreateVote;

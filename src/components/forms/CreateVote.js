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
                case 'status':
                    setStatus(value);
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
            status,
            options: options.map(option => option.optionText), 
        };

        console.log('Голосование создано:', voteData);
    };

    return (
        <div>
            <h2>Создать голосование</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Название голосования:
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Дата начала:
                        <input
                            type="datetime-local"
                            name="startDate"
                            value={startDate}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Дата окончания:
                        <input
                            type="datetime-local"
                            name="endDate"
                            value={endDate}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Статус голосования:
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => handleChange(e)}
                        >
                            <option value="active">Активное</option>
                            <option value="completed">Завершенное</option>
                        </select>
                    </label>
                </div>
                <div>
                    <h3>Варианты голосования</h3>
                    {options.map((option, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="optionText"
                                value={option.optionText}
                                onChange={(e) => handleChange(e, index)}
                                required
                                placeholder={`Вариант ${index + 1}`}
                            />
                            <button type="button" onClick={() => removeOption(index)}>Удалить</button>
                        </div>
                    ))}
                    <button type="button" onClick={addOption}>Добавить вариант</button>
                </div>
                <div>
                    <button type="submit">Создать голосование</button>
                </div>
            </form>
        </div>
    );
};

export default CreateVote;

import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import Alert from "../../components/Alert.js";

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

    const [showTags, setShowTags] = useState(false);
    const [allTags, setAllTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const location = useLocation();

    const { t, i18n } = useTranslation();
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        if (location.state?.secondRound && location.state.data) {
            const { title, options, anonymous, multiple } = location.state.data;
            setTitle(title);
            setAnonymous(!!anonymous);
            setMultiple(!!multiple);
            setOptions(options.map(text => ({ optionText: text })));
        }
    }, [location]);

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

    useEffect(() => {
        axios.get("http://localhost:3000/votes/tags/load")
            .then((response) => {
                setAllTags(response.data);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке тегов:", error);
            });
    }, []);

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
            setAlertMessage(t("max_10"));
            return;
        }
        setOptions([...options, { optionText: '' }]);
    };

    const removeOption = (index) => {
        if (options.length <= 2) {
            setAlertMessage(t("min_2"));;
            return;
        }
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title || options.some(option => !option.optionText)) {
            alert(t("fill"));
            return;
        }

        if (isTemporary && !endDate) {
            alert(t("select_end_date"));
            return;
        }

        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user || !user.id) {
            alert(t("fail_user"));
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
            round: location.state?.secondRound ? 2 : 1,
            tags: selectedTags,
        };

        if (isPrivate && !selectedGroup) {
            alert(t("select_group"));
            return;
        }

        try {
            await axios.post('http://localhost:3000/votes/add', voteData);
            alert(t("v_created"));
            setTitle('');
            setOptions([{ optionText: '' }, { optionText: '' }]);
            setAnonymous(false);
            setMultiple(false);
            setIsTemporary(false);
            setEndDate('');
        } catch (error) {
            setError(error.response?.data?.message || t("v_error"));
        }
    };

    const toggleTag = (tagId) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        );
    };

    return (
        <div className='form-frame'>
            <Alert message={alertMessage} onClose={() => setAlertMessage("")} />
            <div className='form-title'>{t("new_vote")}</div>
            <form onSubmit={handleSubmit}>
                <div className='form-case'>
                    <div className='form-subtitle'>{t("question")}:</div>
                    <input
                        className='login-input'
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => handleChange(e)}
                        required
                        maxLength={100}
                        placeholder={t("enter_q")}
                    />
                </div>
                <div className='form-case'>
                    <div className='form-subtitle'>{t("options")}:</div>
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
                                placeholder={t("option") + ` ${index + 1}`}
                            />
                            <button
                                className='form-button-delete'
                                type="button"
                                onClick={() => removeOption(index)}
                            >
                                {t("delete")}
                            </button>
                        </div>
                    ))}
                    <button
                        className='form-button'
                        id='form-button-add-option'
                        type="button"
                        onClick={addOption}
                    >
                        {t("add_option")}
                    </button>
                </div>
                <div className='form-case-checkbox'>
                    <label>
                        <input
                            type="checkbox"
                            checked={anonymous}
                            onChange={() => setAnonymous(!anonymous)}
                        />
                        {t("anon_vote")}
                    </label>
                </div>
                <div className='form-case-checkbox'>
                    <div>
                        <input
                            type="checkbox"
                            checked={multiple}
                            onChange={() => setMultiple(!multiple)}
                        />
                        {t("multiple")}
                    </div>
                </div>
                <div className='form-case-checkbox'>
                    <div>
                        <input
                            type="checkbox"
                            checked={isTemporary}
                            onChange={() => setIsTemporary(!isTemporary)}
                        />
                        {t("timed")}
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
                        {t("closed")}
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
                            <option value="">{t("select_group")}</option>
                            {userGroups.map(group => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}


                <button
                    className='toggle-actions'
                    type="button"
                    onClick={() => setShowTags(!showTags)}
                >
                    Показать теги
                </button>

                {showTags && (
                    <div className="tags-list">
                        {allTags.map(tag => (
                            <label key={tag.id} className="tag-checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectedTags.includes(tag.id)}
                                    onChange={() => toggleTag(tag.id)}
                                />
                                {tag.name}
                            </label>
                        ))}
                    </div>
                )}

                {error && <div className='error-message'>{error}</div>}
                <button
                    className='form-button'
                    id='form-button-create-voting'
                    type="submit">
                    {t("create")}
                </button>
            </form>
        </div>
    );
};

export default CreateVote;

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='main'>
      <div className='home-frame'><div className="home-frame-up">
        <div className="form-title">
          Не найдено...
        </div>
        Запрашиваемая вами страница недоступна или не существует.
      </div>
        <div className="home-frame-bottom">
          <Link to="/" className="text-link">
            На главную
          </Link>
        </div>
      </div>

    </div>
  );
};

export default NotFound;

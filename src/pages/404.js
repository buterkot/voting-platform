import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p>
        Страница не найдена....
      </p>
      <Link to="/">
        На главную
      </Link>
    </div>
  );
};

export default NotFound;

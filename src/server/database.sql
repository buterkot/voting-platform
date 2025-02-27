-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-8.0
-- Время создания: Фев 27 2025 г., 20:47
-- Версия сервера: 8.0.35
-- Версия PHP: 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `test`
--

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `text` text NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  `vote_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `lastname` varchar(64) NOT NULL DEFAULT '',
  `firstname` varchar(64) NOT NULL DEFAULT '',
  `role` varchar(1) NOT NULL DEFAULT 'U'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `lastname`, `firstname`, `role`) VALUES
(1, 'miheynikita@gmail.com', '$2b$10$9ILgGG2LMmpPytkdkdGtBuuf3/KRWKaSnviRo.6V6/oNVL15Pct9C', 'Михейка', 'Никита', 'U'),
(2, 'oleg@wasd.ru', '$2b$10$ywBk8Ym2Kp6FcNlumopdQeaW4j3k2jUbE6hKK0UqvpRVxBcljsWVu', 'Монгол', 'Олег', 'U'),
(3, 'a@a.com', '$2b$10$2G5xNSQZLeViZiQJQ7NKPuLETorVKUnRnBmZaOC7StDCe51ihO7bS', 'A', 'A', 'U');

-- --------------------------------------------------------

--
-- Структура таблицы `votes`
--

CREATE TABLE `votes` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `anonymous` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `votes`
--

INSERT INTO `votes` (`id`, `title`, `start_date`, `end_date`, `status`, `user_id`, `anonymous`) VALUES
(1, 'Цвет настроения?', '2025-02-13 22:24:49', NULL, 'A', 1, 0),
(2, 'Топ 1 цифра?', '2025-02-13 22:32:29', NULL, 'A', 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `votes_cast`
--

CREATE TABLE `votes_cast` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `option_id` int DEFAULT NULL,
  `voted_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `votes_cast`
--

INSERT INTO `votes_cast` (`id`, `user_id`, `option_id`, `voted_date`) VALUES
(1, 1, 4, '2025-02-13 22:31:14');

-- --------------------------------------------------------

--
-- Структура таблицы `vote_options`
--

CREATE TABLE `vote_options` (
  `id` int NOT NULL,
  `vote_id` int DEFAULT NULL,
  `option_text` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `vote_options`
--

INSERT INTO `vote_options` (`id`, `vote_id`, `option_text`) VALUES
(1, 1, 'Синий'),
(2, 1, 'Чёрный'),
(3, 1, 'Жёлтый'),
(4, 1, 'Фиолетовый'),
(5, 2, '0'),
(6, 2, '1'),
(7, 2, '2'),
(8, 2, '3'),
(9, 2, '4'),
(10, 2, '5'),
(11, 2, '6'),
(12, 2, '7'),
(13, 2, '8'),
(14, 2, '9');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `vote_id` (`vote_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Индексы таблицы `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `votes_cast`
--
ALTER TABLE `votes_cast`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `option_id` (`option_id`);

--
-- Индексы таблицы `vote_options`
--
ALTER TABLE `vote_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vote_id` (`vote_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `votes_cast`
--
ALTER TABLE `votes_cast`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `vote_options`
--
ALTER TABLE `vote_options`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`vote_id`) REFERENCES `votes` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `votes_cast`
--
ALTER TABLE `votes_cast`
  ADD CONSTRAINT `votes_cast_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `votes_cast_ibfk_2` FOREIGN KEY (`option_id`) REFERENCES `vote_options` (`id`);

--
-- Ограничения внешнего ключа таблицы `vote_options`
--
ALTER TABLE `vote_options`
  ADD CONSTRAINT `vote_options_ibfk_1` FOREIGN KEY (`vote_id`) REFERENCES `votes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-8.0
-- Время создания: Мар 31 2025 г., 19:48
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
  `vote_id` int NOT NULL,
  `removed` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `comments`
--

INSERT INTO `comments` (`id`, `text`, `date`, `user_id`, `vote_id`, `removed`) VALUES
(1, 'Суперское голосование', '2025-02-27 18:14:59', 3, 1, 0),
(2, 'Хотя не очень', '2025-02-27 18:15:15', 3, 1, 0),
(3, 'ishaudhfsjdfls,dv', '2025-02-27 18:16:41', 4, 1, 0),
(4, '1', '2025-02-27 18:16:46', 4, 1, 0),
(5, '2', '2025-02-27 18:16:48', 4, 1, 0),
(9, 'новый', '2025-03-02 20:52:11', 3, 1, 0),
(10, 'новый2', '2025-03-02 20:53:56', 3, 1, 0),
(11, 'новый3', '2025-03-02 20:55:29', 3, 1, 0),
(12, 'новый4', '2025-03-02 20:55:37', 3, 1, 0),
(13, 'новый5', '2025-03-02 20:57:14', 3, 1, 0),
(17, 'goal', '2025-03-10 17:18:29', 3, 2, 0),
(18, 'нормально пойдёт супер нормально пойдёт супер нормально пойдёт супер нормально пойдёт супер нормально пойдёт супер нормально пойдёт супер нормально пойдёт супер нормально пойдёт супер нормально пойдёт супер нормально пойдёт супер нормально пойдёт супер нор', '2025-03-10 17:20:07', 3, 2, 1),
(19, 'Погнали на Луну', '2025-03-10 17:25:10', 7, 6, 0),
(20, 'Around the World', '2025-03-10 17:38:55', 7, 5, 0),
(21, 'Common, очевидно осень', '2025-03-10 17:55:13', 7, 3, 0),
(22, 'Большой комментарий Большой комментарий Большой комментарий Большой комментарий Большой комментарий Большой комментарий Большой комментарий Большой комментарий Большой комментарий Большой комментарий Большой комментарий Большой комментарий Большой коммента', '2025-03-10 18:07:05', 7, 3, 0),
(26, 'sdasd', '2025-03-11 15:09:20', 7, 1, 0),
(27, 'ы', '2025-03-18 15:20:19', 7, 4, 0),
(28, 'ы1', '2025-03-18 15:20:22', 7, 4, 0),
(29, 'ы11', '2025-03-18 15:20:25', 7, 4, 0),
(30, 'вау', '2025-03-18 15:54:40', 9, 1, 0),
(31, 'мне не нравится', '2025-03-18 15:56:31', 10, 1, 0),
(32, 'БРЕСТ!!!!!', '2025-03-18 15:57:11', 10, 7, 0),
(33, 'комментарий', '2025-03-28 14:56:36', 10, 10, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `complaints_comments`
--

CREATE TABLE `complaints_comments` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_id` int NOT NULL,
  `status` enum('active','accepted','declined') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `complaints_comments`
--

INSERT INTO `complaints_comments` (`id`, `user_id`, `comment_id`, `status`, `created_at`) VALUES
(4, 7, 18, 'accepted', '2025-03-14 10:40:15'),
(5, 10, 20, 'declined', '2025-03-20 09:33:56');

-- --------------------------------------------------------

--
-- Структура таблицы `complaints_votes`
--

CREATE TABLE `complaints_votes` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `vote_id` int NOT NULL,
  `status` enum('active','accepted','declined') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `complaints_votes`
--

INSERT INTO `complaints_votes` (`id`, `user_id`, `vote_id`, `status`, `created_at`) VALUES
(1, 7, 9, 'declined', '2025-03-20 09:43:12'),
(2, 7, 1, 'declined', '2025-03-28 13:20:58'),
(3, 7, 9, 'accepted', '2025-03-28 13:21:51');

-- --------------------------------------------------------

--
-- Структура таблицы `invitations`
--

CREATE TABLE `invitations` (
  `id` int NOT NULL,
  `invitation_date` date NOT NULL,
  `team_id` int NOT NULL,
  `user_id` int NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT (_utf8mb4'A')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `invitations`
--

INSERT INTO `invitations` (`id`, `invitation_date`, `team_id`, `user_id`, `status`) VALUES
(1, '2021-02-12', 1, 2, 'A');

-- --------------------------------------------------------

--
-- Структура таблицы `membership`
--

CREATE TABLE `membership` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `team_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `notifications`
--

CREATE TABLE `notifications` (
  `id` int NOT NULL,
  `note` text NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `teams`
--

CREATE TABLE `teams` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `creation_date` date NOT NULL,
  `creator_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `teams`
--

INSERT INTO `teams` (`id`, `name`, `creation_date`, `creator_id`) VALUES
(1, '[value-2]', '2021-02-12', 1);

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
  `role` varchar(1) NOT NULL DEFAULT 'U',
  `ban` tinyint(1) NOT NULL DEFAULT '0',
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `last_online` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `lastname`, `firstname`, `role`, `ban`, `address`, `phone_number`, `last_online`) VALUES
(1, 'miheynikita@gmail.com', '$2b$10$9ILgGG2LMmpPytkdkdGtBuuf3/KRWKaSnviRo.6V6/oNVL15Pct9C', 'Михейка', 'Никита', 'U', 0, NULL, NULL, NULL),
(2, 'oleg@wasd.ru', '$2b$10$ywBk8Ym2Kp6FcNlumopdQeaW4j3k2jUbE6hKK0UqvpRVxBcljsWVu', 'Монгол', 'Олег', 'U', 0, NULL, NULL, NULL),
(3, 'a@a.com', '$2b$10$2G5xNSQZLeViZiQJQ7NKPuLETorVKUnRnBmZaOC7StDCe51ihO7bS', 'A', 'A', 'U', 0, NULL, NULL, NULL),
(4, 'pasha@mail.ru', '$2b$10$CX1qpYoKTKU9k/uap.Fsm.0aSpdN5isrQcZPdCdGgUgL1ns7zevVC', 'Дуров', 'Павел', 'U', 0, NULL, NULL, NULL),
(5, 'irina@gmail.com', '$2b$10$CWCAwctVp5IRpuAzXIPfC.UD/m.Usjo9a1vzvGeHhYNTnH0lieCii', 'Гращенко', 'Ирина', 'U', 1, NULL, NULL, NULL),
(6, 'admin@admin.com', '$2b$10$Y4leV7b.fr3f3Urk/Nf4repgm92mAPK1tu/kOaBEApgr7Kd1mweTm', 'Пич', 'Джо', 'A', 0, NULL, NULL, NULL),
(7, 'prime@gmail.com', '$2b$10$jFb.C2BmyKplWiaTpV/GC.AsWarThgI9OUomxt6LH0qV/XLjNdtAG', 'Прайм', 'Оптимус', 'M', 0, NULL, NULL, '2025-03-31 19:47:52'),
(8, 'qwertyuiop@qwertyuiop.com', '$2b$10$aXJ725U/YDi6H7UJk/wQnuKqyI9AtWP3LCW20.uYDcKUY0TbQqK3y', 'qwertyuiop', 'qwertyuiop', 'U', 0, NULL, NULL, NULL),
(9, 'kirill@mail.ru', '$2b$10$akNz7DUyuRXcNxf7n0IRUuiCX7TqJTBjiSeVhsr73AKbeMiRFqVka', 'Митько', 'Кирилл', 'U', 0, NULL, NULL, NULL),
(10, 'roma@mail.ru', '$2b$10$JLzy3S6pNTg8JiqKsVN8geBlPG/cceP4kPGrMGguMUY.rvM9sk572', 'Борисюк', 'Роман', 'U', 0, NULL, NULL, NULL);

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
  `anonymous` tinyint(1) DEFAULT NULL,
  `multiple` tinyint(1) NOT NULL DEFAULT '0',
  `removed` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `votes`
--

INSERT INTO `votes` (`id`, `title`, `start_date`, `end_date`, `status`, `user_id`, `anonymous`, `multiple`, `removed`) VALUES
(1, 'Цвет настроения?', '2025-02-13 22:24:49', NULL, 'A', 1, 0, 0, 0),
(2, 'Топ 1 цифра?', '2025-02-13 22:32:29', NULL, 'A', 1, 1, 0, 0),
(3, 'Лучшая пора года?', '2025-03-05 17:57:38', NULL, 'A', 3, 0, 0, 0),
(4, 'Какую машину купить?', '2025-03-05 18:56:31', NULL, 'A', 3, 0, 0, 0),
(5, 'Конфета', '2025-03-05 18:57:52', NULL, 'A', 3, 0, 0, 0),
(6, 'Самая крутая планет?', '2025-03-06 21:15:34', NULL, 'A', 5, 0, 0, 0),
(7, 'Какой город?', '2025-03-11 15:20:17', NULL, 'A', 7, 0, 0, 0),
(8, '1', '2025-03-11 17:46:52', '2025-03-11 17:47:02', 'N', 7, 1, 0, 0),
(9, 'Жопа', '2025-03-20 12:41:34', NULL, 'A', 10, 0, 0, 1),
(10, 'Несколько ответов', '2025-03-28 17:45:39', NULL, 'A', 7, 0, 1, 0),
(11, 'несколько ответов2', '2025-03-28 18:09:11', NULL, 'A', 10, 0, 1, 0);

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
(1, 1, 4, '2025-02-13 22:31:14'),
(2, 3, 4, '2025-02-27 21:06:51'),
(3, 3, 8, '2025-03-05 17:00:07'),
(4, 3, 28, '2025-03-06 21:16:26'),
(5, 7, 26, '2025-03-10 20:24:49'),
(6, 7, 13, '2025-03-10 20:29:32'),
(7, 7, 25, '2025-03-10 20:41:49'),
(8, 7, 4, '2025-03-11 14:41:05'),
(9, 7, 19, '2025-03-18 18:26:47'),
(10, 9, 3, '2025-03-18 18:54:29'),
(11, 9, 13, '2025-03-18 18:54:50'),
(12, 9, 15, '2025-03-18 18:55:01'),
(13, 9, 29, '2025-03-18 18:55:11'),
(14, 9, 24, '2025-03-18 18:55:22'),
(15, 9, 19, '2025-03-18 18:55:29'),
(16, 9, 32, '2025-03-18 18:55:38'),
(17, 10, 4, '2025-03-18 18:56:18'),
(18, 10, 14, '2025-03-18 18:56:39'),
(19, 10, 18, '2025-03-18 18:56:46'),
(20, 10, 29, '2025-03-18 18:56:58'),
(21, 10, 31, '2025-03-18 18:57:06'),
(22, 7, 18, '2025-03-24 15:35:41');

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
(14, 2, '9'),
(15, 3, 'Лето'),
(16, 3, 'Зима'),
(17, 3, 'Осень'),
(18, 3, 'Весна'),
(19, 4, 'Lada'),
(20, 4, 'Ferrari'),
(21, 4, 'Audi'),
(22, 5, 'Сникерс'),
(23, 5, 'Баунти'),
(24, 5, 'Марс'),
(25, 5, 'Гематоген'),
(26, 6, 'Марс'),
(27, 6, 'Земля'),
(28, 6, 'Юпитер'),
(29, 6, 'НЕптун'),
(30, 7, 'Минск'),
(31, 7, 'Брест'),
(32, 7, 'Мозырь'),
(33, 7, 'Могилёв'),
(34, 7, 'Барановичи'),
(35, 8, '2'),
(36, 8, '3'),
(37, 8, '4'),
(38, 9, '13123'),
(39, 9, '243'),
(40, 9, '345345'),
(41, 10, '234'),
(42, 10, 'авпр'),
(43, 10, 'лпьтимс'),
(44, 11, '1'),
(45, 11, '2'),
(46, 11, '3'),
(47, 11, '4'),
(48, 11, '5');

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
-- Индексы таблицы `complaints_comments`
--
ALTER TABLE `complaints_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `comment_id` (`comment_id`);

--
-- Индексы таблицы `complaints_votes`
--
ALTER TABLE `complaints_votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `vote_id` (`vote_id`);

--
-- Индексы таблицы `invitations`
--
ALTER TABLE `invitations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `membership`
--
ALTER TABLE `membership`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Индексы таблицы `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creator_id` (`creator_id`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT для таблицы `complaints_comments`
--
ALTER TABLE `complaints_comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `complaints_votes`
--
ALTER TABLE `complaints_votes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `invitations`
--
ALTER TABLE `invitations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `membership`
--
ALTER TABLE `membership`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `votes_cast`
--
ALTER TABLE `votes_cast`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT для таблицы `vote_options`
--
ALTER TABLE `vote_options`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

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
-- Ограничения внешнего ключа таблицы `complaints_comments`
--
ALTER TABLE `complaints_comments`
  ADD CONSTRAINT `complaints_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `complaints_comments_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `complaints_votes`
--
ALTER TABLE `complaints_votes`
  ADD CONSTRAINT `complaints_votes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `complaints_votes_ibfk_2` FOREIGN KEY (`vote_id`) REFERENCES `votes` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `invitations`
--
ALTER TABLE `invitations`
  ADD CONSTRAINT `invitations_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`),
  ADD CONSTRAINT `invitations_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `membership`
--
ALTER TABLE `membership`
  ADD CONSTRAINT `membership_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `membership_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`);

--
-- Ограничения внешнего ключа таблицы `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`);

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

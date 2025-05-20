-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-8.0
-- Время создания: Май 20 2025 г., 16:29
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
(33, 'комментарий', '2025-03-28 14:56:36', 10, 10, 0),
(34, 'Интересное голосование', '2025-04-18 11:26:57', 9, 15, 0),
(35, 'Мне не нравится', '2025-04-18 11:37:33', 10, 15, 0),
(36, 'эх', '2025-04-21 09:38:14', 10, 5, 0),
(37, 'Тут накрутка', '2025-04-26 11:02:55', 13, 17, 0),
(38, 'Тут точно накрутка', '2025-04-26 11:05:15', 10, 17, 0),
(39, 'Да нет тут накрутки', '2025-04-26 11:06:03', 9, 17, 0),
(40, 'Комментарий для записки диплома', '2025-05-19 10:35:07', 37, 15, 0);

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
(5, 10, 20, 'declined', '2025-03-20 09:33:56'),
(6, 10, 29, 'active', '2025-04-08 17:57:27');

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
(2, 7, 1, 'declined', '2025-03-28 13:20:58'),
(4, 7, 6, 'active', '2025-04-11 12:03:42');

-- --------------------------------------------------------

--
-- Структура таблицы `invitations`
--

CREATE TABLE `invitations` (
  `id` int NOT NULL,
  `invitation_date` datetime NOT NULL,
  `team_id` int NOT NULL,
  `user_id` int NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT (_utf8mb4'A')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `invitations`
--

INSERT INTO `invitations` (`id`, `invitation_date`, `team_id`, `user_id`, `status`) VALUES
(2, '2025-04-07 00:00:00', 3, 1, 'A'),
(3, '2025-04-08 17:55:59', 2, 10, 'C'),
(4, '2025-04-08 18:19:10', 3, 10, 'R'),
(5, '2025-04-08 20:58:22', 5, 7, 'C'),
(6, '2025-05-07 12:48:09', 4, 12, 'A'),
(7, '2025-05-08 19:37:37', 7, 17, 'C'),
(8, '2025-05-18 20:31:16', 2, 37, 'C');

-- --------------------------------------------------------

--
-- Структура таблицы `membership`
--

CREATE TABLE `membership` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `team_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `membership`
--

INSERT INTO `membership` (`id`, `user_id`, `team_id`) VALUES
(1, 7, 2),
(2, 7, 3),
(3, 7, 4),
(4, 10, 2),
(5, 10, 5),
(6, 7, 5),
(7, 9, 6),
(8, 29, 7),
(9, 17, 7),
(10, 37, 2);

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
-- Структура таблицы `tags`
--

CREATE TABLE `tags` (
  `id` int NOT NULL,
  `name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `teams`
--

CREATE TABLE `teams` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `creation_date` date NOT NULL,
  `creator_id` int NOT NULL,
  `private` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `teams`
--

INSERT INTO `teams` (`id`, `name`, `creation_date`, `creator_id`, `private`) VALUES
(1, 'ФРЭ', '2021-02-12', 1, 0),
(2, 'Завод', '2025-04-01', 7, 1),
(3, 'Завод 2', '2025-04-01', 7, 0),
(4, 'Не завод', '2025-04-01', 7, 1),
(5, 'ПЭ', '2025-04-08', 10, 1),
(6, 'АСОИ', '2025-04-18', 9, 1),
(7, 'Заславские парни', '2025-05-08', 29, 0);

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
  `last_online` datetime DEFAULT NULL,
  `profile_private` tinyint(1) DEFAULT '0',
  `language` enum('ru','en') NOT NULL DEFAULT 'ru',
  `theme` enum('light','dark') NOT NULL DEFAULT 'light'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `lastname`, `firstname`, `role`, `ban`, `address`, `phone_number`, `last_online`, `profile_private`, `language`, `theme`) VALUES
(1, 'miheynikita@gmail.com', '$2b$10$9ILgGG2LMmpPytkdkdGtBuuf3/KRWKaSnviRo.6V6/oNVL15Pct9C', 'Михейка', 'Никита', 'U', 0, NULL, '+79995556677', NULL, 0, 'ru', 'light'),
(2, 'oleg@wasd.ru', '$2b$10$ywBk8Ym2Kp6FcNlumopdQeaW4j3k2jUbE6hKK0UqvpRVxBcljsWVu', 'Монгол', 'Олег', 'U', 0, NULL, NULL, '2025-04-01 00:05:32', 0, 'ru', 'light'),
(3, 'a@a.com', '$2b$10$2G5xNSQZLeViZiQJQ7NKPuLETorVKUnRnBmZaOC7StDCe51ihO7bS', 'A', 'A', 'U', 0, NULL, NULL, NULL, 0, 'ru', 'light'),
(4, 'pasha@mail.ru', '$2b$10$CX1qpYoKTKU9k/uap.Fsm.0aSpdN5isrQcZPdCdGgUgL1ns7zevVC', 'Дуров', 'Павел', 'U', 0, NULL, NULL, '2025-04-01 00:05:19', 0, 'ru', 'light'),
(5, 'irina@gmail.com', '$2b$10$CWCAwctVp5IRpuAzXIPfC.UD/m.Usjo9a1vzvGeHhYNTnH0lieCii', 'Гращенко', 'Ирина', 'U', 1, NULL, NULL, NULL, 0, 'ru', 'light'),
(6, 'admin@admin.com', '$2b$10$Y4leV7b.fr3f3Urk/Nf4repgm92mAPK1tu/kOaBEApgr7Kd1mweTm', 'Пич', 'Джо', 'A', 0, 'Калифорния', '+3639486394', '2025-05-19 20:57:32', 0, 'ru', 'light'),
(7, 'prime@gmail.com', '$2b$10$jFb.C2BmyKplWiaTpV/GC.AsWarThgI9OUomxt6LH0qV/XLjNdtAG', 'Прайм', 'Оптимус', 'M', 0, 'Кибертрон', '+1234556856', '2025-05-20 15:32:39', 1, 'ru', 'light'),
(8, 'qwertyuiop@qwertyuiop.com', '$2b$10$aXJ725U/YDi6H7UJk/wQnuKqyI9AtWP3LCW20.uYDcKUY0TbQqK3y', 'qwertyuiop', 'qwertyuiop', 'U', 0, NULL, NULL, NULL, 0, 'ru', 'light'),
(9, 'kirill@mail.ru', '$2b$10$akNz7DUyuRXcNxf7n0IRUuiCX7TqJTBjiSeVhsr73AKbeMiRFqVka', 'Митько', 'Кирилл', 'U', 0, 'Молодечно', '+48825823749', '2025-04-26 14:05:48', 1, 'ru', 'light'),
(10, 'roma@mail.ru', '$2b$10$JLzy3S6pNTg8JiqKsVN8geBlPG/cceP4kPGrMGguMUY.rvM9sk572', 'Борисюк', 'Роман', 'U', 0, 'Брест', '+375291234567', '2025-04-26 14:05:04', 0, 'ru', 'light'),
(11, 'b@b.bbb', '$2b$10$25J2uez1yOySjhHFqr1EyuIPjLZWzz200164o5nphKaAkwNHZlh0G', 'Bbb', 'Bbb', 'U', 0, NULL, NULL, NULL, 0, 'ru', 'light'),
(12, 'q@q.qqq', '$2b$10$3tuNOY2APnxrxMuLTtVjzOXa13H4P6OjLs7jaJRLRa.4h/gzX63W6', 'Qqq', 'Qqq', 'U', 0, 'Берлин', '+124346363', '2025-05-07 12:48:18', 0, 'ru', 'light'),
(13, 'w@w.www', '$2b$10$s/xA1NuntcDKRCEb3KwpY.jEfy49oAaIZRtlrfumiyXEUzJ7O9XF6', 'Www', 'Www', 'U', 0, 'Москва', '+7349238492', '2025-04-26 14:02:44', 0, 'ru', 'light'),
(14, 'e@e.eee', '$2b$10$U/hKM91224xQPgwepXHYXuX6znDdxAyjLxqkeG2sW80dQ6BxiBn1y', 'Eee', 'Eee', 'U', 0, 'Смолевичи', '+46745634', '2025-04-26 14:03:10', 0, 'ru', 'light'),
(15, 'r@r.rrr', '$2b$10$D.Vmf6gN4tIPgD3iM6NL0uy3.BrKCoRSY8SzpXCzVR3wmHpN1otYe', 'Rrr', 'Rrr', 'U', 0, 'Калинковичи', '+4264576875', '2025-04-26 14:03:41', 0, 'ru', 'light'),
(16, 't@t.ttt', '$2b$10$pnPuT0WWmugf0hnDpY95qe/bZY71BvcZYRX394zmBvLFiCNZRuDSy', 'Ttt', 'Ttt', 'U', 0, 'Тамбов', '+7239482394', '2025-04-26 14:04:34', 0, 'ru', 'light'),
(17, 'y@y.yyy', '$2b$10$opMSJtGGB1GTXm3fCZTQOuw.jFbLTv4m48tiUCizrsNCLZmau2JnG', 'Yyy', 'Yyy', 'U', 0, 'Уручье', '+3752309423', '2025-05-08 19:37:50', 0, 'ru', 'light'),
(18, 'u@u.uuu', '$2b$10$WJ8vNzIT5w4BoM4I8dJQ4eRtqLvkJ3iAKIxSCBS2CNgvzo86.s0IS', 'Uuu', 'Uuu', 'U', 0, 'Ижевск', '+702394203', '2025-04-26 14:08:36', 0, 'ru', 'light'),
(19, 'i@i.iii', '$2b$10$TtFLhHlCxehyGCM93ZnCsOCnvPlqCxea6rhO9YLkIXP3CR7JhwXqS', 'Iii', 'Iii', 'U', 0, 'Ислочь', '+375023423', '2025-04-26 14:30:14', 0, 'ru', 'light'),
(20, 'a@a.aaa', '$2b$10$ZaRutzbNHXW8h5QdCNtx/OURf1l2j3QEsituNOmKTdESZPBtGzW4C', 'Aaa', 'Aaa', 'U', 0, NULL, NULL, '2025-04-26 16:05:57', 0, 'ru', 'light'),
(21, 's@s.sss', '$2b$10$SHBcdcykWqioDGApOp4GReYBCOmggUYhfz1H3WsyQ/rpUH41imzTu', 'Sss', 'Sss', 'U', 0, NULL, NULL, '2025-04-26 16:06:15', 0, 'ru', 'light'),
(22, 'd@d.ddd', '$2b$10$ym.rKWacB6UmU4axiTJQ0.YtOilBW9aDrVcD9eojyXmk4kXKtImEO', 'Ddd', 'Ddd', 'U', 0, NULL, NULL, '2025-04-26 16:06:29', 0, 'ru', 'light'),
(23, 'f@f.fff', '$2b$10$Vzd91c6GA3LMsKPAXxKJo.EOrLLJQj4zDjGgRb4k1e56sTGjYzbdS', 'Fff', 'Fff', 'U', 0, NULL, NULL, '2025-04-26 16:06:45', 0, 'ru', 'light'),
(24, 'g@g.ggg', '$2b$10$Q/Be5du4PqP2XLVHp2/ED.ycG9swmyIGoKciy8YyG6bOMdmWhzkD.', 'Ggg', 'Ggg', 'U', 0, NULL, NULL, '2025-04-26 16:07:00', 0, 'ru', 'light'),
(25, 'h@h.hhh', '$2b$10$sSUgiZhm/2wKvi7B2dz20e/EZHNdSz5HdCWhkWHpGrDDC9CHcyEUe', 'Hhh', 'Hhh', 'U', 0, NULL, NULL, '2025-04-26 16:07:19', 0, 'ru', 'light'),
(26, 'j@j.jjj', '$2b$10$iNIvFysWDIfl10d.8z5Yk.P.WGXmAg/HhMcYGumiz6bF6yKv9GBfu', 'Jjj', 'Jjj', 'U', 0, NULL, NULL, NULL, 0, 'ru', 'light'),
(27, 'k@k.kkk', '$2b$10$9FX8xMRfcgOc/PQ0Q2CJRek5wlk6cbvnjbSWrjasT04cFQobrC83y', 'Kkk', 'Kkk', 'U', 0, NULL, NULL, NULL, 0, 'ru', 'light'),
(28, 'l@l.lll', '$2b$10$e/teHlCKSx6IRibG1.eaMuaTlwBJjWxey2gty2pFFMqp7IUUjb1d.', 'Lll', 'Lll', 'U', 0, NULL, NULL, NULL, 0, 'ru', 'light'),
(29, 'z@z.zzz', '$2b$10$.MMnNlsOX3G73S2Z3W321O0iXxW3wPVnE88J/SWJVEF7eSiTeJxMm', 'Zzz', 'Zzz', 'U', 0, 'Заславль', '+245348573', '2025-05-08 20:10:47', 0, 'ru', 'light'),
(30, 'x@x.xxx', '$2b$10$dZ8R9H2A75cwA1Emkr8RuO3sUjrJ258wehKGm8VGFFWU5KpxCVfzW', 'Xxx', 'Xxx', 'U', 0, NULL, NULL, NULL, 0, 'ru', 'light'),
(31, 'c@c.ccc', '$2b$10$FZ1c13O5qu4Gieqhp3i89uzy3oZGub7Ut5V5ZecD0T9b53MuJutSi', 'Ccc', 'Ccc', 'U', 0, NULL, NULL, NULL, 0, 'ru', 'light'),
(32, 'v@v.vvv', '$2b$10$bYHucNcztn2GERqOP/usrOl4ze2ceOopAzVcUw2plSXw9l1TVpyJS', 'Vvv', 'Vvv', 'U', 0, NULL, NULL, NULL, 0, 'ru', 'light'),
(33, 'o@o.ooo', '$2b$10$b2/4x0wHZeGV1Hxs7k4sx.w.lrQLDnkuAj2xVG8gkFESmB79fN6WO', 'Ooo', 'Ooo', 'U', 0, NULL, NULL, NULL, 0, 'ru', 'light'),
(34, 'p@p.ppp', '$2b$10$jSs7GnrwcgSK7XGPVjXm8.oadoT2Vne62Ceg1OXVN2TS8hg1cRn5.', 'Ppp', 'Ppp', 'U', 0, NULL, NULL, NULL, 0, 'ru', 'light'),
(35, 'n@n.nnn', '$2b$10$66QuKNT/g2fBNY8MQbgNXOz1CY7UIYI1Cia/FSbsRkNCB9R6CCA8W', 'Nnn', 'Nnn', 'U', 0, NULL, NULL, NULL, 0, 'ru', 'light'),
(36, 'm@m.mmm', '$2b$10$6.wu0B01ABK7ROx9aI1RnuUyv8FXjxERl.l8EreuCEmdgrCaMaTHm', 'Mmm', 'Mmm', 'U', 0, NULL, NULL, NULL, 0, 'ru', 'light'),
(37, 'den@ddd.ddd', '$2b$10$czk47SQ8RwvsGY79M2p9UONfPIoxtrISVwH1HvjhWFkwUT5l8XAmm', 'Ден', 'Тихий', 'U', 0, 'Нью-Йорк', '+49573495', '2025-05-19 12:38:40', 0, 'ru', 'light');

-- --------------------------------------------------------

--
-- Структура таблицы `user_search_history`
--

CREATE TABLE `user_search_history` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `query` varchar(255) NOT NULL,
  `searched_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `user_search_history`
--

INSERT INTO `user_search_history` (`id`, `user_id`, `query`, `searched_at`) VALUES
(2, 7, 'язык', '2025-05-20 16:28:35');

-- --------------------------------------------------------

--
-- Структура таблицы `votes`
--

CREATE TABLE `votes` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `round` int NOT NULL DEFAULT '1',
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `anonymous` tinyint(1) DEFAULT NULL,
  `multiple` tinyint(1) NOT NULL DEFAULT '0',
  `removed` tinyint(1) DEFAULT '0',
  `team_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `votes`
--

INSERT INTO `votes` (`id`, `title`, `round`, `start_date`, `end_date`, `status`, `user_id`, `anonymous`, `multiple`, `removed`, `team_id`) VALUES
(1, 'Цвет настроения?', 1, '2025-02-13 22:24:49', NULL, 'A', 1, 0, 0, 0, NULL),
(2, 'Топ 1 цифра?', 1, '2025-02-13 22:32:29', NULL, 'A', 1, 1, 0, 0, NULL),
(3, 'Лучшая пора года?', 1, '2025-03-05 17:57:38', NULL, 'A', 3, 0, 0, 0, NULL),
(4, 'Какую машину купить?', 1, '2025-03-05 18:56:31', NULL, 'A', 3, 0, 0, 0, NULL),
(5, 'Конфета', 1, '2025-03-05 18:57:52', NULL, 'A', 3, 0, 0, 0, NULL),
(6, 'Самая крутая планета?', 1, '2025-03-06 21:15:34', NULL, 'A', 5, 0, 0, 0, NULL),
(7, 'Какой город?', 1, '2025-03-11 15:20:17', NULL, 'A', 7, 0, 0, 0, NULL),
(10, 'Несколько ответов', 1, '2025-03-28 17:45:39', '2025-04-16 20:05:41', 'N', 7, 0, 1, 0, NULL),
(11, 'несколько ответов2', 1, '2025-03-28 18:09:11', NULL, 'A', 10, 0, 1, 0, NULL),
(12, 'Всё сразу', 1, '2025-04-09 16:38:12', '2025-04-14 19:47:19', 'N', 7, 1, 1, 0, 4),
(13, 'Несколько ответов 2', 1, '2025-04-16 20:09:11', NULL, 'A', 7, 0, 1, 0, NULL),
(14, 'Простое', 1, '2025-04-16 21:16:49', NULL, 'A', 10, 0, 0, 0, NULL),
(15, 'Несколько 3', 1, '2025-04-18 14:19:03', NULL, 'A', 7, 0, 1, 0, NULL),
(16, 'Временное', 1, '2025-04-21 12:26:41', '2025-04-21 09:27:00', 'A', 7, 0, 0, 0, NULL),
(17, 'Вкус ТОПа?', 1, '2025-04-26 13:58:25', NULL, 'A', 7, 0, 0, 0, NULL),
(18, 'Голосование с накруткой', 1, '2025-05-07 13:43:14', '2025-05-13 14:23:45', 'N', 7, 0, 0, 0, NULL),
(19, 'Голосование для заславских парней', 1, '2025-05-08 19:37:05', NULL, 'A', 29, 0, 0, 0, 7),
(20, 'Вкус ТОПа?', 2, '2025-05-13 16:02:48', NULL, 'A', 7, 0, 0, 0, NULL),
(21, 'Какой язык выбрать?', 1, '2025-05-18 23:50:57', NULL, 'A', 37, 0, 0, 0, NULL),
(22, 'Что взять попить?', 1, '2025-05-18 23:52:14', NULL, 'A', 37, 0, 0, 0, NULL);

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
(22, 7, 18, '2025-03-24 15:35:41'),
(23, 10, 56, '2025-04-16 21:19:45'),
(24, 7, 58, '2025-04-18 14:19:15'),
(25, 7, 61, '2025-04-13 14:19:15'),
(26, 10, 61, '2025-04-18 14:20:05'),
(27, 10, 60, '2025-04-18 14:20:05'),
(28, 9, 60, '2025-04-18 14:26:45'),
(29, 9, 61, '2025-04-18 14:26:45'),
(30, 10, 21, '2025-04-18 15:16:27'),
(31, 10, 24, '2025-04-21 12:38:04'),
(32, 7, 34, '2025-04-21 21:09:04'),
(33, 15, 1, '2025-04-21 21:12:44'),
(34, 12, 2, '2025-04-21 21:13:02'),
(35, 13, 3, '2025-04-21 21:13:25'),
(36, 14, 3, '2025-04-21 21:13:51'),
(37, 15, 59, '2025-04-25 12:14:50'),
(38, 13, 59, '2025-04-25 19:24:26'),
(39, 13, 60, '2025-04-25 19:24:26'),
(40, 13, 61, '2025-04-25 19:24:26'),
(41, 7, 65, '2025-04-26 13:58:36'),
(42, 12, 66, '2025-04-26 14:02:30'),
(43, 13, 67, '2025-04-26 14:03:00'),
(44, 14, 68, '2025-04-26 14:03:26'),
(45, 15, 69, '2025-04-26 14:04:00'),
(46, 16, 70, '2025-04-26 14:04:49'),
(47, 10, 69, '2025-04-26 14:05:22'),
(48, 9, 66, '2025-04-26 14:06:23'),
(49, 17, 69, '2025-04-26 14:07:17'),
(50, 18, 68, '2025-04-26 14:09:04'),
(51, 19, 69, '2025-04-26 14:24:09'),
(52, 19, 58, '2025-04-26 14:30:25'),
(53, 19, 59, '2025-04-26 14:30:25'),
(54, 19, 60, '2025-04-26 14:30:25'),
(55, 19, 61, '2025-04-26 14:30:25'),
(56, 20, 70, '2025-04-26 16:06:06'),
(57, 21, 70, '2025-04-26 16:06:21'),
(58, 22, 70, '2025-04-26 16:06:36'),
(59, 23, 70, '2025-04-26 16:06:51'),
(60, 24, 70, '2025-04-26 16:07:06'),
(61, 25, 70, '2025-04-26 16:07:25'),
(62, 1, 71, '2025-05-07 13:44:00'),
(63, 2, 72, '2025-05-07 13:45:21'),
(64, 3, 74, '2025-05-07 13:46:35'),
(65, 4, 71, '2025-05-07 13:47:50'),
(66, 5, 72, '2025-05-07 13:49:00'),
(67, 6, 71, '2025-05-07 13:50:42'),
(68, 7, 74, '2025-05-07 13:52:05'),
(69, 8, 71, '2025-05-07 13:53:37'),
(70, 9, 72, '2025-05-07 13:55:12'),
(71, 10, 74, '2025-05-07 13:56:55'),
(72, 11, 72, '2025-05-07 13:58:22'),
(73, 12, 73, '2025-05-07 14:00:00'),
(74, 13, 73, '2025-05-07 14:00:01'),
(75, 14, 73, '2025-05-07 14:00:02'),
(76, 15, 73, '2025-05-07 14:00:03'),
(77, 16, 73, '2025-05-07 14:00:04'),
(78, 17, 73, '2025-05-07 14:00:05'),
(79, 18, 73, '2025-05-07 14:00:06'),
(80, 19, 73, '2025-05-07 14:00:07'),
(81, 20, 73, '2025-05-07 14:00:08'),
(82, 21, 73, '2025-05-07 14:00:09'),
(83, 22, 73, '2025-05-07 14:00:10'),
(84, 23, 73, '2025-05-07 14:00:11'),
(85, 24, 73, '2025-05-07 14:00:12'),
(86, 25, 73, '2025-05-07 14:00:13'),
(87, 37, 78, '2025-05-18 20:30:23'),
(88, 37, 60, '2025-05-19 13:18:18'),
(89, 37, 61, '2025-05-19 13:18:18');

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
(41, 10, '234'),
(42, 10, 'авпр'),
(43, 10, 'лпьтимс'),
(44, 11, '1'),
(45, 11, '2'),
(46, 11, '3'),
(47, 11, '4'),
(48, 11, '5'),
(49, 12, '1'),
(50, 12, '3'),
(51, 12, '4'),
(52, 13, '1'),
(53, 13, '2'),
(54, 13, '3'),
(55, 14, '11'),
(56, 14, '22'),
(57, 14, '33'),
(58, 15, '111'),
(59, 15, '222'),
(60, 15, '333'),
(61, 15, '444'),
(62, 16, '1234'),
(63, 16, '12345'),
(64, 16, '123456'),
(65, 17, 'Клубника'),
(66, 17, 'Банан'),
(67, 17, 'Соленая карамель'),
(68, 17, 'Черника'),
(69, 17, 'Попкорн'),
(70, 17, 'Шоколад'),
(71, 18, 'Обычный вариант'),
(72, 18, 'Обычный вариант 2'),
(73, 18, 'Вариант с накруткой'),
(74, 18, 'Обычный вариант 3'),
(75, 19, 'ЕЕЕ'),
(76, 19, 'РОООК'),
(77, 20, 'Шоколад'),
(78, 20, 'Попкорн'),
(79, 21, 'Python'),
(80, 21, 'C++'),
(81, 21, 'Java'),
(82, 21, 'Русский'),
(83, 22, 'Пепси'),
(84, 22, 'Брепси'),
(85, 22, 'Колу');

-- --------------------------------------------------------

--
-- Структура таблицы `vote_tags`
--

CREATE TABLE `vote_tags` (
  `vote_id` int NOT NULL,
  `tag_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
-- Индексы таблицы `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

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
-- Индексы таблицы `user_search_history`
--
ALTER TABLE `user_search_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_vote_team` (`team_id`);

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
  ADD KEY `vote_options_ibfk_1` (`vote_id`);

--
-- Индексы таблицы `vote_tags`
--
ALTER TABLE `vote_tags`
  ADD PRIMARY KEY (`vote_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT для таблицы `complaints_comments`
--
ALTER TABLE `complaints_comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `complaints_votes`
--
ALTER TABLE `complaints_votes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `invitations`
--
ALTER TABLE `invitations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `membership`
--
ALTER TABLE `membership`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT для таблицы `user_search_history`
--
ALTER TABLE `user_search_history`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT для таблицы `votes_cast`
--
ALTER TABLE `votes_cast`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT для таблицы `vote_options`
--
ALTER TABLE `vote_options`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

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
-- Ограничения внешнего ключа таблицы `user_search_history`
--
ALTER TABLE `user_search_history`
  ADD CONSTRAINT `user_search_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `fk_vote_team` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`),
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
  ADD CONSTRAINT `vote_options_ibfk_1` FOREIGN KEY (`vote_id`) REFERENCES `votes` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `vote_tags`
--
ALTER TABLE `vote_tags`
  ADD CONSTRAINT `vote_tags_ibfk_1` FOREIGN KEY (`vote_id`) REFERENCES `votes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vote_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

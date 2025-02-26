CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    lastname VARCHAR(64) NOT NULL DEFAULT "",
    firstname VARCHAR(64) NOT NULL DEFAULT "",
    role VARCHAR(1) NOT NULL DEFAULT 'U'
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    vote_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vote_id) REFERENCES votes(id) ON DELETE CASCADE
);

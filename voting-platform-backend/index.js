const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const voteRoutes = require('./routes/voteRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const complaintsRoutes = require('./routes/complaintsRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 

const corsOptions = {
    origin: 'http://localhost:3001',  
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/auth', authRoutes);
app.use('/votes', voteRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);
app.use('/complaints', complaintsRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});



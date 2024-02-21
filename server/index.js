import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';


dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
app.use(express.json());
app.use(cookieParser());

app.listen(3005, () => {
    console.log('Hello World!!');
});

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log('DB Connected');
})
.catch((err) => {
    console.log(err);
})

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({ 
        message,
        success: false,
        statusCode,
    })
});
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';

dotenv.config();
const app = express();
app.use(express.json());

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
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
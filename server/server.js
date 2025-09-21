import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js'
import userRoute from './routes/user.routes.js'
import fileRoute from './routes/file.routes.js'
import cors from 'cors'
import fileUpload from 'express-fileupload';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigin = ["http://localhost:5173", "https://cloudesk.vercel.app"];
app.use(cors({
    origin: allowedOrigin,
    credentials: true
}))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

app.get('/api/health', (req, res) => {
  res.json({ status: 'active' });
});
app.use('/api/auth', userRoute);
app.use('/api/files', fileRoute);


const PORT = process.env.PORT;
app.listen(PORT, () => { console.log(`Cloudesk server stareted On http://localhost:${PORT}`) });
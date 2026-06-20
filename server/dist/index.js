import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import router from './routes.js';
import { runMigrations } from './migrations.js';
dotenv.config();
const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 4000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
const io = new Server(server, {
    cors: {
        origin: FRONTEND_ORIGIN,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});
// Share Socket.io instance with Express request handlers
app.set('io', io);
app.use(helmet({
    crossOriginResourcePolicy: false // Allows loading local dev assets in the browser
}));
app.use(cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(router);
io.on('connection', (socket) => {
    socket.on('join', (username) => {
        const normalized = username.trim().toLowerCase();
        socket.join(normalized);
        console.log(`Socket ${socket.id} joined room for user: ${normalized}`);
    });
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});
async function start() {
    try {
        await runMigrations();
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
void start();

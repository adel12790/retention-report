import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import retention from './routes/retentionRoute';

// import env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? '3000';

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
    res.json({
        endpoints: {
            retention: '/api/retention?referenceMonth=YYYY-MM&monthsToTrack=3',
        },
        message: 'Salon Retention Report API',
        version: '1.0.0',
    });
});

// Routes
app.use('/api/retention', retention);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
        success: false,
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        success: false,
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

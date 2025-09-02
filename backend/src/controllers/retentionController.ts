import { Request, Response } from 'express';

import { RetentionService } from '../services/retentionService';
import { isValidDate } from '../utils/dateHelper';

export class RetentionController {
    private retentionService: RetentionService;

    constructor(retentionService: RetentionService) {
        this.retentionService = retentionService;
    }

    async getRetentionReport(req: Request, res: Response) {
        try {
            const { monthsToTrack, referenceMonth } = req.query;
            if (!referenceMonth || typeof referenceMonth !== 'string') {
                return res.status(400).json({
                    error: 'Reference month is required in YYYY-MM format',
                    success: false,
                });
            }

            if (!isValidDate(referenceMonth)) {
                return res.status(400).json({
                    error: 'Reference month is not a valid date',
                    success: false,
                });
            }

            if (monthsToTrack && typeof monthsToTrack !== 'string') {
                return res.status(400).json({
                    error: 'Months to track is required in number format',
                    success: false,
                });
            }

            if (monthsToTrack && parseInt(monthsToTrack) > 12) {
                return res.status(400).json({
                    error: 'Months to track must be at most 12',
                    success: false,
                });
            }

            const monthsNum = monthsToTrack ? parseInt(monthsToTrack) : 3;

            const report = await this.retentionService.calculateRetentionReport(
                referenceMonth,
                monthsNum
            );
            res.json({
                data: report,
                success: true,
            });
        } catch (e) {
            console.error(e);
            return res
                .status(500)
                .json({ error: 'Internal server error', message: e as string, success: false });
        }
    }
}

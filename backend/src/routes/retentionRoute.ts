import express from 'express';

import { RetentionController } from '../controllers/retentionController';
import { RetentionRepository } from '../repositories/retentionRepository';
import { RetentionService } from '../services/retentionService';

const router = express.Router();

const retentionRepo = new RetentionRepository();
const retentionService = new RetentionService(retentionRepo);
const retentionController = new RetentionController(retentionService);

router.get('/', retentionController.getRetentionReport.bind(retentionController));

export default router;

import express from 'express';
const router = express.Router();
import {createNt} from '../controllers/nationalTeamsControllers';
import {authGuard, adminGuard} from '../middleware/authMiddleware';
router.post("/", authGuard, adminGuard, createNt);

export default router;
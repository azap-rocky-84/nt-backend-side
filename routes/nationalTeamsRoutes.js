import express from 'express';
const router = express.Router();
import {createNt, deleteNt, getAllNt, getNt, updateNt} from '../controllers/nationalTeamsControllers';
import {authGuard, adminGuard} from '../middleware/authMiddleware';
router.route("/").post(authGuard, adminGuard, createNt).get(getAllNt);
router.route("/:fifaCode").put(authGuard, adminGuard, updateNt).delete(authGuard, adminGuard, deleteNt).get(getNt);
export default router;
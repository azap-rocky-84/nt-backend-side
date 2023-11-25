import express from "express";
const router = express.Router();
import {
  createPostCategory,
  getAllPostCategories,
  updatePostCategory,
  deletePostCategory,
} from "../controllers/postCategoriesControllers";
import { adminGuard, authGuard } from "../middleware/authMiddleware";

router
  .route("/")
  .post(authGuard, adminGuard, createPostCategory)
  .get(getAllPostCategories);

router
  .route("/:postCategoryid")
  .put(authGuard, adminGuard, updatePostCategory)
  .delete(authGuard, adminGuard, deletePostCategory);
export default router;

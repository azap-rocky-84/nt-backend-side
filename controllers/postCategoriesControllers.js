import PostCategories from "../models/PostCategories";
import Post from "../models/Post";
const createPostCategory = async (req, res, next) => {
  try {
    const { title } = req.body;
    const postCategory = await PostCategories.findOne({ title });
    if (postCategory) {
      const error = new Error("La categoria è già stata creata");
      return next(error);
    }
    const newPostCategory = new PostCategories({
      title,
    });
    const savedPostCategory = await newPostCategory.save();
    return res.status(201).json(savedPostCategory);
  } catch (error) {
    next(error);
  }
};

const getAllPostCategories = async (req, res, next) => {
  try {
    const postCategories = await PostCategories.find({});
    return res.json(postCategories);
  } catch (error) {
    next(error);
  }
};

const updatePostCategory = async (req, res, next) => {
  try {
    const { title } = req.body;
    const postCategory = await PostCategories.findByIdAndUpdate(
      req.params.postCategoryid,
      {
        title,
      },
      {
        new: true,
      }
    );
    if (!postCategory) {
      const error = new Error("Categoria non trovata");
      return next(error);
    }
    return res.json(postCategory);
  } catch (error) {
    next(error);
  }
};

const deletePostCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.postCategoryid;
    await Post.updateMany(
      { categories: { $in: [categoryId] } },
      { $pull: { categories: categoryId } }
    );
    await PostCategories.deleteOne({ _id: categoryId });
    res.send({
      message: "La categoria è stata eliminata con successo",
    });
  } catch (error) {
    next(error);
  }
};

export {
  createPostCategory,
  getAllPostCategories,
  updatePostCategory,
  deletePostCategory,
};

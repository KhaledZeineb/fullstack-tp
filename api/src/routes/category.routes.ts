
import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/category.service.js";
import { validate } from "../middlewares/validate.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    res.json(await getAllCategories());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const category = await getCategoryById(Number(req.params.id));

    if (!category) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.post("/", validate(createCategorySchema), async (req, res, next) => {
  try {
    const category = await createCategory(req.body.name);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", validate(updateCategorySchema), async (req, res, next) => {
  try {
    const category = await updateCategory(
      Number(req.params.id),
      req.body.name,
    );
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await deleteCategory(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;


import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.service.js";
import { validate } from "../middlewares/validate.js";
import {
  idParam,
  listQuery,
  productBody,
  productPatch,
} from "../schemas/product.schema.js";

const router = Router();

// GET /api/products?limit=12&skip=0&q=date&category=beauty
router.get("/", validate(listQuery, "query"), async (_req, res, next) => {
  try {
    const query = res.locals.query;
    const result = await getAllProducts(query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET /api/products/1
router.get("/:id", validate(idParam, "params"), async (_req, res, next) => {
  try {
    const { id } = res.locals.params;
    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
});

// POST /api/products
router.post("/", validate(productBody), async (_req, res, next) => {
  try {
    const product = await createProduct(res.locals.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/products/1
router.patch(
  "/:id",
  validate(idParam, "params"),
  validate(productPatch),
  async (_req, res, next) => {
    try {
      const { id } = res.locals.params;
      const product = await updateProduct(id, res.locals.body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/products/1
router.delete("/:id", validate(idParam, "params"), async (_req, res, next) => {
  try {
    const { id } = res.locals.params;
    await deleteProduct(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;

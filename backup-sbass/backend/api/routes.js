import { Router } from "express";
import * as ShrimpTypeController from "./Controllers/ShrimpTypeController.js";
import * as OrderController from "./Controllers/OrderController.js";

const router = Router();

// Routes For Shrimp Types
router.get("/SType", ShrimpTypeController.getShrimpTypes);
router.post("/SType", ShrimpTypeController.addShrimpType);
router.get("/SType/:id", ShrimpTypeController.getShrimpType);
router.delete("/SType/:id", ShrimpTypeController.deleteShrimpType);
router.put("/SType/:id", ShrimpTypeController.updateShrimpType);
router.delete("/SType/", ShrimpTypeController.deleteAllShrimpTypes);

//Routes For Orders
router.get("/Order", OrderController.getOrders);
router.post("/Order", OrderController.addOrder);
router.get("/Order/:id", OrderController.getOrder);
router.delete("/Order/:id", OrderController.deleteOrder);
router.put("/Order/:id", OrderController.updateOrder);
router.delete("/Order/", OrderController.deleteAllOrders);

export default router;

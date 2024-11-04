import { Router } from "express";
import { PlatformController } from "../controllers/platform.controller";

const router = Router();
router.get('/', PlatformController.get);
router.get('/:platformId', PlatformController.get);
router.post('/', PlatformController.add);
router.put('/', PlatformController.edit);
router.delete('/', PlatformController.delete);

export default router;
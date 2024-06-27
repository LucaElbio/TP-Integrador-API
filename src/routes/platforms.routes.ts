import { Router } from "express";
import { PlatformController } from "../controllers/platform.controller";

const router = Router();

router.post('/', PlatformController.addOrEdit);
router.delete('/', PlatformController.delete);
router.get('/:platformId', PlatformController.get);

export default router;
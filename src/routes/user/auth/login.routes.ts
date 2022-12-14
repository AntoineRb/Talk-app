import { Router } from "express";

import loginPostController from "@/controllers/user/auth/login.post.controller";

const router = Router();

router.post('/login', async ( req, res ) => {
    await loginPostController( req, res );
});

export default router;
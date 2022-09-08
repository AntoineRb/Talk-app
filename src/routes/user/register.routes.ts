import { Router } from "express";
import registerPostController from "@/controllers/user/register/register.post.controller";

const router = Router();

router.post('/register', async ( req, res ) => {
    await registerPostController( req, res );
});

export default router;
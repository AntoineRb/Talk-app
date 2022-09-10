import { Router } from "express";
import registerPostController from "@/controllers/user/auth/register.post.controller";

const router = Router();

router.get('/register', async ( req, res ) => {
    return res.render('register');
});
router.post('/register', async ( req, res ) => {
    await registerPostController( req, res );
});


export default router;
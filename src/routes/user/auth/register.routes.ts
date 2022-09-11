import { Router } from "express";
import registerPostController from "@/controllers/user/auth/register.post.controller";
import redirectAuthUser from "@/middlewares/auth/trusted-client/redirect-client.middleware";

const router = Router();

router.get('/register', redirectAuthUser, async ( req, res ) => {
    return res.render('register');
});
router.post('/register', async ( req, res ) => {
    await registerPostController( req, res );
});


export default router;
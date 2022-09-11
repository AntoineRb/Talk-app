import { Router } from "express";
import redirectAuthUser from "@/middlewares/auth/trusted-client/redirect-client.middleware";

const router = Router();

router.get('/', redirectAuthUser,( req , res )  => {
    res.render('index')
})

export default router;
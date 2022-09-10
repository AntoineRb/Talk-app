import { Router } from "express";

import logoutGetController from "@/controllers/user/auth/logout.get.controller";

const router = Router();

router.get('/logout', ( req, res ) => {
    logoutGetController( req, res );
});

export default router;
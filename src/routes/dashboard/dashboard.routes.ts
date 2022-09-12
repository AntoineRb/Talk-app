import { Router } from "express";

import dashboardGetController from "@/controllers/dashboard/dashboard.get.controller";

const router = Router();

router.get( '/dashboard/:uname', async ( req, res ) => {
    await dashboardGetController( req, res );
});

export default router;
import { Router } from "express";

import roomPostController from "@/controllers/room/room.post.controller";
import roomGetController from "@/controllers/room/room.get.controller";

const router = Router();
// Create room view
router.get('/room/new', ( req, res ) => {
    res.render('auth-views/create-room');
});
// Get room view ( join room )
router.get('/room/:roomId', async ( req, res ) => {
    await roomGetController( req, res );
});
// ADD new room to database
router.post('/room', async ( req, res ) => {
    await roomPostController( req, res );
});
export default router;
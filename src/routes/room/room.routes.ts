import { Router } from "express";

import createRoomPostController from "@/controllers/room/create-room.post.controller";

const router = Router();

router.get('/room', ( req, res ) => {
    res.render('auth-views/create-room');
});

router.post('/room', async ( req, res ) => {
    await createRoomPostController( req, res );
});
export default router;
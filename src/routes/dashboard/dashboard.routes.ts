import { Router } from "express";

const router = Router();

router.get( '/dashboard/:uname', ( req, res ) => {
    const username = req.params.uname;
    return res.render( 'auth-views/dashboard', { 
        username
    });
});

export default router;
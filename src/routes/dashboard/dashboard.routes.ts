import { Router } from "express";

const router = Router();

router.get( '/dashboard?uname=:uname', ( req, res ) => {
    const username = req.params.uname;
    console.log( username )
    return res.render( 'auth-views/dashboard', { 
        username
    });
});

export default router;
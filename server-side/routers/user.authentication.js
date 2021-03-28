import express from 'express'
import Auth from "../controllers/authentication";
const AuthUserRouter = express.Router()

AuthUserRouter.post('/user/signin', Auth.login);
AuthUserRouter.get("/user/signout", Auth.logout);

export default AuthUserRouter;
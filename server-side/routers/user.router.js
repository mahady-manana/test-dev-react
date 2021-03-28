import express from "express";
import UserContrl from "../controllers/user.controller";
import authContrl from '../controllers/authentication';
const UserRouter = express.Router();

UserRouter.post("/user/add/", UserContrl.add);
UserRouter.get("/user/list/", UserContrl.list);
UserRouter.get("/user/one/:id", UserContrl.userOne);
UserRouter.put("/user/update/:id", UserContrl.update);
UserRouter.delete("/user/delete/:id", UserContrl.remove);

export default UserRouter;
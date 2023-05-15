import express from "express"
import controller from "./controller";
const router=express.Router();
const {getAll,create,update,deleteUser}=controller
router
.route('/')
.get(getAll)
.post(create)

// router
// .route('/:id')
// .get(get)
// .patch(update)
// .delete(delete)


export default router
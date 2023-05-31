const { registerUser, getUsers, updateUser, deleteUser, destroy } = require("./../controllers/userController")
const router = require("express").Router()

router
    .get("/", getUsers)
    .post("/register", registerUser)
    .put("/edit/:userId", updateUser)
    .delete("/remove/:userId", deleteUser)

module.exports = router
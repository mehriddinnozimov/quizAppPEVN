const express = require("express")
const router = express.Router()

const UserController = require("../controllers/user")
const auth = require("../middleware/auth")

router.put("/me", auth, UserController.update)
router.patch("/me", auth, UserController.updateAvatar)
router.delete("/me", auth, UserController.remove)

router.get("/", UserController.getAll)
router.get("/me", auth, UserController.getMe)
router.get("/me/logout", auth, UserController.logout)
router.get("/:userId", UserController.getById)

module.exports = router

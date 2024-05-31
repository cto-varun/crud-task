const router = require("express").Router();

const UserController = require("./user.controller");

router.route("/users").post(UserController.create).get(UserController.getAll);
router
	.route("/users/:id")
	.get(UserController.getOne)
	.delete(UserController.delete)
	.put(UserController.update);

module.exports = router;

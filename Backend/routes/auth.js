const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserprofile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser
} = require("../controllers/authController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserprofile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/admin/users").get(isAuthenticatedUser,authorizedRoles('admin'), allUsers);
router.route("/admin/users/:id")
.get(isAuthenticatedUser,authorizedRoles('admin'), getUserDetails)
.put(isAuthenticatedUser,authorizedRoles('admin'), updateUser)
.delete(isAuthenticatedUser,authorizedRoles('admin'), deleteUser)



module.exports = router;

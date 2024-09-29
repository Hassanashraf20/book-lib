const express = require ("express")

const {getUser,getLoggedUser,updateLoggedUserPassword,updateLoggedUserData,deactivateLoggedUser}= require("../controllers/userController")


const {changeUserPasswordValidator,updateLoggedUserValidator}= require("../utils/validator/userValidator")


const authController=require('../controllers/authController')


const router = express.Router()

router.use(authController.auth)

router.route('/getMe').get(getLoggedUser,getUser)
router.route('/changeMyPassword').put(changeUserPasswordValidator,updateLoggedUserPassword)
router.route('/updateMe').put(updateLoggedUserValidator,updateLoggedUserData)
router.route('/deactivateMe').delete(deactivateLoggedUser)


module.exports = router
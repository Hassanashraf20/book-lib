const express = require ("express")

const {getBOOKs,
       getBOOK,
       createBOOK,
       updateBOOK,
       deleteBOOK}= require("../controllers/bookController")



const authController=require('../controllers/authController')


const router = express.Router()


router.route("/").post(authController.auth,createBOOK)
router.route("/:id").put(authController.auth,updateBOOK)
router.route("/:id").delete(authController.auth,deleteBOOK)

router.route("/").get(getBOOKs)
router.route("/:id").get(getBOOK)


module.exports = router
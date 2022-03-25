const express = require("express")
const { companyCreate, getAllCompany, updateCompany, deleteCompany, getCompanyDetail } = require("../controller/companyController")

const router = express.Router()



router.route("/company").post(companyCreate)

router.route("/getall").get(getAllCompany)

router.route("/company/:id").get(getCompanyDetail)

router.route("/update/:id").put(updateCompany)

router.route("/delete/:id").delete(deleteCompany)




module.exports = router
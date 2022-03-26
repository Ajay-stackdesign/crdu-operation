const Company = require("../model/model")
const ApiFeature = require("../utils/apiFeature")


exports.companyCreate = async (req, res) => {
    try {

        const { name, description, email, contact, country, state } = req.body

        const company = await Company.create({
            name,
            description,
            contact,
            email,
            country,
            state,
        })

        // await company.save()

        // res.json(company)
        res.status(200).json({
            message: true,
            company
        })

        // res.status(200).json({
        //     success: true,
        //     company,
        // })

    } catch (err) {
        res.status(500).json(err)
    }
}

// exports.getAllCompany = async (req, res) => {
//     try {
//         // const companys = await Company.find()
//         const apiFeature = new ApiFeature(Company.find(), req.query).search()
//         conssole.log(apiFeature)
//         const companys = await apiFeature.query;
//         console.log(companys)
//         res.status(200).json({
//             success: true,
//             companys
//         })
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

exports.getAllCompany = (async (req, res, next) => {
    try {
        // return next(new ErrorHander("this is error", 404))
        // // const product = await Product.find()
        // return next(new ErrorHander("my Error", 500))
        const resultPerPage = 20
        const companysCount = await Company.countDocuments()
        const apiFeature = new ApiFeature(Company.find(), req.query)
            .search()
        // .pagination(resultPerPage)
        let companys = await apiFeature.query;
        let filteredcompanysCount = companys.length

        apiFeature.pagination(resultPerPage)

        companys = await apiFeature.query;

        res.status(200).json({
            success: true,
            companys,
            resultPerPage,
            companysCount,
            filteredcompanysCount,
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

exports.getCompanyDetail = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id)
        if (!company) {
            return res.status(500).json("Comapny Not Found")
        }

        res.status(200).json({
            success: true,
            company
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.updateCompany = async (req, res) => {
    try {
        let company = await Company.findById(req.params.id)

        if (!company) {
            return res.status(500).json({
                message: "Company not found"
            })
        }
        console.log(company)

        company = await Company.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            useFindAndModify: false,
            runValidators: true
        })
        console.log(company)

        res.status(200).json({
            success: true,
            company
        })
    } catch (error) {
        res.status(500).json(err)
    }
    // try {
    //     const company = await Company.findById(req.params.id)
    //     const name = req.body.name
    //     const description = req.body.description
    //     const contact = req.body.contact
    //     const email = req.body.email
    //     const country = req.body.country
    //     const state = req.body.state

    //     if (company) {
    //         company.name = name
    //         company.description = description
    //         company.contact = contact
    //         company.email = email
    //         company.country = country
    //         company.state = state
    //         const updateCompany = await product.save()

    //         res.json(updateCompany);
    //     } else {
    //         res.status(404);
    //         res.json({ message: "company not found" })
    //     }
    // } catch (err) {
    //     res.status(500).json(err)
    // }
}

exports.deleteCompany = async (req, res, next) => {
    try {
        let company = await Company.findById(req.params.id)

        if (!company) {
            return res.status(404).json("Company Not Found")
        }

        await company.remove()

        res.status(200).json({
            success: true,
        })
    } catch (err) {
        res.status(500).json(err)
    }
}
const express = require("express")
const { calculateEMIModel } = require("../Model/calculateEMI")
const calculateEMIRouter = express.Router()

calculateEMIRouter.post("/calculate", async (req, res) => {
    try {

        const calEMI = calculateEMIModel(req.body)
        await calEMI.save();
        res.status(200).send("successfully added data")
    } catch (err) {
        res.status(200).status({ err: err.message })
    }
})


calculateEMIRouter.get("/calculate", async (req, res) => {
    try {
        const calEMI = await calculateEMIModel.find()
        res.status(200).send({ calculatedEMI: calEMI })
    } catch (err) {
        res.status(200).status({ err: err.message })
    }
})


module.exports = { calculateEMIRouter }
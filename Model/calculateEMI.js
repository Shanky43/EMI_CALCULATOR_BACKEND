const { Schema, model } = require("mongoose")

const calculateEMISchema = Schema({
    calculatedEMI: { type: Number, require: true },
}, {
    versionKey: false
})

const calculateEMIModel = model("calculateEMI", calculateEMISchema);
module.exports = { calculateEMIModel }
const designation = require("../models/Designation.Models")
const logger = require('../utils/logger.utils')


exports.addDesig = async (req, res) => {
    try {
        await designation.create(req.body).then((data) => {
            res.status(200).send(data)
        })
    } catch (error) {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

        res.status(400).send(error)

    }
}
exports.FindAllDesignation = (req, res) => {
    try {
        designation.find().then((data) => {
            res.status(200).send(data)
        })

    } catch (error) {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

        res.status(400).send(error)

    }
}





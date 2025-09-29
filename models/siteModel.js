const mongoose = require('mongoose');
const Joi = require('joi');

const siteSchema = new mongoose.Schema({
    name: String,
    url: String,
    image: String,
    score: Number
});

exports.validateSite = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        url: Joi.string().min(5).max(200).required(),
        image: Joi.string().min(5).max(300).required(),
        score: Joi.number().min(0).max(10).required()
    });
    return schema.validate(data);
}

exports.SiteModel = mongoose.model('sites', siteSchema);

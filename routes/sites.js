const express = require('express');
const { SiteModel, validateSite } = require('../models/siteModel');
const router = express.Router();

// GET ALL
router.get('/', async (req, res) => {
    let perPage=Math.min(req.query.perPage,20)||4;
    let page=req.query.page||1;
    let short = req.query.short || "_id"
    try {
        const sites = await SiteModel.find({});
        res.json(sites);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET BY ID
router.get('/:id', async (req, res) => {
    try {
        const site = await SiteModel.findById(req.params.id);
        if (!site) return res.status(404).json({ error: 'Site not found' });
        res.json(site);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST
router.post('/', async (req, res) => {
    const { error } = validateSite(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const site = new SiteModel(req.body);
        await site.save();
        res.status(201).json(site);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT
router.put('/:id', async (req, res) => {
    const { error } = validateSite(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const site = await SiteModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!site) return res.status(404).json({ error: 'Site not found' });
        res.json(site);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const result = await SiteModel.deleteOne({ _id: req.params.id });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

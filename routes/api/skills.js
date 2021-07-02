const express = require('express');
const router = express.Router();
const { getDoc } = require('../../db/mongo')


router.get('/:skill', async(req, res) => {
    let data = await getDoc(req.params.skill)
    if (data) {
        res.json(data)
    } else {
        res.status(400).json({ msg: `No document found with the name of ${req.params.skill}` })
    }
})

module.exports = router;
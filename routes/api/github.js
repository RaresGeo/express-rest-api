const express = require('express')
const jsonfile = require('jsonfile')
const router = express.Router()

// Gets user
router.get('/user', (req, res) => {
    let user = jsonfile.readFileSync('./db/json/user.json')
    res.json(user)
})

// Gets all repos
router.get('/repos', (req, res) => {
    let repos = jsonfile.readFileSync('./db/json/repos.json')
    res.json(repos)
})


module.exports = router
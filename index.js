const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')
const getGithubData = require('./db/fetch')
const app = express()

require('dotenv').config()

app.use(cors())

const keepDynoAlive = () => {
    const url = process.env.app_url
    console.log(url)

    try {
        fetch(url)
            .then(res => console.log(`Pinged app, ${res.status}`))
            .catch(err => console.error(`Something went wrong, ${err}`));
    } catch (err) {
        console.error('Error occured: retrying...')
        setTimeout(keepDynoAlive, 10000);
    }
}

const refreshGithubData = () => {
    getGithubData(process.env.github_username)
    keepDynoAlive()

    setTimeout(refreshGithubData, 1000 * 60 * 5)
}

refreshGithubData()

app.use('/', require('./routes/api/'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Express server started on port ${PORT}`))
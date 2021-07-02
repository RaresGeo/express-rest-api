const fetch = require('node-fetch')
const jsonfile = require('jsonfile')

const getRepos = async(username) => {
    let response = await fetch(`https://api.github.com/users/${username}/repos?sort=update`)
    let data = await response.json()

    const file = './db/json/repos.json'
    jsonfile.writeFileSync(file, data, { spaces: 2 })
    console.log('Fetched repos.')
}

const getUser = async(username) => {
    let response = await fetch(`https://api.github.com/users/${username}`)
    let data = await response.json()

    const file = './db/json/user.json'
    jsonfile.writeFileSync(file, data, { spaces: 2 })
    console.log('Fetched user.')
}

const getData = (username) => {
    getRepos(username)
    getUser(username)
}

module.exports = getData
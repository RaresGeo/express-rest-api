const { MongoClient } = require('mongodb')

const uri = process.env.uri
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

let db
let skills

client.connect()
    .then(async client => {
        db = client.db('rest_api')
        skills = db.collection('skills')
        console.log("Mongo client instantiated")
    })

module.exports.getDoc = async(query) => {
    const filter = { "name": query }
    try {
        let document = await skills.findOne(filter)
        return document.list
    } catch (err) {
        console.log("No documents found with provided query")
    }
}
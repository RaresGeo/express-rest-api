const { MongoClient } = require('mongodb')

const uri = process.env.uri
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const update = async(collection, query, doc) => {
    return collection.findOne(query)
        .then(async res => {
            if (res) {
                console.log(`Document already exists, updating.`);
                let result = await modifyDoc(collection, res, doc)
                return result
            } else {
                console.log("No document matches the provided query, creating one.");
                let result = await addDoc(collection, doc)
                return result
            }
        })
}

const addDoc = async(collection, doc) => {
    collection.insertOne(doc)
        .then(res => {
            console.log(`Successfully inserted item with _id: ${res.insertedId}`)
            return res
        })
        .catch(err => console.error(`Failed to insert item: ${err}`))
}

const modifyDoc = async(collection, doc, replacement) => {
    return collection.findOneAndReplace({ "name": doc.name }, replacement)
        .then(replacedDocument => {
            if (replacedDocument) {
                console.log(`Successfully replaced the following document: ${replacedDocument}.`)
            } else {
                console.log("No document matches the provided query.")
            }
            return replacedDocument
        })
        .catch(err => console.error(`Failed to find and replace document: ${err}`))
}

const addToDoc = async(collection, doc) => {
    //
}

const test = {
    "name": "languages",
    "list": [{
            name: "JavaScript",
            proficiency: 5
        },
        {
            name: "Python",
            proficiency: 5
        },
        {
            name: "C++",
            proficiency: 5
        }
    ]
}

const query = { "name": "languages" }

let db
let skills

client.connect()
    .then(async client => {
        db = client.db('rest_api')
        skills = db.collection('skills')
        let res = await update(skills, query, test)
        console.log(res)
    })
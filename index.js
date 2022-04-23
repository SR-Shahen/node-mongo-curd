const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const objectId = require('mongodb').ObjectId;

const cors = require("cors");
const port = process.env.PORT || 5000;


// use middleware

app.use(cors())
app.use(express.json())

/* user:dbuser1
*password:w2jUJGyFwpwrwRBQ
*/




const uri = "mongodb+srv://dbuser1:w2jUJGyFwpwrwRBQ@cluster0.lobph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const userCollection = client.db("foodExpress").collection("user");

        // Get user
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });

        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;

            console.log(id);
            const query = { _id: objectId(id) };
            const result = await userCollection.findOne(query);
            res.send(result)
        });

        // Post user: create a new user

        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('adding newUser', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        });

        // Update user
        app.put('/user/:id', async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            const filter = { _id: objectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email
                }
            }
            const result = await userCollection.updateOne(filter, updateDoc, options)
            res.send(result)
        })


        // Delete user
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: objectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result)
        })

    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send("react-with node mongodb open");
})
// app.get('/user', (req, res) => {
//     res.send("react-with node mongodb open");
// })

app.listen(port, () => {
    console.log("mongo curd run hoiche", port);
})


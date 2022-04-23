const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
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

        app.post('/user', (req, res) => {
            const newUser = req.body;
            console.log('adding newUser', newUser);
            res.send({ success: "success" })
        });
    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir);
app.get('/user', (req, res) => {
    res.send("react-with node mongodb open");
})

app.listen(port, () => {
    console.log("mongo curd run hoiche", port);
})


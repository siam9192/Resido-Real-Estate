const express = require('express');
const cors = require('cors');
const port = 5000;
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config()
// const stripe = require('stripe')(process.env.STRIPE_SECRET);
const app = express();

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send('working')
})
app.listen(port)


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.katjfem.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  const db = client.db('Resido');
  const users = db.collection('Users');
  const listings = db.collection('Listings');
  try {
    app.post('/check-username',async(req,res)=>{
      const username = req.body.username;
     
      const filter = {
        username
      }
  
   
    const result = await users.findOne(filter);
    if(result){
      res.send({status:true})
    }
    else{
      res.send({status:false})
    }
  })
  app.post('/check-accountStatus',async(req,res)=>{
    const email = req.body.email;
    const filter = {
      email
    }
    const result = await users.findOne(filter);
    res.send({status:false})
  })
  
    app.post('/user-registration',async(req,res)=>{
     const user = req.body;
     const result = await users.insertOne(user);
     res.send(result)
    })

    // add property;
    app.post('/property/add',async(req,res)=>{
      const property = req.body;
      const result = await listings.insertOne(property);
      res.send(result)
      console.log(result,property)
    })

    app.get('/properties/get',async(req,res)=>{
      const result = await listings.find().toArray();
      res.send(result);
    })
    app.get('/property/single/get/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id)
      }
      const result = listings.findOne(query);
      res.send(result)
    })
    app.get('/property/recent',async(req,res)=>{
      const result = (await listings.find().toArray()).slice(0,6)
      res.send(result)
    })
  }
  finally{

  }
}

run().catch(console.dir);



const express = require('express');
const cors = require('cors');
const port = 5000||process.env.PORT;
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const bodyParser = require('body-parser')
const app = express();

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send('working')
})
app.listen(port)
app.get('/',(req,res)=>{
  res.send('server is running')
})

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { list } = require('parser');
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
  const usersFavouriteCollection= db.collection('Favourites')
  const listingReviews = db.collection('Listing-reviews');
  const messagesCollection = db.collection('messages');
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
  app.get('/popular/locations',async(req,res)=>{
    const locations = [ "Los Angeles", "Chicago", "San Francisco", "Miami", "Houseton", "London" ];

    const filter = [
      {
        $match:{
          'details.address.city':{
            $in:locations
          }
        }
      }
      ,
      {
        $group:{
          
        _id:'$details.address.city',
        count:{
          $sum:1
        }
        }
      }
    ]

    const  result = await listings.aggregate(filter).toArray();
    res.send(result)

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

  app.post('/user/profile/get',async(req,res)=>{
    const email = req.body.email;
    const filter = {
      email
    }

    const project = {
      firstName:1,
      lastName:1,
      username:1,
      password:-1,
      conPass:-1,
      //  about: 1
    }

    const result = await users.findOne(filter)
    res.send(result)
  
    
  })
  app.put('/user/profile/update',async(req,res)=>{
    const email = req.body.email;
    const updatedInfo = req.body.updatedProfile;
    const filter = {
      email
    }
    const updatedDocument = {
      $set:updatedInfo
    }
    const result = await users.updateOne(filter,updatedDocument);
    res.send(result)
  
  })
    // add property;
    app.post('/property/add',async(req,res)=>{
      const property = req.body;
      const result = await listings.insertOne(property);
      res.send(result)
      
    })
  
    app.get('/properties/get/:currentPage',async(req,res)=>{
     const query = req.query;
     const key = query.key.split(',');
     const locations = query.locations.split(',').filter(val => val !== '');
     const types = query.types.split(',').filter(val => val !== '');
     const status = query.status.split(',').filter(val => val !== '');
     const features = query.features.split(',').filter(val => val !== '') ;
     const currentPage = parseInt(req.params.currentPage);
     const sortby = query.sort;
     const filter = {
          // details:{
          //   amenities:{

          //   },

          //   address:{
          //     city:{

          //     }
          //   }

          // },

          // propertyStatus:{
          //  listingIn :{

          //  }
          // }
         
     }
     const short = {

     }
     if(sortby === 'date'){
      short._id = -1
    }
    if(sortby === 'views'){
      short.views = 1
    }
    
     if(locations.length){
   
    filter['details.address.city'] = {$in:[...locations]}
    
   
     }

     if(types.length){
      filter['details.propertyType'] = {$in:[...types]}
    
     }

     if(status.length){
      filter['propertyStatus.listingIn'] = {$in:[...status]}
    
     }
     if(features.length){
      filter['details.amenities'] = {$all:[...features]}
     }
 
   
      const result = await listings.find(filter).skip((currentPage-1)*6).limit(6).sort(short).toArray();
      const document = await listings.countDocuments(filter);
   
      res.send({properties:result,document});
    })
    // listing view update 
    app.put('/listing/view/update',async(req,res)=>{
    const id = req.body.id;
    const filter = {
      _id:new ObjectId(id)
    }
    const update = {
    
    
      $inc:{
        views: 1
      }
     
     
    }
    const result = await listings.updateOne(filter,update);
    
    
    })
    app.get('/property/single/get/:id',async(req,res)=>{
      const id = req.params.id;
      
      if(!id){
        return
      }
      const query = {
        _id: new ObjectId(id)
      }

      const result = await listings.findOne(query);
      res.send(result)
      
    })

    
    app.get('/property/recent',async(req,res)=>{
      const result = await listings.find({'details.listingIn' : 'Rent'}).sort({_id:1}).limit(6).toArray();
      res.send(result)
     
    })
    app.get('/property/featured',async(req,res)=>{
      const result = await listings.find().sort({views:-1}).limit(6).toArray();
      res.send(result)
     
    })
    app.get('/listing/user/recent/:email',async(req,res)=>{
      const email = req.params.email
      console.log(email)
      const result =  await listings.find({userEmail:email}).project({_id:1,title:1,date:1,'details.approveStatus':1}).sort({_id:-1}).limit(5).toArray();
      res.send(result)
    })
    app.get('/reviews/user/recent/:email',async(req,res)=>{
      const email = req.params.email
     
      const result = await listingReviews.find({email:email}).toArray()
      res.send(result);
    })
    

    app.post('/listing/single/save/favourites',async(req,res)=>{
      const saved = req.body;

      const result = await usersFavouriteCollection.insertOne(saved)
      res.send(result)
    })
  
    app.get('/user/listings/favourite',async(req,res)=>{
      const email = req.query.email;
      const filter = {
        email
      }
      const favList = await usersFavouriteCollection.find(filter).toArray();
      const query = {
       _id : {
        $in: favList.map((item)=> new ObjectId(item.listingId))
       }
      }
     const result = await listings.find(query).toArray();
     res.send(result)
    })
    app.delete('/user/listings/favourite/remove/:id',async(req,res)=>{
      const id = req.params.id;
      const filter = {
        listingId:id
      }
   
      const result = await usersFavouriteCollection.findOneAndDelete(filter);
     
    if(result){
      res.send({deletedCount:1})
    }
    else{
      res.send({deletedCount:0})
    }
      
    })
    app.get('/listing/single/isChecked',async(req,res)=>{
      const id = req.query.id;
      const email = req.query.email;
      const filter = {
       listingId: id,
       email
      }
      
      const result = await usersFavouriteCollection.findOne(filter);
     
      if(result){
        res.send({status:'Saved'})
      }
      else{
        res.send({status:'Save'})
      }
    })
    app.post('/listing/review/post',async(req,res)=>{
      const review = req.body;
      const result = await listingReviews.insertOne(review);
      res.send(result)
    })
    app.get('/listing/reviews/get/:id',async(req,res)=>{
      const id = req.params.id ;
      const filter = {
        listingId:id
      }
      const result = await listingReviews.find(filter).toArray();
      res.send(result);
      // console.log('reviews',result)
    })


    // profile
    app.get('/user/listings/recent',async(req,res)=>{
      const email = req.query.email;
      const filter = {
        userEmail: email
      }
      const result = await listings.find(filter).sort({ _id: -1 }).limit(5).toArray();
      res.send(result);
    })

    app.get('/user/listings',async(req,res)=>{
      const email = req.query.email;
      const filter = {
        userEmail:email
      }
      
      const result = await  listings.find(filter).toArray();
      res.send(result)
    })


    // payment 

    app.post('/create-checkout-session',async(req,res)=>{
      const body = req.body;

      const lineItem = [
       {
        price_data:{
          currency:'USD',
          product_data:{
            name:body.name,
          },
          unit_amount:Math.round(body.price * 100),
         }
         ,
         quantity:1
       }
      ]

      const session = await stripe.checkout.sessions.create({
        payment_method_types :['card'],
        line_items: lineItem,
        mode:'payment',
        metadata: body,
        success_url:'http://localhost:5173/dashboard/membership',
        cancel_url:'http://localhost:5173'
      })
      res.json({id:session.id})
    })
    app.post('/payment/webhook',bodyParser.raw({type: 'application/json'}),async(req, res) => {
      const sig = req.headers['stripe-signature'];
      const payload = req.body;
      const payloadString = JSON.stringify(payload, null, 2);
      const secret = process.env.STRIPE_WEBHOOK
      const header = stripe.webhooks.generateTestHeaderString({
              payload: payloadString,
              secret,
      });
      
       let event;
       try {
            event = stripe.webhooks.constructEvent(payloadString, header, secret);
      
       } catch (err) {
              console.log(`Webhook Error: ${err.message}`)
              return res.status(400).send(`Webhook Error: ${err.message}`);
       }
       console.log(event.data.object.metadata)
       app.get()
    
    
      // Handle the event
      // switch (event.type) {
      //   case 'payment_intent.succeeded':
      //     const paymentIntentSucceeded = event.data.object;
      //     console.log(paymentIntentSucceeded)
      //     // Then define and call a function to handle the event payment_intent.succeeded
      //     break;
      //   // ... handle other event types
      //   default:
      //     console.log(`Unhandled event type ${event.type}`);
      // }
      // if(eventType === 'checkout.session.completed'){
      // stripe.customers.retrieve(data.metadata).then((metaData)=>{
      //   console.log(custom_fields)
      // }).catch(err=> console.log(err.message))
      // }
      // Return a 200 response to acknowledge receipt of the event
      res.send();
    
    });


    // send message
    app.post("/listing/message/send",async(req,res)=>{
      const body = req.body;
      const result = await messagesCollection.insertOne(body);
      res.send(result);
    })

    app.get('/dashboard/get-data/:email',async(req,res)=>{
      const email = req.params.email;
      const totalPost = await listings.countDocuments({userEmail:email});
      const pending = await listings.countDocuments({userEmail:email,'details.approveStatus.approve_status':'pending'})
      const views = await listings.find({userEmail:email}).project({views:1}).toArray();
      const viewTotal = views.reduce((prev,next)=> prev + next.views,0);
      const favourite = await usersFavouriteCollection.countDocuments({email:email});
     
      const data = {
        totalPost,
        pending,
        viewTotal,
        favourite
      }
      res.send(data);
     
    })

    app.get('/find/property/author',async(req,res)=>{
      const email = req.query.email;
     
     let result = await users.findOne({email});
     
     result = {
      name:result.firstName  + ' ' + result.lastName,
      photo:result.photo
     }
     res.send(result);
    
    })
    app.get('/users/inbox/messages/get',async(req,res)=>{
      const email = req.query.email;
     
      const result =  await messagesCollection.find({to:email}).toArray();

    const senderData = [];
    result.forEach((item,index)=>{
      const finderPromise = new Promise (async(resolve,reject)=>{
  const res = await users.findOne({email:item.from})
const arr = result[index]
arr.sender = {
name: res.firstName + ' ' + res.lastName,
photo: res.photo
}
  resolve(arr)
  
      })
      senderData.push(finderPromise)
    })
    Promise.all(senderData)
    .then(data =>{
   res.send(data)
    })
    
    })

    // app.get('/update/messages',async(req,res)=>{
    //   const result = await messagesCollection.updateMany({},{$set:{
    //     status:'unread'
    //   }})
     
    // })

    app.put('/update/messages/status',async(req,res)=>{
      const id = req.body.id;
      const filter = {
        _id: new ObjectId(id)
      }
      const update = {
       $set: {
        status: 'read'
       }
      }
      const result = await messagesCollection.updateOne(filter,update)
      res.send(result)
    })


    // admin dashboard
    app.get('/admin/properties/get',async(req,res)=>{
     
      const result = await listings.find().toArray();
      res.send(result);
    })

    app.get('/admin/reviews/get',async(req,res)=>{
      const result = await listingReviews.find().toArray();
      res.send(result)
    })
  }
  finally{

  }
}

run().catch(console.dir);



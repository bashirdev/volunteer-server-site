require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const { ObjectId } = require('mongodb');
const app=express();

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hd52t.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri,{ useUnifiedTopology: true }, { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/' , (req,res)=>{
    res.send('hello world')
})



client.connect(err => {
  const volunteerTask = client.db("volunteerTask").collection("taskVolunteer")
const registrationUser=client.db("volunteerTask").collection("ragistration")

  app.post('/registerForTask', (req,res)=>{
      const newRegistration=req.body;
      registrationUser.insertOne(newRegistration)
      .then(result=>{
          console.log(result);
          res.send(result.insertedCount > 0);
      })
  });
  
  app.get('/volunteer', (req,res)=>{
      volunteerTask.find({})
      .toArray((err, documents)=>{
      
          res.send(documents)
      })
      
      
  })






  app.get('/taskAdded', (req,res)=>{
    registrationUser.find({email: req.query.email})
    .toArray((err, documents)=>{
        // console.log(documents);
     
        res.send(documents)
    })
    
    
})



app.delete('/deleteItem/:id', (req, res) => { // 
    console.log(req.params.id)
    registrationUser.find({ _id: ObjectId(req.params.id) })
        .toArray((err, documents) => {
            if (documents.length > 0) {
                registrationUser.deleteOne({ _id: ObjectId(req.params.id) })
                    .then(result => {
                        res.send(result.deletedCount > 0)
                    })
            }
        })
})

});


app.listen(process.env.PORT || 5000)
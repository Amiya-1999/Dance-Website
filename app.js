const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const bodyparser = require("body-parser")

// Use of mongoose-------------------
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ContactDance', {useNewUrlParser: true});

var ContactSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    email: String,
    phone: Number,
    address: String,
    more: String
  });

var Contact = mongoose.model('Contact', ContactSchema);  
  
app.use('/static', express.static('static'));
app.use(express.urlencoded());
 
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/' , (req,res)=>{    
    const params = {};
    res.status(200).render('home.pug',params);
})
app.get('/home' , (req,res)=>{    
    const params = {};
    res.status(200).render('home.pug',params);
})

app.get('/contact' , (req,res)=>{    
    const params = {};
    res.status(200).render('contact.pug',params);
})
app.post('/contact' , (req,res)=>{    
    var mydata = new Contact(req.body);
    mydata.save().then( ()=> {
        res.send("This item has been saved to the database")
    }).catch( ()=>{
        res.status(400).send("Item was not saved to the database")
    })
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`)
})
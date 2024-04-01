const express= require("express")
const app= express();
const path= require("path");

const mongoose= require("mongoose")
mongoose.connect('mongodb://localhost:27017/luvtech')
.then(()=>{console.log("connection successful")})
.catch(()=>{console.log("connection lost")})

const staticPath= path.join(__dirname,"../public");
app.use(express.static(staticPath));

app.use(express.urlencoded({extended:true}));

const spoSchema= new mongoose.Schema({
    email:{
        type:'string'
    },
    username:{
        type: 'string'
    },
    password:{
      
    }
})


const UserData= new mongoose.model("spotify",spoSchema);


app.get("/signup",(req,res)=>{
    const filePath= path.join(__dirname,"../public","signup.html")
    res.sendFile(filePath);
})
app.get("/login",(req,res)=>{
    const filePath= path.join(__dirname,"../public","login.html")
    res.sendFile(filePath);
})

app.post('/signup',async(req,res) => {
    const data1= new UserData(req.body);
    const data2= await data1.save();
    res.send("successful")
    console.log(data1);
})



app.post('/login',async(req,res) => {
    const username= req.body.username;
    const password= req.body.password;
    
    const data2= await UserData.findOne({username:username});
    // console.log(data2.password);
    if(password==data2.password){
        const filePath= path.join(__dirname,"../public","index.html")
        res.sendFile(filePath);
    }
    else{
        const filePath= path.join(__dirname,"../public","login.html")
        res.sendFile(filePath);
    }

})


app.listen('5000',(req,res)=>{
    console.log("listening to the port 5000");
})
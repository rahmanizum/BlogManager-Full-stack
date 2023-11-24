
const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');

const Blogs = require('./models/blogs');
const Comments= require('./models/comments');

const userRouter = require('./routes/user');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));


Comments.belongsTo(Blogs); 
Blogs.hasMany(Comments); 

app.use('/user',userRouter);
app.use('',async(request,response,next)=>{
    // await sequelize.sync({force:true});
    response.redirect('http://localhost:9090/user')
})
async function initiate(){
    try {
        await sequelize.sync();
        app.listen(9090,()=>{
            console.log("Server is running at 9090");
        });       
    } catch (error) {
        console.log(error);
    }
}
initiate();

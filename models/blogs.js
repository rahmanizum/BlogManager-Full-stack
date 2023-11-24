const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Blogs = sequelize.define('Blogs',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey : true ,
        autoIncrement  :true,
        allowNull:false
    },
    title:{
        type:Sequelize.STRING(),
        allowNull: false
    },
    author:{
        type:Sequelize.STRING(),
        allowNull: false,
    },
    content:{
        type:Sequelize.TEXT(),
        allowNull:false
    }

})

module.exports=Blogs;
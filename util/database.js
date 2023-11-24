const Sequelize = require('sequelize');
const sequelize = new Sequelize('blog-creator','root','T#9758@qlph',{
    dialect:'mysql',
    host:'localhost',
    logging:false
});
module.exports = sequelize;
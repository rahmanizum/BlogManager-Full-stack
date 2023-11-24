const fs = require('fs').promises;
const { error } = require('console');
const Blogs = require('../models/blogs');
const Comments = require('../models/comments');


exports.useraddblogPage = (request, response, next) => {
    response.sendFile('index.html', { root: 'views' });
}

exports.userpostBlog = async (request, response, next) => {
    try {
        const{title,author,content} = request.body;
      const blog  =   await Blogs.create({
            title : title ,
            author : author  , 
            content : content
        })
        response.status(201).json({ message: 'Blog post created successfully' , blog:blog });
    } catch (err) {
        console.log(error);
        response.status(500).json({ message: 'An error occurred while creating the blog post' });
    }

}
exports.userpostComment = async(request,response,next) =>{
   const BlogId = request.params.BlogId;
    try {
        const{comment} = request.body;
        const blog = await Blogs.findByPk(BlogId);
       const blogcomment = await blog.createComment({
            comment:comment
        })
        response.status(201).json({ message: 'Blog comment created successfully' , comment:blogcomment});
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'An error occurred while creating the comment' });
    }
}
 exports.getallBlogs=async(request,response,next)=>{
    try{
        const allblogs =  await Blogs.findAll();
        response.send(allblogs);
    }catch(error){
        console.log(error);
    }
 }
exports.getblogComments = async(request,response,next)=>{
    const BlogId = request.params.BlogId;
    try {
        const blogComments = await Comments.findAll({
            where:{BlogId:BlogId},
            include:['Blog']
        });
        response.send(blogComments);
        
    } catch (error) {
        console.log(error);
    }
}

exports.deleteComment = async(request,response,next)=>{
    const dID = request.params.dID;
    try {
       await Comments.destroy ({where:{id:dID}});
       response.status(201).json({ message: 'Blog comment deleted successfully'});
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'An error occurred while deleting the comment' });
    }
}
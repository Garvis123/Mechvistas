const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Admin =  require("../models/admin")
const AdminModel =  require("../models/admin")
const flash =  require("connect-flash")
const path =  require('path')
const {sendtoken} =  require("../utils/sendtoken")
const {usersendtoken} = require("../utils/usertoken")
const ContactModel = require("../models/contactus")
const BlogModel = require("../models/blog")
const UserModel = require("../models/user")
const CommentModel = require("../models/comments")
const fs = require("fs");
const { response } = require("express");
exports.home = catchAsyncError(async (req, res) => {
  res.render("home",{formData:{},errors:[]})

})
exports.bioDieselOutlets = catchAsyncError(async (req, res) => {
  res.render("bioDieselOutlets");
})
exports.soilTestingLabs = catchAsyncError(async (req, res) => {
  res.render("soilTestingLabs");
})
exports.petrolPumps = catchAsyncError(async (req, res) => {
  res.render("petrolPumps");
})
exports.cngStations = catchAsyncError(async (req, res) => {
  res.render("cngStations");
})
exports.blogs = catchAsyncError(async (req, res) => {
  const admin = await AdminModel.find().populate("blogs");
  console.log(admin[0].blogs);
  
  res.render("blogs",{blogs:admin[0].blogs});

})
exports.blogsdets = catchAsyncError(async (req, res) => {
  const blog = await BlogModel.findById(req.params.id)
  .populate({
    path: "comments",
    populate: {
        path: "userId", // Assuming "user" is the field inside "comments"
        select: "fullname" // Optional: Select specific fields
    }
 });
 console.log(blog);
 
  if (!blog) {
    return res.redirect('/blogs');
  }
  const user = await UserModel.findById(req.userid);
  if(!user){
    return res.redirect('/blogs');
  }  
  blog.views = blog.views + 1;
  blog.save();
  res.render("blogdets",{blog,user});
})

exports.aboutUs = catchAsyncError(async (req, res) => {
  res.render("about");
})
exports.userLogin = catchAsyncError(async (req, res) => {
  res.render("userlogin");
})
exports.userSignup = catchAsyncError(async (req, res) => {
  res.render("usersignup");
})
exports.likeUser = catchAsyncError(async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);
  const user = await UserModel.findById(req.userid);
  if(blog.likes.indexOf(user._id) === -1) {
    blog.likes.push(user._id);
   }else{
    blog.likes.splice(blog.likes.indexOf(user._id),1);
   }
   await blog.save();
   res.json(blog);
})

exports.usercreate = catchAsyncError(async (req, res) => {
  const user = await  UserModel.create({
     fullname: req.body.fullname,
     email: req.body.email,
     phone: req.body.phone,
    password: req.body.password
  });
  if (!user) {
    req.flash('error', "Error submitting form");
    return res.status(400).json({ success: false, message: "Error submitting form" });
  }

  usersendtoken(user,200,res)
})

exports.userloginn = catchAsyncError(async (req,res,next)=>{
  const Admin =  await UserModel.findOne({email:req.body.email}).select("+password")
  if(!Admin){
   return res.status(400).json({ success: false, message: "User with this email not found" });
  }
  
  const isMatch = await Admin.comparePassword(req.body.password)
  console.log(isMatch);
  
  if(!isMatch) {
    return res.status(400).json({ success: false, message: "Invalid password" });
  }
  usersendtoken(Admin,200,res)
})

exports.createcomments = catchAsyncError(async (req,res,next)=>{
  console.log(req.params);
  
  const comment = await CommentModel.create({
    blogId: req.params.blogId,
    userId: req.params.userId,
    content: req.body.content
  })
  const user = await UserModel.findById(req.params.userId);
  user.comments.push(comment._id);
  await user.save();
  const blog = await BlogModel.findById(req.params.blogId);
  blog.comments.push(comment._id);
  await blog.save();

  if (!comment) {
    req.flash('error', "Error submitting form");
    return res.status(400).json({ success: false, message: "Error submitting form" });
  }
  res.json(comment);

})
exports.deleteComment = async (req, res) => {
  try {
      const { blogId, commentId,userId } = req.params;

      // Find the blog and remove the comment ID from the comments array
      const blog = await BlogModel.findById(blogId);
      if (blog) {
          blog.comments.pull(commentId);
          await blog.save();
      }
      const user = await UserModel.findById(userId);
      if (user) {
          user.comments.pull(commentId);
          await user.save();
      }
      await Comment.findByIdAndDelete(commentId);
      res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.contactUs = catchAsyncError(async (req, res) => {
  console.log(req.body);
  

    const contact = await ContactModel.create({
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    });

    if (!contact) {
      req.flash('error', "Error submitting form");
      return res.status(400).json({ success: false, message: "Error submitting form" });
    }

    req.flash('success', "Form submitted successfully");
    res.status(200).json({ success: true, message: "Form submitted successfully" });
  
});
exports.loginPage = catchAsyncError((req,res,next)=>{
  res.render("login",)
})
exports.login = catchAsyncError(async (req,res,next)=>{
  const Admin =  await AdminModel.findOne({email:req.body.email}).select("+password")
  if(!Admin){
   req.flash('error',"Admin with this email not found")
   res.redirect("/admin/login")
  }
  if(Admin.key.toString() !== req.body.key){
   req.flash('error',"Invalid key");
   res.redirect("/admin/login")
  }
  const isMatch = await Admin.comparePassword(req.body.password)
  if(!isMatch) {
   req.flash('error',"Invalid password");
   res.redirect("/admin/login")
  }
  sendtoken(Admin,200,res)
})
exports.updatePage = catchAsyncError(async (req,res,next)=>{
  const user = await Admin.findById(req.params.id)
  if(!user){
      req.flash('error',"User not found")
      return res.redirect("/admin/login")
  }
  res.render("updateprof",{user,adminId:req.id})
})

exports.updateuser = catchAsyncError(async (req,res,next)=>{
  const user = await Admin.findById(req.params.id)
  
  if(!user){
      req.flash('error',"User not found")
      return res.redirect("/admin/login")
  }
  if (req.files && req.files.image && req.files.image[0]?.filename) {
      const oldImagePath = path.join(__dirname, '..', 'public', 'images', 'uploads', user.avtar.fileId);

      // Delete the old image file if it exists
      fs.unlink(oldImagePath, (err) => {
          if (err) {
              console.error('Error deleting the old file:', err);
          } else {
              console.log('Old image deleted successfully');
          }
      });

      const image = req.files.image[0].filename;
     user.avtar = {fileId: image,url: image}
     await user.save()
  }
   
 
  user.email = req.body.email,
  user.key = req.body.key
  await user.save()
  req.flash('success','user updated successfully')
  res.redirect("/admin/admin-dashboard")
})
exports.updatePasswordPage = catchAsyncError(async (req,res,next)=>{
  const user = await Admin.findById(req.params.id)
  if(!user){
      req.flash('error',"User not found")
      return res.redirect("/admin/login")
  }
  res.render("updatepass",{user,adminId:req.id})
})
exports.updatePassword = catchAsyncError(async (req,res,next)=>{
 console.log(req.body)
  const user = await Admin.findById(req.params.id).select("+password")
 
  
  if(!user){
      req.flash('error',"User not found")
      return res.redirect("/admin/login")
  }
  const isMatch = await user.comparePassword(req.body.oldpassword)
  if(!isMatch){
      req.flash('error',"Old password does not match")
      return res.redirect("/admin/update-passwordpage/"+req.params.id)
  }else{
      user.password = req.body.newpassword
      await user.save()
      req.flash('success',"Password updated successfully")
      res.redirect("/admin/logout")
  }
})

exports.dashboardPage = catchAsyncError(async (req,res,next)=>{
  res.render("dashboard",{adminId:req.id})
})

exports.managecontactPage = catchAsyncError(async (req,res,next)=>{
  const contacts =  await ContactModel.find().sort({ _id: -1 }) ;
  res.render("manage-contact",{adminId:req.id});    
})
exports.getcontact = catchAsyncError(async (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const itemsPerPage = 6; // Number of items per page
  const searchTerm = req.query.search || ''; // Get the search term from query params

  // If there's a search term, add a filter to match relevant fields
  let searchFilter = {};
  if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive search
      searchFilter = {
          $or: [
              { firstname: regex },         // Assuming editorial names are searchable
              { lastname: regex },   // Assuming universities are searchable
              { email: regex },
              { message: regex } ,
              { phone: regex }  // Assuming descriptions are searchable
          ]
      };
  }

  // Count the total number of items matching the search criteria
  const totalItems = await ContactModel.countDocuments(searchFilter);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Fetch editorials based on the search term and pagination
  const editorials = await ContactModel.find(searchFilter)
      .sort({ _id: -1 }) 
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);

  res.json({
      editorials: editorials,
      totalPages: totalPages,
      currentPage: currentPage
  });
});

exports.contactUsdelete = catchAsyncError(async (req,res,next)=>{
  const id = req.params.id;
  const editorial1 = await ContactModel.findById(id);
 
  const editorial = await ContactModel.findByIdAndDelete(id);
  console.log(editorial);
  
  if(editorial){
      req.flash('success','contact deleted successfully');
  }else{
      req.flash('error','Failed to delete editorial');
  }
  // res.redirect("/admin/manage-editorial");    
  res.json({success:"true"})
})

//admin blog
exports.manageblogPage = catchAsyncError(async (req,res,next)=>{
  res.render("adminblog/manage-blog",{adminId:req.id})
})

exports.blogCreatePage = catchAsyncError(async (req,res,next)=>{
  res.render('adminblog/blogCreate',{adminId:req.id});
})

exports.blogCreate = catchAsyncError(async (req,res,next)=>{
  console.log(req.id);
  
  const admin = await AdminModel.findById(req.id);
  console.log(admin);
  
  if(req.files){
      const blog = await BlogModel.create({
          title:req.body.title,
          author:req.id,
          twitterlink:req.body.twitterlink,
          facebooklink:req.body.facebooklink,
          instagramlink:req.body.instagramlink,
         description:req.body.description,
          coverImage:{
              fileId:req.files.image[0].filename,
              url:req.files.image[0].filename,
          },
      })
      admin.blogs.push(blog._id)
      await blog.save();
      await admin.save();
      console.log(blog);
      console.log(admin);
      req.flash('success','blog created successfully');
      if(!blog){
       req.flash('error','Failed to create blog');
      }
  }
   
  res.redirect("/admin/manage-blogs")
  
   
})
exports.getblog = catchAsyncError(async (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const itemsPerPage = 6; // Number of items per page
  const searchTerm = req.query.search || ''; // Get the search term from query params

  // If there's a search term, add a filter to match relevant fields
  let searchFilter = {};
  if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive search
      searchFilter = {
          $or: [
              { description: regex },         // Assuming editorial names are searchable
              { title: regex },   // Assuming universities are searchable
                 // Assuming descriptions are searchable
          ]
      };
  }

  // Count the total number of items matching the search criteria
  const totalItems = await BlogModel.countDocuments(searchFilter);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Fetch editorials based on the search term and pagination
  const blogs = await BlogModel.find(searchFilter)
      .sort({ _id: -1 }) 
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);

  res.json({
      blogs: blogs,
      totalPages: totalPages,
      currentPage: currentPage
  });
});

exports.deleteblog = catchAsyncError(async (req,res,next)=>{
  const id = req.params.id;
  const editorial = await BlogModel.findByIdAndDelete(id);
  if(editorial){
      req.flash('success','blog deleted successfully');
  }else{
      req.flash('error','Failed to delete blog');
  }
  // res.redirect("/admin/manage-editorial");    
  res.json({success:"true"})
})

exports.editblogPage = catchAsyncError(async (req,res,next)=>{

  const id = req.params.id
  const getblog = await BlogModel.findById(id)
  
  if(!getblog){
      return res.redirect("/admin/manage-blogs")
  }

  
  res.render('adminblog/edit-blog', {
      blog:getblog,adminId:req.id
    });
})

exports.editblog = catchAsyncError(async (req, res, next) => {
  console.log(req.body);

  const id = req.params.id;
  const { title,description,instagramlink,twitterlink,facebooklink} = req.body;
  const blog = await BlogModel.findById(id);
  // If the blog is not found
  if (!blog) {
      req.flash('error',"Failed to update blog");
      return res.redirect('/admin/manage-blogs');
  }

  
  blog.title = title;
  blog.twitterlink = twitterlink;
  blog.instagramlink = instagramlink;
  blog.facebooklink = facebooklink;
  blog.description = description;
  // Handle image file update if present
  if (req.files.image && req.files.image[0]?.filename) {
      const oldImagePath = path.join(__dirname, '..', 'public', 'images', 'uploads', blog.coverImage.fileId);

      // Delete the old image file if it exists
      fs.unlink(oldImagePath, (err) => {
          if (err) {
              console.error('Error deleting the old file:', err);
          } else {
              console.log('Old image deleted successfully');
          }
      });

      const image = req.files.image[0].filename;
     blog.coverImage = {fileId: image,url: image}
     await blog.save()
  }

  await blog.save();
  req.flash('success', 'blog updated successfully');
  res.redirect('/admin/manage-blogs');
});





exports.logout = catchAsyncError(async (req,res,next)=>{
  res.clearCookie("token")
  res.redirect("/admin/login")
})
const express = require('express');
const router = express.Router();
const {userController} = require("../controller")
const {AdminMiddleware,FormValidation} =  require("../middlewares")

router.get('/',userController.home )
router.get('/services/bio-diesel-outlets',userController.bioDieselOutlets )
router.get('/services/soil-testing-labs',userController.soilTestingLabs )
router.get('/services/petrol-pumps',userController.petrolPumps)
router.get('/services/cng-stations',userController.cngStations)
router.get('/blogs',userController.blogs)
router.get('/blogdets/:id',AdminMiddleware.isAuthenticatedUser,userController.blogsdets)
router.get('/about-us',userController.aboutUs)
router.get('/user-login',userController.userLogin)
router.get('/user-signup',userController.userSignup)
router.get('/like/:id',AdminMiddleware.isAuthenticatedUser,userController.likeUser)
router.post('/user-signup',FormValidation.validateUserForm,userController.usercreate)
router.post('/user-login',FormValidation.validateUserLoginForm,userController.userloginn)
router.post('/comments/:blogId/:userId',AdminMiddleware.isAuthenticatedUser,userController.createcomments)
router.delete('/comments/:blogId/:commentId/:userId',AdminMiddleware.isAuthenticatedUser,userController.deleteComment);

router.post('/contact-us',FormValidation.validateContactForm,userController.contactUs)
//admin routes
router.get('/admin/login',userController.loginPage)
router.get('/admin/update-page/:id',AdminMiddleware.isAuthenticated,userController.updatePage)
router.post('/admin/updateuser/:id',AdminMiddleware.isAuthenticated,FormValidation.validatupdateprofileForm,userController.updateuser)
router.get('/admin/update-passwordpage/:id',AdminMiddleware.isAuthenticated,userController.updatePasswordPage)
router.post('/admin/updatepass/:id',AdminMiddleware.isAuthenticated,FormValidation.validateupdatepasswordForm,userController.updatePassword)
router.post('/admin/login',AdminMiddleware.Validation,userController.login)
router.get('/admin/admin-dashboard',AdminMiddleware.isAuthenticated,userController.dashboardPage)

router.get('/admin/manage-contact-us',AdminMiddleware.isAuthenticated,userController.managecontactPage)
router.get('/admin/get-contact',AdminMiddleware.isAuthenticated,userController.getcontact)
router.delete('/admin/contact-delete/:id',AdminMiddleware.isAuthenticated,userController.contactUsdelete)

router.get('/admin/logout',userController.logout)
//blogs admin
router.get('/admin/manage-blogs',AdminMiddleware.isAuthenticated,userController.manageblogPage)
router.get('/admin/blog-createpage',AdminMiddleware.isAuthenticated,userController.blogCreatePage)
router.post('/admin/blogCreate',AdminMiddleware.isAuthenticated,FormValidation.validateBlogForm,userController.blogCreate)
router.get('/admin/get-blog',AdminMiddleware.isAuthenticated,userController.getblog)
router.get('/admin/edit-blog/:id',AdminMiddleware.isAuthenticated,userController.editblogPage)
router.delete('/admin/blog-delete/:id',AdminMiddleware.isAuthenticated,userController.deleteblog)
router.post('/admin/edit-blog/:id',AdminMiddleware.isAuthenticated,FormValidation.validateEditBlogForm,userController.editblog)

module.exports = router;


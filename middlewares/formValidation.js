const ErrorHandler = require("../utils/ErrorHandler")
const {catchAsyncError} =  require("./catchAsyncError")
const { check, validationResult } = require('express-validator');
const {uploadboth,fileErrors} =  require("../utils/multerboth")

  
  const validatupdateprofileForm = [
    (req, res, next) => {
      console.log(req.body);
      
      fileErrors.length = 0; // Reset fileErrors for every request
      uploadboth(req, res, (err) => {
        if (err) {
          // Handle Multer-specific errors
          fileErrors.push({ msg: err.message });
        }
        console.log("req.body after uploadboth:", req); // Debug: req.body populated
        next(); // Move to the next middleware for validation
      });
    },
    check('key', 'Key is required').notEmpty(),
    check('email', 'email is required').notEmpty(),
    // Middleware to check validation result
    (req, res, next) => {
      const validationErrors = validationResult(req);
      const errors = [...validationErrors.array(), ...fileErrors];
      if (errors.length > 0) {
        req.flash("errors", errors);
        return res.redirect("back");
      }
      
      next(); // Proceed to the next middleware/controller
    },
  ];
  const validateupdatepasswordForm = [

    check('oldpassword', 'Old password is required').notEmpty(),
    check('newpassword', 'New password is required').notEmpty(),
    // Optional image validation
   
    // Middleware to check validation result
    (req, res, next) => {
      console.log(req.body);
      const errors = validationResult(req);
      console.log(errors);
      
      if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        return res.redirect('back');
      }
      next();
    }
  ];
  const validateContactForm = [
    check('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email address'),
  
    check('phone')
      .notEmpty().withMessage('Phone number is required')
      .isNumeric().withMessage('Phone number must be numeric')
      .isLength({ min: 10, max: 10 }).withMessage('Phone number must be of 10 digits'),
  
    check('message')
      .notEmpty().withMessage('Message is required')
      .isLength({ max: 200 }).withMessage('Message must be at most 200 characters'),
  
    check('firstname')
      .notEmpty().withMessage('First name is required')
      .isLength({ max: 16 }).withMessage('First name must be at most 16 characters'),
  
    check('lastname')
      .notEmpty().withMessage('Last name is required')
      .isLength({ max: 16 }).withMessage('Last name must be at most 16 characters'),
  
    async (req, res, next) => {
      const validationErrors = validationResult(req);
      const errors = validationErrors.array();
  
      if (errors.length > 0) {
        return res.status(400).json({ success: false, errors: errors });
      }
  
      next();
    },
  ];
  const validateBlogForm = [
    (req, res, next) => {
      fileErrors.length = 0; // Reset fileErrors for every request
      uploadboth(req, res, (err) => {
        if (err) {
          // Handle Multer-specific errors
          fileErrors.push({ msg: err.message });
        }
        console.log("req.body after uploadboth:", req.files); // Debug: req.body populated
        next(); // Move to the next middleware for validation
      });
    },
  
    // Field validation using express-validator
    check("twitterurl", "URL must be a valid URL").optional().isURL(),
    check("instagramurl", "URL must be a valid URL").optional().isURL(),
    check("facebookurl", "URL must be a valid URL").optional().isURL(),
    check("title", "Title is required").notEmpty(),
    check("description", "Description is required").notEmpty(),
    (req, res, next) => {
      const validationErrors = validationResult(req);
      const errors = [...validationErrors.array(), ...fileErrors];
      if (errors.length > 0) {
        req.flash("errors", errors);
        return res.redirect("back");
      }
      
      next(); // Proceed to the next middleware/controller
    },
  ];
  const validateEditBlogForm = [
    (req, res, next) => {
      fileErrors.length = 0; // Reset fileErrors for every request
      uploadboth(req, res, (err) => {
        if (err) {
          // Handle Multer-specific errors
          fileErrors.push({ msg: err.message });
        }
        next(); // Move to the next middleware for validation
      });
    },
    check("twitterurl", "URL must be a valid URL").optional().isURL(),
    check("instagramurl", "URL must be a valid URL").optional().isURL(),
    check("facebookurl", "URL must be a valid URL").optional().isURL(),
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
     (req, res, next) => {
      const validationErrors = validationResult(req);
      const errors = [...validationErrors.array(), ...fileErrors];
      if (errors.length > 0) {
        req.flash("errors", errors);
        return res.redirect("back");
      }
      
      next(); // Proceed to the next middleware/controller
    },
  ];
  const validateUserForm = [
    check('fullname')
    .notEmpty().withMessage('Fullname is required')
    .isLength({ max: 30 }).withMessage('Fullname must be at most 16 characters'),

    check('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email address'),
  
    check('phone')
      .notEmpty().withMessage('Phone number is required')
      .isNumeric().withMessage('Phone number must be numeric')
      .isLength({ min: 10, max: 10 }).withMessage('Phone number must be of 10 digits'),
    check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6, max: 16 }).withMessage('Password must be at least 6 characters'),
    async (req, res, next) => {
      const validationErrors = validationResult(req);
      const errors = validationErrors.array();
  
      if (errors.length > 0) {
        return res.status(400).json({ success: false, errors: errors });
      }
  
      next();
    },
    // Middleware to check validation result
   
  ];
  const validateUserLoginForm = [
    check('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email address'),
    check('password')
    .notEmpty().withMessage('Password is required'),
    async (req, res, next) => {
      console.log(req.body);
      
      const validationErrors = validationResult(req);
      const errors = validationErrors.array();
      if (errors.length > 0) {
        return res.status(400).json({ success: false, errors: errors });
      }
      next();
    },
  ];
module.exports = {
    validatupdateprofileForm,
    validateupdatepasswordForm,
    validateContactForm,
    validateBlogForm,
    validateEditBlogForm,
    validateUserForm,
    validateUserLoginForm
}
// exports.generatedError = (err, req, res, next) => {
//     const statusCode = res.statusCode || 500;
//     console.log(err);
  
//     if (err.name === "MongoServerError" && err.message.includes("E11000 duplicate key")) {
//             return res.status(400).json({ success: false, errors:[ "Email must be unique" ]});
//     }
  
//     res.status(statusCode).render('errorpage', { message: err.message, errname: err.name });
//   };
exports.generatedError = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    console.log(err);
  
    if (err.name === "MongoServerError" && err.message.includes("E11000 duplicate key")) {
      return res.status(400).json({ success: false, message: 'Duplicate key error: A record with this value already exists.' });
    }
  
    res.status(statusCode).json({ success: false, message: err.message });
  };
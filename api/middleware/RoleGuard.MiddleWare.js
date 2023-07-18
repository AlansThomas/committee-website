exports.roleGuard = async (req, res, next) => {
  try {
    const userRole = req.User.Type;
    const genericvalue = req.headers.genericvalue
    // console.log("inside middlware" + userRole + "GeneriValue " + genericvalue)
    console.log('====================================');


    if (userRole == 0) {
      if (genericvalue == userRole) {
        next();
      }
      else {
        res.status(401).json({
          Success: 0,
          Message: 'Invalid Call'
        })
      }
    }
    else if (userRole == 1) {
      console.log("inside committee");

      if ((genericvalue == 0) || (genericvalue == 1)) {
        next();
      }
      else {
        res.status(401).json({
          Success: 0,
          Message: 'Invalid Call'
        })
      }
    }
    else if (userRole == 2) {
      // console.log("inside middlware" + userRole)

      if (genericvalue == userRole) {
        // console.log("inside middlware" + userRole)

        next();
      }
      else {
        res.status(401).json({
          Success: 0,
          Message: 'Invalid Call'
        })
      }
    }

  }
  catch (error) {
    console.log(error);
  }

}

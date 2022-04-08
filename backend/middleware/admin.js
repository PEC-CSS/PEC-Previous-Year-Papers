const { Admin } = require('../models/admin');

module.exports = async function(req, res, next) {
  try { 
    const user = await Admin.findOne({name: req.user.name, email: req.user.email});
    if(user) {
      req.user.isAdmin = true;
      next();
    }
    else {
      return res.status(403).send('Admin privileges required');
    }
  }
  catch(ex) {
    return res.send(ex.message);
  }
};
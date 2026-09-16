

const userService = require("../services/userService");


const getUsers = (req, res) => {
 const { minAge } = req.query;


 userService.getUsers(minAge, (err, users) => {
   if (err) {
     return res.status(500).json({
       message: "Internal Server Error",
     });
   }


   res.status(200).json(users);
 });
};


module.exports = {
 getUsers,
};

const fs = require("fs");
const path = require("path");


const pathToFile = path.join(__dirname, "../../users.json");


const getUsersFromDatabase = (callback) => {
 fs.readFile(pathToFile, "utf-8", (err, data) => {
   if (err) {
     return callback(err, null);
   }


   try {
     const users = JSON.parse(data);
     callback(null, users);
   } catch (error) {
     callback(error, null);
   }
 });
};


module.exports = {
 getUsersFromDatabase,
};

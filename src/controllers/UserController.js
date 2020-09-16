const {UserViewModel} = require("../viewModels/UserViewModel");

class UserController 
{
    default = (req, res) => {
        res.render('index');
    }
    addUser = (req, res) => {
        const {Fullname, Emailaddress, Password} = req.body;
        const newUser = {
            Fullname: Fullname,
            Emailaddress: Emailaddress,
            Password: Password
        };
        const userViewModel = new UserViewModel(newUser);
        userViewModel.CreateUser((err, user)=>{
            console.log(err);
            if(err) 
            {
               console.log(err);
            }
            console.log(user)
            res.status(200).send({"userID": user.id});
        });
      
    }
}
module.exports = new UserController();

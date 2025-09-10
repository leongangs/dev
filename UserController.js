const UserModel = require("../models/user")

// Create and Save a new user
exports.create_get = async (req, res) => {
    try {
        //const user = await UserModel.find();
        res.render('create',{title:'Create new user'});
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

exports.create_post = async (req, res) => {
    const user = new UserModel(req.body);
    user.save()
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
};
// 
exports.home = async (req, res) => {
    try {
        res.render('index');
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        //res.status(200).json(user);
        res.render('list',{user:user});
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        //const user = await UserModel.find();
        res.render('edit',{user:user});
        //res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a user by the id in the request
exports.update = async (req, res) => {
     if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    } 
    const user = new UserModel(req.body);
    user.save()
        .then(result => {
            res.render('index');
        })
        .catch(err=> {
            console.log(err);
        })
      
    /* await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    }); */
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await UserModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `User not found.`
          });
        } else {
          res.send({
            message: "User deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};

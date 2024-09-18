const path= require('node:path')
const fs = require('node:fs')
const {v4: uuidv4} = require('uuid')

function readUsers(){
    const data = fs.readFileSync('data/users.json','utf8')
    if(!data) return null;
    return JSON.parse(data)
}

function writeUsers(writeData){
    newData = fs.writeFileSync('data/users.json', JSON.stringify(writeData, null, 2))
    if(!newData) return null;
    return JSON.parse(newData)
}


function index(req,res){
return res.status(200).json({
    message: "OK", 
    success: true,
})
}

function show(req, res){
    const userDetails = req.params.id
    return res.status(200).json({
        message: "user found successfully",
        data: { id:1, name: 'John Doe', userDetails},
        success: true,
    })
}


//Show user by id
function showUser(req, res){
    const userId = req.params.id
    const users = readUsers()
    if(users === null){
        return res.status(404).json({
            message:"Error, could not find users",
            success: false
        })
    }
    const found = users.find(user => user.id === userId)
    if(!found){
        return res.status(404).json({
            message:"User not found",
            success:false
        })
    }
    return res.status(200).json({
        message: "User found successfully",
        data: found,
        success: true
    })
}

// Display all users
function displayUsers(req, res){
   const users= readUsers()
   if(users === null){
    return res.status(404).json({
        message:"Error, could not find users",
        success: false
    })
    }
   return res.status(200).json({
    message: "Users found succesfully",
    data: users,
    success:true
   })
}

//Create a new user by id
function createUser (req, res) {
    let usersData = readUsers();
    if(usersData === null){
        return res.status(404).json({
            message:"Error, could not find users",
            success: false
        })
    }
    const newId = uuidv4();
  
    let newItem = {
        id: newId,
        title: req.body.title,
        name: req.body.name,
        gender: req.body.gender,
    } 
    console.log(newItem)
    usersData.push(newItem);
    writeUsers(usersData);
    return  res.status(201).json({
        data: newItem,
        message:"User created successfully",
        success:true  
    })  
}


//Update user by id
function updateUser(req,res){
    const userId = req.params.id
    
    let usersData = readUsers();
    if(usersData === null){
        return res.status(404).json({
            message:"Error, could not find users",
            success: false
        })
    }
    const found = usersData.find(user => user.id === userId)
    if(!found){
        return res.status(404).json({
            message:"User not found",
            success:false
        })
    }
    const targetIndex = usersData.indexOf(found);
    if (found) {
        if (req.body.title) {
            found.title = req.body.title;
        }
        if (req.body.name) {
            found.name = req.body.name;
        }
        if (req.body.gender) {
            found.gender = req.body.gender;
        }
        usersData.splice(targetIndex,1,found)
        writeUsers(usersData);
        return res.status(201).json({
            message: "User details successfully updated" ,
            success:true
        });
    }
    else {
        return res.status(404).json({
            message: 'User update unsuccessful',
            success: false
        });
    }
}


//Delete user by id
function deleteUser(req, res) {
    const userId= req.params.id
    let users = readUsers()
    if(users === null){
        return res.status(404).json({
            message:"Error, could not find users",
            success: false
        })
    }
    const found = users.find(user => user.id === userId);
    if(!found){
        return res.status(404).json({
            message:"User does not exist",
            success:false
        })
    }
    const targetIndex = users.indexOf(found);
    const isGone =users.splice(targetIndex,1)
    writeUsers(users)
    // fs.writeFileSync('data/users.json', JSON.stringify(users))
    if(isGone !== null){
        return res.status(200).json({
            message: "User deleted successfully",
            success: true
        })   
    }    
    return res.status(400).json({
        message: "Error, could not delete user",
        success: false
    })
}

module.exports = {index, show,showUser, displayUsers,createUser,updateUser,deleteUser}


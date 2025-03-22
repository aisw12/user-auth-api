const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  
  try {
const hashedPassword=await getHashString(password)
console.log({hashedPassword})
    const user = new User({ username, password:hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
console.log(username,password,"name");
    if (!username || !password) {
        
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare the hashed password with entered password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Protected Profile Route
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
async function getHashString(str) {
return new Promise((resolve,reject)=>{
    bcrypt.genSalt(15, function(err, salt) {
           bcrypt.hash(str, salt, function(err, hash) {
                console.log({hash});
                
               resolve(hash) ;
            });
        });  
})
   
}
module.exports = router;


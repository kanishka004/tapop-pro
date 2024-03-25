const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer');
const cors = require('cors')
const RegisterModel = require('./models/Register')


const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://0.0.0.0/test').then(() => {
    console.log('Connected to DB');
}).catch((error) => {
    console.log("Couldn't connect to DB", error.message);
})

// old working code
// app.post('/register', (req, res) => {
//     const values = req.body;
//     const name = values.name;
//     const email = values.email; 
//     const pass = values.pass; 
//     const dob = values.dob;
//     const phoneNo = values.phoneNo; 
//     const profilePic = values.profilePic;
//     console.log(name, email);
//     RegisterModel.findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 res.json("Already have an account")
//             } else {
//                 RegisterModel.create({ name: name, email: email, pass: pass, dob: dob, phoneNo: phoneNo, profilePic: profilePic })
//                 .then(result => res.json("Account created"))
//                 .catch(err => res.json(err))
//             }
//         }).catch(err => res.json(err))
// })

app.post('/get_user_details', (req, res) => {
    const email = req.body.email; 
    console.log(email);
    RegisterModel.findOne({ email: email })
    .then(user => {
        if (user) {
            res.json(user)
        }
    }).catch(err => res.json(err))
})

// Route for handling file uploads

// Configure Multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Define the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Define the filename
    },
});
  
const upload = multer({ storage });

// test image code
// const ImageSchema = new mongoose.Schema({
//     filename: String,
//     path: String,
//   });

// const Image = mongoose.model('Image', ImageSchema);

// app.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//       const { filename, path } = req.file;
//       const image = new Image({ filename, path });
//       await image.save();
//       res.status(200).json({ message: 'Image uploaded successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error uploading image' });
//     }
// });

app.post('/register', upload.single('image'), async (req, res) => {
    const { filename, path } = req.file;
    const values = req.body;
    const name = values.name;
    const email = values.email; 
    const pass = values.pass; 
    const dob = values.dob;
    const phoneNo = values.phoneNo; 
    console.log(name, email);
    RegisterModel.findOne({ email: email })
    .then(user => {
        if (user) {
            res.json("Already have an account")
        } else {
            RegisterModel.create({ name: name, email: email, pass: pass, dob: dob, phoneNo: phoneNo, filename: filename, path: path })
            .then(result => res.json("Account created"))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
});

app.listen(3001, () => {
    console.log("Server is Running");
})
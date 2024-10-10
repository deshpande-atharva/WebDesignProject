const express = require("express");
const app = express();
app.use(express.json());

// Database connection(if doesnt connect then try giving ip 0000 to the cluster. This is there for this cluseter)
const mongoose = require("mongoose");
const url = "mongodb+srv://deshpandeatha:dkutwQp4l01MIChw@cluster0.5qwll.mongodb.net/WebProject?retryWrites=true&w=majority";

mongoose.connect(url)
    .then(() => {
        console.log("Connected to MongoDB Atlas 'webproject' database successfully!");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB Atlas:", error);
    });

// Define a schema for Users collection
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Create a model for the Users collection
const User = mongoose.model("User", userSchema);


//POST route for signup
//by default, Mongoose automatically pluralizes and converts the collection name to lowercase.
// So, when you specify a model name like "Users", Mongoose will, by default, create or look for a collection called "users"
//Ceated a collection named users in WebProject database


app.post("/signup", async function (req, res) {
    const username = req.body.email;
    const password = req.body.password;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: username });
        if (existingUser) {
            return res.status(400).send("Username already exists");
        }

        // Create a new user if not exists(hardcoded data)
        const user = new User({
            email: username,
            password:password ,
        });

        await user.save(); // Save the user to the database
        console.log("User saved:", user);

        res.json({
            msg: "User created",
        });
    } catch (error) {
        res.status(500).json({ msg: "Error creating user", error });
    }
    (async () => {
        try {
            const users = await User.find({});
            console.log('Users in DB:', users); // This will show all users in the collection
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    })();
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

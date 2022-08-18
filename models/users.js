const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, default: null },
    password: { type: String, default: null },
    dateJoined: { type: Date, default: Date.now() },
    userLevel: { type: String, default: null }
},
{ collection : 'users' });

module.exports = mongoose.models.users || mongoose.model("users", userSchema);
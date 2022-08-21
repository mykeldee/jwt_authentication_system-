const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    dateJoined: { type: Date, default: Date.now() },
    userLevel: { type: String, enum:["user", "staff", "manager", "admin"], default: "not assigned" },
    isStaff: { type: Bolean, default: 0 },
    isManager: { type: Bolean, default: 0 },
    isAdmin: { type: Bolean, default: 0 }
},
{ timestamps: true },
{ collection : 'users' });

module.exports = mongoose.models.users || mongoose.model("users", userSchema);
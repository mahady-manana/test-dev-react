import mongoose from "mongoose";

const Schema  = mongoose.Schema

const User = new Schema({
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    email : {
        type : String,
        index : {unique : true, sparse : true}
    },
    password : {type : String},
})

export default mongoose.model("User_model_test", User)
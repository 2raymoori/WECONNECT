const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    likes:[
        {
            users:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"users"
                }
        }
    ],
    comments:[
        {
            users:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"users"
            },
            description:{
                type:String,
                required:true
            },
            commmentDate:{
                type:Date,
                default:Date.now
            }
        }
    ],
    postDate:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model("posts",postSchema);
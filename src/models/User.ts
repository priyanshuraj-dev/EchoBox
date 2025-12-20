import mongoose,{Schema,models,model} from "mongoose";

const userSchema = new Schema({
    // name: {type: String,required: [true,"Name is required"]},
    email : {type:String,required:[true,"Email is required"],unique:true},
    password: {type:String,required:true},
    username: {type:String,required:[true,"Username is required"],trim:true,unique:true},
})

export const User = models.User ||model("User",userSchema)
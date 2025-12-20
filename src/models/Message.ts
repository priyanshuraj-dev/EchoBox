import mongoose,{Schema} from "mongoose";

const messageSchema = new Schema({
    text: {type:String,required:true},
    userId: {type:Schema.Types.ObjectId,ref:"User",required: true},
    createdAt: {type:Date,default:Date.now},
});

export const Message = mongoose.models.Message || mongoose.model("Message",messageSchema)
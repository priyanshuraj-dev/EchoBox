import { connectDB } from "@/lib/db";
import { Message } from "@/models/Message";
import { authOptions } from "../../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";

export async function GET(){
    try{
        await connectDB();
        const session = await getServerSession(authOptions);
        
        if(!session){
            return Response.json(
                {success: false,message: "Unauthorised"},
                {status: 404}
            )
        }
        const userId = session.user.id;
        // findbyId will find accn to message_id 
        const messages = await Message.find({userId}).sort({createdAt: -1});

        return Response.json(
            {success: true,messages},{status: 200}
        )
    }
    catch(error:any){
        console.error("GET Messages Error: ",error);
        return Response.json({
            success: false,
            message: error.Message
        },{status: 500})
    }
}
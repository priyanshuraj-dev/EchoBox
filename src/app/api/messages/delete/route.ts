import { connectDB } from "@/lib/db";
import { Message } from "@/models/Message";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";


export async function DELETE() {
    try{
        await connectDB();

        const session = await getServerSession(authOptions)

        if(!session) {
            return Response.json(
                {success: false, message: "Unauthorised"},
                {status: 401}
            )
        }
        const userId = session.user.id;

        await Message.deleteMany({userId});

        return Response.json(
            {success: true, message: "All messages deleted"},
            {status: 200}
        );
    }
    catch(error:any){
        return Response.json(
            {success: false, message: error.message},
            {status: 400}
        )
    };
}
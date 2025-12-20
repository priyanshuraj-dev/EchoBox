import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request){
    try {
        await connectDB();
        const {email,username,password} = await req.json();

        if(!email || !username || ! password){
            return Response.json({
                success: false, message: "All fields are required"
            }, {status: 400});
        }
        const existingEmail = await User.findOne({email:email});
        if(existingEmail){
            return Response.json(
                {success: false,message: "Email already in use"},
                {status: 400}
            )
        }
        const existingUser = await User.findOne({username:username})
        if(existingUser){
            return Response.json(
                {success: false,message: "Username already exists"},
                {status: 400}
            )
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        return Response.json(
            {success: true, message: "User created successfully", userId: newUser._id},
            {status: 200}
        );
    } catch (error:any) {
        return Response.json(
            {success: false,message: error.message},
            {status: 500}
        );
    }
}
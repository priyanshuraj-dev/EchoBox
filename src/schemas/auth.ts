import {z} from "zod";

export const signupSchema = z.object({
    username: z.string().min(3,"Username must be atleast 3 char").max(20,"Username must be no more than 20 char").refine((value) => !/\s/.test(value),
         "Username must not contain spaces"),
    email: z.string().email({message:"Invalid email address"}),
    password: z.string().min(6,{message:"Password must be atleast 6 char"})
})
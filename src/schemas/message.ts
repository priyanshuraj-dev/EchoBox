import {z} from "zod";

export const messageSchema = z.object({
    text: z.string().min(5,"Content must be at least of 5 char").max(300,"Content must be no longer than 300 char"),
    userId: z.string(),
})
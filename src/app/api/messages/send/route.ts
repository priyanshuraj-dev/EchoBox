import { User } from "@/models/User";
import { Message } from "@/models/Message";
import { connectDB } from "@/lib/db";
import { messageSchema } from "@/schemas/message";
import Pusher from "pusher"; // 1. Import Pusher

// 2. Initialize Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();

    const data = messageSchema.parse(body);

    const user = await User.findById(data.userId);
    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const newMessage = await Message.create({
      text: data.text,
      userId: data.userId,
      createdAt: new Date(),
    });

    // 3. Trigger the Pusher event
    // Channel: unique to the recipient (using userId)
    // Event: "new-message"
    await pusher.trigger(`user-${data.userId}`, "new-message", {
      message: newMessage.text,
      createdAt: newMessage.createdAt,
    });

    return Response.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending message", error.message);
    return Response.json(
      {
        success: false,
        message: error.message || "Server error",
      },
      { status: 400 }
    );
  }
}
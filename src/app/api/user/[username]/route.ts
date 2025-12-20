import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function GET(
  req: Request,
  context: { params: Promise<{ username: string }> }
) {
  try {
    await connectDB();

    // 2. Await the params before accessing properties
    const { username } = await context.params;

    const user = await User.findOne({ username }).select("_id username");

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    
    return Response.json(
      {
        success: true,
        user: {
          userId: user._id,
          username: user.username,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
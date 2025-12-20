// "use client";

// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import Link from "next/link";
// import axios from "axios";

// export default function MessagesPage() {

//   type MessageType = {
//       _id?: string;
//       text: string;
//       userId: string;
//       createdAt: string;
//   }

//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const [loading, setLoading] = useState(true);

//   async function loadMessages() {
//     try {
//       const res = await axios.get("/api/messages/get");
//       setMessages(res.data.messages || []);
//     } catch {
//       toast.error("Failed to load messages.");
//     }
//     setLoading(false);
//   }

//   async function deleteAll() {
//     try {
//       await axios.delete("/api/messages/delete");
//       toast.success("All messages deleted!");
//       setMessages([]);
//     } catch {
//       toast.error("Failed to delete messages.");
//     }
//   }

//   useEffect(() => {
//     loadMessages();
//   }, []);

//   return (
//     <div className="relative min-h-screen w-full bg-[#0A0A10] overflow-hidden text-white">
      
//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-fuchsia-700/10 to-black animate-bg"></div>
//       <div className="absolute top-20 -left-20 w-96 h-96 bg-fuchsia-600/30 rounded-full blur-[120px] animate-pulse"></div>
//       <div className="absolute bottom-20 -right-20 w-[420px] h-[420px] bg-purple-500/30 rounded-full blur-[140px] animate-pulse-fast"></div>

//       <div className="relative z-20 px-6 pt-24 max-w-3xl mx-auto">

//         <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-10">
//           Your Messages 💬
//         </h1>

//         {/* Back to dashboard */}
//         <Link
//           className="block text-center mb-6 text-gray-300 hover:text-pink-400 transition"
//           href="/dashboard"
//         >
//           ← Back to Dashboard
//         </Link>

//         <button
//           onClick={deleteAll}
//           className="w-full mb-8 py-3 rounded-xl bg-red-600/80 hover:bg-red-600 transition-all shadow-lg"
//         >
//           Delete All Messages
//         </button>

//         {loading ? (
//           <p className="text-center text-gray-400">Loading...</p>
//         ) : messages.length === 0 ? (
//           <p className="text-center text-gray-400">No messages yet.</p>
//         ) : (
//           <div className="space-y-6">
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className="bg-white/10 border border-white/20 p-5 rounded-2xl backdrop-blur-xl shadow-xl animate-fade"
//               >
//                 <p className="text-gray-200">{msg.text}</p>
//                 <p className="mt-3 text-sm text-gray-400">{new Date(msg.createdAt).toLocaleString()}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <style>{`
//         @keyframes fade {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0px); }
//         }
//         .animate-fade {
//           animation: fade 0.6s ease-in-out;
//         }
//         @keyframes bgMove {
//           0% { background-position: 0% 0%; }
//           50% { background-position: 100% 100%; }
//           100% { background-position: 0% 0%; }
//         }
//         .animate-bg {
//           background-size: 300% 300%;
//           animation: bgMove 18s ease infinite;
//         }
//       `}</style>
//     </div>
//   );
// }



"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import axios from "axios";
import { Loader2, Trash2, ArrowLeft, MessageCircle, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Pusher from "pusher-js";
export default function MessagesPage() {

  type MessageType = {
      _id?: string;
      text: string;
      userId: string;
      createdAt: string;
  }
  const {data: session} = useSession()
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    // 1. Connect to Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    // 2. Subscribe to this user's specific channel
    const channel = pusher.subscribe(`user-${session?.user?.id}`);

    // 3. Bind to the event
    channel.bind('new-message', (data: any) => {
        console.log('New NGL message received:', data);

        const newMsg: MessageType = {
          text: data.message,      
          userId: session!.user.id,
          createdAt: data.createdAt
        };

        setMessages((prev) => [newMsg, ...prev]);
        toast.success("New anonymous message!");
        // Optional: Play a sound or show a toast notification here
    });

    // Cleanup or when 1 new message arrives, your setMessages run 2 times
    return () => {
      pusher.unsubscribe(`user-${session?.user?.id}`);
    };
  }, [session?.user?.id]);



  async function loadMessages() {
    try {
      const res = await axios.get("/api/messages/get");
      setMessages(res.data.messages || []);
    } catch {
      toast.error("Failed to load messages.");
    }
    setLoading(false);
  }

  async function deleteAll() {
    try {
      await axios.delete("/api/messages/delete");
      toast.success("All messages deleted!");
      setMessages([]);
    } catch {
      toast.error("Failed to delete messages.");
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff006e] via-[#8338ec] to-[#3a86ff] overflow-hidden flex flex-col items-center py-10 px-4">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none fixed">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/30 blur-[100px] animate-blob mix-blend-overlay"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/30 blur-[100px] animate-blob animation-delay-2000 mix-blend-overlay"></div>
        <div className="absolute bottom-[20%] left-[20%] w-[30%] h-[30%] rounded-full bg-blue-500/30 blur-[100px] animate-blob animation-delay-4000 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl p-8 rounded-[2.5rem] bg-gradient-to-br from-pink-200/40 via-rose-100/30 to-orange-100/40 backdrop-blur-xl border border-pink-100/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] min-h-[600px] flex flex-col">
        
        <div className="flex flex-col items-center mb-8">
            <Link href="/dashboard" className="self-start mb-4">
                <Button variant="ghost" className="rounded-full hover:bg-white/30 text-pink-900 hover:text-pink-950 gap-2 pl-0 hover:pl-2 transition-all">
                    <ArrowLeft className="h-5 w-5" /> Back to Dashboard
                </Button>
            </Link>

            <div className="relative text-center">
                <Sparkles className="absolute -top-6 -right-8 h-8 w-8 text-yellow-300 animate-pulse" />
                <h1 className="text-4xl md:text-5xl font-black tracking-tight drop-shadow-sm text-pink-950">
                    Your Messages <br />
                    <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        Inbox 💬
                    </span>
                </h1>
            </div>
        </div>

        {!loading && messages.length > 0 && (
            <div className="flex justify-end mb-6">
                <Button 
                    onClick={deleteAll}
                    className="bg-white/40 hover:bg-red-500 hover:text-white text-red-600 border border-red-200/50 shadow-sm backdrop-blur-md rounded-xl gap-2 transition-all"
                >
                    <Trash2 className="h-4 w-4" /> Delete All
                </Button>
            </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center flex-1">
             <Loader2 className="h-10 w-10 animate-spin text-pink-600 mb-4" />
             <p className="text-pink-900/70 font-medium">Fetching your secret notes...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
             <div className="h-24 w-24 bg-white/30 rounded-full flex items-center justify-center mb-6 border border-white/40 shadow-inner">
                <MessageCircle className="h-12 w-12 text-pink-500" />
             </div>
             <h3 className="text-2xl font-bold text-pink-950 mb-2">No messages yet</h3>
             <p className="text-pink-900/80 max-w-sm text-lg">
                Share your link with friends to start receiving anonymous messages!
             </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className="group relative bg-white/60 hover:bg-white/90 backdrop-blur-md border border-white/50 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="absolute top-5 right-5 h-2 w-2 rounded-full bg-pink-400 opacity-50 group-hover:opacity-100 transition-opacity" />

                <p className="text-lg text-stone-800 font-medium leading-relaxed">
                    "{msg.text}"
                </p>
                
                <div className="mt-4 flex items-center gap-2 text-sm text-pink-900/60 font-semibold">
                    <Clock className="h-3.5 w-3.5" />
                    {new Date(msg.createdAt).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                    })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
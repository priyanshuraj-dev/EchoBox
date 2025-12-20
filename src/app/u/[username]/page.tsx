// "use client";

// import { useState, useEffect } from "react";
// import axios, { AxiosError } from "axios";
// import { toast } from "sonner";
// import { useParams, notFound } from "next/navigation";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Loader2 } from "lucide-react"; // Optional: for a nice spinner icon

// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { messageSchema } from "@/schemas/message";

// export default function SendMessagePage() {
//   const params = useParams();
//   const username = params.username as string;

//   const [isCheckingAuth, setIsCheckingAuth] = useState(true);
//   const [isSending, setIsSending] = useState(false);
//   const [targetUserId, setTargetUserId] = useState<string | null>(null);

//   const FormSchema = messageSchema.omit({ userId: true });

//   useEffect(() => {
//     async function checkUser() {
//       setIsCheckingAuth(true); // Start loading
//       try {
//         const res = await axios.get(`/api/user/${username}`);
        
//           setTargetUserId(res.data.user.userId);
//           setIsCheckingAuth(false); // Stop loading, show form
//       } catch (error) {
//         // If Axios throws an error (like 404 Not Found)
//         if (axios.isAxiosError(error) && error.response?.status === 404) {
//           notFound(); 
//         } else {
//           // Some other network error occurred
//           toast.error("Error connecting to server");
//           setIsCheckingAuth(false); 
//         }
//       }
//     }

//     if (username) checkUser();
//   }, [username]);

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: { text: "" },
//   });


//   const sendMessage = async (values: z.infer<typeof FormSchema>) => {
//     setIsSending(true);
//     try {
//       const res = await axios.post("/api/messages/send", {
//         userId: targetUserId,
//         text: values.text,
//       });

//       if (res.data.success) {
//         toast.success("Message sent successfully!");
//         form.reset();
//       } else {
//         toast.error(res.data.message || "Failed to send message");
//       }
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Something went wrong");
//     }
//     setIsSending(false);
//   };

//   // 2. BLANK LOADING SCREEN (Prevents the form from flashing on invalid users)
//   if (isCheckingAuth) {
//     return (
//       <div className="min-h-screen w-full bg-[#0A0A10] flex items-center justify-center text-white">
//         <Loader2 className="h-10 w-10 animate-spin text-purple-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen w-full bg-[#0A0A10] overflow-hidden text-white">
//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-fuchsia-700/10 to-black animate-bg"></div>
//       <div className="absolute top-20 -left-20 w-96 h-96 bg-fuchsia-600/30 rounded-full blur-[120px] animate-pulse"></div>
//       <div className="absolute bottom-20 -right-20 w-[420px] h-[420px] bg-purple-500/30 rounded-full blur-[140px] animate-pulse-fast"></div>

//       <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-xl">
//           Send a Message to @{username}
//         </h1>

//         <p className="mt-4 text-gray-300 text-center max-w-xl">
//           Your identity will remain <span className="text-pink-400">completely anonymous</span>.
//         </p>

//         <div className="mt-10 w-full max-w-md p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(sendMessage)} className="space-y-6">
//               <FormField
//                 control={form.control}
//                 name="text"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-200">Your Message</FormLabel>
//                     <FormControl>
//                       <textarea
//                         rows={4}
//                         placeholder="Write something nice... 💜"
//                         className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-pink-500/50 transition-colors"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className="text-pink-400" />
//                   </FormItem>
//                 )}
//               />

//               <Button
//                 type="submit"
//                 disabled={isSending || !targetUserId}
//                 className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-500 hover:to-purple-600 transition-all shadow-lg shadow-pink-700/20 rounded-xl"
//               >
//                 {isSending ? (
//                   <div className="flex items-center justify-center gap-2">
//                     <Loader2 className="h-5 w-5 animate-spin" />
//                     Sending...
//                   </div>
//                 ) : (
//                   "Send Anonymous Message"
//                 )}
//               </Button>
//             </form>
//           </Form>
//         </div>
//       </div>

//       <style jsx>{`
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

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useParams, notFound } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Heart, Sparkles } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { messageSchema } from "@/schemas/message";

export default function SendMessagePage() {
  const params = useParams();
  const username = params.username as string;

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [targetUserId, setTargetUserId] = useState<string | null>(null);

  const FormSchema = messageSchema.omit({ userId: true });

  useEffect(() => {
    async function checkUser() {
      setIsCheckingAuth(true);
      try {
        const res = await axios.get(`/api/user/${username}`);
        if (res.data.success && res.data.user?.userId) {
          setTargetUserId(res.data.user.userId);
          setIsCheckingAuth(false);
        } else {
          notFound();
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          notFound();
        } else {
          toast.error("Error connecting to server");
          setIsCheckingAuth(false);
        }
      }
    }
    if (username) checkUser();
  }, [username]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { text: "" },
  });

  const sendMessage = async (values: z.infer<typeof FormSchema>) => {
    if (!targetUserId) return;
    setIsSending(true);
    try {
      const res = await axios.post("/api/messages/send", {
        userId: targetUserId,
        text: values.text,
      });
      if (res.data.success) {
        toast.success("Message sent successfully! 💖");
        form.reset();
      } else {
        toast.error(res.data.message || "Failed to send message");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
    setIsSending(false);
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900 via-purple-900 to-black flex items-center justify-center text-white">
        <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff006e] via-[#8338ec] to-[#3a86ff] overflow-hidden flex items-center justify-center px-4 py-10">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/30 blur-[100px] animate-blob mix-blend-overlay"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/30 blur-[100px] animate-blob animation-delay-2000 mix-blend-overlay"></div>
        <div className="absolute bottom-[20%] left-[20%] w-[30%] h-[30%] rounded-full bg-blue-500/30 blur-[100px] animate-blob animation-delay-4000 mix-blend-overlay"></div>

      </div>

      <div className="relative z-10 w-full max-w-[500px] p-8 rounded-[2.5rem] bg-gradient-to-br from-pink-200/40 via-rose-100/30 to-orange-100/40 backdrop-blur-xl border border-pink-100/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex flex-col items-center text-pink-950">

        <div className="relative mb-6 text-center">
           <Sparkles className="absolute -top-6 -left-6 h-8 w-8 text-yellow-400 animate-pulse" />
           <h1 className="text-3xl md:text-4xl font-black tracking-tight drop-shadow-sm">
             Send a message to <br />
             <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
               @{username}
             </span> 
           </h1>
        </div>

        <p className="mb-8 text-pink-900/80 text-center text-sm font-medium tracking-wide bg-pink-900/10 px-4 py-2 rounded-full">
          🤫 Shhh... Your identity is <span className="text-pink-700 font-bold">secret</span>.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(sendMessage)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-pink-900 font-semibold pl-1">Your Secret Message</FormLabel>
                  <FormControl>
                    <textarea
                      rows={5}
                      placeholder="Type something sweet, funny, or mysterious... ✨"
                      className="w-full p-4 rounded-2xl bg-pink-50/50 border-2 border-pink-200/50 text-pink-900 placeholder-pink-400/70 resize-none text-lg font-medium transition-all duration-300 focus:outline-none focus:border-pink-400 focus:bg-pink-50/80 focus:shadow-[0_0_15px_rgba(236,72,153,0.2)]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 font-semibold" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSending || !targetUserId}
              className="w-full py-7 text-xl font-bold rounded-2xl bg-gradient-to-r from-[#ff0080] to-[#7928ca] hover:from-[#ff0080] hover:to-[#ff0080] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-pink-600/30 relative overflow-hidden group text-white"
            >
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              
              {isSending ? (
                <div className="flex items-center justify-center gap-3">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Sending Message...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Send It! <Heart className="h-6 w-6 animate-pulse text-pink-200 fill-pink-600" />
                </div>
              )}
            </Button>
          </form>
        </Form>
      </div>

      <style jsx>{`
        /* Blob Movement */
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



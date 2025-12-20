// "use client";
// import { signOut, useSession } from "next-auth/react";
// import Link from "next/link";
// import { useState } from "react";
// import { toast } from "sonner";

// export default function DashboardPage() {
//   // getServerSession can't be used , since it is a client side website
//   const { data:session, status } = useSession();
//   const [copied, setCopied] = useState(false);

//   if (status === "loading") {
//   return (
//     <div className="relative min-h-screen w-full bg-[#0A0A10] overflow-hidden text-white">

//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-fuchsia-700/10 to-black animate-bg"></div>
//       <div className="absolute top-20 -left-20 w-96 h-96 bg-fuchsia-600/30 rounded-full blur-[120px] animate-pulse"></div>
//       <div className="absolute bottom-20 -right-20 w-[420px] h-[420px] bg-purple-500/30 rounded-full blur-[140px] animate-pulse-fast"></div>

//       <div className="relative z-20 flex items-center justify-center min-h-screen">
//         <p className="text-purple-300 text-xl animate-pulse">
//           Loading your dashboard...
//         </p>
//       </div>

//       <style>{`
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


//   // ❌ NO SESSION → SHOW MESSAGE
//   if (!session) {
//     return (
//       <div className="relative min-h-screen w-full bg-[#0A0A10] overflow-hidden text-white">

//         {/* Background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-fuchsia-700/10 to-black animate-bg"></div>
//         <div className="absolute top-20 -left-20 w-96 h-96 bg-fuchsia-600/30 rounded-full blur-[120px] animate-pulse"></div>
//         <div className="absolute bottom-20 -right-20 w-[420px] h-[420px] bg-purple-500/30 rounded-full blur-[140px] animate-pulse-fast"></div>

//         <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-4">
//             You're not logged in
//           </h1>

//           <p className="text-gray-300 mb-8">
//             Please log in to access your dashboard and messages.
//           </p>

//           <Link
//             href="/login"
//             className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 hover:opacity-90 
//               transition-all shadow-lg shadow-pink-700/40"
//           >
//             Go to Login
//           </Link>
//         </div>

//         {/* Animations */}
//         <style>{`
//           @keyframes bgMove {
//             0% { background-position: 0% 0%; }
//             50% { background-position: 100% 100%; }
//             100% { background-position: 0% 0%; }
//           }
//           .animate-bg {
//             background-size: 300% 300%;
//             animation: bgMove 18s ease infinite;
//           }
//         `}</style>
//       </div>
//     );
//   }

//   // ✅ SESSION EXISTS → SHOW DASHBOARD
//   const username = session.user.username;
//   const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/u/${username}`;

//   const copyLink = () => {
//     navigator.clipboard.writeText(shareUrl);
//     setCopied(true);
//     toast.success("Link copied!");
//     setTimeout(() => setCopied(false), 1500);
//   };

//   return (
//     <div className="relative min-h-screen w-full bg-[#0A0A10] overflow-hidden text-white">

//       {/* Background animation */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-fuchsia-700/10 to-black animate-bg"></div>
//       <div className="absolute top-20 -left-20 w-96 h-96 bg-fuchsia-600/30 rounded-full blur-[120px] animate-pulse"></div>
//       <div className="absolute bottom-20 -right-20 w-[420px] h-[420px] bg-purple-500/30 rounded-full blur-[140px] animate-pulse-fast"></div>

//       <div className="relative z-20 px-6 pt-28 max-w-3xl mx-auto">

//       <button
//       onClick={() => signOut({ callbackUrl: "/login" })}
//       className="absolute top-6 right-6 px-4 py-2 rounded-lg 
//       bg-white/10 backdrop-blur-xl border border-white/20 
//       hover:bg-white/20 transition-all text-sm text-gray-200
//       shadow-lg shadow-purple-500/20"
//       >
//       Logout
//       </button>

//         <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-10">
//           Welcome, {username} 👋
//         </h1>

//         {/* Link card */}
//         <div className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl backdrop-blur-lg">
//           <p className="text-gray-300">Your Anonymous Message Link:</p>

//           <div className="mt-3 p-3 bg-black/30 border border-white/10 rounded-xl font-mono text-pink-300">
//             {shareUrl}
//           </div>

//           <button
//             onClick={copyLink}
//             className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 hover:opacity-90 
//             transition-all shadow-lg shadow-pink-700/40"
//           >
//             {copied ? "Copied!" : "Copy Link"}
//           </button>
//         </div>

//         {/* Go to messages */}
//         <Link
//           href="/dashboard/messages"
//           className="block mt-8 text-center px-10 py-4 text-lg rounded-xl 
//           bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-transform 
//           shadow-xl shadow-purple-700/40"
//         >
//           View Your Messages
//         </Link>
//       </div>

//       {/* Animations */}
//       <style>{`
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

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Sparkles, LogOut, Copy, Check, MessageSquareHeart } from "lucide-react";
import { Button } from "@/components/ui/button"; 

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [copied, setCopied] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900 via-purple-900 to-black flex items-center justify-center text-white">
        <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="relative min-h-screen w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff006e] via-[#8338ec] to-[#3a86ff] overflow-hidden flex items-center justify-center px-4">
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/30 blur-[100px] animate-blob mix-blend-overlay"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/30 blur-[100px] animate-blob animation-delay-2000 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 w-full max-w-[500px] p-8 rounded-[2.5rem] bg-gradient-to-br from-pink-200/40 via-rose-100/30 to-orange-100/40 backdrop-blur-xl border border-pink-100/40 shadow-2xl flex flex-col items-center text-pink-950 text-center">
          <h1 className="text-3xl font-black mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            You're not logged in
          </h1>
          <p className="text-pink-900/80 mb-8 font-medium">
            Please log in to access your dashboard and secret messages.
          </p>
          
          <Link href="/login" className="w-full">
            <Button className="w-full py-6 text-lg font-bold rounded-2xl bg-gradient-to-r from-[#ff0080] to-[#7928ca] hover:scale-[1.02] transition-all shadow-lg text-white">
              Go to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const username = session.user.username;
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/u/${username}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative min-h-screen w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff006e] via-[#8338ec] to-[#3a86ff] overflow-hidden flex items-center justify-center px-4 py-10">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/30 blur-[100px] animate-blob mix-blend-overlay"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/30 blur-[100px] animate-blob animation-delay-2000 mix-blend-overlay"></div>
        <div className="absolute bottom-[20%] left-[20%] w-[30%] h-[30%] rounded-full bg-blue-500/30 blur-[100px] animate-blob animation-delay-4000 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 w-full max-w-[600px] p-8 rounded-[2.5rem] bg-gradient-to-br from-pink-200/40 via-rose-100/30 to-orange-100/40 backdrop-blur-xl border border-pink-100/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex flex-col items-center text-pink-950">
        
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/40 border border-white/30 text-pink-900 transition-all shadow-sm group"
          title="Logout"
        >
          <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
        </button>

        <div className="relative mb-8 text-center mt-2">
           <Sparkles className="absolute -top-6 -left-8 h-8 w-8 text-yellow-400 animate-pulse" />
           <h1 className="text-3xl md:text-4xl font-black tracking-tight drop-shadow-sm">
             Welcome back, <br />
             <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
               {username}
             </span> 👋
           </h1>
        </div>

        <div className="w-full bg-white/30 rounded-3xl p-6 border border-white/40 shadow-inner mb-8">
          <p className="text-pink-900/80 font-bold mb-3 text-sm uppercase tracking-wider ml-1">
            Your Secret Link
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center">
             <div className="w-full p-4 rounded-2xl bg-pink-50/50 border-2 border-pink-200/50 text-pink-900 font-mono text-sm truncate select-all">
                {shareUrl}
             </div>

             <Button
                onClick={copyLink}
                className="w-full sm:w-auto py-6 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/20 transition-all"
             >
                {copied ? <Check className="h-5 w-5 text-white" /> : <Copy className="h-5 w-5 text-white" />}
             </Button>
          </div>
        </div>

        <Link href="/dashboard/messages" className="w-full group">
          <div className="relative w-full py-5 rounded-2xl bg-gradient-to-r from-[#7928ca] to-[#ff0080] shadow-lg shadow-purple-600/30 overflow-hidden flex items-center justify-center text-white text-xl font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            
            <div className="flex items-center gap-3 relative z-10">
               <MessageSquareHeart className="h-6 w-6 animate-bounce" /> 
               View Your Messages
            </div>
          </div>
        </Link>
      
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
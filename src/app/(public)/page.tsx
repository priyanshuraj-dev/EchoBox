// "use client";

// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <div className="relative min-h-screen w-full bg-[#0A0A10] overflow-hidden text-white">

//       {/* Animated Gradient Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-fuchsia-700/10 to-black animate-bg"></div>

//       {/* Neon Glow Blobs */}
//       <div className="absolute top-20 -left-20 w-96 h-96 bg-fuchsia-600/30 rounded-full blur-[120px] animate-pulse"></div>
//       <div className="absolute bottom-20 -right-20 w-[420px] h-[420px] bg-purple-500/30 rounded-full blur-[140px] animate-pulse-fast"></div>

//       {/* NAVBAR */}
//       <nav className="relative z-20 w-full flex justify-between items-center px-10 py-6 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg">
//         <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
//           WhisperBox
//         </h1>

//         <div className="flex gap-4">
//           <Link
//             href="/login"
//             className="px-5 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm"
//           >
//             Login
//           </Link>

//           <Link
//             href="/signup"
//             className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-700 hover:opacity-90 transition-all shadow-lg shadow-pink-600/40"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </nav>

//       {/* HERO SECTION */}
//       <section className="relative z-20 flex flex-col items-center justify-center text-center mt-32 px-6">
//         <h2 className="text-6xl md:text-7xl font-extrabold leading-tight drop-shadow-2xl">
//           Speak Freely,  
//           <span className="block bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text mt-2">
//             Stay Anonymous.
//           </span>
//         </h2>

//         <p className="mt-6 text-lg text-gray-300 max-w-2xl">
//           WhisperBox lets anyone send you anonymous, heartfelt, or funny messages.
//           No accounts for senders. No pressure. Just pure honesty.
//         </p>

//         <Link
//           href="/signup"
//           className="mt-10 px-10 py-4 text-lg rounded-xl bg-gradient-to-r 
//             from-pink-500 to-purple-600 hover:scale-110 transition-transform 
//             shadow-xl shadow-purple-700/40 hover:shadow-purple-600/60"
//         >
//           Create Your Anonymous Link
//         </Link>
//       </section>

//       {/* Floating Card Mockup (for depth) */}
//       <div className="absolute left-1/2 -translate-x-1/2 mt-20 z-10">
//         <div className="w-[340px] md:w-[420px] p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-float">
//           <p className="text-gray-200 text-center italic">
//             “Someone just told you…  
//             <span className="text-pink-400 font-semibold">You're awesome today 💖</span>”
//           </p>
//         </div>
//       </div>

//       {/* Custom Animations */}
//       <style>{`
//         @keyframes float {
//           0% { transform: translate(-50%, 0px); }
//           50% { transform: translate(-50%, -15px); }
//           100% { transform: translate(-50%, 0px); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
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

//         .animate-pulse-fast {
//           animation: pulse 2s infinite;
//         }
//       `}</style>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Sparkles, ArrowRight, LayoutDashboard, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { data: session } = useSession();

  const textColor = "text-[#4a044e]";

  return (
    <div className={`relative min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-50 via-white to-pink-100 overflow-hidden ${textColor} selection:bg-pink-200 selection:${textColor}`}>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-pink-200/30 blur-[100px] animate-blob mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-100/40 blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
      </div>

      <nav className="relative z-50 w-full flex justify-between items-center px-6 md:px-10 py-6">
        <div className="flex items-center gap-2">
           <div className="bg-white/60 p-2 rounded-full backdrop-blur-md border border-white/80 shadow-sm">
             <Sparkles className={`h-5 w-5 ${textColor} fill-current animate-pulse`} />
           </div>
           <h1 className="text-2xl md:text-3xl font-black tracking-wide drop-shadow-sm">
             WhisperBox
           </h1>
        </div>

        <div className="flex gap-4 items-center">
          {session ? (
            <div className="flex items-center gap-4">
              <span className="hidden md:block font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
                Hi, @{session.user?.username}
              </span>
              <Link href="/dashboard">
                <Button className={` text-white bg-pink-500 hover:scale-105 transition-all font-bold rounded-full px-6 shadow-xl`}>
                   Dashboard <LayoutDashboard className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <Link href="/login" className="hidden md:block font-bold hover:opacity-80 transition-opacity">
                Login
              </Link>
              <Link href="/signup">
                <Button className={`bg-white hover:bg-pink-50 ${textColor} border border-pink-100 backdrop-blur-md rounded-xl px-6 font-bold transition-all shadow-md`}>
                   Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      <section className="relative z-20 flex flex-col items-center justify-center text-center mt-12 md:mt-20 px-6 pb-20">
        
        <div className="mb-6 animate-fade-in-up">
           <span className={`px-5 py-2 rounded-full bg-white/40 border border-white/60 text-xs md:text-sm font-extrabold tracking-widest uppercase ${textColor} shadow-sm backdrop-blur-md flex items-center gap-2`}>
             <Heart className={`h-3 w-3 fill-current`} /> The #1 Anonymous App
           </span>
        </div>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight max-w-5xl drop-shadow-sm   ">
          Speak Freely. <br />
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-md px-2">
            Stay Secret.
          </span>
        </h2>

        <p className="mt-8 text-lg md:text-2xl font-bold leading-relaxed max-w-2xl opacity-90">
          Receive <span className="underline decoration-pink-400 decoration-4 underline-offset-4">honest</span> messages from your friends. 
          No accounts required for them.
        </p>

        <Link
          href={session ? "/dashboard" : "/signup"}
          className={`mt-12 group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white transition-all duration-300 bg-pink-500 rounded-full focus:outline-none hover:scale-105 shadow-[0_10px_40px_rgba(74,4,78,0.3)] hover:shadow-[0_10px_40px_rgba(74,4,78,0.5)]`}
        >
          <Zap className="w-6 h-6 mr-2 fill-yellow-400 text-yellow-400" />
          {session ? "Go to Dashboard" : "Get Your Link Now"}
          <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="relative w-full flex justify-center mt-24 perspective-1000">
          
          <div className="w-[320px] md:w-[460px] p-8 rounded-[2.5rem] bg-gradient-to-b from-pink-400 to-pink-600 shadow-[0_25px_60px_rgba(236,72,153,0.3)] animate-float text-center transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 text-white">
            
            <div className="flex justify-between items-center mb-8 opacity-80">
                <div className="h-2 w-20 bg-white/30 rounded-full"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-300"></div>
            </div>
            
            <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-4">
               New Message 💌
            </p>
            
            <p className="text-3xl md:text-4xl font-black leading-snug drop-shadow-md">
              “I’ve actually had a crush on you for <span className="text-yellow-300">years</span>! 🫢”
            </p>

            <div className="mt-10 w-full h-14 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
                <span className="text-white/60 font-bold text-sm">Type a reply...</span>
            </div>
          </div>

          <div className="absolute top-10 -z-10 w-[320px] md:w-[420px] h-[320px] bg-pink-500/30 rounded-full blur-[80px]"></div>

        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-20px) rotate(-1deg); }
          100% { transform: translateY(0px) rotate(-2deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite ease-in-out;
        }
        
        .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
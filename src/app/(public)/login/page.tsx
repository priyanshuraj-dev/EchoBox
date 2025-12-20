// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// import { signIn } from "next-auth/react";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { toast } from "sonner";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   FormControl,
// } from "@/components/ui/form";
// import { loginSchema } from "@/schemas/login";
// import Link from "next/link";

// export default function LoginPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const form = useForm<z.infer<typeof loginSchema>>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });


//   async function onSubmit(values: z.infer<typeof loginSchema>) {
//     setLoading(true);

//     try {
//       const res = await signIn("credentials", {
//         redirect: false,
//         email: values.email,
//         password: values.password,
//       });

//       if (res?.error) {
//         toast.error("Invalid email or password");
//         setLoading(false);
//         return;
//       }

//       toast.success("Logged in successfully!");

//       setTimeout(() => {
//         router.push("/dashboard");
//       }, 1200);

//     } catch (error: any) {
//       toast.error("Something went wrong");
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-[#0A0A10] overflow-hidden px-4">

//       {/* Glow Blobs */}
//       <div className="absolute top-16 left-10 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px]"></div>
//       <div className="absolute bottom-16 right-10 w-80 h-80 bg-pink-600/20 rounded-full blur-[100px]"></div>

//       {/* LOG-IN CARD */}
//       <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl text-white relative z-20">
//         <CardHeader>
//           <CardTitle className="text-center text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
//             Welcome Back
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

//               {/* Email */}
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-200">Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         className="bg-white/5 border-white/20 text-white placeholder-gray-400"
//                         placeholder="you@example.com"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className="text-pink-400" />
//                   </FormItem>
//                 )}
//               />

//               {/* Password */}
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-200">Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         className="bg-white/5 border-white/20 text-white placeholder-gray-400"
//                         placeholder="••••••••"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className="text-pink-400" />
//                   </FormItem>
//                 )}
//               />

//               {/* Login Button */}
//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-700 hover:opacity-90 shadow-pink-700/40 shadow-lg transition-all"
//               >
//                 {loading ? "Signing in..." : "Login"}
//               </Button>

//             </form>
//           </Form>

//           {/* Link to Signup */}
//           <p className="mt-4 text-center text-sm text-gray-300">
//             Don’t have an account?{" "}
//             <Link
//             href="/signup"
//             className="text-pink-400 hover:underline"
//           >
//             Sign Up
//           </Link>
//           </p>

//         </CardContent>
//       </Card>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { loginSchema } from "@/schemas/login";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Brand Colors
  const brandText = "text-[#4a044e]";

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.error) {
        toast.error("Invalid email or password");
        setLoading(false);
        return;
      }

      toast.success("Logged in successfully!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 500);

    } catch (error: any) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  }

  return (
    <div className={`relative min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-50 via-white to-pink-100 overflow-hidden px-4 selection:bg-pink-200 selection:${brandText}`}>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-pink-200/30 blur-[100px] animate-blob mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-100/40 blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
      </div>

      <Card className="w-full max-w-md bg-gradient-to-br from-[#fff7ed] via-[#fff1f2] to-[#fce7f3] backdrop-blur-xl border border-white/60 shadow-[0_20px_50px_rgba(255,182,193,0.4)] relative z-20 rounded-[2.5rem] p-4">
        
        <CardHeader>
           <div className="flex justify-center mb-2">
             <div className="bg-white/50 p-3 rounded-full backdrop-blur-md border border-white/60 shadow-sm">
                <Sparkles className={`h-6 w-6 ${brandText} fill-current animate-pulse`} />
             </div>
           </div>

          <CardTitle className={`text-center text-4xl font-black drop-shadow-sm tracking-tight ${brandText}`}>
            Welcome Back
          </CardTitle>
          <p className={`text-center ${brandText} opacity-80 font-medium text-sm mt-2`}>
            Enter your details to access your account
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`${brandText} font-bold ml-1`}>Email</FormLabel>
                    <FormControl>
                      <Input
                        className={`bg-white/60 border-white/60 ${brandText} placeholder:text-[#4a044e]/40 rounded-xl h-12 focus:bg-white/80 transition-all border-2 focus:border-pink-300 focus-visible:ring-0 focus-visible:ring-offset-0`}
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 font-bold ml-1 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`${brandText} font-bold ml-1`}>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className={`bg-white/60 border-white/60 ${brandText} placeholder:text-[#4a044e]/40 rounded-xl h-12 focus:bg-white/80 transition-all border-2 focus:border-pink-300 focus-visible:ring-0 focus-visible:ring-offset-0`}
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 font-bold ml-1 text-xs" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className={`w-full py-6 mt-4 bg-pink-500 hover:bg-pink-400 active:bg-pink-300 text-white font-bold text-lg rounded-xl shadow-lg shadow-pink-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-transparent`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" /> Signing in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>

            </form>
          </Form>

          <div className="text-center mt-6">
             <p className={`${brandText} opacity-80 text-sm font-medium`}>
               Don’t have an account?{" "}
               <Link 
                 href="/signup" 
                 className="font-bold hover:text-pink-600 hover:underline decoration-2 decoration-pink-400 underline-offset-4 transition-all"
               >
                 Sign Up
               </Link>
             </p>
          </div>

        </CardContent>
      </Card>

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
      `}</style>
    </div>
  );
}
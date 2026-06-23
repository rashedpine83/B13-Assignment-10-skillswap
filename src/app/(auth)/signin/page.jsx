"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  Button,
  Link,
  TextField,
  Label,
  InputGroup,
  Input,
} from "@heroui/react";

import { Eye, EyeSlash, At, ShieldKeyhole } from "@gravity-ui/icons";
import { signIn, authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  // =========================
  // VALIDATION
  // =========================
  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else {
      if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password = "Must contain at least one uppercase letter";
      } else if (!/[0-9]/.test(password)) {
        newErrors.password = "Must contain at least one number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // EMAIL SIGN IN
  // =========================
  const handleSignin = async (e) => {
    e.preventDefault();

    setSuccess("");
    setErrors({});

    if (!validate()) return;

    setIsLoading(true);

    try {
      const { error: authError } = await signIn.email({
        email: email.trim(),
        password,
      });

      if (authError) {
        setErrors({ form: authError.message || "Sign in failed" });
        setIsLoading(false);
        return;
      }

      // =========================
      // GET SESSION AFTER LOGIN
      // =========================
      const session = await authClient.getSession();

      const role = session?.data?.user?.role;

      setSuccess("Login successful");

      // =========================
      // ROLE BASED REDIRECT
      // =========================
      setTimeout(() => {
        if (role === "client") {
          router.push("/dashboard/client");
        } else if (role === "freelancer") {
          router.push("/dashboard/freelancer");
        } else if (role === "admin") {
          router.push("/dashboard/admin");
        } else {
          router.push("/");
        }
      }, 500);
    } catch (err) {
      setErrors({ form: "Something went wrong" });
    }

    setIsLoading(false);
  };

  // =========================
  // GOOGLE SIGN IN
  // =========================
  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      {/* LOGO */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-500">
          Sign in to your Skillswap account
        </p>
      </div>

      {/* GOOGLE LOGIN */}
      <Button
        type="button"
        onClick={handleGoogleSignUp}
        variant="bordered"
        className="w-full h-12 rounded-xl border border-cyan-100 hover:bg-cyan-50"
      >
        <Image
          src="https://www.google.com/favicon.ico"
          alt="Google"
          width={18}
          height={18}
        />
        <span className="ml-2">Continue with Google</span>
      </Button>

      {/* DIVIDER */}
      <div className="relative my-6">
        <div className="border-t border-zinc-200"></div>
        <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-xs text-zinc-500">
          or sign in with email
        </span>
      </div>

      {/* FORM */}
      <form onSubmit={handleSignin} className="space-y-5">
        {/* EMAIL */}
        <TextField>
          <Label>Email</Label>

          <InputGroup className="border border-cyan-100 rounded-xl px-3">
            <At size={18} />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </InputGroup>

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </TextField>

        {/* PASSWORD */}
        <TextField>
          <Label>Password</Label>

          <InputGroup className="border border-purple-100 rounded-xl px-3">
            <ShieldKeyhole size={18} />

            <Input
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />

            <button type="button" onClick={toggleVisibility}>
              {isVisible ? <EyeSlash /> : <Eye />}
            </button>
          </InputGroup>

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </TextField>

        {/* FORM ERROR */}
        {errors.form && (
          <div className="text-sm p-3 rounded-xl bg-red-100 text-red-700">
            {errors.form}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="text-sm p-3 rounded-xl bg-green-100 text-green-700">
            {success}
          </div>
        )}

        {/* SUBMIT */}
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold"
        >
          Sign In
        </Button>

        {/* FOOTER */}
        <div className="text-center text-sm">
          Don’t have an account?{" "}
          <Link href="/signup">
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent font-semibold">
              Create Account
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import {
//   Card,
//   Button,
//   Link,
//   TextField,
//   Label,
//   InputGroup,
//   Input,
// } from "@heroui/react";

// import { Eye, EyeSlash, At, ShieldKeyhole } from "@gravity-ui/icons";
// import { signIn, authClient } from "@/lib/auth-client";
// import Image from "next/image";

// export default function SigninPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [imageUrl, setImageUrl] = useState("");

//   const [isVisible, setIsVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState("");

//   const toggleVisibility = () => setIsVisible(!isVisible);

//   const validate = () => {
//     const newErrors = {};

//     // Email validation
//     if (!email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     // Password validation
//     if (!password) {
//       newErrors.password = "Password is required";
//     } else {
//       if (password.length < 8) {
//         newErrors.password = "Password must be at least 8 characters";
//       } else if (!/[A-Z]/.test(password)) {
//         newErrors.password =
//           "Password must contain at least one uppercase letter";
//       } else if (!/[0-9]/.test(password)) {
//         newErrors.password = "Password must contain at least one number";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSignin = async (e) => {
//     e.preventDefault();

//     setSuccess("");

//     if (!validate()) return;

//     setIsLoading(true);

//     try {
//       const { error: authError } = await signIn.email({
//         email: email.trim(),
//         password,
//       });

//       if (authError) {
//         setErrors({ form: authError.message || "Sign in failed" });
//       } else {
//         setSuccess("Login successful");
//       }
//     } catch {
//       setErrors({ form: "Something went wrong" });
//     }

//     setIsLoading(false);
//   };

//   const handleGoogleSignUp = async () => {
//     await authClient.signIn.social({
//       provider: "google",
//       callbackURL: "/",
//     });
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-slate-50">
//       {/* LOGO */}
//       <div className="flex-shrink-0  py-4">
//         <Link href="/" className="flex items-center gap-3 mx-auto">
//           <div className="leading-none">
//             <Image
//               src="/images/logo1.png"
//               alt="logo"
//               width={100}
//               height={100}
//             />
//           </div>
//         </Link>
//       </div>
//       {/* HEADER */}
//       <div className="text-center mb-6">
//         <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
//           Welcome Back
//         </h1>
//         <p className="text-zinc-500 mt-2">Sign in to your Skillswap account</p>
//       </div>

//       {/* GOOGLE LOGIN */}
//       <Button
//         type="button"
//         onClick={handleGoogleSignUp}
//         variant="bordered"
//         className="w-full h-12 rounded-xl border border-cyan-100 hover:bg-cyan-50"
//       >
//         <Image
//           src="https://www.google.com/favicon.ico"
//           alt="Google"
//           width={18}
//           height={18}
//         />
//         <span className="ml-2">Continue with Google</span>
//       </Button>

//       {/* DIVIDER */}
//       <div className="relative my-6">
//         <div className="border-t border-zinc-200"></div>
//         <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-xs text-zinc-500">
//           or sign in with email
//         </span>
//       </div>

//       {/* FORM */}
//       <form onSubmit={handleSignin} className="space-y-5">
//         {/* EMAIL */}
//         <TextField>
//           <Label>
//             Email <span className="text-red-500">*</span>
//           </Label>

//           <InputGroup className="border border-cyan-100 rounded-xl px-3">
//             <At size={18} />
//             <Input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="admin@example.com"
//               className="w-full"
//             />
//           </InputGroup>

//           {errors.email && (
//             <p className="text-sm text-red-500 mt-1">{errors.email}</p>
//           )}
//         </TextField>

//         {/* PASSWORD */}
//         <TextField>
//           <Label>
//             Password <span className="text-red-500">*</span>
//           </Label>

//           <InputGroup className="border border-purple-100 rounded-xl px-3">
//             <ShieldKeyhole size={18} />

//             <Input
//               type={isVisible ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="********"
//               className="w-full"
//             />

//             <button type="button" onClick={toggleVisibility}>
//               {isVisible ? <EyeSlash /> : <Eye />}
//             </button>
//           </InputGroup>

//           <p className="text-xs text-zinc-500 mt-1">
//             Must be at least 8 characters with 1 uppercase and 1 number
//           </p>

//           {errors.password && (
//             <p className="text-sm text-red-500 mt-1">{errors.password}</p>
//           )}
//         </TextField>

//         {/* FORM ERROR */}
//         {errors.form && (
//           <div className="text-sm p-3 rounded-xl bg-red-100 text-red-700">
//             {errors.form}
//           </div>
//         )}

//         {/* SUCCESS */}
//         {success && (
//           <div className="text-sm p-3 rounded-xl bg-green-100 text-green-700">
//             {success}
//           </div>
//         )}

//         {/* SUBMIT */}
//         <Button
//           type="submit"
//           isLoading={isLoading}
//           className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold"
//         >
//           Sign In
//         </Button>

//         {/* FOOTER */}
//         <div className="text-center text-sm">
//           Do not have an account?{" "}
//           <Link href="/signup">
//             <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent font-semibold">
//               Create Account
//             </span>
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }

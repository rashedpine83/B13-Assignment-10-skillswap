"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Link,
  TextField,
  Label,
  InputGroup,
  Input,
  TextArea,
} from "@heroui/react";

import { Eye, EyeSlash, Person, At, ShieldKeyhole } from "@gravity-ui/icons";
import { authClient, signUp } from "@/lib/auth-client";
import Image from "next/image";
import { createUser } from "@/lib/actions/users";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [imageUrl, setImageUrl] = useState("");

  const [role, setRole] = useState("client");

  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  // ✅ VALIDATION
  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Full name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else {
      if (password.length < 8) {
        newErrors.password = "Min 8 characters required";
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password = "At least 1 uppercase letter required";
      } else if (!/[0-9]/.test(password)) {
        newErrors.password = "At least 1 number required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // EMAIL SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();

    setErrors({});
    setSuccess("");
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      return;
    }

    try {
      const skillsArray =
        role === "freelancer"
          ? skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean) // remove empty
          : [];

      const userData = {
        name,
        email,
        password,
        role,
        callbackURL: "/",
      };

      if (role === "freelancer") {
        userData.skills = skillsArray;
        userData.bio = bio.trim();
        userData.hourlyRate = Number(hourlyRate) || 0;
      }

      const { error: authError } = await signUp.email(userData);

      if (authError) {
        setErrors({ form: authError.message });
        setIsLoading(false);
        return;
      }

      // IMPORTANT: store SAME cleaned data in DB
      await createUser({
        name,
        email,
        role,
        skills: skillsArray,
        bio: bio.trim(),
        hourlyRate: Number(hourlyRate) || 0,
      });

      setSuccess("Account created successfully");
    } catch (error) {
      console.log("SIGNUP ERROR:", error);
      setErrors({
        form: error?.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  //   try {
  //     const userData = {
  //       name,
  //       email,
  //       password,
  //       role,
  //       imageUrl,
  //       skills,
  //       bio,
  //       hourlyRate,
  //       callbackURL: "/",
  //     };

  //     if (role === "freelancer") {
  //       userData.skills = skills.split(",").map((item) => item.trim());
  //       userData.bio = bio;
  //       userData.hourlyRate = hourlyRate;
  //     }

  //     const { error: authError } = await signUp.email(userData);

  //     if (authError) {
  //       setErrors({ form: authError.message });
  //     } else {
  //       setSuccess("Account created successfully");
  //     }
  //   } catch {
  //     setErrors({ form: "Something went wrong" });
  //   }

  //   setIsLoading(false);
  // };

  // GOOGLE SIGNUP
  const handleGoogleSignUp = async () => {
    try {
      localStorage.setItem(
        "signupData",
        JSON.stringify({
          role,
        }),
      );

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/google-callback",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex justify-center">
      <Card className="w-full max-w-lg p-6 bg-slate-50">
        {/* LOGO */}
        <div className="flex-shrink-0  py-4">
          <Link href="/" className="flex items-center gap-3 mx-auto">
            <div className="leading-none">
              <Image
                src="/images/logo1.png"
                alt="logo"
                width={100}
                height={100}
              />
            </div>
          </Link>
        </div>
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-zinc-500 mt-2">
            Join thousands of professionals on Skillswap
          </p>
        </div>
        {/* Role Selection */}{" "}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {" "}
          <button
            type="button"
            onClick={() => setRole("client")}
            className={`p-5 rounded-2xl border transition-all ${role === "client" ? "border-cyan-400 bg-cyan-50" : "border-zinc-200"}`}
          >
            {" "}
            <div className="flex flex-col items-center">
              {" "}
              <Person size={20} />{" "}
              <h2 className="font-semibold mt-2">Client</h2>{" "}
              <p className="text-xs text-zinc-500">Hire talent</p>{" "}
            </div>{" "}
          </button>{" "}
          <button
            type="button"
            onClick={() => setRole("freelancer")}
            className={`p-5 rounded-2xl border transition-all ${role === "freelancer" ? "border-purple-400 bg-purple-50" : "border-zinc-200"}`}
          >
            {" "}
            <div className="flex flex-col items-center">
              {" "}
              <ShieldKeyhole size={20} />{" "}
              <h2 className="font-semibold mt-2">Freelancer</h2>{" "}
              <p className="text-xs text-zinc-500">Find work</p>{" "}
            </div>{" "}
          </button>{" "}
        </div>
        {/* GOOGLE */}
        <Button
          type="button"
          onClick={handleGoogleSignUp}
          variant="bordered"
          className="w-full h-12 rounded-xl border border-cyan-100"
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
        <form onSubmit={handleSignup} className="space-y-5 mt-6">
          {/* NAME */}
          <TextField>
            <Label>
              Full Name <span className="text-red-500">*</span>
            </Label>

            <InputGroup className="border rounded-xl px-3">
              <Person size={18} />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
            </InputGroup>

            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </TextField>

          {/* EMAIL */}
          <TextField>
            <Label>
              Email <span className="text-red-500">*</span>
            </Label>

            <InputGroup className="border rounded-xl px-3">
              <At size={18} />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </InputGroup>

            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </TextField>

          {/* PASSWORD */}
          <TextField>
            <Label>
              Password <span className="text-red-500">*</span>
            </Label>

            <InputGroup className="border rounded-xl px-3">
              <ShieldKeyhole size={18} />
              <Input
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />

              <button type="button" onClick={toggleVisibility}>
                {isVisible ? <EyeSlash /> : <Eye />}
              </button>
            </InputGroup>

            <p className="text-xs text-zinc-500 mt-1">
              Must be 8+ chars, 1 uppercase, 1 number
            </p>

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </TextField>

          {/* IMAGE URL ✅ NEW */}
          {/* <TextField>
            <Label>
              Image URL <span className="text-red-500">*</span>
            </Label>

            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="border rounded-xl px-3 h-10 w-full"
            />

            {errors.imageUrl && (
              <p className="text-red-500 text-sm">{errors.imageUrl}</p>
            )}
          </TextField> */}

          {/* FREELANCER */}
          {role === "freelancer" && (
            <div className="border rounded-2xl p-5 bg-gradient-to-br from-cyan-50 to-purple-50">
              <TextField>
                <Label>Skills</Label>
                <Input
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </TextField>

              <TextField>
                <Label>Bio</Label>
                <TextArea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </TextField>

              <TextField>
                <Label>Hourly Rate</Label>
                <Input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                />
              </TextField>
            </div>
          )}

          {/* ERROR */}
          {errors.form && (
            <div className="p-3 bg-red-100 text-red-700 rounded-xl">
              {errors.form}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="p-3 bg-cyan-100 text-cyan-700 rounded-xl">
              {success}
            </div>
          )}

          {/* BUTTON */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
          >
            Create Account
          </Button>
        </form>
      </Card>
    </div>
  );
}

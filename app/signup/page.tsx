"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Building2,
  Home,
} from "lucide-react";

type SignupFormInputs = {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: "tenant" | "landlord";
};

export default function SignupPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormInputs>();

  const onSubmit = async (data: SignupFormInputs) => {
    setIsLoading(true);
    try {
      const res = await registerUser(
        data.name,
        data.email,
        data.mobile,
        data.password,
        data.role
      );

      if (res.message === "User Registered Successfully") {
        alert("Registration successful! Please login.");
        router.push("/login");
        reset();
      } else {
        alert(res.message || "Registration failed");
      }
    } catch (error) {
      alert("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Professional background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-transparent to-indigo-600/10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Card */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

          <CardHeader className="text-center pb-6 pt-8">
            {/* Logo */}
            <div className="mx-auto mb-6 relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                <Home className="w-3 h-3 text-white" />
              </div>
            </div>

            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              Create Account
            </CardTitle>
            <CardDescription className="text-slate-600 text-base">
              Join thousands of property managers
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-8 pb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-slate-700 font-semibold flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Full Name
                </Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-12 h-12 border-2 border-slate-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl bg-slate-50/50 hover:bg-white transition-all duration-200"
                    {...register("name", {
                      required: "Name is required",
                      minLength: { value: 3, message: "Minimum 3 characters" },
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-slate-700 font-semibold flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-12 h-12 border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl bg-slate-50/50 hover:bg-white transition-all duration-200"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Mobile Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="mobile"
                  className="text-slate-700 font-semibold flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Mobile Number
                </Label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                  <Input
                    id="mobile"
                    type="text"
                    placeholder="Enter 10-digit mobile number"
                    className="pl-12 h-12 border-2 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl bg-slate-50/50 hover:bg-white transition-all duration-200"
                    {...register("mobile", {
                      required: "Mobile is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Invalid mobile number",
                      },
                    })}
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      {errors.mobile.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-slate-700 font-semibold flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-12 h-12 border-2 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 rounded-xl bg-slate-50/50 hover:bg-white transition-all duration-200"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters" },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Role Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="role"
                  className="text-slate-700 font-semibold flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Select Role
                </Label>
                <div className="relative">
                  <select
                    id="role"
                    {...register("role", { required: "Role is required" })}
                    className="w-full h-12 border-2 border-slate-200 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-xl bg-slate-50/50 hover:bg-white transition-all duration-200 px-4"
                  >
                    <option value="">-- Select Role --</option>
                    <option value="tenant">Tenant</option>
                    <option value="landlord">Landlord</option>
                  </select>
                </div>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="pt-2">
                <p className="text-sm text-slate-600 leading-relaxed">
                  By creating an account, you agree to our{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold h-12 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating your account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Create Account
                  </div>
                )}
              </Button>
            </form>
            {/* Sign In Link */}
            <div className="text-center pt-4">
              <p className="text-slate-600">
                {"Already have an account? "}
                <a
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all"
                >
                  Sign In
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm font-medium">
            © 2024 RentHome • Trusted by 10,000+ property managers
          </p>
        </div>
      </div>
    </div>
  );
}

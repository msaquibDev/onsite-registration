// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, Eye, EyeOff, Fingerprint } from "lucide-react";
import Footer from "@/components/Footer";
import { Head } from "react-day-picker";
import Header from "@/components/Header";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRobotChecked, setIsRobotChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isRobotChecked) {
      toast({
        title: "Verification Required",
        description: "Please confirm you're not a robot.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (email && password) {
        localStorage.setItem("isLoggedIn", "true");
        toast({
          title: "Success",
          description: "You have been logged in successfully.",
        });
        router.push("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header> */}
      <Header showBackButton={false} showSignOut={false} />

      {/* Main Content with page background */}
      <main
        className="flex-1 flex items-center justify-center p-4"
        style={{ backgroundColor: "#000000A6" }}
      >
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">
          {/* Left Side - Login Form */}
          <div className="p-8 md:p-10" style={{ backgroundColor: "#FCEDDE" }}>
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-8">Login</h1>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter Email id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 h-11 border-gray-200 focus:border-[#D96F28] focus:ring-[#D96F28] bg-white rounded-lg"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 pr-10 h-11 border-gray-200 focus:border-[#D96F28] focus:ring-[#D96F28] bg-white rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-[#D96F28] hover:text-[#c05d20] hover:underline"
                    onClick={() => {
                      toast({
                        title: "Forgot Password",
                        description:
                          "Please contact administrator to reset your password.",
                      });
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* reCAPTCHA Area */}
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="robot"
                      checked={isRobotChecked}
                      onCheckedChange={(checked) =>
                        setIsRobotChecked(checked as boolean)
                      }
                      className="w-5 h-5 border-gray-300 data-[state=checked]:bg-[#D96F28] data-[state=checked]:border-[#D96F28]"
                    />
                    <Label
                      htmlFor="robot"
                      className="text-sm text-gray-700 cursor-pointer flex items-center gap-2"
                    >
                      <Fingerprint className="w-4 h-4" />
                      I'm not a robot
                    </Label>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 pl-8">
                    reCAPTCHA protected
                  </div>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full h-11 text-base font-semibold bg-[#D96F28] hover:bg-[#c05d20] transition-colors rounded-lg shadow-md hover:shadow-lg"
                  style={{ backgroundColor: "#D96F28" }}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Side - Image */}
          <div
            className="hidden md:block relative bg-cover bg-center"
            style={{ backgroundImage: "url('/login-image.jpg')" }}
          >
            {/* You can replace with actual image path */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

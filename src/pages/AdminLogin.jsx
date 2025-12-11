import React, { useState, useEffect } from "react";
import {
  Lock,
  Mail,
  ArrowRight,
  LayoutDashboard,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check if already logged in - redirect to admin dashboard
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already logged in, redirect to admin dashboard
        navigate("/admin", { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect will happen automatically via useEffect when auth state changes
    } catch (err) {
      console.error(err);
      let msg = "Failed to login. Please check credentials.";
      if (err.code === "auth/invalid-email") msg = "Invalid email address.";
      if (err.code === "auth/user-not-found")
        msg = "No user found with this email.";
      if (err.code === "auth/wrong-password") msg = "Incorrect password.";
      if (err.code === "auth/invalid-credential") msg = "Invalid credentials.";
      if (err.code === "auth/too-many-requests")
        msg = "Too many login attempts. Please try again later.";
      setError(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 border border-white/20 rounded-full"></div>
          <div className="absolute top-40 left-40 w-96 h-96 border border-white/10 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 border border-white/20 rounded-full"></div>
        </div>

        {/* Gradient Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px]"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/30">
              <LayoutDashboard className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                UDYAM
              </h1>
              <p className="text-sm text-slate-400 tracking-widest uppercase">
                Admin Portal
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Manage Registrations
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Effortlessly
            </span>
          </h2>

          <p className="text-slate-400 text-lg max-w-md">
            Access the control panel to review, approve, and manage UDYAM
            registration applications.
          </p>
          {/* 
                    <div className="mt-12 flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-3xl font-black text-white">500+</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Registrations</p>
                        </div>
                        <div className="w-px h-12 bg-slate-700"></div>
                        <div className="text-center">
                            <p className="text-3xl font-black text-white">98%</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Approval Rate</p>
                        </div>
                        <div className="w-px h-12 bg-slate-700"></div>
                        <div className="text-center">
                            <p className="text-3xl font-black text-white">24/7</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Availability</p>
                        </div>
                    </div> */}
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <LayoutDashboard className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">UDYAM</h1>
              <p className="text-[10px] text-slate-400 tracking-widest uppercase">
                Admin Portal
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome Back
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Sign in to your admin account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="email"
                      required
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white text-gray-900"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white text-gray-900"
                      placeholder="••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 ${isLoading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
                    }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center">
                🔒 Secure Login • Authorized Personnel Only
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-slate-500 mt-6">
            © 2025 UDYAM Registration Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

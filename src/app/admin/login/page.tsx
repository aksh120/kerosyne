"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // SECURITY: Credentials are validated server-side, never in the client bundle
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setError("TOO MANY ATTEMPTS. PLEASE WAIT A FEW MINUTES.");
        return;
      }

      if (!res.ok || !data.success) {
        setError("INVALID EMAIL OR PASSWORD. PLEASE TRY AGAIN.");
        return;
      }

      // Store session token securely
      localStorage.setItem("kerosyne_admin_auth", "true");
      localStorage.setItem("kerosyne_admin_token", data.token);
      router.push("/admin");
    } catch {
      setError("CONNECTION ERROR. PLEASE TRY AGAIN.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md border-[4px] border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
      >
        {/* Decorative corner elements */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-black translate-x-8 -translate-y-8 rotate-45" />
        
        <div className="mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            ADMIN LOGIN
          </h1>
          <p className="text-black/60 font-bold uppercase text-sm">
            Kerosyne Store Management
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-black uppercase tracking-widest">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-[3px] border-black rounded-none focus:outline-none focus:bg-black/5 font-bold transition-all"
                placeholder="EMAIL@EXAMPLE.COM"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-black uppercase tracking-widest">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-[3px] border-black rounded-none focus:outline-none focus:bg-black/5 font-bold transition-all"
                placeholder="••••••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-black text-white font-black uppercase text-xs tracking-widest border-[2px] border-white">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full group flex items-center justify-center space-x-3 bg-black text-white py-5 font-black uppercase tracking-widest hover:bg-white hover:text-black border-[3px] border-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{loading ? "Verifying..." : "Log In Now"}</span>
            {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t-[2px] border-black/10 flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-black/40 uppercase">System Status</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 animate-pulse" />
              <p className="text-xs font-black uppercase">Healthy</p>
            </div>
          </div>
          <p className="text-[10px] font-bold text-black/60 uppercase">v1.0.43</p>
        </div>
      </motion.div>
    </div>
  );
}

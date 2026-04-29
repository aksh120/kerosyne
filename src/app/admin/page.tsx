"use client";

import React from "react";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { name: "Total Revenue", value: "₹2,42,890", change: "+12.5%", trend: "up", icon: DollarSign },
  { name: "Active Orders", value: "156", change: "+4.2%", trend: "up", icon: ShoppingBag },
  { name: "Total Users", value: "2,420", change: "-1.1%", trend: "down", icon: Users },
  { name: "Avg Order Value", value: "₹1,274", change: "+8.9%", trend: "up", icon: TrendingUp },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter">Overview</h1>
          <p className="text-black/60 font-bold uppercase tracking-widest mt-2">Real-time status of Kerosyne store</p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-[10px] font-black uppercase text-black/40">Last Updated</p>
          <p className="font-bold uppercase tabular-nums">2026.04.29 / 23:46:39</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="border-[4px] border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-default group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-black text-white">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center space-x-1 font-black text-xs uppercase ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                <span>{stat.change}</span>
                {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <h3 className="text-black/60 font-bold uppercase text-xs tracking-widest mb-1">{stat.name}</h3>
            <p className="text-3xl font-black tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border-[4px] border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tight italic">Sales Graph</h2>
            <div className="flex space-x-4">
              <span className="text-xs font-black uppercase px-2 py-1 bg-black text-white cursor-pointer">Week</span>
              <span className="text-xs font-black uppercase px-2 py-1 hover:bg-black/5 cursor-pointer">Month</span>
            </div>
          </div>
          <div className="h-64 bg-black/5 border-[2px] border-dashed border-black/20 flex items-center justify-center relative overflow-hidden">
             {/* Simple visual representation of a chart */}
             <div className="absolute inset-0 flex items-end px-4 space-x-2">
                {[40, 70, 45, 90, 65, 80, 50, 100, 85, 75, 95, 60].map((h, i) => (
                  <div key={i} className="flex-1 bg-black" style={{ height: `${h}%` }} />
                ))}
             </div>
             <p className="z-10 font-black uppercase text-xs bg-white px-4 py-2 border-[2px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Loading data...</p>
          </div>
        </div>

        <div className="border-[4px] border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black uppercase tracking-tight italic mb-8">Recent Activity</h2>
          <div className="space-y-6">
            {[
              { time: "2m ago", action: "NEW ORDER", detail: "ORD-0034 by Arjun Sharma" },
              { time: "15m ago", action: "NEW USER", detail: "New customer joined: Rahul" },
              { time: "1h ago", action: "STOCK ALERT", detail: "Oversized Tee (M) - LOW STOCK" },
              { time: "2h ago", action: "NEW REVIEW", detail: "5 stars by Siddharth" },
            ].map((log, i) => (
              <div key={i} className="flex space-x-4 text-xs">
                <span className="font-bold text-black/40 whitespace-nowrap">{log.time}</span>
                <div>
                  <p className="font-black uppercase mb-1">{log.action}</p>
                  <p className="font-bold text-black/60">{log.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

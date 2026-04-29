"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  UserPlus, 
  Shield, 
  User as UserIcon,
  Mail,
  Calendar,
  MoreVertical
} from "lucide-react";
import { adminFetch } from "@/lib/admin-fetch";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  joined: string;
}

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    adminFetch("/api/users")
      .then(res => res.json())
      .then(data => {
        // SECURITY/STABILITY: Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("API returned non-array data. Check if you are logged in. Data received:", data);
          setUsers([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const filteredUsers = Array.isArray(users) 
    ? users.filter(u => 
        u.name?.toLowerCase().includes(search.toLowerCase()) || 
        u.email?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">Users List</h1>
          <p className="text-black/60 font-bold uppercase tracking-widest mt-2">Database of registered Kerosyne customers</p>
        </div>
        <button className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest flex items-center space-x-2 border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
          <UserPlus className="w-5 h-5" />
          <span>New User</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-black/40" />
        <input 
          type="text"
          placeholder="SEARCH BY NAME OR EMAIL..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-14 pr-6 py-5 border-[4px] border-black rounded-none font-black uppercase tracking-widest focus:outline-none focus:bg-black/5"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center font-black uppercase tracking-widest animate-pulse">Loading data...</div>
        ) : filteredUsers.map((user) => (
          <div key={user.id} className="border-[4px] border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center border-[2px] border-black">
                {user.role === "Admin" ? <Shield className="w-6 h-6" /> : <UserIcon className="w-6 h-6" />}
              </div>
              <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-widest border-[2px] border-black ${user.role === "Admin" ? "bg-black text-white" : "bg-white text-black"}`}>
                {user.role}
              </span>
            </div>
            
            <h3 className="text-xl font-black uppercase tracking-tight mb-4">{user.name}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-xs">
                <Mail className="w-4 h-4 text-black/40" />
                <span className="font-bold uppercase tracking-tight">{user.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <Calendar className="w-4 h-4 text-black/40" />
                <span className="font-bold text-black/60">Joined: {user.joined}</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t-[2px] border-black/10 flex justify-end">
              <button className="text-[10px] font-black uppercase tracking-widest hover:underline">Manage User</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

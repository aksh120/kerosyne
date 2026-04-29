"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  MoreHorizontal, 
  ChevronRight,
  Filter,
  ArrowUpDown,
  CheckCircle,
  Clock,
  Truck,
  Trash2
} from "lucide-react";
import { motion } from "framer-motion";
import { adminFetch } from "@/lib/admin-fetch";

interface Order {
  id: string;
  customer: string;
  email: string;
  status: string;
  total: number;
  date: string;
}

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    adminFetch("/api/orders")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Processing": return <Clock className="w-4 h-4 text-yellow-500" />;
      case "Shipped": return <Truck className="w-4 h-4 text-blue-500" />;
      default: return null;
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const updated = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
    setOrders(updated);
    try {
      await adminFetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("ARE YOU SURE YOU WANT TO REMOVE THIS ORDER RECORD?")) return;
    
    try {
      const res = await adminFetch(`/api/orders?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setOrders(prev => prev.filter(o => o.id !== id));
      } else {
        alert("Failed to delete from database");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredOrders = Array.isArray(orders) 
    ? orders.filter(o => 
        o.customer?.toLowerCase().includes(search.toLowerCase()) || 
        o.id?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-black uppercase tracking-tighter italic">Orders List</h1>
        <p className="text-black/60 font-bold uppercase tracking-widest mt-2">Monitor store sales and delivery</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-black/40" />
          <input 
            type="text"
            placeholder="FILTER BY ID OR CUSTOMER..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-5 border-[4px] border-black rounded-none font-black uppercase tracking-widest focus:outline-none focus:bg-black/5"
          />
        </div>
        <button className="px-6 border-[4px] border-black hover:bg-black hover:text-white transition-all">
          <Filter className="w-6 h-6" />
        </button>
      </div>

      <div className="border-[4px] border-black overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black text-white border-b-[4px] border-black">
              <tr>
                <th className="px-6 py-4 font-black uppercase text-xs tracking-widest">Order ID</th>
                <th className="px-6 py-4 font-black uppercase text-xs tracking-widest">Customer</th>
                <th className="px-6 py-4 font-black uppercase text-xs tracking-widest">Status</th>
                <th className="px-6 py-4 font-black uppercase text-xs tracking-widest">Total</th>
                <th className="px-6 py-4 font-black uppercase text-xs tracking-widest">Date</th>
                <th className="px-6 py-4 font-black uppercase text-xs tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-[2px] divide-black">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center font-black uppercase">Loading data...</td>
                </tr>
              ) : filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-black/5 transition-colors group">
                  <td className="px-6 py-4 font-black tabular-nums">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-black uppercase text-sm">{order.customer}</span>
                      <span className="text-[10px] font-bold text-black/40">{order.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className="font-bold uppercase text-xs tracking-widest">{order.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-black tabular-nums">₹{order.total}</td>
                  <td className="px-6 py-4 font-bold tabular-nums text-black/60">{order.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      {/* Status Toggle Actions */}
                      <button 
                        onClick={() => updateStatus(order.id, "Processing")}
                        title="Mark as Processing"
                        className={`p-2 border-[2px] border-black transition-all ${order.status === "Processing" ? "bg-black text-white" : "hover:bg-black/5"}`}
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => updateStatus(order.id, "Shipped")}
                        title="Mark as Shipped"
                        className={`p-2 border-[2px] border-black transition-all ${order.status === "Shipped" ? "bg-black text-white" : "hover:bg-black/5"}`}
                      >
                        <Truck className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => updateStatus(order.id, "Delivered")}
                        title="Mark as Delivered"
                        className={`p-2 border-[2px] border-black transition-all ${order.status === "Delivered" ? "bg-black text-white" : "hover:bg-black/5"}`}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      
                      <div className="w-[2px] h-6 bg-black/10 mx-2" />
                      
                      <button 
                        onClick={() => deleteOrder(order.id)}
                        title="Delete Order"
                        className="p-2 border-[2px] border-black text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

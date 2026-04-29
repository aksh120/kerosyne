"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Save,
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ImageUpload from "@/components/admin/ImageUpload";
import { supabase } from "@/lib/supabase";
import { adminFetch } from "@/lib/admin-fetch";

interface Product {
  id: number;
  title: string;
  srcUrl: string;
  gallery: string[];
  price: number;
  discount: {
    amount: number;
    percentage: number;
  };
  rating: number;
  category: string;
}

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await adminFetch("/api/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const saveProducts = async (newProducts: Product[]) => {
    try {
      await adminFetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProducts),
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = () => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setEditingProduct({
      id: newId,
      title: "",
      srcUrl: "/images/pic1.png",
      gallery: ["/images/pic1.png"],
      price: 0,
      discount: { amount: 0, percentage: 0 },
      rating: 5,
      category: "new-arrivals"
    });
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("ARE YOU SURE? THIS ACTION IS IRREVERSIBLE.")) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveProducts(updated);
    }
  };

  const handleSave = () => {
    if (editingProduct) {
      const exists = products.find(p => p.id === editingProduct.id);
      let updated;
      if (exists) {
        updated = products.map(p => p.id === editingProduct.id ? editingProduct : p);
      } else {
        updated = [...products, editingProduct];
      }
      setProducts(updated);
      saveProducts(updated);
      setIsModalOpen(false);
      setEditingProduct(null);
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">Product List</h1>
          <p className="text-black/60 font-bold uppercase tracking-widest mt-2">Manage the shop catalog</p>
        </div>
        <button 
          onClick={handleAddProduct}
          className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest flex items-center space-x-2 border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-black/40" />
        <input 
          type="text"
          placeholder="SEARCH BY TITLE OR CATEGORY..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-14 pr-6 py-5 border-[4px] border-black rounded-none font-black uppercase tracking-widest focus:outline-none focus:bg-black/5"
        />
      </div>

      <div className="border-[4px] border-black overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black text-white border-b-[4px] border-black">
              <tr>
                <th className="px-6 py-4 font-black uppercase text-xs tracking-widest">ID</th>
                <th className="px-6 py-4 font-black uppercase text-xs tracking-widest">Product</th>
                <th className="px-6 py-4 font-black uppercase text-xs tracking-widest">Category</th>
                <th className="px-6 py-4 font-black uppercase text-xs tracking-widest">Price</th>
                <th className="px-6 py-4 font-black uppercase text-xs tracking-widest">Rating</th>
                <th className="px-6 py-4 font-black uppercase text-xs tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-[2px] divide-black">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center font-black uppercase">Loading data...</td>
                </tr>
              ) : filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-black/5 transition-colors">
                  <td className="px-6 py-4 font-bold tabular-nums">#{product.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-black/10 border-[2px] border-black relative">
                        <img src={product.srcUrl} alt="" className="object-cover w-full h-full" />
                      </div>
                      <span className="font-black uppercase text-sm tracking-tight">{product.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold tabular-nums">₹{product.price}</td>
                  <td className="px-6 py-4 font-bold tabular-nums">{product.rating}★</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => handleEditProduct(product)}
                      className="p-2 border-[2px] border-black hover:bg-black hover:text-white transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 border-[2px] border-black text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white border-[4px] border-black p-8 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter italic">
                    {products.find(p => p.id === editingProduct.id) ? "Edit Product" : "New Product"}
                  </h2>
                  <p className="text-black/60 font-bold uppercase text-xs tracking-widest">Editing mode active</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 border-[2px] border-black hover:bg-black hover:text-white transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Product Title</label>
                    <input 
                      type="text" 
                      value={editingProduct.title}
                      onChange={(e) => setEditingProduct({...editingProduct, title: e.target.value})}
                      className="w-full p-4 border-[2px] border-black font-bold uppercase focus:outline-none focus:bg-black/5"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Price (INR)</label>
                      <input 
                        type="number" 
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                        className="w-full p-4 border-[2px] border-black font-bold focus:outline-none focus:bg-black/5"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Rating</label>
                      <input 
                        type="number" 
                        step="0.1"
                        value={editingProduct.rating}
                        onChange={(e) => setEditingProduct({...editingProduct, rating: Number(e.target.value)})}
                        className="w-full p-4 border-[2px] border-black font-bold focus:outline-none focus:bg-black/5"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Category</label>
                    <select 
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                      className="w-full p-4 border-[2px] border-black font-bold uppercase focus:outline-none focus:bg-black/5 appearance-none"
                    >
                      <option value="New Arrivals">New Arrivals</option>
                      <option value="Top Selling">Top Selling</option>
                      <option value="Related">Related</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <ImageUpload 
                    value={editingProduct.srcUrl}
                    onChange={(url) => setEditingProduct({...editingProduct, srcUrl: url})}
                  />
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/60 block">Gallery Images</label>
                    <div className="grid grid-cols-3 gap-2">
                      {editingProduct.gallery?.map((url, idx) => (
                        <div key={idx} className="relative aspect-square border-[2px] border-black">
                          <img src={url} alt="" className="object-cover w-full h-full" />
                          <button 
                            onClick={() => {
                              const newGallery = [...editingProduct.gallery];
                              newGallery.splice(idx, 1);
                              setEditingProduct({...editingProduct, gallery: newGallery});
                            }}
                            className="absolute -top-1 -right-1 bg-white border-[2px] border-black p-0.5 hover:bg-red-500 hover:text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <div className="aspect-square border-[2px] border-black border-dashed flex items-center justify-center relative hover:bg-black/5 transition-all">
                        <Plus className="w-6 h-6 text-black/20" />
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            
                            const fileExt = file.name.split('.').pop();
                            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
                            const filePath = `gallery/${fileName}`;
                            
                            const { error: uploadError } = await supabase.storage
                              .from('kerosyne')
                              .upload(filePath, file);
                              
                            if (uploadError) {
                              if (uploadError.message === 'Bucket not found') {
                                alert('ERROR: Supabase bucket "kerosyne" not found. Please create it in your dashboard.');
                              } else {
                                alert('Upload failed: ' + uploadError.message);
                              }
                              return;
                            }
                            
                            const { data: { publicUrl } } = supabase.storage
                              .from('kerosyne')
                              .getPublicUrl(filePath);
                              
                            setEditingProduct({
                              ...editingProduct,
                              gallery: [...(editingProduct.gallery || []), publicUrl]
                            });
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t-[2px] border-black flex justify-end space-x-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-4 font-black uppercase tracking-widest border-[3px] border-black hover:bg-black/5 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-8 py-4 bg-black text-white font-black uppercase tracking-widest border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

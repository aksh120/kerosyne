"use client";

import React, { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
}

export default function ImageUpload({ value, onChange, bucket = "kerosyne" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      // SECURITY: Validate file type (whitelist only safe image formats)
      const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert("Only JPEG, PNG, GIF, WebP, and SVG images are allowed.");
        return;
      }

      // SECURITY: Enforce 20MB max file size
      const MAX_SIZE = 20 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        alert("Image must be under 20MB.");
        return;
      }

      // SECURITY: Sanitize filename — only allow safe characters
      const fileExt = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'png';
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (error: any) {
      console.error('Error uploading image:', error);
      if (error.message === 'Bucket not found') {
        alert('ERROR: Supabase bucket "kerosyne" not found. Please create a public bucket named "kerosyne" in your Supabase Storage dashboard.');
      } else {
        alert('Error uploading image: ' + (error.message || 'Unknown error'));
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-black/60 block">Product Image</label>
      
      <div className="relative group border-[2px] border-black aspect-square bg-black/5 flex items-center justify-center overflow-hidden">
        {value ? (
          <>
            <img src={value} alt="Preview" className="object-cover w-full h-full" />
            <button
              onClick={() => onChange("")}
              className="absolute top-2 right-2 p-1 bg-white border-[2px] border-black hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            {uploading ? (
              <Loader2 className="w-8 h-8 animate-spin text-black/40" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-black/40 mb-2" />
                <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Click to upload</p>
              </>
            )}
          </div>
        )}
        
        {!uploading && (
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        )}
      </div>
      
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase tracking-widest text-black/60">Image URL (Manual Override)</label>
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full p-3 border-[2px] border-black font-bold focus:outline-none focus:bg-black/5 text-xs"
        />
      </div>
    </div>
  );
}

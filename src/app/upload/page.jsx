'use client'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import ImageUploader from '../component/upload';
import { FaCloudUploadAlt } from 'react-icons/fa';

export default function Upload() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push("/login");
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#5ba3b5] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!session) return null;

  return (
    <main className="min-h-screen pt-36 pb-20 px-6 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-[#5ba3b5] to-[#7ab8c7] text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 shadow-lg shadow-[#5ba3b5]/20">
            <FaCloudUploadAlt />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">Upload Listing</h1>
          <p className="text-slate-500 font-medium">Add a new forklift to the inventory.</p>
        </div>
        <div className="glass-strong p-8 md:p-10 rounded-[32px]">
          <ImageUploader />
        </div>
      </div>
    </main>
  );
}

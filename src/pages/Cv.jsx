'use client';

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; 
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function Cv() {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    async function fetchCvData() {
      const { data, error } = await supabase
        .from("cv_data")
        .select("*")
        .single(); 
      if (data) {
        setCvData(data);
      }
      setLoading(false);
    }
    fetchCvData();
  }, []);

  const handleDownload = () => {
    if (!cvData?.pdf_url) return;
    const link = document.createElement('a');
    link.href = cvData.pdf_url; 
    link.setAttribute('download', 'CV-Hana-Dewi-Shoviyah.pdf');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-lg font-medium text-foreground/80 animate-pulse">
          Loading CV...
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Navbar />

      {/* --- TOMBOL BACK FLOATING --- */}
      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-8 left-8 md:bottom-12 md:left-12 z-50 w-14 h-14 bg-[#1e293b] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-slate-800 hover:-translate-x-1 transition-all duration-300 cursor-pointer border border-white/10"
        aria-label="Kembali ke halaman sebelumnya"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
      </button>
      {/* ---------------------------- */}

      <div className="pt-24 md:pt-28">
        <div className="max-w-4xl mx-auto px-4 py-10">
          
          <div className="flex justify-center mb-10">
            <button
              onClick={handleDownload}
              className="px-8 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary/10 transition duration-300 font-semibold shadow-sm flex items-center gap-2 cursor-pointer"
            >
              Download PDF Version
            </button>
          </div>
          <div className="flex flex-col space-y-8 md:space-y-12">
            {cvData && Array.isArray(cvData.image_gallery) && cvData.image_gallery.map((imgUrl, idx) => (
              <div key={idx} className="shadow-2xl rounded-2xl overflow-hidden border border-primary/10 bg-white group transition-all duration-300 hover:border-primary/20">
                <img
                  src={imgUrl}
                  alt={`CV Hana Dewi Shoviyah - Page ${idx + 1}`}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
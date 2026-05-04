'use client';

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Cv() {
  const handleDownload = () => {
    // Cara paling simple dan reliable
    const link = document.createElement('a');
    link.href = '/projects/cv/CV Hana Dewi Shoviyah.pdf';
    link.setAttribute('download', 'CV-Nama-Anda.pdf');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* offset navbar */}
      <div className="pt-24">
        <div className="max-w-4xl mx-auto px-4 py-10">

          {/* Tombol */}
          <div className="flex justify-center mb-10">
            <button
              onClick={handleDownload}
              className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition cursor-pointer"
            >
              Download CV
            </button>
          </div>

          {/* CV LIST */}
          <div className="flex flex-col space-y-12">
            {/* CV 1 */}
            <div className="shadow-2xl rounded-xl overflow-hidden">
              <img
                src="/projects/cv/cv1.jpg"
                alt="CV 1"
                className="w-full h-auto"
              />
            </div>

            {/* CV 2 */}
            <div className="shadow-2xl rounded-xl overflow-hidden">
              <img
                src="/projects/cv/cv2.jpg"
                alt="CV 2"
                className="w-full h-auto"
              />
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
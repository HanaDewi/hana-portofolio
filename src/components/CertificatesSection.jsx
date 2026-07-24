import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const CertificatesSection = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const { data, error } = await supabase.from("certificates").select("*").order("id", { ascending: false });

        if (error) throw error;
        setCertificates(data || []);
      } catch (err) {
        console.error("Error fetching certificates:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <section id="certificates" className="scroll-mt-20 pt-10 pb-16 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-1">
            Certificates <span className="text-primary">& Licenses</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-xs md:text-sm">Click on a certificate to view the official PDF document.</p>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="py-8 text-center text-muted-foreground text-sm animate-pulse">Loading certificates...</div>
        ) : certificates.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground text-sm">No certificates found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center">
            {certificates.map((cert) => (
              <a key={cert.id} href={cert.pdf_url} target="_blank" rel="noopener noreferrer" className="group relative block w-full max-w-xs mx-auto bg-card rounded-lg overflow-hidden shadow-lg card-hover">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <img src={cert.image_url} alt={cert.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-medium text-white flex items-center gap-1 shadow">
                    <span>PDF</span>
                  </div>
                </div>
                {/* Detail Sertifikat */}
                <div className="p-3.5">
                  <h3 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">{cert.title}</h3>
                  <div className="mt-2.5 flex items-center justify-between text-xs text-muted-foreground border-t border-border/40 pt-2">
                    <span className="font-medium text-foreground/80 truncate max-w-[150px]">{cert.issuer}</span>
                    <span className="text-[11px] bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground shrink-0">{cert.issue_date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

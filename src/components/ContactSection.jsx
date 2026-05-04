import { Mail, MapPin, Phone, Send, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from('messages')
      .insert([
        { 
          name: formData.name, 
          email: formData.email, 
          message: formData.message 
        }
      ]);

    if (error) {
      // Popup Error yang seragam
      toast({
        variant: "destructive",
        title: "Duh, Gagal Kirim!",
        description: "Sepertinya ada masalah teknis. Coba lagi nanti ya.",
      });
    } else {
      // Popup Berhasil dengan style "Success"
      toast({
        title: "Pesan Terkirim! 🚀",
        description: "Terima kasih sudah mampir. Hana bakal balas secepatnya!",
        className: "bg-primary text-primary-foreground border-none", // Biar warnanya nyatu sama tema web
      });
      setFormData({ name: "", email: "", message: "" });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-1 px-4 relative bg-secondary/30 scroll-mt-24">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Let's <span className="text-primary"> Connect</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Got a project idea or interested in collaborating? Don’t hesitate to get in touch.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sisi Kiri: Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col text-left">
                  <h4 className="font-medium text-foreground">Email</h4>
                  <a href="mailto:hanadewi.s28@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    hanadewi.s28@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col text-left">
                  <h4 className="font-medium text-foreground">Phone</h4>
                  <a href="tel:+6285701592548" className="text-muted-foreground hover:text-primary transition-colors">
                    085701592548
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col text-left">
                  <h4 className="font-medium text-foreground">Location</h4>
                  <span className="text-muted-foreground text-sm">Jawa Tengah, Indonesia</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 text-center md:text-left">
              <h4 className="font-medium mb-4">Connect With Me</h4>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a 
                  href="https://www.linkedin.com/in/hanadewishoviyah/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 rounded-full bg-card hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Form Kirim Pesan */}
          <div className="bg-card p-8 rounded-lg shadow-sm border border-border/50">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none" 
                  placeholder="Nina Tutachia.." 
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none" 
                  placeholder="nina@gmail.com" 
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none resize-none min-h-[150px]"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting} 
                className={cn("cosmic-button w-full flex items-center justify-center gap-2")}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
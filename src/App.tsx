import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Scissors, Instagram, Facebook, MapPin, Phone, Clock } from 'lucide-react';
import BookingModal from './components/BookingModal';
import { BeamsBackground } from './components/ui/beams-background';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-black/80 py-4 backdrop-blur-md' : 'bg-transparent py-8'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Scissors className="h-6 w-6 text-primary" />
            <span className="text-xl font-extrabold tracking-tighter">
              SMILE <span className="text-primary">BARBERS</span>
            </span>
          </div>
          
          <div className="hidden items-center gap-8 md:flex">
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Αρχική</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Υπηρεσίες</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Barbers</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Επικοινωνία</a>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-black transition-all hover:scale-105 active:scale-95 yellow-glow"
          >
            Κλείσε ραντεβού
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <BeamsBackground className="min-h-screen">
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            {/* Logo Placeholder */}
            <div className="relative mb-12">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-primary/20 bg-white/5 p-4 backdrop-blur-sm"
              >
                <Scissors className="h-16 w-16 text-primary" />
              </motion.div>
              <div className="absolute -inset-4 -z-10 animate-pulse rounded-full bg-primary/10 blur-xl" />
            </div>

            <h1 className="mb-8 text-6xl font-black tracking-tighter sm:text-8xl md:text-9xl">
              <span className="text-primary">SMILE</span>
              <br />
              <span className="text-white">BARBERS</span>
            </h1>

            <p className="mb-12 max-w-lg text-lg text-white/60 sm:text-xl">
              Η τέχνη του παραδοσιακού κουρέματος συναντά το μοντέρνο στυλ. 
              Ελάτε να ζήσετε την εμπειρία Smile Barbers.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="w-full rounded-full bg-primary px-10 py-5 text-lg font-bold text-black transition-all sm:w-auto yellow-glow"
              >
                Κλείσε ραντεβού
              </motion.button>
              <button className="w-full rounded-full bg-white px-10 py-5 text-lg font-bold text-black transition-all hover:bg-white/90 sm:w-auto">
                Τα προϊόντα μας
              </button>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Scroll</span>
            <div className="h-12 w-[1px] bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        </section>
      </BeamsBackground>

      {/* Info Section */}
      <section className="bg-white/5 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 rounded-2xl bg-primary/10 p-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Τοποθεσία</h3>
              <p className="text-white/60">Λεωφόρος Αθηνών 123, Αθήνα</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 rounded-2xl bg-primary/10 p-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Τηλέφωνο</h3>
              <p className="text-white/60">+30 210 1234567</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 rounded-2xl bg-primary/10 p-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Ωράριο</h3>
              <p className="text-white/60">Δευ - Σαβ: 09:00 - 21:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Scissors className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold tracking-tighter">
              SMILE <span className="text-primary">BARBERS</span>
            </span>
          </div>
          
          <p className="text-sm text-white/40">
            © 2026 Smile Barbers. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="text-white/60 transition-colors hover:text-primary">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 transition-colors hover:text-primary">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}


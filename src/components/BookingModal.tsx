import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, CheckCircle2, ChevronRight } from 'lucide-react';

interface Barber {
  id: number;
  name: string;
  role: string;
  image: string;
}

const BARBERS: Barber[] = [
  { id: 1, name: 'Νίκος Σ.', role: 'Master Barber', image: 'https://picsum.photos/seed/barber1/200/200' },
  { id: 2, name: 'Γιώργος Κ.', role: 'Senior Barber', image: 'https://picsum.photos/seed/barber2/200/200' },
  { id: 3, name: 'Αλέξης Μ.', role: 'Stylist', image: 'https://picsum.photos/seed/barber3/200/200' },
];

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

const DATES = [
  { day: 'Δευ', date: '28/03' },
  { day: 'Τρι', date: '29/03' },
  { day: 'Τετ', date: '30/03' },
  { day: 'Πεμ', date: '31/03' },
  { day: 'Παρ', date: '01/04' },
  { day: 'Σαβ', date: '02/04' },
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleBarberSelect = (barber: Barber) => {
    setSelectedBarber(barber);
    setStep(2);
  };

  const handleBooking = () => {
    if (selectedBarber && selectedDate && selectedTime) {
      setIsConfirmed(true);
    }
  };

  const reset = () => {
    setStep(1);
    setSelectedBarber(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setIsConfirmed(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={reset}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl glass-modal shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <h2 className="text-xl font-bold tracking-tight">
                {isConfirmed ? 'Επιτυχία!' : 'Κλείσε Ραντεβού'}
              </h2>
              <button
                onClick={reset}
                className="rounded-full p-2 transition-colors hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {isConfirmed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="mb-6 rounded-full bg-primary/20 p-4">
                    <CheckCircle2 className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold">Το ραντεβού σας κλείστηκε!</h3>
                  <p className="mb-8 text-white/60">
                    Θα λάβετε σύντομα ένα email επιβεβαίωσης με τις λεπτομέρειες.
                  </p>
                  <div className="w-full space-y-3 rounded-xl bg-white/5 p-6 text-left">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Barber:</span>
                      <span className="font-medium">{selectedBarber?.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Ημερομηνία:</span>
                      <span className="font-medium">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Ώρα:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                  </div>
                  <button
                    onClick={reset}
                    className="mt-8 w-full rounded-xl bg-primary py-4 font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Επιστροφή
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Progress */}
                  <div className="mb-8 flex items-center gap-4">
                    <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-white/10'}`} />
                    <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-white/10'}`} />
                  </div>

                  {step === 1 ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-white/60">
                        <User className="h-4 w-4" />
                        <span>Επιλέξτε Barber</span>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {BARBERS.map((barber) => (
                          <button
                            key={barber.id}
                            onClick={() => handleBarberSelect(barber)}
                            className="group relative flex flex-col items-center gap-4 rounded-xl bg-white/5 p-6 transition-all hover:bg-white/10 hover:ring-1 hover:ring-primary/50"
                          >
                            <img
                              src={barber.image}
                              alt={barber.name}
                              className="h-20 w-20 rounded-full object-cover ring-2 ring-white/10 transition-all group-hover:ring-primary"
                              referrerPolicy="no-referrer"
                            />
                            <div className="text-center">
                              <p className="font-bold">{barber.name}</p>
                              <p className="text-xs text-white/40">{barber.role}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      {/* Date Selection */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-white/60">
                          <Calendar className="h-4 w-4" />
                          <span>Επιλέξτε Ημερομηνία</span>
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                          {DATES.map((d) => (
                            <button
                              key={d.date}
                              onClick={() => setSelectedDate(d.date)}
                              className={`flex min-w-[70px] flex-col items-center rounded-xl p-3 transition-all ${
                                selectedDate === d.date
                                  ? 'bg-primary text-black'
                                  : 'bg-white/5 text-white hover:bg-white/10'
                              }`}
                            >
                              <span className="text-[10px] uppercase opacity-60">{d.day}</span>
                              <span className="text-sm font-bold">{d.date}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time Selection */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-white/60">
                          <Clock className="h-4 w-4" />
                          <span>Επιλέξτε Ώρα</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                          {TIME_SLOTS.map((t) => (
                            <button
                              key={t}
                              onClick={() => setSelectedTime(t)}
                              className={`rounded-lg py-2 text-sm font-medium transition-all ${
                                selectedTime === t
                                  ? 'bg-primary text-black'
                                  : 'bg-white/5 text-white hover:bg-white/10'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex gap-4 pt-4">
                        <button
                          onClick={() => setStep(1)}
                          className="flex-1 rounded-xl border border-white/10 py-4 font-bold transition-colors hover:bg-white/5"
                        >
                          Πίσω
                        </button>
                        <button
                          disabled={!selectedDate || !selectedTime}
                          onClick={handleBooking}
                          className="flex-[2] rounded-xl bg-primary py-4 font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                        >
                          Επιβεβαίωση
                        </button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

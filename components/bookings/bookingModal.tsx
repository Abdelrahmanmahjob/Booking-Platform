"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Service } from "@/types";
import { DatePicker } from "./datePicker";
import { TimeSlots } from "./timeSlots";
import { BookingSummary } from "./bookingSummary";
import { BookingConfirmation } from "./bookingConfirmation";
import { X, Calendar, Clock, CheckCircle } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { useCreateBooking } from "@/hooks/booking";
import { toast } from "react-toastify";
import Confetti from "react-confetti";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
  providerId: string;
}

type BookingStep = "selecting" | "success";

const STEPS = [
  { id: 1, label: "Date", icon: Calendar },
  { id: 2, label: "Time", icon: Clock },
  { id: 3, label: "Confirm", icon: CheckCircle },
];

export function BookingModal({
  isOpen,
  onClose,
  service,
  providerId,
}: BookingModalProps) {
  const [step, setStep] = useState<BookingStep>("selecting");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  // 🔥 1. Get current user
  const user = useAppSelector(selectCurrentUser);

  // 🔥 2. Create booking mutation
  const { mutate: createBooking, isPending } = useCreateBooking();

  const handleConfirmBooking = () => {
    // 🔥 3. Validate
    if (!selectedDate || !selectedTime || !user) {
      toast.error("Please select date and time");
      return;
    }

    // 🔥 4. Prepare data
    const bookingData = {
      serviceId: service.id,
      clientId: user.id,
      providerId: providerId,
      slotId: "",
      status: "pending" as const,
      date: selectedDate.toISOString().split("T")[0], // "2024-01-15"
      time: selectedTime,
      notes: notes || "",
    };

    // 🔥 5. Call API
    createBooking(bookingData, {
      onSuccess: (newBooking) => {
        console.log("✅ Booking created:", newBooking);
        <Confetti width={window.innerWidth} height={window.innerHeight} />;
        setStep("success");
      },
      onError: (error) => {
        console.error("❌ Booking error:", error);
        toast.error("Failed to create booking");
      },
    });
  };

  const handleClose = () => {
    setStep("selecting");
    setSelectedDate(undefined);
    setSelectedTime(null);
    setNotes("");
    onClose();
  };

  const canProceed = selectedDate && selectedTime && !isPending;

  const currentStep = !selectedDate ? 1 : !selectedTime ? 2 : 3;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="
                w-full max-w-3xl
                bg-card
                rounded-3xl
                shadow-2xl
                flex flex-col
                overflow-y-auto
                max-h-[90vh]
              "
            >
              {step === "success" ? (
                <BookingConfirmation
                  service={service}
                  date={selectedDate!}
                  time={selectedTime!}
                  onClose={handleClose}
                />
              ) : (
                <>
                  {/* ═══════════════════════════════ */}
                  {/* Header                          */}
                  {/* ═══════════════════════════════ */}
                  <div className="px-4 md:px-8 pt-4 md:pt-8 pb-4 md:pb-6 border-b border-border">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: Service Info */}
                      <div className="flex items-center gap-4">
                        <div
                          className="
                          w-14 h-14 rounded-2xl
                          bg-primary/10
                          flex items-center justify-center
                          text-xl md:text-2xl
                          shrink-0
                        "
                        >
                          {service.category === "medical"
                            ? "🏥"
                            : service.category === "fitness"
                              ? "💪"
                              : "📚"}
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-foreground">
                            {service.name}
                          </h2>
                          <p className="text-muted-foreground text-sm mt-0.5">
                            {service.duration} min • ${service.price}
                          </p>
                        </div>
                      </div>

                      {/* Close Button */}
                      <button
                        onClick={handleClose}
                        className="
                          p-2 rounded-xl
                          text-muted-foreground
                          hover:text-foreground
                          hover:bg-muted
                          transition-all duration-200
                          shrink-0
                        "
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-0 mt-6">
                      {STEPS.map((s, index) => {
                        const isCompleted = currentStep > s.id;
                        const isActive = currentStep === s.id;
                        const Icon = s.icon;

                        return (
                          <div key={s.id} className="flex items-center flex-1">
                            {/* Step */}
                            <div className="flex flex-col items-center gap-1.5">
                              <div
                                className={`
                                w-9 h-9 rounded-full
                                flex items-center justify-center
                                transition-all duration-300
                                ${
                                  isCompleted
                                    ? "bg-green-500 text-white"
                                    : isActive
                                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                                      : "bg-muted text-muted-foreground"
                                }
                              `}
                              >
                                {isCompleted ? (
                                  <CheckCircle className="w-5 h-5" />
                                ) : (
                                  <Icon className="w-4 h-4" />
                                )}
                              </div>
                              <span
                                className={`
                                text-xs font-medium
                                ${isActive ? "text-foreground" : "text-muted-foreground"}
                              `}
                              >
                                {s.label}
                              </span>
                            </div>

                            {/* Connector Line */}
                            {index < STEPS.length - 1 && (
                              <div className="flex-1 h-0.5 mx-2 mb-5 rounded-full overflow-hidden bg-muted">
                                <motion.div
                                  className="h-full bg-green-500 rounded-full"
                                  initial={{ width: "0%" }}
                                  animate={{
                                    width: isCompleted ? "100%" : "0%",
                                  }}
                                  transition={{ duration: 0.4 }}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ═══════════════════════════════ */}
                  {/* Content                         */}
                  {/* ═══════════════════════════════ */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="px-4 md:px-8 py-8 space-y-10">
                      {/* Date Picker */}
                      <DatePicker
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                        providerId={providerId}
                      />

                      {/* Time Slots */}
                      <AnimatePresence>
                        {selectedDate && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <TimeSlots
                              date={selectedDate}
                              serviceId={service.id}
                              selectedTime={selectedTime}
                              onSelectTime={setSelectedTime}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Notes */}
                      <AnimatePresence>
                        {selectedTime && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="
                                w-10 h-10 rounded-xl
                                bg-purple-100 dark:bg-purple-900/30
                                flex items-center justify-center
                              "
                              >
                                <span className="text-lg">📝</span>
                              </div>
                              <div>
                                <h3 className="font-bold text-base text-foreground">
                                  Additional Notes
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  Optional - Any special requests?
                                </p>
                              </div>
                            </div>

                            <textarea
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              placeholder="Any special requests or information..."
                              rows={3}
                              className="
                                w-full px-4 py-3
                                bg-muted/50
                                border-2 border-border
                                rounded-xl
                                text-foreground
                                placeholder:text-muted-foreground
                                focus:outline-none
                                focus:ring-4 focus:ring-primary/20
                                focus:border-primary
                                transition-all duration-200
                                resize-none
                                text-sm
                              "
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Summary */}
                      <AnimatePresence>
                        {canProceed && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <BookingSummary
                              service={service}
                              date={selectedDate}
                              time={selectedTime}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* ═══════════════════════════════ */}
                  {/* Footer                          */}
                  {/* ═══════════════════════════════ */}
                  <div
                    className="
                    px-8 py-5
                    border-t border-border
                    bg-muted/30
                  "
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      {/* Price Preview */}
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Total Price
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          ${service.price}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Cancel */}
                        <button
                          onClick={handleClose}
                          className="
                            px-5 py-2.5
                            border-2 border-border
                            text-foreground
                            rounded-xl font-medium text-sm
                            hover:bg-muted
                            transition-all duration-200
                          "
                        >
                          Cancel
                        </button>

                        {/* Confirm */}
                        <motion.button
                          whileHover={{ scale: canProceed ? 1.02 : 1 }}
                          whileTap={{ scale: canProceed ? 0.98 : 1 }}
                          onClick={handleConfirmBooking}
                          disabled={!canProceed}
                          className={`
                            px-5 md:px-8 py-2.5
                            rounded-xl font-bold text-sm
                            flex items-center gap-2
                            transition-all duration-200
                            ${
                              canProceed
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                            }
                          `}
                        >
                          <CheckCircle className="w-4 h-4 hidden md:block" />
                          Confirm
                          <span className="hidden md:block">Booking</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

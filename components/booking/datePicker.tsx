"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { useProvider } from "@/hooks/provider/useProvider";
import { DayOfWeek } from "@/types";

interface DatePickerProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  providerId: string;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function DatePicker({
  selectedDate,
  onSelectDate,
  providerId,
}: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { data: provider } = useProvider(providerId);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ─── Helpers ──────────────────────────────────
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date: Date) => {
    if (date < today) return true;

    if (!provider) return false;

    const dayOfWeek = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase() as DayOfWeek;

    return !provider.workingDays.includes(dayOfWeek);
  };

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const handleSelectDay = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    if (isDateDisabled(date)) return;
    onSelectDate(date);
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  // ─── Calendar Data ────────────────────────────
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <CalendarDays className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="font-bold text-base text-foreground">Select Date</h3>
          <p className="text-sm text-muted-foreground">
            Choose your preferred date
          </p>
        </div>
      </div>

      {/* Calendar Card */}
      <div className="bg-muted/30 border-2 border-border rounded-2xl p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="
              p-2 rounded-xl
              hover:bg-muted
              text-muted-foreground hover:text-foreground
              transition-all duration-200
            "
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <h4 className="font-bold text-lg text-foreground">
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h4>

          <button
            onClick={nextMonth}
            className="
              p-2 rounded-xl
              hover:bg-muted
              text-muted-foreground hover:text-foreground
              transition-all duration-200
            "
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-bold text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: totalCells }).map((_, i) => {
            const dayNumber = i - firstDay + 1;
            const isCurrentMonth = dayNumber >= 1 && dayNumber <= daysInMonth;

            if (!isCurrentMonth) {
              return <div key={i} className="aspect-square" />;
            }

            const date = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              dayNumber,
            );
            const disabled = isDateDisabled(date);
            const selected = selectedDate && isSameDay(date, selectedDate);
            const isToday = isSameDay(date, today);

            return (
              <motion.button
                key={i}
                whileHover={{ scale: disabled ? 1 : 1.1 }}
                whileTap={{ scale: disabled ? 1 : 0.95 }}
                onClick={() => handleSelectDay(dayNumber)}
                disabled={disabled}
                className={`
                  aspect-square rounded-xl
                  text-sm font-semibold
                  transition-all duration-200
                  flex items-center justify-center
                  ${
                    selected
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : isToday
                        ? "ring-2 ring-primary/50 text-primary bg-primary/10"
                        : disabled
                          ? "text-muted-foreground/30 cursor-not-allowed"
                          : "hover:bg-muted text-foreground cursor-pointer"
                  }
                `}
              >
                {dayNumber}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Display */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="
              flex items-center gap-3 px-4 py-3
              bg-blue-50 dark:bg-blue-950/30
              border border-blue-200 dark:border-blue-800
              rounded-xl
            "
          >
            <CalendarDays className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

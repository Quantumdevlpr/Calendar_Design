import { useState, useEffect } from 'react';
import { addMonths, subMonths, isBefore } from 'date-fns';

export interface Note {
  id: string;
  text: string;
  dateStr?: string; // Optional: could be associated with a specific date in YYYY-MM-DD
}

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  // App-wide notes
  const [notes, setNotes] = useState<string>(() => {
    const saved = localStorage.getItem('wall_calendar_notes');
    return saved || '';
  });

  useEffect(() => {
    localStorage.setItem('wall_calendar_notes', notes);
  }, [notes]);

  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleDateClick = (date: Date) => {
    // If no start date, or both start and end date exist, reset and set new start date
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      // If start date exists, check if clicked date is before start date
      if (isBefore(date, startDate)) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  return {
    currentDate,
    startDate,
    endDate,
    notes,
    setNotes,
    handleNextMonth,
    handlePrevMonth,
    handleDateClick,
  };
}

import { useState, useEffect } from 'react';
import { addMonths, subMonths, isBefore, setMonth, setYear } from 'date-fns';

export interface Note {
  id: string;
  text: string;
  dateStr?: string;
}

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
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
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (isBefore(date, startDate)) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const handleMonthChange = (month: number) => setCurrentDate(setMonth(currentDate, month));
  const handleYearChange = (year: number) => setCurrentDate(setYear(currentDate, year));

  return {
    currentDate,
    startDate,
    endDate,
    notes,
    setNotes,
    handleNextMonth,
    handlePrevMonth,
    handleDateClick,
    handleMonthChange,
    handleYearChange,
  };
}

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  isWithinInterval,
  isBefore,
  isAfter,
} from 'date-fns';

export function getDaysInMonth(currentDate: Date) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  
  // Get start of the week for the first day, and end of the week for the last day
  // using monday as the first day of the week (weekStartsOn: 1)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  return eachDayOfInterval({ start: startDate, end: endDate });
}

export function isDateSelected(date: Date, startDate: Date | null, endDate: Date | null) {
  if (startDate && isSameDay(date, startDate)) return true;
  if (endDate && isSameDay(date, endDate)) return true;
  return false;
}

export function isDateInRange(date: Date, startDate: Date | null, endDate: Date | null) {
  if (startDate && endDate) {
    // If date is exactly on boundary, it's considered in range visually in some designs, 
    // but we handle boundaries in isDateSelected.
    return isWithinInterval(date, { start: startDate, end: endDate }) && 
           !isSameDay(date, startDate) && !isSameDay(date, endDate);
  }
  return false;
}

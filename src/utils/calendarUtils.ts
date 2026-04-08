import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
} from 'date-fns';

export function getDaysInMonth(currentDate: Date) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  
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
    return isWithinInterval(date, { start: startDate, end: endDate }) && 
           !isSameDay(date, startDate) && !isSameDay(date, endDate);
  }
  return false;
}

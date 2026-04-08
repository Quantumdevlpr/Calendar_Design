import React from 'react';
import { format, isSameMonth, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCalendar } from '../hooks/useCalendar';
import { getDaysInMonth, isDateSelected, isDateInRange } from '../utils/calendarUtils';
import './WallCalendar.css';

export const WallCalendar: React.FC = () => {
  const {
    currentDate,
    startDate,
    endDate,
    notes,
    setNotes,
    handleNextMonth,
    handlePrevMonth,
    handleDateClick,
    handleMonthChange,
    handleYearChange
  } = useCalendar();

  const days = getDaysInMonth(currentDate);

  const binderRings = Array.from({ length: 25 }, (_, i) => i);

  return (
    <div className="calendar-wrapper">
      <div className="calendar-container">
        
        <div className="calendar-binder">
          {binderRings.map(ring => <div key={ring} className="binder-ring" />)}
        </div>

        <div className="calendar-hero">
          <img 
            src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076&auto=format&fit=crop" 
            alt="Calendar Hero" 
            className="hero-image"
          />
          <div className="hero-overlay">
            <div className="hero-nav-controls">
              <button className="hero-nav-btn" onClick={handlePrevMonth} aria-label="Previous Month"><ChevronLeft size={28}/></button>
              <div className="hero-text-content">
                <select 
                  className="hero-year" 
                  value={currentDate.getFullYear()}
                  onChange={(e) => handleYearChange(parseInt(e.target.value))}
                >
                  {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 50 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <select 
                  className="hero-month"
                  value={currentDate.getMonth()}
                  onChange={(e) => handleMonthChange(parseInt(e.target.value))}
                >
                  {Array.from({ length: 12 }, (_, i) => i).map(month => (
                    <option key={month} value={month}>
                      {format(new Date(2000, month, 1), 'MMMM')}
                    </option>
                  ))}
                </select>
              </div>
              <button className="hero-nav-btn" onClick={handleNextMonth} aria-label="Next Month"><ChevronRight size={28}/></button>
            </div>
          </div>
        </div>

        <div className="calendar-body">
          
          <div className="calendar-notes">
            <div className="notes-header">Notes</div>
            <textarea
              className="notes-textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              spellCheck="false"
            />
          </div>

          <div className="calendar-grid-container">

            <div className="calendar-grid" key={format(currentDate, 'yyyy-MM')} style={{ animation: 'gridFadeIn 0.4s ease-out' }}>
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                <div key={day} className="weekday-header">
                  {day}
                </div>
              ))}

              {days.map((day) => {
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isSelected = isDateSelected(day, startDate, endDate);
                const inRange = isDateInRange(day, startDate, endDate);
                const isDayToday = isToday(day);

                let classNames = ['day-cell'];
                if (!isCurrentMonth) classNames.push('diff-month');
                if (isSelected) classNames.push('selected');
                if (inRange) classNames.push('in-range');
                if (isDayToday && !isSelected) classNames.push('today');

                return (
                  <button
                    key={day.toString()}
                    className={classNames.join(' ')}
                    onClick={() => handleDateClick(day)}
                    disabled={!isCurrentMonth}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

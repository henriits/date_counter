import { getDaysInMonth, getDayOfWeek, getFirstDayOfMonth } from "../utils/dateUtils";
import DayView from "./DayView";


interface DateItem {
    id: number;
    startDate: Date;
    endDate: Date;
    name: string;
}

interface MonthViewProps {
    month: string;
    monthIndex: number;
    year: number;
    dates: DateItem[];
    onDayClick: (day: number, month: number) => void;
}

const MonthView = ({ month, monthIndex, year, dates, onDayClick }: MonthViewProps) => {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();

    const isDateHighlighted = (day: number) => {
        return dates.some(dateItem => {
            const date = new Date(dateItem.startDate);
            return date.getDate() === day + 1 && date.getMonth() === monthIndex && date.getFullYear() === currentYear;
        });
    };

    const isCurrentDay = (day: number) => {
        return (
            currentDate.getDate() === day + 1 &&
            currentDate.getMonth() === monthIndex &&
            currentDate.getFullYear() === currentYear
        );
    };

    const isMultiDayEvent = (day: number) => {
        return dates.some(dateItem => {
            const startDate = new Date(dateItem.startDate);
            const endDate = new Date(dateItem.endDate);
            const currentDate = new Date(currentYear, monthIndex, day + 1);
            return currentDate >= startDate && currentDate <= endDate;
        });
    };

    const getEventCount = (day: number) => {
        return dates.filter(dateItem => {
            const date = new Date(dateItem.startDate);
            return date.getDate() === day + 1 && date.getMonth() === monthIndex && date.getFullYear() === currentYear;
        }).length;
    };

    const getEventColor = (day: number) => {
        if (isCurrentDay(day)) {
            return "bg-green-500 text-white";
        }
        if (isMultiDayEvent(day)) {
            return "bg-amber-500 text-white";
        }
        if (isDateHighlighted(day)) {
            return "bg-amber-700 text-white";
        }
        return "bg-gray-100";
    };

    return (
        <div className="month mb-6">
            <h2 className="sm:text-xl text-2xl font-bold mb-4">{month}</h2>
            <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map((day, idx) => (
                    <div key={idx} className="day-header text-center font-semibold">
                        {day}
                    </div>
                ))}
                {Array.from({ length: getFirstDayOfMonth(monthIndex, year) }).map((_, idx) => (
                    <div key={idx} className="day p-4 border rounded-lg h-20 bg-gray-100"></div>
                ))}
                {Array.from({ length: getDaysInMonth(monthIndex, year) }, (_, day) => (
                    <DayView
                        key={day}
                        day={day}
                        monthIndex={monthIndex}
                        eventColor={getEventColor(day)}
                        dayOfWeek={daysOfWeek[getDayOfWeek(day, monthIndex)]}
                        isCurrentDay={isCurrentDay(day)}
                        isDateHighlighted={isDateHighlighted(day)}
                        eventCount={getEventCount(day)}
                        onDayClick={onDayClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default MonthView;

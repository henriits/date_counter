import { useState } from "react";
import Modal from "./Modal";

interface DateItem {
    id: number;
    startDate: Date;
    endDate: Date;
    name: string;
}

interface CalendarViewProps {
    dates: DateItem[];
}

const CalendarView = ({ dates }: CalendarViewProps) => {
    const [modal, setModal] = useState<{ isOpen: boolean; events: { name: string; startDate: Date; endDate: Date; getTimeLeft: () => string }[] }>({
        isOpen: false,
        events: [],
    });

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getDayOfWeek = (day: number, month: number) => {
        const date = new Date(currentYear, month, day + 1);
        const dayOfWeek = date.getDay();
        return (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // Adjust to start from Monday
    };

    const getFirstDayOfMonth = (month: number, year: number) => {
        const firstDay = new Date(year, month, 1).getDay();
        return (firstDay === 0 ? 6 : firstDay - 1); // Adjust to start from Monday
    };

    const currentYear = new Date().getFullYear();
    const currentDate = new Date();

    const isDateHighlighted = (day: number, month: number) => {
        return dates.some(dateItem => {
            const date = new Date(dateItem.startDate);
            return date.getDate() === day + 1 && date.getMonth() === month && date.getFullYear() === currentYear;
        });
    };

    const isCurrentDay = (day: number, month: number) => {
        return (
            currentDate.getDate() === day + 1 &&
            currentDate.getMonth() === month &&
            currentDate.getFullYear() === currentYear
        );
    };

    const isMultiDayEvent = (day: number, month: number) => {
        return dates.some(dateItem => {
            const startDate = new Date(dateItem.startDate);
            const endDate = new Date(dateItem.endDate);
            const currentDate = new Date(currentYear, month, day + 1);
            return currentDate >= startDate && currentDate <= endDate;
        });
    };

    const getEventCount = (day: number, month: number) => {
        return dates.filter(dateItem => {
            const date = new Date(dateItem.startDate);
            return date.getDate() === day + 1 && date.getMonth() === month && date.getFullYear() === currentYear;
        }).length;
    };

    const getTimeLeft = (startDate: Date) => {
        const now = new Date().getTime();
        const timeLeft = startDate.getTime() - now;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds left`;
    };

    const getEventDetails = (day: number, month: number) => {
        const events = dates.filter(dateItem => {
            const startDate = new Date(dateItem.startDate);
            const endDate = new Date(dateItem.endDate);
            const currentDate = new Date(currentYear, month, day + 1);
            return (
                (currentDate >= startDate && currentDate <= endDate) ||
                (startDate.getDate() === day + 1 && startDate.getMonth() === month && startDate.getFullYear() === currentYear)
            );
        }).map(event => ({
            name: event.name,
            startDate: event.startDate,
            endDate: event.endDate,
            getTimeLeft: () => getTimeLeft(event.startDate),
        }));

        return events;
    };

    const handleClick = (day: number, month: number) => {
        const events = getEventDetails(day, month);
        if (events.length > 0) {
            setModal({
                isOpen: true,
                events,
            });
        }
    };

    const closeModal = () => {
        setModal({ isOpen: false, events: [] });
    };

    const getEventColor = (day: number, month: number) => {
        if (isCurrentDay(day, month)) {
            return "bg-green-500 text-white";
        }
        if (isMultiDayEvent(day, month)) {
            return "bg-amber-500 text-white";
        }
        if (isDateHighlighted(day, month)) {
            return "bg-amber-700 text-white";
        }
        return "bg-gray-100";
    };

    return (
        <div className="calendar-view relative text-left">
            {months.map((month, index) => (
                <div key={index} className="month mb-6">
                    <h2 className="sm:text-xl text-2xl font-bold mb-4">{month}</h2>
                    <div className="grid grid-cols-7 gap-2">
                        {daysOfWeek.map((day, idx) => (
                            <div key={idx} className="day-header text-center font-semibold">
                                {day}
                            </div>
                        ))}
                        {Array.from({ length: getFirstDayOfMonth(index, currentYear) }).map((_, idx) => (
                            <div key={idx} className="day p-4 border rounded-lg h-20 bg-gray-100"></div>
                        ))}
                        {Array.from({ length: getDaysInMonth(index, currentYear) }, (_, day) => (
                            <div
                                key={day}
                                className={`day p-2 border rounded-lg cursor-pointer h-20 ${getEventColor(day, index)}`}
                                onClick={() => handleClick(day, index)}
                            >
                                <div className="text-lg font-semibold">{day + 1}</div>
                                <div className="text-xs text-gray-500">{daysOfWeek[getDayOfWeek(day, index)]}</div>
                                {isCurrentDay(day, index) && (
                                    <span className="text-xs text-white mt-1">Today</span>
                                )}
                                {isDateHighlighted(day, index) && (
                                    <span className="text-xs text-amber-200 mt-1">
                                        {getEventCount(day, index)} event(s)
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <Modal isOpen={modal.isOpen} onClose={closeModal} events={modal.events} />
        </div>
    );
};

export default CalendarView;

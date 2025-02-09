import { useState } from "react";
import Modal from "./Modal";

interface DateItem {
    id: number;
    date: Date;
    name: string;
}

interface CalendarViewProps {
    dates: DateItem[];
}

const CalendarView = ({ dates }: CalendarViewProps) => {
    const [modal, setModal] = useState<{ isOpen: boolean; events: { name: string; time: string; getTimeLeft: () => string }[] }>({
        isOpen: false,
        events: [],
    });

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const currentYear = new Date().getFullYear();
    const currentDate = new Date();

    const isDateHighlighted = (day: number, month: number) => {
        return dates.some(dateItem => {
            const date = new Date(dateItem.date);
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

    const getEventCount = (day: number, month: number) => {
        return dates.filter(dateItem => {
            const date = new Date(dateItem.date);
            return date.getDate() === day + 1 && date.getMonth() === month && date.getFullYear() === currentYear;
        }).length;
    };

    const getTimeLeft = (date: Date) => {
        const now = new Date().getTime();
        const timeLeft = date.getTime() - now;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds left`;
    };

    const getEventDetails = (day: number, month: number) => {
        const events = dates.filter(dateItem => {
            const date = new Date(dateItem.date);
            return date.getDate() === day + 1 && date.getMonth() === month && date.getFullYear() === currentYear;
        }).map(event => ({
            name: event.name,
            time: event.date.toLocaleTimeString("en-GB", { hour12: false }),
            getTimeLeft: () => getTimeLeft(event.date),
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

    return (
        <div className="calendar-view relative text-left">
            {months.map((month, index) => (
                <div key={index} className="month mb-6">
                    <h2 className="text-2xl font-bold mb-4">{month}</h2>
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: getDaysInMonth(index, currentYear) }, (_, day) => (
                            <div
                                key={day}
                                className={`day p-4 border rounded-lg cursor-pointer ${
                                    isCurrentDay(day, index)
                                        ? "bg-green-500 text-white"
                                        : isDateHighlighted(day, index)
                                        ? "bg-amber-700 text-white"
                                        : "bg-gray-100"
                                }`}
                                onClick={() => handleClick(day, index)}
                            >
                                <div className="text-lg font-semibold">{day + 1}</div>
                                {isDateHighlighted(day, index) && (
                                    <div className="text-xs text-amber-200 mt-1 text-right">
                                        {getEventCount(day, index)} event(s)
                                    </div>
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

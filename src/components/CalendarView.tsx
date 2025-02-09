import React, { useState } from "react";
import Modal from "./Modal";

interface DateItem {
    id: number;
    date: Date;
    name: string;
}

interface CalendarViewProps {
    dates: DateItem[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ dates }) => {
    const [modal, setModal] = useState<{ isOpen: boolean; content: string; getTimeLeft: () => string }>({
        isOpen: false,
        content: "",
        getTimeLeft: () => "",
    });

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const currentYear = new Date().getFullYear();

    const isDateHighlighted = (day: number, month: number) => {
        return dates.some(dateItem => {
            const date = new Date(dateItem.date);
            return date.getDate() === day + 1 && date.getMonth() === month && date.getFullYear() === currentYear;
        });
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
        const dateItem = dates.find(dateItem => {
            const date = new Date(dateItem.date);
            return date.getDate() === day + 1 && date.getMonth() === month && date.getFullYear() === currentYear;
        });
        return dateItem
            ? {
                content: `${dateItem.name} at ${dateItem.date.toLocaleTimeString("en-GB", { hour12: false })}`,
                getTimeLeft: () => getTimeLeft(dateItem.date),
            }
            : { content: "", getTimeLeft: () => "" };
    };

    const handleClick = (day: number, month: number) => {
        const { content, getTimeLeft } = getEventDetails(day, month);
        if (content) {
            setModal({
                isOpen: true,
                content,
                getTimeLeft,
            });
        }
    };

    const closeModal = () => {
        setModal({ isOpen: false, content: "", getTimeLeft: () => "" });
    };

    return (
        <div className="calendar-view relative">
            {months.map((month, index) => (
                <div key={index} className="month">
                    <h2 className="text-xl font-bold mb-2">{month}</h2>
                    <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: getDaysInMonth(index, currentYear) }, (_, day) => (
                            <div
                                key={day}
                                className={`day p-2 border rounded cursor-pointer ${isDateHighlighted(day, index) ? "bg-blue-500 text-white" : ""}`}
                                onClick={() => handleClick(day, index)}
                            >
                                {day + 1}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <Modal isOpen={modal.isOpen} onClose={closeModal} content={modal.content} getTimeLeft={modal.getTimeLeft} />
        </div>
    );
};

export default CalendarView;

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
    const [modal, setModal] = useState<{ isOpen: boolean; content: string }>({
        isOpen: false,
        content: "",
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

    const getEventDetails = (day: number, month: number) => {
        const dateItem = dates.find(dateItem => {
            const date = new Date(dateItem.date);
            return date.getDate() === day + 1 && date.getMonth() === month && date.getFullYear() === currentYear;
        });
        return dateItem ? `${dateItem.name} at ${dateItem.date.toLocaleTimeString("en-GB", { hour12: false })}` : "";
    };

    const handleClick = (day: number, month: number) => {
        const content = getEventDetails(day, month);
        if (content) {
            setModal({
                isOpen: true,
                content,
            });
        }
    };

    const closeModal = () => {
        setModal({ isOpen: false, content: "" });
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
            <Modal isOpen={modal.isOpen} onClose={closeModal} content={modal.content} />
        </div>
    );
};

export default CalendarView;

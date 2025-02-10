import { useState } from "react";
import Modal from "./Modal";
import { getTimeLeft } from "../utils/dateUtils";
import MonthView from "./MonthView";

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

    const currentYear = new Date().getFullYear();

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

    return (
        <div className="calendar-view relative text-left">
            {months.map((month, index) => (
                <MonthView
                    key={index}
                    month={month}
                    monthIndex={index}
                    year={currentYear}
                    dates={dates}
                    onDayClick={handleClick}
                />
            ))}
            <Modal isOpen={modal.isOpen} onClose={closeModal} events={modal.events} />
        </div>
    );
};

export default CalendarView;

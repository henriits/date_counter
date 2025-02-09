import { useEffect, useState } from "react";
import EventDetails from "./EventDetails";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    events: { name: string; startDate: Date; endDate: Date; getTimeLeft: () => string }[];
}

const Modal = ({ isOpen, onClose, events }: ModalProps) => {
    const [timeLeft, setTimeLeft] = useState(events.map(event => event.getTimeLeft()));

    useEffect(() => {
        if (isOpen) {
            const interval = setInterval(() => {
                setTimeLeft(events.map(event => event.getTimeLeft()));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isOpen, events]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Event Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>
                <div className="mb-4 space-y-4 text-left">
                    {events.map((event, index) => (
                        <EventDetails
                            key={index}
                            name={event.name}
                            startDate={event.startDate}
                            endDate={event.endDate}
                            timeLeft={timeLeft[index]}
                        />
                    ))}
                </div>
                <div className="flex justify-end">
                    <button onClick={onClose} className="btn btn-primary">Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

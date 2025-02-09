import React, { useEffect, useState } from "react";
import EventDetails from "./EventDetails";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    events: { name: string; time: string; timeLeft: string }[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, events }) => {
    const [timeLeft, setTimeLeft] = useState(events.map(event => event.timeLeft));

    useEffect(() => {
        if (isOpen) {
            const interval = setInterval(() => {
                setTimeLeft(events.map(event => event.timeLeft));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isOpen, events]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg w-1/2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Event Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>
                <div className="mb-4">
                    {events.map((event, index) => (
                        <EventDetails
                            key={index}
                            name={event.name}
                            time={event.time}
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

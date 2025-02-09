import React, { useEffect, useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
    getTimeLeft: () => string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content, getTimeLeft }) => {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    useEffect(() => {
        if (isOpen) {
            const interval = setInterval(() => {
                setTimeLeft(getTimeLeft());
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isOpen, getTimeLeft]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg w-1/2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Event Details</h2>
                    
                </div>
                <div className="mb-4">
                    {content}
                    <div>{timeLeft}</div>
                </div>
                <div className="flex justify-end">
                    <button onClick={onClose} className="btn btn-primary">Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

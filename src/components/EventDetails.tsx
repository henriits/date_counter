import React from "react";

interface EventDetailsProps {
    name: string;
    time: string;
    timeLeft: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({ name, time, timeLeft }) => {
    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">Time: {time}</p>
            <p className="text-sm text-gray-600">Time Left: {timeLeft}</p>
        </div>
    );
};

export default EventDetails;

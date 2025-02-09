interface EventDetailsProps {
    name: string;
    startDate: Date;
    endDate: Date;
    timeLeft: string;
}

const EventDetails = ({ name, startDate, endDate, timeLeft }: EventDetailsProps) => {
    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md text-left">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">Start: {startDate.toLocaleString("en-GB", { hour12: false })}</p>
            <p className="text-sm text-gray-600">End: {endDate.toLocaleString("en-GB", { hour12: false })}</p>
            <p className="text-sm text-gray-600">Time Left: {timeLeft}</p>
        </div>
    );
};

export default EventDetails;

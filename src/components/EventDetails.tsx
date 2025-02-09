interface EventDetailsProps {
    name: string;
    time: string;
    timeLeft: string;
}

const EventDetails = ({ name, time, timeLeft }:EventDetailsProps) => {
    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">Time: {time}</p>
            <p className="text-sm text-gray-600">Time Left: {timeLeft}</p>
        </div>
    );
};

export default EventDetails;

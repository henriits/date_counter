interface DayViewProps {
    day: number;
    monthIndex: number;
    eventColor: string;
    dayOfWeek: string;
    isCurrentDay: boolean;
    isDateHighlighted: boolean;
    eventCount: number;
    onDayClick: (day: number, month: number) => void;
}

const DayView = ({
    day,
    monthIndex,
    eventColor,
    dayOfWeek,
    isCurrentDay,
    isDateHighlighted,
    eventCount,
    onDayClick,
}: DayViewProps) => {
    return (
        <div
            className={`day p-2 border rounded-lg cursor-pointer h-20 ${eventColor}`}
            onClick={() => onDayClick(day, monthIndex)}
        >
            <div className="text-lg font-semibold">{day + 1}</div>
            <div className="text-xs text-gray-500">{dayOfWeek}</div>
            {isCurrentDay && (
                <span className="text-xs text-white mt-1">Today</span>
            )}
            {isDateHighlighted && (
                <span className="text-xs text-amber-200 mt-1">
                    {eventCount}
                </span>
            )}
        </div>
    );
};

export default DayView;

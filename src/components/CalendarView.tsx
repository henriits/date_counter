const CalendarView = () => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const currentYear = new Date().getFullYear();

    return (
        <div className="calendar-view">
            {months.map((month, index) => (
                <div key={index} className="month">
                    <h2 className="text-xl font-bold mb-2">{month}</h2>
                    <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: getDaysInMonth(index, currentYear) }, (_, day) => (
                            <div key={day} className="day p-2 border rounded">
                                {day + 1}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CalendarView;

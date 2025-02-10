export const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
};

export const getDayOfWeek = (day: number, month: number) => {
    const date = new Date(new Date().getFullYear(), month, day + 1);
    const dayOfWeek = date.getDay();
    return (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // Adjust to start from Monday
};

export const getFirstDayOfMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    return (firstDay === 0 ? 6 : firstDay - 1); // Adjust to start from Monday
};

export const getTimeLeft = (startDate: Date) => {
    const now = new Date().getTime();
    const timeLeft = startDate.getTime() - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds left`;
};

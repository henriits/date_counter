import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaCalendarAlt, FaList } from "react-icons/fa";
import CalendarView from "./components/CalendarView";
import "./App.css";

interface DateItem {
    id: number;
    startDate: Date;
    endDate: Date;
    name: string;
}

const App = () => {
    const [dates, setDates] = useState<DateItem[]>(() => {
        const savedDates = localStorage.getItem("dates");
        return savedDates
            ? JSON.parse(savedDates).map((item: DateItem) => ({
                  ...item,
                  startDate: new Date(item.startDate),
                  endDate: new Date(item.endDate),
              }))
            : [];
    });
    const [inputStartDate, setInputStartDate] = useState("");
    const [inputEndDate, setInputEndDate] = useState("");
    const [inputName, setInputName] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [editId, setEditId] = useState<number | null>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        localStorage.setItem("dates", JSON.stringify(dates));
    }, [dates]);

    useEffect(() => {
        const now = new Date();
        setDates((prevDates) =>
            prevDates.filter((item) => new Date(item.endDate) > now)
        );
    }, [dates]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const addDate = () => {
        if (inputStartDate && inputEndDate && inputName) {
            const newStartDate = new Date(inputStartDate);
            const newEndDate = new Date(inputEndDate);
            if (editId !== null) {
                setDates((prevDates) =>
                    prevDates
                        .map((item) =>
                            item.id === editId
                                ? { ...item, startDate: newStartDate, endDate: newEndDate, name: inputName }
                                : item
                        )
                        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
                );
                setEditId(null);
            } else {
                setDates((prevDates) =>
                    [
                        ...prevDates,
                        { id: Date.now(), startDate: newStartDate, endDate: newEndDate, name: inputName },
                    ].sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
                );
            }
            setInputStartDate("");
            setInputEndDate("");
            setInputName("");
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleEdit = (id: number) => {
        const dateToEdit = dates.find((item) => item.id === id);
        if (dateToEdit) {
            setInputStartDate(dateToEdit.startDate.toISOString().slice(0, 16));
            setInputEndDate(dateToEdit.endDate.toISOString().slice(0, 16));
            setInputName(dateToEdit.name);
            setEditId(id);
        }
    };

    const handleDelete = (id: number) => {
        setDates((prevDates) => prevDates.filter((item) => item.id !== id));
    };

    const filteredDates = dates.filter(
        (item) =>
            (item.startDate instanceof Date && !isNaN(item.startDate.getTime()) && item.startDate.toISOString().toLowerCase().includes(searchTerm)) ||
            (item.endDate instanceof Date && !isNaN(item.endDate.getTime()) && item.endDate.toISOString().toLowerCase().includes(searchTerm)) ||
            item.name.toLowerCase().includes(searchTerm)
    );

    const getTimeLeft = (startDate: Date) => {
        const now = new Date().getTime();
        const timeLeft = startDate.getTime() - now;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds left`;
    };

    const currentDate = currentTime.toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const currentTimeString = currentTime.toLocaleTimeString("en-GB", {
        hour12: false,
    });

    return (
        <div className="container w-auto">
            <h1 className="text-4xl font-bold mb-2 text-center">
                Event Planner
            </h1>
            <div className="text-center mb-6">
                <div className="text-lg font-normal">{currentDate}</div>
                <div className="text-lg font-normal">{currentTimeString}</div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center mb-6 space-y-4 md:space-y-0 md:space-x-4 text-left">
                <input
                    type="text"
                    placeholder="Event Name"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="input input-bordered w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="datetime-local"
                    value={inputStartDate}
                    onChange={(e) => setInputStartDate(e.target.value)}
                    className="input input-bordered w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="datetime-local"
                    value={inputEndDate}
                    onChange={(e) => setInputEndDate(e.target.value)}
                    className="input input-bordered w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={addDate}
                    className={`btn ${
                        editId !== null ? "btn-warning" : "btn-primary"
                    } w-full md:w-auto px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                    {editId !== null ? <FaEdit /> : <FaPlus />}
                </button>

                

            </div>
            <div className="flex flex-col sm:flex-row justify-between mb-4">
            {!showCalendar && (
                    <input
                        type="text"
                        placeholder="Search date or name"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="input input-bordered w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}

                <div className="flex justify-end w-full md:w-auto">
                    <button
                        onClick={() => setShowCalendar(!showCalendar)}
                        className="btn btn-secondary w-full md:w-auto px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        {showCalendar ? <FaList /> : <FaCalendarAlt />}
                    </button>
                </div>
            </div>
            {showCalendar ? (
                <CalendarView dates={dates} />
            ) : (
                <ul className="list-none space-y-4 text-left">
                    {filteredDates.map((item) => (
                        <li key={item.id} className="p-4 border rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="block text-lg font-semibold">{item.name}</span>
                                    <span className="block text-sm text-gray-600">
                                        {item.startDate.toLocaleString("en-GB", {
                                            hour12: false,
                                        })} - {item.endDate.toLocaleString("en-GB", {
                                            hour12: false,
                                        })}
                                    </span>
                                    <div className="text-sm text-gray-500">
                                        {getTimeLeft(item.startDate)}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(item.id)}
                                        className="btn btn-warning px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="btn btn-error px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;
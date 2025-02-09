import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaCalendarAlt, FaList } from "react-icons/fa";
import CalendarView from "./components/CalendarView";
import "./App.css";

interface DateItem {
    id: number;
    date: Date;
    name: string;
}

const App = () => {
    const [dates, setDates] = useState<DateItem[]>(() => {
        const savedDates = localStorage.getItem("dates");
        return savedDates
            ? JSON.parse(savedDates).map((item: DateItem) => ({
                  ...item,
                  date: new Date(item.date),
              }))
            : [];
    });
    const [inputDate, setInputDate] = useState("");
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
            prevDates.filter((item) => new Date(item.date) > now)
        );
    }, [dates]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const addDate = () => {
        if (inputDate && inputName) {
            const newDate = new Date(inputDate);
            if (editId !== null) {
                setDates((prevDates) =>
                    prevDates
                        .map((item) =>
                            item.id === editId
                                ? { ...item, date: newDate, name: inputName }
                                : item
                        )
                        .sort((a, b) => a.date.getTime() - b.date.getTime())
                );
                setEditId(null);
            } else {
                setDates((prevDates) =>
                    [
                        ...prevDates,
                        { id: Date.now(), date: newDate, name: inputName },
                    ].sort((a, b) => a.date.getTime() - b.date.getTime())
                );
            }
            setInputDate("");
            setInputName("");
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleEdit = (id: number) => {
        const dateToEdit = dates.find((item) => item.id === id);
        if (dateToEdit) {
            setInputDate(dateToEdit.date.toISOString().slice(0, 16));
            setInputName(dateToEdit.name);
            setEditId(id);
        }
    };

    const handleDelete = (id: number) => {
        setDates((prevDates) => prevDates.filter((item) => item.id !== id));
    };

    const filteredDates = dates.filter(
        (item) =>
            item.date.toISOString().includes(searchTerm) ||
            item.name.includes(searchTerm)
    );

    const getTimeLeft = (date: Date) => {
        const now = new Date().getTime();
        const timeLeft = date.getTime() - now;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
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
        <div className="container mx-auto p-6">
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
                    className="input input-bordered w-full md:w-auto"
                />
                <input
                    type="datetime-local"
                    value={inputDate}
                    onChange={(e) => setInputDate(e.target.value)}
                    className="input input-bordered w-full md:w-auto"
                />
                <button
                    onClick={addDate}
                    className={`btn ${
                        editId !== null ? "btn-warning" : "btn-primary"
                    } w-full md:w-auto`}
                >
                    {editId !== null ? <FaEdit /> : <FaPlus />}
                </button>
                {!showCalendar && (
                    <input
                        type="text"
                        placeholder="Search date or name"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="input input-bordered w-full md:w-auto"
                    />
                )}
                <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="btn btn-secondary w-full md:w-auto"
                >
                    {showCalendar ? <FaList /> : <FaCalendarAlt />}
                </button>
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
                                        {item.date.toLocaleString("en-GB", {
                                            hour12: false,
                                        })}
                                    </span>
                                    <div className="text-sm text-gray-500">
                                        {getTimeLeft(item.date)}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(item.id)}
                                        className="btn btn-warning"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="btn btn-error"
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
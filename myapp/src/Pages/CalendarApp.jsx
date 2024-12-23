import React, { useState, useEffect } from "react";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Dialog from "../components/ui/Dialog";
import { Button } from "../components/ui/Button";

const CalendarApp = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(
    () => JSON.parse(localStorage.getItem("events")) || {}
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate the number of days in the month
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  // Get the first day of the month to correctly align the calendar
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  // Handles month navigation (previous/next month)
  const handleMonthChange = (increment) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + increment,
      1
    );
    setCurrentDate(newDate);
  };

  //   selecting a date, opening the modal to add events
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };
  //for submitting a new event
  const handleEventSubmit = () => {
    if (!newEvent.name || !newEvent.startTime || !newEvent.endTime) {
      return alert("Please fill out all required fields.");
    }

    const dateKey = selectedDate.toISOString().split("T")[0];

    const dayEvents = events[dateKey] || [];
    // Check if the event overlaps with any existing events
    const isOverlapping = dayEvents.some((event) => {
      const newStart = new Date(`1970-01-01T${newEvent.startTime}:00`);
      const newEnd = new Date(`1970-01-01T${newEvent.endTime}:00`);
      const existingStart = new Date(`1970-01-01T${event.startTime}:00`);
      const existingEnd = new Date(`1970-01-01T${event.endTime}:00`);
      return newStart < existingEnd && newEnd > existingStart;
    });

    if (isOverlapping) {
      return alert("This event overlaps with an existing event.");
    }
    // Update events in state and localStorage
    const updatedEvents = {
      ...events,
      [dateKey]: [...dayEvents, { ...newEvent }],
    };

    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setNewEvent({ name: "", startTime: "", endTime: "", description: "" });
    setModalOpen(false);
  };

  // to remove an event
  const handleEventRemove = (eventToRemove) => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    const dayEvents = events[dateKey] || [];

    const updatedEvents = {
      ...events,
      [dateKey]: dayEvents.filter((event) => event !== eventToRemove),
    };

    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // Render the calendar days
  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const days = Array.from(
      { length: daysInMonth(year, month) },
      (_, i) => i + 1
    );

    // Offset for the first day of the month
    const offset = firstDayOfMonth(year, month);

    return (
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold text-center">
            {day}
          </div>
        ))}

        {/* Render empty cells of the month */}
        {Array(offset)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className="border p-2 rounded-lg"></div>
          ))}

        {days.map((day) => {
          const isToday =
            new Date().toDateString() ===
            new Date(year, month, day).toDateString();
          const isWeekend = [0, 6].includes(
            new Date(year, month, day).getDay()
          );

          return (
            <div
              key={day}
              className={`border p-2 text-center cursor-pointer rounded-lg shadow-sm hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors ${
                selectedDate?.getDate() === day &&
                selectedDate?.getMonth() === month
                  ? "bg-blue-500 text-white"
                  : isToday
                  ? "bg-green-300 dark:bg-green-600"
                  : isWeekend
                  ? "bg-red-100 dark:bg-red-100 dark:text-black"
                  : ""
              }`}
              onClick={() => handleDateClick(new Date(year, month, day))}
            >
              {day}
            </div>
          );
        })}
      </div>
    );
  };

  const renderEventList = () => {
    if (!selectedDate) return null;
    const dateKey = selectedDate.toISOString().split("T")[0]; //Format date to YYYY-MM-DD
    const dayEvents =
      events[dateKey]?.filter((event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];

    return (
      <div className="p-4">
        <h3 className="text-lg font-bold">
          Events for {selectedDate.toDateString()}
        </h3>
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded mt-2 mb-4 dark:text-black"
        />
        {dayEvents.length > 0 ? (
          <ul className="space-y-2">
            {dayEvents.map((event, index) => (
              <li key={index} className="p-2 border rounded shadow relative">
                <strong>{event.name}</strong>
                <p>
                  {event.startTime} - {event.endTime}
                </p>
                {event.description && (
                  <p className="text-gray-600 dark:text-gray-400">
                    {event.description}
                  </p>
                )}
                <Button
                  onClick={() => handleEventRemove(event)}
                  className="absolute top-2 right-2 text-white bg-red-500 dark:bg-red-500 hover:bg-red-600 dark:hover:bg-red-600"
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No events for this day.</p>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-4">
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => handleMonthChange(-1)}
        >
          Previous
        </Button>
        <h2 className="text-lg font-bold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => handleMonthChange(1)}
        >
          Next
        </Button>
      </header>

      {renderDays()}

      <Dialog isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 className="text-xl font-bold mb-4">Add Event</h3>
        <Input
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          placeholder="Event Name"
        />
        <div className="flex space-x-4 mt-4">
          <Input
            type="time"
            value={newEvent.startTime}
            onChange={(e) =>
              setNewEvent({ ...newEvent, startTime: e.target.value })
            }
            placeholder="Start Time"
          />
          <Input
            type="time"
            value={newEvent.endTime}
            onChange={(e) =>
              setNewEvent({ ...newEvent, endTime: e.target.value })
            }
            placeholder="End Time"
          />
        </div>
        <Textarea
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
          placeholder="Event Description"
        />
        <button
          onClick={handleEventSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
        >
          Save Event
        </button>
      </Dialog>

      {renderEventList()}
    </div>
  );
};

export default CalendarApp;

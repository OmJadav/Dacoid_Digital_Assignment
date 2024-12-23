# CalendarApp

A simple and interactive and dynamic calendar application built with React. This app allows users to add, view, and remove events for any given day. Users can search through events, and the app provides visual separation between weekends and weekdays. The calendar can be navigated through the months, and events are stored in `localStorage` to persist data across sessions.

## Features

- **Monthly Calendar View**: Navigate through months and view events on specific days.
- **Event Management**: Add, view, and remove events for any selected date.
- **Event Search**: Search through events on a selected date.
- **Persistent Storage**: Events are stored in the browser’s `localStorage` to persist across sessions.
- **Responsive Design**: The app is fully responsive and works across different screen sizes.
- **Weekend Highlighting**: Saturdays and Sundays are visually separated with distinct background colors.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **shadcn UI**: A collection of pre-designed, customizable UI components for creating modern and responsive web interfaces.
- **Tailwind CSS**: A utility-first CSS framework for building custom designs.

## Installation & Setup

To run this app locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/calendarapp.git
   cd calendarapp
   ```

2. **Install dependencies**:
   You need `Node.js` installed on your machine. If you don’t have it, [download and install it here](https://nodejs.org/).

   Once installed, run the following command to install all necessary dependencies:

   ```bash
   npm install
   ```

3. **Start the development server**:
   After the dependencies are installed, start the development server:

   ```bash
   npm start
   ```

   This will launch the app in your default web browser at [http://localhost:3000](http://localhost:3000).

## Deployed App

You can access the deployed version of the app here:

[Deployed CalendarApp](https://your-deployed-app-link.com)

## Usage

- **Navigate through months**: Click on the "Previous" and "Next" buttons to move between months.
- **Add events**: Click on any date, fill out the event form, and click "Save Event".
- **Search events**: Use the search bar to filter events on a selected day.
- **Remove events**: Click on the "Remove" button next to any event to delete it.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

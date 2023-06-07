# draggable-screen-time-tracker

This is a simple Electron.js application that tracks the user's desktop screen time and handles user idleness. The application features a draggable widget that displays the screen time and idleness status.

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
git clone https://github.com/neeleshk143/draggable-screen-time-tracker.git

markdown

2. Install the dependencies:
cd draggable-screen-time-tracker
npm install

bash

## Usage

To start the application, run the following command:

npm start

vbnet

The draggable widget will appear on your screen, displaying the screen time and idleness status. You can drag the widget to any desired position.

## Configuration (Optional)

If you want to customize the idle time threshold, you can modify the `idleThreshold` constant in the `src/renderer/components/Widget.tsx` file. The default value is set to 60 seconds (1 minute).

## Development

To run the application in development mode with live reloading, use the following command:

npm run dev

bash

## Build

To build the application for your current platform, use the following command:

npm run package

csharp

The built application will be stored in the `dist` directory.

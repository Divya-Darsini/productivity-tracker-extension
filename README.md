Productivity Tracker - Chrome/Edge Extension
📌 Overview
The Productivity Tracker is a browser extension built using the MERN stack that helps you monitor your browsing habits, block distracting sites, and generate daily productivity reports.
It runs in the background, tracks the time spent on different websites, and displays statistics in a clean popup UI.

✨ Features
⏱ Track Time — Monitors time spent on each website in real time.

🚫 Block Distracting Sites — Set a blacklist of websites to avoid distractions.

📊 Daily Reports — See your productivity stats in a daily summary.

💾 MERN Backend Integration — Saves user data in MongoDB for long-term tracking.

🔄 Runs on Chrome and Microsoft Edge — Works seamlessly in both browsers.

📂 Project Structure

📦 productivity-tracker
 ┣ 📂 backend               # Node.js + Express + MongoDB server
 ┣ 📂 extension
 ┃ ┣ 📂 popup               # HTML/CSS/JS for popup UI
 ┃ ┣ manifest.json          # Extension config file
 ┃ ┣ background.js          # Tracks time and blocks sites
 ┃ ┣ content.js             # Injected into webpages
 ┣ README.md
 
🛠️ Installation
1️⃣ Backend Setup
Navigate to the backend folder:

cd backend
Install dependencies:

npm install
Create a .env file with:

MONGO_URI=your_mongo_connection
PORT=5000
Run the backend:

npm start
2️⃣ Extension Setup (Chrome/Edge)
Open Microsoft Edge or Google Chrome.

Go to:
edge://extensions
or for Chrome:

chrome://extensions
Enable Developer Mode (top right).

Click Load Unpacked.

Select the extension folder of this project.

The extension icon will now appear in your browser toolbar.

📸 Output Screenshots
Include the following in your submission:

Extension loaded in Edge extensions page (showing name, version).

Popup UI showing time tracking stats.

Blocking page when trying to access a blacklisted website.

Backend terminal output showing activity logs.

MongoDB database showing stored records.

📚 Tech Stack
Frontend (Extension): HTML, CSS, JavaScript

Backend: Node.js, Express.js

Database: MongoDB

Browser API: Chrome/Edge Extension API

📄 How It Works
The background.js file tracks active tabs and sends updates to the backend.

The backend stores the data in MongoDB.

The popup UI fetches data from the backend and displays usage stats.

The blocking logic stops the user from visiting blacklisted sites.

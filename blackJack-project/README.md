# Blackjack Casino Game 🎰🃏

## Overview

This project is a fully interactive Blackjack casino-style game built with:

- HTML
- CSS
- JavaScript (ES6 Modules)
- OOP (Object-Oriented Programming)
- Fetch API
- Async / Await
- DOM Manipulation
- Event Listeners
- External Deck API
- Local Sound System

The project simulates a modern Blackjack experience with betting mechanics, sound effects, animated dealer turns, and a responsive casino-style interface.

---

# Features

## 🎴 Blackjack Gameplay

- Full Blackjack game logic
- Dealer AI behavior
- Automatic win detection on 21
- Player bust / dealer bust handling
- Tie handling
- Double Bet mechanic (x2)
- Dealer draws until reaching 17+

---

## 💰 Betting System

The game includes a casino chip betting system:

- 10
- 50
- 100
- 200
- 500

Features:

- Flexible betting
- Combined chip betting
- Double Bet option
- Score tracking
- Dealer bankroll system

---

## 👤 Player System

At the start of the game:

- The player chooses a username
- The player chooses starting points

The selected username is displayed during gameplay.

---

## 🃏 Card Flow System

### Round Start

When pressing **New Game**:

- Both dealer cards are generated
- Player receives:
  - One open card
  - One hidden card

After placing a bet:

- The second player card is revealed
- Gameplay becomes active

---

## 🔊 Sound System

The project includes local sound support using:

```javascript
const backgroundMusic = new Audio("./sounds/backgroundMusic.mp3");
const startSound = new Audio("./sounds/hit.mp3");
const winSound = new Audio("./sounds/win.mp3");
const lossSound = new Audio("./sounds/lose.mp3");
const drawSound = new Audio("./sounds/tie.m4a");
```

### Sound Features

- Background music
- Hit sounds
- Win sound
- Lose sound
- Tie sound
- Toggle ON/OFF button
- Sound starts OFF by default

---

## 🎨 UI / Design

### Casino Style Interface

- Modern casino theme
- Responsive layout
- Styled playing cards
- Casino chips design
- Hidden/revealed card animations
- Custom action buttons
- Compact full-screen layout

### Buttons

- Hit
- Stand
- x2 Double Bet
- New Game
- Sound Toggle

---

# Updated Project Structure

```plaintext
project-folder/
│
├── index.html
│
├── assets/
│   ├── main.js
│   ├── ui.js
│   ├── api.js
│   │
│   └── sounds/
│       ├── backgroundMusic.mp3
│       ├── hit.mp3
│       ├── win.mp3
│       ├── lose.mp3
│       └── tie.m4a
│
├── styles/
│   └── style.css
│
└── README.md
```

# JavaScript Architecture

## main.js

Responsible for:

- Main game logic
- OOP classes
- Event handling
- Round flow
- Win/Loss logic
- Betting system
- Sound system

---

## ui.js

Responsible for:

- DOM rendering
- Updating cards
- Updating scores
- Updating messages
- UI state handling
- Screen switching

---

## api.js

Responsible for:

- Connecting to Deck Of Cards API
- Fetching cards
- Local fallback deck generation
- Card conversion system

---

# Technologies Used

## JavaScript Concepts

- Classes
- Modules
- Import / Export
- Async / Await
- Fetch API
- Arrays
- Objects
- DOM Manipulation
- Event Listeners
- Conditional Logic
- Timers / Delays

---

# API Used

Deck Of Cards API:

https://deckofcardsapi.com/

Used for:

- Deck generation
- Card drawing
- Shuffle system

The project also includes a local fallback deck if the API becomes unavailable.

---

# How To Run

1. Open the project folder in VS Code
2. Install Live Server extension
3. Right click `index.html`
4. Click:
   `Open with Live Server`

---

# Important Note

Do NOT open the project with double click on `index.html`.

The project uses ES6 Modules (`import/export`) which require a local server.

---

# Game Ending Conditions

## Player Wins Entire Game

- Dealer points reach 0 you win

- The player no longer has enough points to place the minimum bet he loses

---

# Author

Nadav ben moshe

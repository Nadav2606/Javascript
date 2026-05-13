# Blackjack Game Project

## Overview

This project is a fully interactive Blackjack card game built with modern JavaScript.

The game was developed using:

- HTML
- CSS
- JavaScript
- Object-Oriented Programming (OOP)
- DOM Manipulation
- Event Listeners
- Fetch API
- Async / Await

The game connects to the public Deck Of Cards API in order to generate real shuffled cards during gameplay.

---

# Features

## Player System

- Player enters a custom name before starting the game.
- Player starts with 1000 points.
- Dealer also starts with 1000 points.

---

# Betting System

The game includes a complete betting system with poker-style chips.

Available chips:

- 10
- 50
- 100
- 200
- 500

Features:

- Multiple chips can be combined.
- Current bet is displayed live.
- Player must press **Start Round** to lock the bet and begin the round.
- Clear Bet button resets the current bet before the round starts.

---

# Blackjack manual

The idea of the game is to reach 21 score or hitting a score higher then the dealer
you start the game by betting, the player start with 1000 points if the player reach zero points the game is over but if the dealer reach zero points then the player win the game.
after betting the player recive two cards from there the player can do 3 moves:
pressing "hit" will add an extra card but be careful not to get "bust"(getting a score above 21) when you want to stop you click "stand" and then its the dealer turns.
if you like your cards you can just press "stand" and hope the dealer wont recive higher score then yours.
the last move is "double or nothing" (2x) when pressing that button the player doubles his bet (if player bet 100 points by pressing 2x its will be 200 points) and addinonal card opens and then its the dealer move. if you win you will reacive double points and the dealer will lose double points the same way gose if you lose.
games ends when player or dealer losing all of the points.

# Project Structure

```txt
blackJack-project/
│
├── index.html
│
├── assets/
│   ├── api.js
│   ├── ui.js
│   └── main.js
│
├── styles/
│   └── style.css
│
├── sounds/
│   ├── background.mp3
│   ├── card.mp3
│   ├── win.mp3
│   ├── lose.mp3
│   ├── draw.mp3
│   └── blackjack.mp3
│
└── README.md
```

---

# Technologies Used

## HTML

Used to build:

- Game structure
- Buttons
- Betting chips
- Result screens
- Card containers

---

## CSS

Used for:

- Responsive layout
- Animations
- Card design
- Mobile adaptation
- Chip styling
- Game table styling

---

## JavaScript

Used for:

- Game logic
- Score calculations
- Betting system
- API communication
- Sound system
- DOM updates
- Event handling
- Delays and animations

---

# API Usage

The game uses:

Deck Of Cards API

API features used:

- Deck creation
- Card shuffling
- Card drawing

Example endpoint:

```txt
https://deckofcardsapi.com/
```

---

# OOP Structure

The project uses Object-Oriented Programming.

Main classes:

- Player
- DeckApi
- SoundManager
- UI
- BlackjackGame

Each class has a dedicated responsibility.

---

# Future Improvements

Possible future upgrades:

- Multiplayer support
- Online leaderboard
- Save game progress
- Casino animations
- Difficulty modes
- Dealer AI improvements
- Achievement system

---

# Author

Nadav ben moshe JS project

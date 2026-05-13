# Blackjack Project - Fixed Responsive Version

## What was fixed

- Added background music.
- Added a separate sound effects toggle.
- Returned automatic win when the player reaches 21.
- When the player gets 21, the game shows: `BlackJack Win`.
- Improved layout so the full game is on one screen without scrolling.
- Improved mobile responsiveness.
- Betting buttons now look like poker chips.
- Result screen appears after a short `setTimeout`, so the ending is not too fast.

## Sound files

Put your files inside the `sounds` folder with these exact names:

```txt
background.mp3
card.mp3
win.mp3
lose.mp3
draw.mp3
blackjack.mp3
```

The game starts with:

```txt
Music OFF
Sound OFF
```

This is correct because browsers usually block automatic audio until the user clicks a button.

## Files

```txt
index.html
assets/api.js
assets/ui.js
assets/main.js
styles/style.css
sounds/
```

## Run

Open `index.html` with Live Server in VS Code.

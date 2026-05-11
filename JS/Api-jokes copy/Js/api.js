const jokeBox = document.getElementById("jokeBox");
const btn = document.getElementById("btn");

const url = "https://v2.jokeapi.dev/joke/Any?amount=10";

let jokes = [];
let currentIndex = 0;

async function loadJokes() {
  jokeBox.textContent = "Loading joke for you...";
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);

  jokes = data.jokes;
  currentIndex = 0;

  showJokes();
}

async function showJokes() {
  if (!jokes.length) return;

  const joke = jokes[currentIndex];

  if (joke.type === "single") {
    jokeBox.textContent = joke.joke;
  } else {
    jokeBox.textContent = `${joke.setup}-${joke.delivery}`;
  }
}

btn.addEventListener("click", loadJokes);

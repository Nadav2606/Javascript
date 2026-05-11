const button = document.querySelector("button");
const p = document.querySelector("p");

const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        resolve(success);
      },
      (error) => {
        console.log("error");
      },
    );
  });
  return promise;
};

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done");
    }, duration);
  });
  return promise;
};

function trackUser() {
  getPosition()
    .then((posData) => {
      console.log(posData);
    })
    .then((result) => {
      console.log("my Data", result);
    })
    .catch((error) => {
      console.log(error);
    });
  setTimeout(() => {
    console.log("timer done");
  }, 0);

  console.log("getting possion");
}

button.addEventListener("click", trackUser);

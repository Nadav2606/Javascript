// //alerts

// // alert(10 + 9);
// // alert("hello-world");
// // alert("welcome to javascript");

// //strings
// console.log("hello world");
// console.log("hello" + "" + "nadav");

// console.log("hello".length);
// console.log("שלום".length);

// "welcome".toUpper[]Case();
// "WELCOME".toLowerCase();
// "javeScript is fun".includes("fun"); // הוא כולל את המילה FUN
// "Hello".includes("happy"); // הטקסט לא כלול בסטרינג
// "big dog".replace("world", "boss"); // ממיר את המילה במשפט במילה אחרת במידה והיא קיימת במשפט
// console.log("dog dog dog".replace("dog", "cat"));

// //variables
// let age = 32;
// console.log(age);

// let number; // declaration = הצהרה
// number = 7; //initialztion = אתחול
// console.log(number);

// let num = 8;

// let name = "nadav";
// name = "Nadav";

// let calculate = 6 + 6;
// calculate = calculate + 5;
// console.log(calculate);

// let fullName = "Nadav" + "ben-mosche";

// let numOne = 3;
// let numTwo = 7;

// console.log(numOne + numTwo);

// 0-0.9
// console.log(math.floor(Math.random() * 10));

// ליצור משתנה ששומר לראשונה את המספר 3 לאחר השמירה תכפילו אותו בשתיים ותדפיסו לconsol

// let num = 3;
// calculate = num * 2;

// let name = "nadav";
// let age = 32;
// console.log("hello" + name + "you age is" + age);
// console.log(`hello ${name}, your age is ${age} `);

// const randomNumber = Math.random();
// let computerMove = "";
// if (randomNumber >= 0 && randomNumber < 1 / 3) {
//   computerMove = "rock";
// } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
//   computer = "paper";
// } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
//   computerMove = "scissors";
// }

function add(a, b) {
  return a + b;
}

const result = add(5, 10);
console.log(result);

function stop() {
  console.log("return לפני");
  return 10;
  console.log("לא יודפס כי אפשר רק פעם אחת");
}

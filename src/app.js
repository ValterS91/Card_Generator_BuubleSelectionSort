/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";
import { distanceAndSkiddingToXY } from "@popperjs/core/lib/modifiers/offset";

const BODY = document.querySelector("body");
const DECK = document.querySelector("#number"); // Use "#" to select class inside the Query Selector
const FORM = document.querySelector("form");
const ROW = document.querySelector(".row");
const ROW1 = document.querySelector(".row1");
const bubbleSort = document.querySelector("#bubbleSort");
const selectionSort = document.querySelector("#selectionSort");

const SUITS = ["♦", "♥", "♠", "♣"];
const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

window.onload = function() {};
let cards = [];

FORM.addEventListener("submit", event => {
  event.preventDefault(); //Prevents loading propagation.
  ROW.innerHTML = "";
  cards = [];
  for (let i = 0; i < DECK.value; i++) {
    cards.push(getCard());
  }

  drawCards(cards, ROW);
});

bubbleSort.addEventListener("click", event => {
  event.preventDefault();
  ROW1.innerHTML = "";

  // let bubblecards = [];

  let len = cards.length;
  for (let i = 0; i < len; i++) {
    for (let j = 1; j < len; j++) {
      if (cards[j - 1].value > cards[j].value) {
        let tmp = cards[j - 1];
        cards[j - 1] = cards[j];
        cards[j] = tmp;
      }
    }
  }
  drawCards(cards, ROW1);
});

selectionSort.addEventListener("click", event => {
  event.preventDefault();
  let n = cards.length;
  ROW1.innerHTML = "";
  for (let i = 0; i < n; i++) {
    // Finding the smallest number in the subarray
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (cards[j].value < cards[min].value) {
        min = j;
      }
    }
    if (min != i) {
      // Swapping the elements
      let tmp = cards[i];
      cards[i] = cards[min];
      cards[min] = tmp;
    }
  }
  drawCards(cards, ROW1);
});

function getCard() {
  return {
    value: VALUES[getRandom(VALUES)],
    suit: SUITS[getRandom(SUITS)]
  };
}

function getRandom(list) {
  return Math.floor(Math.random() * list.length);
}

function drawCards(cards, container) {
  for (const card of cards) {
    let cardBody = document.createElement("div");
    cardBody.classList.add("card");
    container.appendChild(cardBody);

    let TOP = document.createElement("div");
    TOP.classList.add("card-topsuite");
    TOP.innerHTML = card["suit"];
    cardBody.appendChild(TOP);

    let CENTER = document.createElement("div");
    CENTER.classList.add("card-centersuite");
    CENTER.innerHTML = card["value"];
    cardBody.appendChild(CENTER);

    let BOTTOM = document.createElement("div");
    BOTTOM.classList.add("card-bottomsuite");
    BOTTOM.innerHTML = card["suit"];
    cardBody.appendChild(BOTTOM);

    if (card["suit"] == "♦" || card["suit"] == "♥") {
      TOP.classList.add("color-red");
      BOTTOM.classList.add("color-red");
    } else {
      TOP.classList.add("color-black");
      BOTTOM.classList.add("color-black");
    }
  }
}

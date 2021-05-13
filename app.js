"use strict";

let cmdInput = document.getElementById("cmdline-input");
let myOutput = document.getElementsByClassName("output-container")[0];

const createOutput = (e) => {
  if (e.code === "Enter") {
    // console.log(e.target.value.toLowerCase());

    if (e.target.value.toLowerCase() === "clear") {
      myOutput.innerHTML = "";
    } else {
      let newElem = document.createElement("div");
      newElem.classList.add("prompt");
      newElem.innerHTML = `KenjiNozaki@gmail.com: ${e.target.value}`;
      myOutput.appendChild(newElem);
      // console.log(myOutput)
    }
    
    e.target.value = "";
  }

  if (e.code === "Tab") {
    console.log(e.target.value);
    e.target.value = "";
  }
};

cmdInput.addEventListener("keydown", createOutput);
"use strict";

let cmdInput = document.getElementById("cmdline-input");

cmdInput.addEventListener("input", (e) => {
  console.log(cmdInput.value);
});
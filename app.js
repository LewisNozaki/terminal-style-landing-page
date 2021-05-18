"use strict";

let cmdInput = document.getElementById("cmdline-input");

let cmdOutput = document.getElementsByClassName("output-container")[0];

const createOutput = (e) => {
  // Keypress Enter
  if (e.code === "Enter") {
    let newElem = document.createElement("div");
    newElem.innerHTML = `KenjiNozaki@gmail.com: $ ${e.target.value}`;
    cmdOutput.appendChild(newElem);

    if (e.target.value.toLowerCase() === "clear") {
      cmdOutput.innerHTML = "";
    };
    
    if (e.target.value.toLowerCase() === "exit") {
      document.getElementsByClassName("container")[0].style.display = "none";
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };

    if (e.target.value.toLowerCase() === "refresh") {
      cmdOutput.innerHTML = "";
      location.reload();
    };

    e.target.value = "";
  } 

  // Keypress Tab
  if (e.code === "Tab") {
    e.preventDefault();
    if (e.target.value === "h" ||
        e.target.value === "he" ||
        e.target.value === "hel") {
      e.target.value = "help";
      // e.preventDefault();
    }
  }
};

cmdInput.addEventListener("keydown", createOutput);

//////// Draggable ////////

const dragElement = (elmnt) => {
  let pos1 = 0, 
      pos2 = 0, 
      pos3 = 0, 
      pos4 = 0;
  
  let cmdHeader = document.getElementById("mydivheader");

  // function that moves the container based on the position of the mouse
  const elementDrag = (e) => {
    // prevents default behavior
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  };

  // function that resets to default state
  const initializeElement = () => {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  };
  
  const dragMouseDown = (e) => {
    // prevents default behavior
    e = e || window.event;
    e.preventDefault();

    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;

    // execute stop function when the mouse is released in document:
    document.onmouseup = initializeElement;

    // execute function whenever the cursor moves:
    document.onmousemove = elementDrag;
  };

  // Add event listener to the header element inside the container
  cmdHeader.onmousedown = dragMouseDown;
};

dragElement(document.getElementById("mydiv"));

//////// Button Window Functionality ////////

let mainContainer = document.getElementsByClassName("container")[0];

let contentArea = document.getElementsByClassName("content")[0];

let buttons = Array.from(document.getElementsByClassName("win-btn"));

const css = window.document.styleSheets[0];

const myButtonFunc = (e) => {
  if (e.target.id === "close") {
    mainContainer.style.display = "none";

  } else if (e.target.id === "minimize") {
    // let boxLeft = mainContainer.offsetLeft;

    // let boxTop = mainContainer.offsetTop;

    // css.insertRule(`
    // @keyframes myAnimation {
    //   100% {
    //     width: 400px;
    //     height: 32px;
    //   }
    // }`, css.cssRules.length);

    mainContainer.classList.toggle("minimize");

  } else if (e.target.id === "expand") {
    if (!document.fullscreenElement) {
      contentArea.requestFullscreen();
    }

  }
};

buttons.forEach(button => {
  button.addEventListener("click", myButtonFunc);
});

document.addEventListener("click", (e) => {
  if (e.target.classList[0] === "terminal") {
    mainContainer.style.opacity = "0.7";
  } else {
    mainContainer.style.opacity = "1";
  }
});
"use strict";

let cmdInput = document.getElementById("cmdline-input");

let cmdOutput = document.getElementsByClassName("output-container")[0];

let results = document.getElementsByClassName("results")[0];

let comment = document.getElementsByClassName("comment")[0];

let options = document.getElementsByClassName("options")[0];

let prompts = [
  ["exit", " ~ closes the terminal window"],
  ["help", " ~ displays a list of commands"],
  ["ls", " ~ displays all of the files in the directory"],
  ["cat", " ~ executable command to open a specfic file. Type 'cat' before a file name to open that file"],
  ["clear", " ~ clears the terminal"],
  ["refresh", " ~ refreshes the browser window"],
];

let showOptionsAlready = false;

const createOutput = (e) => {
  /// Keypress Enter ///
  if (e.code === "Enter") {
    let newElem = document.createElement("div");
    newElem.classList.add("output-prompt");

    let promptResponse = `
      <span class="one bold">kenjinozaki.dev</span>
      <span class="arrow bold"> &#x25ba; </span>
      <span class="two bold">~/my-app/</span>
      <span class="arrow bold"> &#x25ba; </span>
      <span class="three bold">(&#x21c5; main)</span>
      <span class="bold">$</span>
      <span> &nbsp;${e.target.value}</span>
      `;
    
    newElem.innerHTML = promptResponse;
    cmdOutput.appendChild(newElem);

    let userInput = e.target.value.toLowerCase();

    if (userInput === "clear") {
      cmdOutput.innerHTML = "";
      options.innerHTML = "";
    };
    
    if (userInput === "exit") {
      document.getElementsByClassName("container")[0].style.display = "none";
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };

    if (userInput === "refresh") {
      location.reload();
    };

    if (userInput === "help") {
      let newElem2 = document.createElement("div");

      let promptDisplay = prompts.map(item => 
        `<li>
          <strong>${item[0]}</strong>${item[1]}
        </li>`
      ).join("");
      
      let promptResponse2 = `
        <div class="results">
          <div>
            Type any of the following commands into the terminal.
          </div>
          <ul>
            ${promptDisplay}
          </ul>
          <div>Press [Enter] to execute</div>
        </div>`;
      
      newElem2.innerHTML = promptResponse2;

      cmdOutput.appendChild(newElem2);

      newElem2.style.padding = "0.2rem 0.4rem";
    }

    // resets input value;
    e.target.value = "";
    comment.innerHTML = "";
  }

  /// Keypress Tab ///
  if (e.code === "Tab") {
    let str = e.target.value.toLowerCase();

    if (str !== "") {
      let optionsArray = [];
      let chosenOption = "";

      prompts.forEach(item => {
        if(item[0].search(str) === 0) {
          console.log("found", item[0], "string:" + str);

          optionsArray.push(item[0]);
          
          chosenOption = item[0];
        };
      });

      if (optionsArray.length > 1) {
        console.log(showOptionsAlready);
        if (!showOptionsAlready) {
          let newElem3 = document.createElement("div");

          let optionList = optionsArray.map(item => { 
            return `<button class="btn">${item}</button>`
          }).join("");
          
          newElem3.innerHTML = optionList;
  
          options.appendChild(newElem3);
  
          comment.innerHTML = "";
  
          let btns = [...document.getElementsByClassName("btn")];
  
          btns.forEach(btn => {
            btn.addEventListener("click", (elm) => {
              e.target.value = elm.target.innerHTML;
              e.target.focus();
              // resets options div
              options.innerHTML = "";
            })
          });

          // So that if they tab again it doesn't duplicate the buttons in another row.
          showOptionsAlready = true;
        }
      } else {
        e.preventDefault();
        e.target.value = chosenOption;
      }
      
    }
  }
};

cmdInput.addEventListener("keydown", createOutput);

///////////////////////////
//////// Draggable ////////
///////////////////////////

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

/////////////////////////////////////////////
//////// Button Window Functionality ////////
/////////////////////////////////////////////

let mainContainer = document.getElementsByClassName("container")[0];

let contentArea = document.getElementsByClassName("content")[0];

let buttons = Array.from(document.getElementsByClassName("win-btn"));

const css = window.document.styleSheets[0];

const myButtonFunc = (e) => {
  if (e.target.id === "close") {
    mainContainer.style.display = "none";
  } else if (e.target.id === "minimize") {
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

/////////////////////////////////
// focus opacity functionality //
/////////////////////////////////

let isFocused = true;

document.addEventListener("click", (e) => {
  if (e.target.classList[0] === "terminal") {
    if (isFocused) {
      mainContainer.classList.toggle("opacity");
      isFocused = !isFocused;
    }
  } else {
    if (!isFocused) {
      mainContainer.classList.toggle("opacity");
      isFocused = !isFocused;
    }
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Tab") {
    if(!isFocused) {
      isFocused = !isFocused;
      mainContainer.classList.toggle("opacity")
    }
  }
});
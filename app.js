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

let listOfFiles = [
  "about.txt",
  "contact.txt",
  "skills.txt",
  "projects.txt"
];

let catOptions = [
  "cat about.txt",
  "cat contact.txt",
  "cat skills.txt",
  "cat projects.txt"
];

let previousEntries = [];

let showOptionsAlready = false;

let pos;

const createOutput = (e) => {
  /// Keypress Enter ///
  if (e.code === "Enter") {
    // default behavior
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

    // IF statements
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
      let newElemHelp = document.createElement("div");

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
          <div>Press [Enter] to execute.</div>
        </div>`;
      
      newElemHelp.innerHTML = promptResponse2;

      cmdOutput.appendChild(newElemHelp);

      newElemHelp.style.padding = "0.2rem 0.4rem";
    }

    if (userInput === "ls") {
      let newElemLS = document.createElement("div");

      let listDisplay = listOfFiles.map(item => 
        `<li>
          <strong>${item}</strong>
        </li>`
      ).join("");
      
      let listDisplayDiv = `
        <div class="results">
          <ul>
            ${listDisplay}
          </ul>
        </div>`;
      
      newElemLS.innerHTML = listDisplayDiv;

      cmdOutput.appendChild(newElemLS);

      newElemLS.style.padding = "0.2rem 0.4rem";
    }

    if (userInput === "cat about.txt") {
      let newElemAbout = document.createElement("div");

      let aboutMeTxt = `
        <div>
          <h3>Greetings!</h3>
          <br><br>
          My name is Lewis (Kenji) Nozaki and I'm a software developer and programmer located in Honolulu, HI. 
          <br><br>
          I have two years of programming experience working with front-end, back-end, database, and enterprise solutions technologies. 
          <br><br>
          I also have extensive experience working with core and enterprise applications in the financial industry. I've previously worked as a Data Analyst and a Core Systems Administrator prior to moving into programming, where my current position is a Programmer Analyst. 
          <br><br>
          Currently I am trying to shift focus and transition into a Front-end specific position. 
          <br><br>
          On my free time I enjoy playing and listening to music (I play guitar and bass), eating good food and hanging out with my awesome family. 
          <br><br>
          I would love to connect with you either personally or professionally.
          <br><br>
          -Kenji
        </div>`;
      
      newElemAbout.innerHTML = aboutMeTxt;

      cmdOutput.appendChild(newElemAbout);

      newElemAbout.style.padding = "1rem";
    }

    if (userInput === "cat contact.txt") {
      let newElemContact = document.createElement("div");
      
      let listDisplayDiv = `
        <div>
          <h3>Contact:</h3>
          <h5>My Socials</h5>
          <ul>
            <li>
              <a href="https://github.com/lewisnozaki">Github</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/lhnozaki/">LinkedIn</a>
            </li>
            <li>
              <a href="https://twitter.com/_______NZK">Twitter</a>
            </li>
          </ul>
          <h5>My Direct</h5>
          <ul>
            <li>
              PH: (808) 123-4567
            </li>
            <li>
              Email: LHNOZAKI@outlook.com
            </li>
          </ul>
        </div>`;
      
      newElemContact.innerHTML = listDisplayDiv;

      cmdOutput.appendChild(newElemContact);

      newElemContact.style.padding = "1rem";
    }

    if (userInput === "cat skills.txt") {
      let newElemSkills = document.createElement("div");
      
      let listDisplayDiv = `
        <div>
          <h3>Skills & technologies:</h3>
          <h5>Front End</h5>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>ReactJS</li>
              <li>Redux</li>
              <li>React Router</li>
              <li>GSAP</li>
            </ul>
          <h5>Back End</h5>
            <ul>
              <li>NodeJS</li>
              <li>ExpressJS</li>
              <li>PostgreSQL</li>
              <li>SQL</li>
              <li>Redis</li>
              <li>GraphQL</li>
              <li>MongoDB</li>
              <li>Firebase</li>
            </ul>
          <h5>Others</h5>
            <ul>
              <li>Affinity Designer</li>
              <li>Adobe XD</li>
              <li>Figma</li>
              <li>AWS</li>
            </ul>
        </div>`;
      
      newElemSkills.innerHTML = listDisplayDiv;

      cmdOutput.appendChild(newElemSkills);

      newElemSkills.style.padding = "1rem";
    }

    if (userInput === "cat projects.txt") {
      let newElemProjects = document.createElement("div");
      
      let listDisplayDiv = `
        <div>
          <h3>My Projects:</h3>
          <h5>Terminal Style Web Application</h5>
            <ul>
              <li>A web app styled like an terminal (iTerm2) on a MacOS computer.</li>
              <li>Built entirely with HTML, CSS and JavaScript. No additional libraries.</li>
            </ul>
          <h5>More to come!</h5>
        </div>`;
      
      newElemProjects.innerHTML = listDisplayDiv;

      cmdOutput.appendChild(newElemProjects);

      newElemProjects.style.padding = "1rem";
    }

    // inserts value to array
    previousEntries.push(e.target.value);

    // resets input value;
    e.target.value = "";
    comment.innerHTML = "";
    showOptionsAlready = false;
    pos = 1;
  };

  /// Keypress Backspace ///
  if (e.code === "Backspace") {
    showOptionsAlready = false;
  };

  /// Keypress Tab ///
  if (e.code === "Tab") {
    let str = e.target.value.toLowerCase();

    if (str !== "") {
      let optionsArray = [];
      let chosenOption = "";

      prompts.forEach(item => {
        if(item[0].search(str) === 0) {
          optionsArray.push(item[0]);
          
          chosenOption = item[0];
        };
      });

      if (optionsArray.length > 1) {
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
        if (chosenOption !== "") {
          e.target.value = chosenOption;
        }
      }
    } else {
      e.preventDefault();
    }
    
    if (str.length >= 5) {
      catOptions.forEach(item => {
        if(item.search(str) === 0) {
          e.target.value = item;
        };
      });
    };
  }

  /// Keypress Arrowkeys ///
  if (e.code === "ArrowUp") {
    if (pos <= previousEntries.length) {
      e.target.value = previousEntries[previousEntries.length - pos]
      pos += 1;
    }
  };

  /// Keypress Arrowkeys ///
  if (e.code === "ArrowDown") {
    if (pos > 1) {
      pos -= 1;
      console.log(pos);
      e.target.value = previousEntries[previousEntries.length - pos];
    }
  };
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
    document.onmouseup = null;
    document.onmousemove = null;
  };
  
  const dragMouseDown = (e) => {
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

document.getElementById("mydivheader").addEventListener("dblclick", (e) => {
  document.getElementById("mydiv").classList.toggle("expand");
});

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

let btns = document.getElementsByClassName("btn");

document.addEventListener("keydown", (e) => {
  if (e.code === "Tab") {
    if (!isFocused) {
      isFocused = !isFocused;
      mainContainer.classList.toggle("opacity")
    }
    
    if (document.activeElement === btns[1]) {
      btns[0].focus();
      e.preventDefault();
    }
  }
});
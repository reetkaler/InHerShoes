const titleScreen = document.getElementById('title-screen');
const gameContainer = document.getElementById('game-container');
const storyText = document.getElementById('story-text');
const playerInput = document.getElementById('player-input');
const submitButton = document.getElementById('submit-button');
const feedbackText = document.getElementById('feedback-text');
const scenarioText = document.getElementById("scenario-text");

let currentScenarioIndex = 0;

const scenarios = [
  {
    story: "Your coworker interrupts you during a meeting and takes credit for your idea. What do you say?",
    correctResponse: "I appreciate your input, but I’d like to clarify that this was my idea.",
    feedback: "This response is assertive and professional. It ensures your contribution is recognized without being confrontational."
  },
  {
    story: "Your manager assigns you extra work without considering your current workload. How do you respond?",
    correctResponse: "I’m currently working on X, Y, and Z. Can we prioritize these tasks or adjust the deadlines?",
    feedback: "This response communicates your workload clearly and suggests a solution, showing professionalism and time management skills."
  },
  {
    story: "A colleague makes a sexist joke in front of the team. What do you do?",
    correctResponse: "That comment is inappropriate and makes me uncomfortable. Let’s keep the conversation professional.",
    feedback: "This response addresses the issue directly and sets boundaries, promoting a respectful workplace."
  }
];

// Show the game screen and hide the title screen

//Lets player move their character using arrow keys 
const player = document.querySelector(".player");
const container = document.querySelector(".container");
const walls = document.querySelector(".wall");
const speed = 10; // Pixels per key press

let posX = 0, posY = 0; // Initial position

const containerRect = container.getBoundingClientRect();
const charWidth = player.offsetWidth;
const charHeight = player.offsetHeight;

document.addEventListener("keydown", (event) => {
  console.log(event);
  console.log(player);

  switch (event.key) {
      case "ArrowUp":
          if (posY > 0) {
                posY -= speed;
          }
          break;
      case "ArrowDown":
          if (posY+ charHeight < containerRect.height) {
                posY += speed;
          }     
          break;
      case "ArrowLeft":
          if (posX > 0) {
                posX -= speed;
          }
          break;
      case "ArrowRight":
          if (posX + charWidth < containerRect.width) {
                posX += speed;
          }
          break;
    }
    console.log("This is working!!!");
    console.log(posY);
    console.log(posX);
    player.style.top = `${posY}px`;
    player.style.left = `${posX}px`;

    checkCollision();
});

//is collding function
function isColliding(x, y) {
  const playerRect = {
      left: x,
      right: x + 40,
      top: y,
      bottom: y + 40
  };

  for (let wall of walls) {
      const wallRect = wall.getBoundingClientRect();
      const gameRect = document.getElementById("game-container").getBoundingClientRect();

      const adjustedWall = {
          left: wallRect.left - gameRect.left,
          right: wallRect.right - gameRect.left,
          top: wallRect.top - gameRect.top,
          bottom: wallRect.bottom - gameRect.top
      };

      if (
          playerRect.left < adjustedWall.right &&
          playerRect.right > adjustedWall.left &&
          playerRect.top < adjustedWall.bottom &&
          playerRect.bottom > adjustedWall.top
      ) {
          return true; // Collision detected
      }
  }
  return false;
}


function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const npcs = document.querySelectorAll(".npc");

  npcs.forEach((npc, index) => {
      const npcRect = npc.getBoundingClientRect();

      if (
          playerRect.left < npcRect.right &&
          playerRect.right > npcRect.left &&
          playerRect.top < npcRect.bottom &&
          playerRect.bottom > npcRect.top
      ) {
          console.log("Collided with NPC:", index);
          loadScenario(index); 
      }
  });
}

function loadScenario(index) {
  const gameContainer = document.querySelector("#game-container");
  const storyText = document.querySelector("#story-text");

  
  if (gameContainer.style.visibility === "visible") {
          gameContainer.style.visibility =  "hidden";
  } else {
          gameContainer.style.visibility =  "visible";
  }
//prints out story 
  storyText.innerHTML = scenarios[index].story;
//prompts user response and stores it 
  let response = prompt("How would you respond?");
  console.log(response); 
  //outputs user response
  storyText.innerHTML = response; 
  
// Check the player's response
/*
const playerResponse = playerInput.value.trim().toLowerCase();
const correctResponse = scenarios[currentScenarioIndex].correctResponse.toLowerCase();
/*
const playerResponse = playerInput.value.trim().toLowerCase();
const correctResponse = scenarios[currentScenarioIndex].correctResponse.toLowerCase();

if (playerResponse === correctResponse) {
  feedbackText.textContent = "Great job! That was the right response.";
} else {
  feedbackText.textContent = `Not quite. The recommended response was: "${scenarios[currentScenarioIndex].correctResponse}". ${scenarios[currentScenarioIndex].feedback}`;
}
if (playerResponse === correctResponse) {
  feedbackText.textContent = "Great job! That was the right response.";
} else {
  feedbackText.textContent = `Not quite. The recommended response was: "${scenarios[currentScenarioIndex].correctResponse}". ${scenarios[currentScenarioIndex].feedback}`;
}

  currentScenarioIndex++;
  //commented for now setTimeout(loadScenario, 3000); // Load next scenario after 3 seconds
}

submitButton.addEventListener('click', checkResponse);
}*/
}



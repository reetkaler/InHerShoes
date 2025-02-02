const titleScreen = document.getElementById('title-screen');
const gameContainer = document.getElementById('game-container');
const storyText = document.getElementById('story-text');
const playerInput = document.getElementById('player-input');
const submitButton = document.getElementById('submit-button');
const feedbackText = document.getElementById('feedback-text');
const scenarioText = document.getElementById("scenario-text");
const currentScore = document.getElementById("current-score");


// var audio = new Audio("./audio/bgmusic.mp3");
// audio.play();

// let score = 0;
// currentScore.innerHTML = score;

let currentScenarioIndex = 0;

const scenarios = [
  {
    story: "During a team meeting, your manager says, “It’s great that you’re able to keep up with all the tasks, even with everything going on in your personal life.” Everyone laughs, and it feels like the compliment is based on the lowered expectation of your competence because of your gender.",
        option1: "Thank you, but I believe all of us here are balancing responsibilities equally well. I’d appreciate it if we could focus on the work rather than personal lives.",
        option2: "Laugh along and say nothing.",
        feedback1: "This response firmly sets boundaries on personal comments while subtly addressing the implicit bias that may be present. It redirects the conversation to the task at hand, reinforcing professionalism.",
        feedback2: "By staying silent, the issue remains unaddressed, possibly reinforcing the bias."
  },
  {
    story: "During a casual conversation at work, someone says, “Oh, you’re so good at these tasks—I'm impressed, I didn’t expect that from you.", 
    option1: "I’m glad to hear that! I believe everyone here is capable of excelling, and we all bring valuable skills to the table.",
    option2: "Say 'Thanks!' and move on.",
    feedback1: "This response confidently acknowledges your skills while reinforcing that everyone deserves recognition based on merit, not surprise.",
    feedback2: "While polite, this response does not challenge the underlying assumption of the comment."
  },
  {
    story: "During a project discussion, your coworker says, “I never thought you’d be the one to come up with that solution! Good for you!”",
    option1: "I appreciate the recognition, but my solution is just one part of the team’s hard work. Let’s keep collaborating to build on it.",
        option2: "Just smile and say nothing.",
        feedback1: "This response asserts your contribution while promoting teamwork, preventing the unintended undermining of your abilities.",
        feedback2: "By not responding, the comment may reinforce unconscious bias, rather than encouraging a more inclusive recognition of skills."
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

//character movement
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

let currentCollidingNpc = null; 
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
          if (currentCollidingNpc !== index) {
            console.log("Collided with NPC:", index);
            loadScenario(index); 
            currentCollidingNpc = index;
          }
        } else if (currentCollidingNpc === index) {
          currentCollidingNpc = null; // Reset when moving away
          clearScenario();
      }
  });
}



function clearScenario() {
  const gameContainer = document.querySelector("#game-container");
  gameContainer.style.visibility === "visible";
}

function loadScenario(index) {
  const gameContainer = document.querySelector("#game-container");
  document.getElementById("option1").innerText = scenarios[index].option1;
  document.getElementById("option2").innerText = scenarios[index].option2;
  const storyText = document.querySelector("#story-text");
  const feedbackText = document.querySelector("#feedback-text");
  
  if (gameContainer.style.visibility === "visible") {
          gameContainer.style.visibility =  "hidden";
  } else {
          gameContainer.style.visibility =  "visible";
  }
//prints out story 
  storyText.innerHTML = scenarios[index].story;

  //outputs user response
  storyText.innerHTML = response; 

  
}
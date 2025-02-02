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
    correctResponse: "Thank you, but I believe all of us here are balancing responsibilities equally well. I’d appreciate it if we could focus on the work rather than personal lives.",
    feedback: "This response firmly sets boundaries on personal comments while subtly addressing the implicit bias that may be present. It redirects the conversation to the task at hand, reinforcing professionalism without letting the comment slide."
  },
  {
    story: "During a casual conversation at work, someone says, “Oh, you’re so good at these tasks—I'm impressed, I didn’t expect that from you.", 
    correctResponse: "I’m currently working on X, Y, and Z. Can we prioritize these tasks or adjust the deadlines?",
    feedback: "I’m glad to hear that! I believe everyone here is capable of excelling, and we all bring valuable skills to the table."
  },
  {
    story: "During a project discussion, your coworker says, “I never thought you’d be the one to come up with that solution! Good for you!”",
    correctResponse: "I appreciate the recognition, but my solution is just one part of the team’s hard work. Let’s keep collaborating to build on it",
    feedback: "This response asserts your contribution and emphasizes the team effort, deflecting any unintended undermining of your abilities based on gender expectations."
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
  const storyText = document.querySelector("#story-text");
  const feedbackText = document.querySelector("#feedback-text");


  
  if (gameContainer.style.visibility === "visible") {
          gameContainer.style.visibility =  "hidden";
  } else {
          gameContainer.style.visibility =  "visible";
  }
//prints out story 
  storyText.innerHTML = scenarios[index].story;
//prompts user response and stores it 
  let response = prompt(scenarios[index].story);
  console.log(response); 

  // if (response === scenarios[index].correctResponse) {
  //   score++;
  //   currentScore.innerHTML = score;
  // }
  //outputs user response
  storyText.innerHTML = response; 
  feedbackText.innerHTML = scenarios[index].feedback;

}
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
// }
// async function sendToBackend(scenario, userResponse) {
//   const response = await fetch('http://localhost:3000/analyze-response', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       scenario,
//       userResponse,
//     }),
//   });

//   if (response.ok) {
//     const data = await response.json();
//     console.log('Feedback:', data.feedback);
//   } else {
//     console.error('Error sending data to backend');
//   }
// }

// // Call the function with your data
// sendToBackend('Some scenario', 'User response text');


const taskImage = document.getElementById('task-image');
const images = [
    './img/testingImg.png',
    './img/anotherImage.png',
    './img/yetAnotherImage.png'
  ];
function changeImage(){

    if(currentScenarioIndex == 0){
        taskImage.src = images[0];
    }
    
    if(currentScenarioIndex == 1){
        taskImage.src = images[0];
    }
    
    if(currentScenarioIndex == 2){
        taskImage.src = images[0];
    }
    
    if(currentScenarioIndex == 3){
        taskImage.src = images[0];
    }
}  
const twoPerson = document.getElementById('two-person-image');
const images = [
    './img/testingImg.png',
    './img/anotherImage.png',
    './img/yetAnotherImage.png'
  ];
function changeImage(){

    if(currentScenarioIndex == 0){
        twoPerson.src = images[0];
    }
    
    if(currentScenarioIndex == 1){
        twoPerson.src = images[0];
    }
    
    if(currentScenarioIndex == 2){
        twoPerson.src = images[0];
    }
    
    if(currentScenarioIndex == 3){
        twoPerson.src = images[0];
    }
}  
//Game Constants
let inputDir={x:0,y:0};/*we want the snake to be static at beginning*/
let gameOverSound=new Audio('music/gameover.mp3');
let moveSound=new Audio('music/move.mp3');
let musicSound=new Audio('music/music.mp3');
let foodSound=new Audio('music/food.mp3');
let score=0;
let speed=5;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]
food={x:6,y:7};
//Game Functions
function main(ctime){//current time
    window.requestAnimationFrame(main);
    //main becomes game loop dont use setINterval as few compplexities in that with animations so use requestAnimationFrame
    //console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){//render after every 0.5sec
        return;//we dont want to render screen when less than 0.5s
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(sArr){
    return false;
}
function gameEngine(){
    //Part 1:Updating the snake location and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
    }

    //If snake has eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){//snakeArr[0] is head
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }

    //Moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){//to move it just place a element in its next eleemtn place and it wil move
        //snakeArr[i+1]=snakeArr[i]; wont work need to do 
        snakeArr[i+1]={...snakeArr[i]};//will worl as in above reference problem would be there
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;


    //Part 2:Display the snake and food
    //Display the snake and increase its size
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        snakeElement.classList.add('snake');
       
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //Display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Main logic 
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}//Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrow Up");
            inputDir.x= 0;
            inputDir.y= -1;//as to make it move up we need to decrease y
            break;
        case "ArrowDown":
            console.log("Arrow Down");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            console.log("Arrow Left");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            console.log("Arrow Right");
            inputDir.x= 1;
            inputDir.y= 0;
            break;
    
        default:
            break;
    }
});

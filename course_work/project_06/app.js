const backGroundColor ='green';
const snekColor = 'black';
const foodColor = 'red'
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext ('2d');
canvas.width = canvas.height = 400;
const frameRate = 10;
const screenSize = 20;
const tileSize = canvas.width / screenSize;

let pos, vel, food, snek;

function init (){
    pos = {x: 10, y: 10};
    vel = {x: 0, y: 0};
    snek = [
        {x: 8, y: 10},
        {x: 9, y: 10},
        {x: 10, y: 10},
    ]
    randomFood();
}
init ();
function randomFood(){
    food = {
        x: Math.floor (Math.random() * tileSize),
        y: Math.floor (Math.random() * tileSize),
    }
    for (let cell of snek){
        if(cell.x === food.x && food.y === cell.y){
            return randomFood();
        }
    }
}
document.addEventListener('keydown', keydown);

function keydown(e){
    switch(e.keyCode){
        case 37:{
            return vel = { x:-1, y:0}
        }
        case 38: {
            return vel = {x:0, y:-1}
        }
        case 39: {
            return vel = {x:1, y:0}
    }
        case 40: {
            return vel = {x:0, y:1}
}
    }
        }
setInterval(()=>{
    requestAnimationFrame(gameLoop);
}, 1000/frameRate);
function gameLoop(){
    ctx.fillStyle = backGroundColor;
    ctx.fillRect = (0,0, canvas.width, canvas.height);
    ctx.fillStyle = snekColor;
    for( let cell of snek){
        ctx.fillRect(cell.x*screenSize, cell.y*screenSize, screenSize,screenSize);
    }

    ctx.fillStyle = foodColor;
    ctx.fillRect (food.x*screenSize, food.y*screenSize, screenSize, screenSize);

    pos.x += vel.x;
    pos.y += vel.y;

    if (pos.x < 0 || pos.x > tileSize || pos.y < 0 || pos.y > tileSize) {
        init();
    }
    if (food.x === pos.x && food.y === pos.y) {
        snek.push({...pos});
        pos.x += vel.x;
        pos.y += vel.y;
        randomFood();
    }
    if (vel.x || vel.y){
        for (let cell of snek){
            if (cell.x === pos.x && cell.y === pos.y){
                return init();
            }
        }
        snek.push({...pos});
        snek.shift();
    }
}

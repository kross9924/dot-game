var canvas = document.getElementById("myCanvas");
var player1Name = document.querySelector("#player1 .name");
var player1Score = document.querySelector("#player1 .score");
var player2Name = document.querySelector("#player2 .name")
var player2Score = document.querySelector("#player2 .score");
var cancel = document.querySelector("#cancel");
var setting = document.getElementById("setting");
var popupSetting = document.getElementById("popup-setting");
var form = document.getElementById("form");
var player1 = document.getElementById("player1N");
var player2 = document.getElementById("player2N");
var finalMessage = document.getElementById("final-message");
var reset = document.getElementById("reset");
var playAgain = document.getElementById("play-again");
var size = document.getElementById("size");
var popupContainer = document.getElementById("popup-container");
var playAgain1=document.getElementById("play-again1");

let ctx = canvas.getContext("2d");
var dotRadius = 5;
var columnCount = 4;
var rowCount = 4;
var dots = [];
var dist = [];
var lines = [];
var connections = [];
var rectangles = [];
var playerRectangles = [];

canvas.width = `${(columnCount+1)*60}`;
canvas.height = `${(rowCount+1)*60}`;

var adjustLeft = canvas.offsetLeft;
var adjustTop = canvas.offsetTop;

var colors=["rgba(242, 206, 22,0.5)","rgba(242, 5, 5,0.5)"];
var player = [];
var playerNo = 2;

for(var i = 0;i<playerNo;i++){
    player[i]  =  {number:i+1,score:0,color:colors[i]};
}


var currentPlayer=0;

init();


function init(){
    player1Name.style.color = "rgba(242, 206, 22,0.5)";

    dist= [];
    for(var i =0;i<rowCount;i++){
        for(var j = 0;j<columnCount;j++){
            connections[i*columnCount + j] =  [];
        }
    }
    for(var i = 0;i<rowCount;i++){
        dots[i] = [];
        for(var j = 0;j<columnCount;j++){
            dots[i][j] = {x:60*(i+1),y:60*(j+1)};
        }
    }    
    for(var i = 0;i<rowCount;i++){
        for(var j = 0;j<columnCount;j++){
            var X = dots[i][j].x;
            var Y = dots[i][j].y;
            dist[i*columnCount+j] = {x:X,y:Y,distance:10000,idX:i,idY:j};
        }
    }
    
    
}

function rectanglesEntry(value){
    var v = {value:value,color:player[currentPlayer].color};
    if(!rectangles.includes(value)){
        rectangles.push(value);
        playerRectangles.push(v);
        player[currentPlayer].score++;
        updateScore();
    }
}



drawDots();



function contains(x1,y1,x2,y2){
    var temp = rectangles.length;
    if(y1==0&&y2==0){
        if(connections[x1*columnCount+y1].includes(x1*columnCount+y1+1)&&connections[x2*columnCount+y2].includes(x2*columnCount+y2+1)&&connections[x1*columnCount+y1+1].includes(x2*columnCount+y2+1)){
            rectanglesEntry(x1>x2?x2:x1);
            // console.log(x1>x2?x2:x1);
        }
    }else if(x1==0&&x2==0){ 
        if(connections[x1*columnCount+y1].includes((x1+1)*columnCount+y1)&&connections[x2*columnCount+y2].includes((x2+1)*columnCount+y2)&&connections[(x1+1)*columnCount+y1].includes((x2+1)*columnCount+y2)){
            rectanglesEntry(y1>y2?(y1-1)*(columnCount-1):(y2-1)*(columnCount-1));
            // console.log(y1>y2?(y1-1)*(columnCount-1):(y2-1)*(columnCount-1));
        }
    }else if(y1==columnCount-1&&y2==columnCount-1){
        if(connections[x1*columnCount+y1].includes(x1*columnCount+y1-1)&&connections[x2*columnCount+y2].includes(x2*columnCount+y2-1)&&connections[x1*columnCount+y1-1].includes(x2*columnCount+y2-1)){
            rectanglesEntry(x1>x2?(columnCount-2)*(rowCount-1)+x2:(columnCount-2)*(rowCount-1)+x1);
            // console.log(x1>x2?(columnCount-2)*(rowCount-1)+x1-1:(columnCount-2)*(rowCount-1)+x2-1);
        }
    }else if(x1==rowCount-1&&x2==rowCount-1){
        if(connections[x1*columnCount+y1].includes((x1-1)*columnCount+y1)&&connections[x2*columnCount+y2].includes((x2-1)*columnCount+y2)&&connections[(x1-1)*columnCount+y1].includes((x2-1)*columnCount+y2)){
            // console.log(y1>y2?(columnCount-1)*y1-1:(columnCount-1)*y2-1);
            rectanglesEntry(y1>y2?(columnCount-1)*y1-1:(columnCount-1)*y2-1)
        }
    }else if(x1==x2){
        if(connections[x1*columnCount+y1].includes((x1+1)*columnCount+y1)&&connections[x2*columnCount+y2].includes((x2+1)*columnCount+y2)&&connections[(x1+1)*columnCount+y1].includes((x2+1)*columnCount+y2)){
            // console.log(y1>y2?(columnCount-1)*y2+x2:(columnCount-2)*y1+x1);
            rectanglesEntry(y1>y2?(columnCount-1)*y2+x2:(columnCount-1)*y1+x1)
        }
        if(connections[x1*columnCount+y1].includes((x1-1)*columnCount+y1)&&connections[x2*columnCount+y2].includes((x2-1)*columnCount+y2)&&connections[(x1-1)*columnCount+y1].includes((x2-1)*columnCount+y2)){
            // console.log(y1>y2?(columnCount-1)*y2+x2-1:(columnCount-2)*y1+x1-1);
            rectanglesEntry(y1>y2?(columnCount-1)*y2+x2-1:(columnCount-1)*y1+x1-1)
        }
    }else if(y1==y2){
        if(connections[x1*columnCount+y1].includes(x1*columnCount+y1+1)&&connections[x2*columnCount+y2].includes(x2*columnCount+y2+1)&&connections[x1*columnCount+y1+1].includes(x2*columnCount+y2+1)){
            // console.log(x1>x2?(columnCount-1)*y2+x2:(columnCount-1)*y1+x1);
            rectanglesEntry(x1>x2?(columnCount-1)*y2+x2:(columnCount-1)*y1+x1)
        }
        if(connections[x1*columnCount+y1].includes(x1*columnCount+y1-1)&&connections[x2*columnCount+y2].includes(x2*columnCount+y2-1)&&connections[x1*columnCount+y1-1].includes(x2*columnCount+y2-1)){
            // console.log(x1>x2?(columnCount-1)*(y2-1)+x2:(columnCount-1)*(y1-1)+x1);
            rectanglesEntry(x1>x2?(columnCount-1)*(y2-1)+x2:(columnCount-1)*(y1-1)+x1);
        }
    }
    if(rectangles)drawRectangles();
    if(rectangles.length===temp){
        playerHandler();
    }
    if(rectangles.length===(columnCount-1)*(rowCount-1)){
        result();
    }
}

function drawRectangles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawDots();
    drawLines();
    for(var i = 0;i<playerRectangles.length;i++){
        var x = (playerRectangles[i].value)%(columnCount-1);
        var y = Math.floor((playerRectangles[i].value) /(columnCount-1));

        ctx.beginPath();

        ctx.rect((x+1)*60,(y+1)*60,60,60);
        ctx.fillStyle = playerRectangles[i].color;
        ctx.fill();
        ctx.closePath();
    }
}

function drawLine(temp){
    ctx.beginPath();
    ctx.moveTo(temp.x1,temp.y1);
    ctx.lineTo(temp.x2,temp.y2);
    
    ctx.stroke();
    ctx.closePath();
}

function lineTemp(relativeX,relativeY){
    var i = relativeX/60;
    var j = relativeY/60;
    updateDistance(relativeX,relativeY);

    var temp = dist;
    temp.sort((a,b)=>{
        return a.distance - b.distance;
    });

    var temp1 = temp.slice(0,2);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawDots();
    drawLines();
    drawRectangles();

    return temp1;
    
}

function updateDistance(relativeX,relativeY){
    for(var i=0;i<rowCount;i++){
        for(var j = 0;j<columnCount;j++){
            var x = dist[i*rowCount+j].x;
            var y = dist[i*rowCount+j].y;
            
            var dist1 = Math.pow((x-relativeX)*(x-relativeX) + (y-relativeY)*(y-relativeY),1/2);
            dist[i*rowCount+j].distance = dist1;
        }   
    }
}

function drawDots(){
    for(var i = 0;i<rowCount;i++){
        for(var j = 0;j<columnCount;j++){
            var x = dots[i][j].x;
            var y = dots[i][j].y;

            ctx.beginPath();
            ctx.arc(x,y,dotRadius,0,Math.PI*2);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.closePath();
        }
    }
    
}

function updateScore(){
    player1Score.innerHTML = player[0].score;
    player2Score.innerHTML = player[1].score;

}

//Event Listeners

canvas.addEventListener("mousemove",mouseMoveHandler,false);
canvas.addEventListener("click",mouseClickHandler,false);
document.addEventListener("scroll",refresh,false);
cancel.addEventListener("click",function(e){
    popupSetting.style.display = "none";
});
setting.addEventListener("click",function(){
    popupSetting.style.display = "flex";
});
form.addEventListener("submit",function(e){
    e.preventDefault();
    player1Name.innerHTML = player1N.value;
    player2Name.innerHTML = player2N.value;
    if(size.value==="small"){
        columnCount = 4;
        rowCount = 4;
    }else if(size.value==="medium"){
        columnCount = 6;
        rowCount = 6;
    }else{
        columnCount = 8;
        rowCount = 8;
    }
    resetf();
    popupSetting.style.display= "none";
});

reset.addEventListener("click",resetf);
playAgain.addEventListener("click",resetf);
playAgain1.addEventListener("click",function(){
    popupContainer.style.display = "none";
    resetf();
})

function refresh(e){
    adjustTop = canvas.offsetTop  - window.scrollY;
}

function mouseMoveHandler(e){
    var relativeX = e.clientX - adjustLeft ;
    var relativeY = e.clientY - adjustTop;
    var temp = lineTemp(relativeX,relativeY);
    var X1 = temp[0].x;
    var X2 = temp[1].x;

    var Y1 = temp[0].y;
    var Y2 = temp[1].y;
    var temp1 = {x1:X1,y1:Y1,x2:X2,y2:Y2};

    drawLine(temp1);
    
}

function drawLines(){
    for(var i = 0;i<lines.length;i++){
        drawLine(lines[i]);
    }
}

function mouseClickHandler(e){
    var relativeX = e.clientX - adjustLeft;
    var relativeY = e.clientY - adjustTop;
    var temp = lineTemp(relativeX,relativeY);
    var X1 = temp[0].x;
    var X2 = temp[1].x;

    var Y1 = temp[0].y;
    var Y2 = temp[1].y;

    var temp1 = {x1:X1,y1:Y1,x2:X2,y2:Y2};
    lines.push(temp1);
    var i1 = temp[0].idX;
    var i2 = temp[1].idX;
    var j1 = temp[0].idY;
    var j2 = temp[1].idY;
    var h1 = i1*columnCount + j1;
    var h2 = i2*columnCount + j2;

    if(!connections[h1].includes(h2)){
        connections[h1].push(h2);
        connections[h2].push(h1);
        contains(i1,j1,i2,j2);
        drawLines();
    }
    
}

function playerHandler(){
    if(currentPlayer === 1){
        player2Name.style.color = "white";
        player1Name.style.color = "rgba(242, 206, 22,0.5)";

        currentPlayer = 0;
    }else {
        player1Name.style.color = "white";
        player2Name.style.color = "rgba(242, 5, 5,0.5)";
       currentPlayer = 1;
    }
    updateScore();
}

function resetf(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    rectangles = [];
    lines = [];
    playerRectangles = [];
    canvas.width = `${(columnCount+1)*60}`;
    canvas.height = `${(rowCount+1)*60}`;

    adjustLeft = canvas.offsetLeft;
    adjustTop = canvas.offsetTop;
    init();
    player[0].score = 0;
    player[1].score = 0;
    updateScore();
    drawDots();

}

function result(){
    if(player[0].score>=player[1].score){
        finalMessage.innerHTML = player1Name.innerHTML + "  Wins" ;
    }else{
        finalMessage.innerHTML = player2Name.innerHTML + "  Wins";
    }
    popupContainer.style.display = "flex";
}
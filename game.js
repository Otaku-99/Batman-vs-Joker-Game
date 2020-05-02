// search for icon on falticon

function load_images(){
	Joker_image = new Image;
	Joker_image.src = "images/Joker.png"

	Batman_img = new Image;
	Batman_img.src = "images/Batman.png"

	DC_img = new Image;
	DC_img.src = "images/Logo.png"

}

function init(){
	canvas = document.getElementById("mycanvas");
	console.log(canvas); 
	//Change height and width of the canvas using javascript
	W=1350
	H=450
	canvas.width=W
	canvas.height=H
	// Let's try to work with canvas
	pen = canvas.getContext('2d');
	console.log(pen);
	score=0;
	game_over = false;
	// We want to create box
	// json objects

	e1 = {
		x : 150,
		y : 50,
		w : 80,
		h : 80,
		speed : 42,
	};	
	e2 = {
		x : 300,
		y : 150,
		w : 90,
		h : 90,
		speed : 55,
	};
	e3 = {
		x : 450,
		y : 220,
		w : 60,
		h : 60,
		speed : 46,
	};
		e4 = {
		x : 600,
		y : 220,
		w : 100,
		h : 100,
		speed : 61,
	};
		e5 = {
		x : 750,
		y : 220,
		w : 68,
		h : 68,
		speed : 75,
	};
		e6 = {
		x : 900,
		y : 220,
		w : 80,
		h : 80,
		speed : 63,
	};
		e7 = {
		x : 1050,
		y : 220,
		w : 120,
		h : 120,
		speed : 52,
	};
		
	enemy = [e1,e2,e3,e4,e5,e6,e7];
	Batman = {
		x : 20,
		y : H/2,
		w : 60,
		h : 60,
		speed : 20,
		moving :"false",
	}
	DC= {
		x : W-100,
		y : H/2,
		w : 60,
		h : 60,
	}
	canvas.addEventListener('mousedown',function(){
		console.log("u pressed");
		Batman.moving = true;
	});
	canvas.addEventListener('mouseup',function(){
		console.log("u release");
		Batman.moving = false;
	});	
}
function draw(){

	//clear the old screen (entire area)
	pen.clearRect(0,0,W,H);
	
	//Draw bird on screen
	pen.fillStyle = "red";

	//pen.fillRect(bird.x,bird.y,bird.w,bird.h);
	
	pen.drawImage(DC_img, DC.x,DC.y,DC.w,DC.h);
	pen.drawImage(Batman_img, Batman.x,Batman.y,Batman.w,Batman.h);
	for(let i=0;i<enemy.length;i++){
		pen.drawImage(Joker_image, enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
	}
	pen.fillStyle='white';
	pen.fillText("Score" + score,20,20)
// Add Movement To The loop
//Game Loop

}
function isColliding(b1,b2){
	if(Math.abs(b1.x - b2.x)<=30 && Math.abs(b1.y - b2.y)<=30){
		return true;
	}
	return false;
}
function update(){

	//Batman state
	if(Batman.moving==true){
		Batman.x += Batman.speed;
		score += 50;
	}
	//Looop check collision btw corona and Batman
	for(let i=0;i<enemy.length;i++){
		if(isColliding(enemy[i],Batman)){
			score -= i*70;
			if(score<0){
				game_over = true;
				alert("Game Over");
			}

		}
	}

	//collision DC and Batman
	if(isColliding(DC,Batman)){
		game_over = true;
		draw();
		alert("You score" +score);
		//break the game loop -->
	}

	for(let i=0;i<enemy.length;i++){
		enemy[i].y += enemy[i].speed;
		if(enemy[i].y >H - enemy[i].h || enemy[i].y<0 ){
			enemy[i].speed *= -1;
		}
	}
	
}
function gameloop(){
	if(game_over==true){
	 	clearInterval(f);
	}
	draw();
	update();
}
load_images();
// start the game
init();

// repeatedly call game loop
var f = setInterval(gameloop,100);

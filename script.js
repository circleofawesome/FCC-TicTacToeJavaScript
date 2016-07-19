var boxes={
	//each box is numbered, starting from top going clockwise, they're all initially empty
	1:"empty",
	2:"empty",
	3:"empty",
	4:"empty",
	5:"empty",
	6:"empty",
	7:"empty",
	8:"empty",
	9:"empty"
};

var userChoice=prompt("Please enter X or O");

while((userChoice!=='X')&&(userChoice!=='O')){
	userChoice=prompt("Please enter X or O");
}
var compChoice;
if(userChoice==='X'){
	compChoice="O";
}
else{
	compChoice="X";
}
console.log("user picked: "+userChoice);//test
console.log("computer picked: "+compChoice);//test
//first computerchoice goes here
test();

//takes the users choice and appends it to the box he clicks on
function boxUpdate(boxNum){
	//console.log(boxNum); //test
	document.getElementById("9").innerHTML = "New text!";
	boxNum=parseInt(boxNum);
	if(boxes[boxNum]!=="empty"){
		return null;
	}
	document.getElementById(boxNum).innerHTML=userChoice;
	document.getElementById(boxNum).style.color="black";
	boxes[boxNum]=userChoice;
	//console.log(boxes);//test
	//winner finder checks to see if after user made their box choice if he won
	if(winnerFinder(userChoice,boxes)==="winner"){
		return winner("user");
	}
	//at this point the computer will make a choice on the box based on what the user chose, thus run the computer choice functions here

}

//computer makes a choice right after the user makes their choice 
function computerMakesChoice(){

}


//takes X or O, the boxes object and determines if that player is a winner
function winnerFinder(player,boxObj){
	if((boxObj[1]===player)&&(boxObj[2]===player)&&(boxObj[3]===player)){
		return "winner";
	}
	else if((boxObj[4]===player)&&(boxObj[5]===player)&&(boxObj[6]===player)){
		return "winner";
	}
	else if((boxObj[7]===player)&&(boxObj[8]===player)&&(boxObj[9]===player)){
		return "winner";
	}
	else if((boxObj[1]===player)&&(boxObj[4]===player)&&(boxObj[7]===player)){
		return "winner";
	}
	else if((boxObj[2]===player)&&(boxObj[5]===player)&&(boxObj[8]===player)){
		return "winner";
	}
	else if((boxObj[3]===player)&&(boxObj[6]===player)&&(boxObj[9]===player)){
		return "winner";
	}
	else if((boxObj[1]===player)&&(boxObj[5]===player)&&(boxObj[9]===player)){
		return "winner";
	}
	else if((boxObj[3]===player)&&(boxObj[5]===player)&&(boxObj[7]===player)){
		return "winner";
	}
	else{
		return "loser";
	}
}

//returns a corner choice (1,3,7,9)
function cornerPicker(){
	var corners=[1,3,7,9];
	return corners[Math.floor((Math.random() * 4) + 0)];
}

//updates the winner message
function winner(userOrComp){
	if(userOrComp==="computer"){
		document.getElementById('winner').innerHTML="Sorry! You lose!";
	}
	else{
		document.getElementById('winner').innerHTML="Congrats! You win!";
	}
}

//first computer choice
function firstComputerChoice(){
	var choice=cornerPicker();
	boxes[choice]=compChoice;
	//document.getElementById("winner").innerHTML="2";
	console.log("the computer picked box "+choice);//test
}

function test(){
	//document.getElementById("9").innerHTML = "New text!";
	console.log("wtf test");
}
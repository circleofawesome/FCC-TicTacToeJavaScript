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
var winningCombos=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
var cornerBoxes=[1,3,7,9];

var listOfUserChoices=[];
var listOfCompChoices=[];
var listOfOccupiedBoxes=[];

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


//takes the users choice and appends it to the box he clicks on
function boxUpdate(boxNum){
	//console.log(boxNum); //test
	boxNum=parseInt(boxNum);
	if(boxes[boxNum]!=="empty"){
		return null;
	}
	document.getElementById(boxNum).innerHTML=userChoice;
	document.getElementById(boxNum).style.color="black";

	cornerBoxes.splice(cornerBoxes.indexOf(boxNum),1);
	console.log("user picked a corner box: "+ cornerBoxes);//test
	boxes[boxNum]=userChoice;
	listOfUserChoices.push(boxNum);
	listOfOccupiedBoxes.push(boxNum);
	console.log(listOfUserChoices);//test
	//console.log(boxes);//test
	//winner finder checks to see if after user made their box choice if he won
	
	if(winnerFinder(userChoice,boxes)==="winner"){
		return winner("user");
	}
	//at this point the computer will make a choice on the box based on what the user chose, thus run the computer choice functions here
	computerMakesChoice();
	//!!!!!!!!!!!PICK UP FROM HERE
}

//computer makes a choice right after the user makes their choice 
function computerMakesChoice(){
	if(cornerBoxes.length>0){
		return startGame();
		//return null;
	}
	else{
		return null;
	}
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

//begins the game with the computer's first choice
function startGame(){
	var choice=cornerPicker();
	while(listOfOccupiedBoxes.includes(choice)){
		choice=cornerPicker();
		if(cornerBoxes.length<1){
			return null;
		}
	}
	cornerBoxes.splice(cornerBoxes.indexOf(choice),1);
	console.log("cornerBoxes remaining: "+cornerBoxes+" and the length is "+cornerBoxes.length);//test
	boxes[choice]=compChoice;
	listOfCompChoices.push(choice);
	listOfOccupiedBoxes.push(choice);
	console.log(listOfCompChoices);//test
	document.getElementById(choice).innerHTML=compChoice;
	document.getElementById(choice).style.color="black";
	console.log("the computer picked box "+choice);//test
}

//returns an array of the combos that need blocking if AI should attempt to block the human from winning
function blockInitiate(choices,combos){
	var needsToBeBlocked=[];
	for(var i=0;i<combos.length;i++){
		var count=0;
		for(var m=0;m<choices.length;m++){
			if(combos[i].includes(choices[m])){
				count+=1;
				if(count===2){
					//return combos[i];
					needsToBeBlocked.push(combos[i]);
					break;
				}
			}
		}
	}
	if(needsToBeBlocked.length===0){
		return null;
	}
	return needsToBeBlocked;
}
//if this function is given computerChoices instead of human choices it returns the possible winning moves

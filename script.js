var startButtonStatus=true;
var boxUpdateStatus=false;
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
	if(boxUpdateStatus===false){
		return null;
	}
	//console.log(boxNum); //test
	if(listOfOccupiedBoxes.length===9){
		document.getElementById('winner').innerHTML="It's a tie!";
		return console.log("fin");//test
	}
	boxNum=parseInt(boxNum);
	if(boxes[boxNum]!=="empty"){
		return null;
	}
	document.getElementById(boxNum).innerHTML=userChoice;
	document.getElementById(boxNum).style.color="black";

	if(cornerBoxes.includes(boxNum)){
		cornerBoxes.splice(cornerBoxes.indexOf(boxNum),1);
	}

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
	if(listOfOccupiedBoxes.length===9){
		document.getElementById('winner').innerHTML="It's a tie!";
		return console.log("fin");//test
	}
	if(winnerFinder(compChoice,boxes)==="winner"){
		return winner("computer");
	}
	
}

//computer makes a choice right after the user makes their choice 
function computerMakesChoice(){
	//first checks for tie
	//first computer must check for a possible winning box, then we check to see if there's a block required
	var winThisBox=allPossibleBoxes(blockInitiate(listOfCompChoices,winningCombos),listOfCompChoices);
	if(winThisBox!==null){
		for(var i=0;i<winThisBox.length;i++){
			if(listOfOccupiedBoxes.includes(winThisBox[i])===false){
				return updateBox(winThisBox[i],compChoice);
			}
		}
	}
	//first block initiate must be run to check for blocks
	var blockThisBox=allPossibleBoxes(blockInitiate(listOfUserChoices,winningCombos),listOfUserChoices);
	console.log("boxes the computer must block: "+blockThisBox);//test
	if(blockThisBox!==null){
		for(var i=0;i<blockThisBox.length;i++){
			if(listOfOccupiedBoxes.includes(blockThisBox[i])===false){
				return updateBox(blockThisBox[i],compChoice);
			}
		}
	}
	if(cornerBoxes.length>0){
		return startGame();
		//return null;
	}
	else{
		console.log("here");//test
		console.log(cornerBoxes.length);//test
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
	console.log("list of comp choices: "+listOfCompChoices);//test
	document.getElementById(choice).innerHTML=compChoice;
	document.getElementById(choice).style.color="black";
	console.log("the computer picked box "+choice);//test
}

//startGame version 2, actually begins the game with computer's first choice, then becomes inactive
function actualStartGame(){
	boxUpdateStatus=true;
	if(startButtonStatus){
		startButtonStatus=false;
		document.getElementById("start").innerHTML="New Game";
		return startGame();
	}
	else{
		startButtonStatus=false;
		location.reload();
	}
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

//takes the combo that needs to be blocked and the player's choices and returns the number that needs to be blocked ex: (1,3)==>[1,2,3]==>2
function blocker(combo,choices){
	if(combo===null){
		return null;
	}
	for(var i=0;i<combo.length;i++){
		if(choices.includes(combo[i])===false){
			return combo[i];
		}
	}
}

//takes array of combos that need blocking and human choices and returns an array with all the possible places to put a piece 
function allPossibleBoxes(needsBlocking,choices){
	if(needsBlocking===null){
		return null;
	}
	var chosenBoxes=[];
	for(var i=0;i<needsBlocking.length;i++){
		chosenBoxes.push(blocker(needsBlocking[i],choices));
	}
	return chosenBoxes;
}

//takes a choice and computer piece(X or O) updates the box on the html page
function updateBox(choice,compPiece){
	boxes[choice]=compPiece;
	listOfCompChoices.push(choice);
	listOfOccupiedBoxes.push(choice);
	console.log("list of comp choices: "+listOfCompChoices);//test
	document.getElementById(choice).innerHTML=compPiece;
	document.getElementById(choice).style.color="black";
	console.log("the computer picked box "+choice);//test
}
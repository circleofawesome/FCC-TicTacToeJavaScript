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



//COMPUTER AI FUNCTIONS BELOW 

var winningCombos=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

var humanChoices=[1,5];//the values here are for testing, in the actual game they'll be set as the human player makes his choices 

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



//returns a corner choice (1,3,7,9)
function cornerPicker(){
	var corners=[1,3,7,9];
	return corners[Math.floor((Math.random() * 4) + 0)];
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
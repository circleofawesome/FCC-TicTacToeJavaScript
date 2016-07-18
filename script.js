var userChoice=prompt("Please enter X or O");

while((userChoice!=='X')&&(userChoice!=='O')){
	userChoice=prompt("Please enter X or O");
}
console.log(userChoice);//test

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

//takes the users choice and appends it to the box he clicks on
function boxUpdate(boxNum){
	//console.log(boxNum); //test
	boxNum=parseInt(boxNum);
	if(boxes[boxNum]!=="empty"){
		return null;
	}
	document.getElementById(boxNum).innerHTML=userChoice;
	document.getElementById(boxNum).style.color="black";
	boxes[boxNum]=userChoice;
	//console.log(boxes);//test
}



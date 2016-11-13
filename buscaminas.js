class board{
	constructor (x){
		this.build(x);
	}
	build(x){
		var table = `<table border="0" style="margin: 0 auto;" cellspacing="2" bgcolor="black">`;
		for(let i=0;i<x;i++){
			table +=`<tr height="50">`;
			for(let j=0;j<x;j++){
					table +=`<td width="50" bgcolor="white" id =${i}.${j} ></td>`;
			}
			table +=`</tr>`;
		}
		table += `</table>`;
		document.getElementById("tablePlay").innerHTML=table;
	}
}

class controlator{
	constructor(){
		let x = prompt("Type row number.");
		this.board = new board(x);
		this.game = new game(x);
		//this.createEvent(x);
	}

	createEvent(x){
		for (let i=0;i<x;i++){
			for (let j=0;j<x;j++){
				document.getElementById(`${i}.${j}`).addEventListener("click"); //(e)=>this.puz.play(e,x));
			}
		}
	}
}

class game{
	constructor(x){
		this.listGame=[];
		this.createList(x);
	}

	createList(x){
		var list = [];
		var bomb = this.createBomb(x);
		for (let i=0;i<x;i++){
			for (let j=0;j<x;j++){
				list.push(0);
			}
			this.listGame.push(list);
			list=[];
		}
		while (bomb.length>0){
			var element= bomb.pop();
			this.listGame[parseInt(element[0])][parseInt(element[2])]=null;
		}
	}
	createBomb(x){
		var list=[];
		while(list.length<(x-1)){
			let y=`${Math.floor(Math.random() * (x - 0)) + 0}.${Math.floor(Math.random() * (x - 0)) + 0}`;
			if (list.indexOf(y) < 0){	
				list.push(y);
			}
		}
		return list;
	}
}

window.onload=function(){
	new controlator();

};
class board{
	constructor (x){
		this.build(x);
	}
	build(x){
		var table = `<table border="0" style="margin: 0 auto;" cellspacing="2" bgcolor="black">`;
		for(let i=0;i<x;i++){
			table +=`<tr height="50">`;
			for(let j=0;j<x;j++){
					table +=`<td width="50" text-align="center" bgcolor="white" id =${i}.${j} ></td>`;
			}
			table +=`</tr>`;
		}
		table += `</table>`;
		document.getElementById("tablePlay").innerHTML=table;
	}
}

class controlator{
	constructor(){
		let d = prompt("Which difficult would you like to play? Type: easy, medium, hard.");
		var x;
		if (d=="easy"){
			x=4;
		}else if (d=="medium"){
			x=6;
		}else if(d=="hard"){
			x=9;
		}else{
			document.getElementById("result").innerHTML="I said easy, medium o hard";
			x=0;

		}
		this.board = new board(x);
		this.game = new game(x);
		this.createEvent(x);
	}

	createEvent(x){
		for (let i=0;i<x;i++){
			for (let j=0;j<x;j++){
				document.getElementById(`${i}.${j}`).addEventListener("click", (e)=>this.game.play(e,x));
			}
		}
	}
}

class game{
	constructor(x){
		this.listGame=[];
		this.listZero=[];
		this.listWin=[];
		this.listCheck=[];
		this.createList(x);
	}

	createList(x){
		var list = [];
		var listCheck=[];
		var bomb = this.createBomb(x);
		var bombCopy= bomb.slice();
		for (let i=0;i<x;i++){
			for (let j=0;j<x;j++){
				list.push(0);
				listCheck.push(1);
			}
			this.listWin.push(list);
			this.listGame.push(list.slice());//Modify twice arrays.Need a copy.
			this.listCheck.push(listCheck);
			listCheck=[];
			list=[];
		}
		while (bomb.length>0){
			var element= bomb.pop();
			this.listGame[parseInt(element[0])][parseInt(element[2])]=null;
			this.listWin[parseInt(element[0])][parseInt(element[2])]=null;
			this.listCheck[parseInt(element[0])][parseInt(element[2])]=null;		
		}
		this.createAround(x, bombCopy);
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
	createAround(x, list){
		while (list.length>0){
			var e=list.pop();
			for (let i=0;i<x;i++){
				for (let j=0;j<x;j++){
					if (this.listGame[i][j] !== null){
						var number= Math.abs(parseFloat(e)-parseFloat(`${i}.${j}`)).toFixed(1);
							if (number == 0.1 || number == 1.0 || 
								number == 1.1 || number == 0.9){
								this.listGame[i][j]++;
							}
					}
				}
			}
		}
	}
	play(e, x){
		var td = e.target.getAttribute("id");
		var pos = this.listGame[parseInt(td[0])][parseInt(td[2])];
		if(pos===null){
			document.getElementById("result").innerHTML="FIN DEL JUEGO";
			this.endGame(x);
		}else if(pos>0){
			this.listCheck[td[0]][td[2]]=0;
			e.target.innerHTML=pos;
			this.color(pos, td[0], td[2]);
		}else{
			this.listCheck[td[0]][td[2]]=0;
			this.showZero(e, td, x);
		}
		this.checkWin(x, this.listWin, this.listCheck);
	}
	showZero(e, id, x){
		for (let i=0;i<x;i++){
			for (let j=0;j<x;j++){
				var number = Math.abs(parseFloat(id)-parseFloat(`${i}.${j}`)).toFixed(1);
				if (number == 0.1 || number == 1.0 || 
					number == 1.1 || number == 0.9 || number == 0.0){
					if(this.listGame[i][j]==0){
						document.getElementById(`${i}.${j}`).style.background="blue";
						this.showAround(x,id);
						if (this.listZero.length>0){
							for (let n=0;n<this.listZero.length;n++){
								this.showAround(x,this.listZero[n]);
							}
						}
					}else{
						document.getElementById(`${i}.${j}`).innerHTML=this.listGame[i][j];
						this.color(this.listGame[i][j], i, j);
					}
				}
			}
		}
	}
	showAround(x, id){
		for (let i=0;i<x;i++){
			for (let j=0;j<x;j++){
				var number = Math.abs(parseFloat(id)-parseFloat(`${i}.${j}`)).toFixed(1);
				if ((number == 0.1 || number == 1.0 || 
					number == 1.1 || number == 0.9) && this.listZero.indexOf(`${i}.${j}`)==-1){
					if(this.listGame[i][j]==0){
						this.listZero.push(`${i}.${j}`);
						this.listCheck[i][j]=0;
						document.getElementById(`${i}.${j}`).style.background="blue";
					}else{
						document.getElementById(`${i}.${j}`).innerHTML=this.listGame[i][j];
						this.listCheck[i][j]=0;
						this.color(this.listGame[i][j], i, j);
					}
				}
			}
		}

	}
	endGame(x){
		for (let i=0;i<x;i++){
			for (let j=0;j<x;j++){
				var a = this.listGame[i][j];
				if(a==null){
					document.getElementById(`${i}.${j}`).style.background="red";
				}else if (a==0){
					document.getElementById(`${i}.${j}`).style.background="blue";;
				}else{
					document.getElementById(`${i}.${j}`).innerHTML=this.listGame[i][j].toString();
					this.color(this.listGame[i][j], i, j);
				}
			}
		}
	}
	checkWin(len, x,y){
		var cont=0;
		for (let i=0;i<len;i++){
			for(let j=0;j<len;j++){
				if(x[i][j] == y[i][j]){
					cont++
					if (cont== (len*len)){
						document.getElementById("result").innerHTML="WINNER!!";
					}
						
				}
			}
		}
	}
	color(x, i, j){
		if (x==1){
			document.getElementById(`${i}.${j}`).style.color="blue";
		}else if (x==2){
			document.getElementById(`${i}.${j}`).style.color="purple";
		}else if (x==3){
			document.getElementById(`${i}.${j}`).style.color="orange";
		}else if (x==4){
			document.getElementById(`${i}.${j}`).style.color="red";
		}
	}
}

window.onload=function(){
	new controlator();

};

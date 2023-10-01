import React, { useEffect, useState } from "react";
import "./design.css";
// import { findBestMove } from "../Board/Minimax";
// import { checkWinner } from "../Board/BoardLines";

// import { main } from '../Board/Move.js';
// import { AI_movement } from "../Board/Move.js";

const Board = () => {
    const wumpusArray = [];
    const goldArray = [];
    const boardSize = 10;
    const boardView = [];
    let myPos_X = 0;
    let myPos_Y = 0;
    let found_gold=0;
    
    
    var wumpusNo = 1;//prompt("How Many Wumpus do you want");
    var pitNo = 10;//prompt("How many pits do you want?");
    var goldNo = 1;//prompt("How many gold do you want?");
    //document.getElementById("goldinfo").innerText=found_gold+" gold found, "+(goldNo-found_gold )+" remaining";
    let score = 101;
    //document.getElementById("playinfo").innerText="Current score: "+score;
    
    function posToDivID(inX, inY){
        let retV =  (inX*10)+inY;
        if(retV==0) return "00";
        else if(retV==1) return "01";
        else if(retV==2) return "02";
        else if(retV==3) return "03";
        else if(retV==4) return "04";
        else if(retV==5) return "05";
        else if(retV==6) return "06";
        else if(retV==7) return "07";
        else if(retV==8) return "08";
        else if(retV==9) return "09";
        else return retV;
    }
    // Initialize the boardView array
    for (let i = 0; i < boardSize; i++) {
        boardView[i] = [];
        for (let j = 0; j < boardSize; j++) {
            boardView[i][j] = 'n'; // Initialize with empty strings
        }
    }
    
    function startGame(){
        alert("Game Started");
        wumpusArray.forEach(element => {
            console.log(element);
        });
    }
    
    function getIndex_x_fromNumber(num){
        if(num<=10)
            return 0;
        else if(num<=20)
            return 1;
        else if(num<=30)
            return 2;
        else if(num<=40)
            return 3;
        else if(num<=50)
            return 4;
        else if(num<=60)
            return 5;
        else if(num<=70)
            return 6;
        else if(num<=80)
            return 7;
        else if(num<=90)
            return 8;
        else if(num<=100)
            return 9;
    }
    function getIndex_y_fromNumber(num){
        let retValue = num%10;
        if(retValue==0) return 9;
        else return retValue;
    }
    function setWumpus() {
        for (let i = 0; i < wumpusNo;) {
            let x = Math.floor((Math.random() * 100) + 1);
            if ((!wumpusArray.includes(x)) && (x != 2) && (x != 11)) {
                let rowIndex = getIndex_x_fromNumber(x);
                let colIndex = getIndex_y_fromNumber(x);
                boardView[rowIndex][colIndex] = 'w';
                if((rowIndex-1)>=0)
                {
                    if(boardView[rowIndex-1][colIndex]!='w'){
                        boardView[rowIndex-1][colIndex]='s';
                    }
                }
                if((colIndex-1)>=0)
                {
                    if(boardView[rowIndex][colIndex-1]!='w'){
                        boardView[rowIndex][colIndex-1]='s';
                    }
                }
                if((rowIndex+1)<=9)
                {
                    if(boardView[rowIndex+1][colIndex]!='w'){
                        boardView[rowIndex+1][colIndex]='s';
                    }
                }
                if((colIndex+1)<=9)
                {
                    if(boardView[rowIndex][colIndex+1]!='w'){
                        boardView[rowIndex][colIndex+1]='s';
                    }
                }
                wumpusArray.push(x);
                // document.getElementById(x).innerText="red";
                i++;
            }
        }
        // console.log(wumpusArray);
        // console.log(boardView);
    }
    function setGold() {
        for (let i = 0; i < goldNo;) {
            let x = Math.floor((Math.random() * 100) + 1);
            let rowIndex = getIndex_x_fromNumber(x);
            let colIndex = getIndex_y_fromNumber(x);
    
            if(boardView[rowIndex][colIndex]!='w' &&boardView[rowIndex][colIndex]!='b' &&boardView[rowIndex][colIndex]!='s' &&boardView[rowIndex][colIndex]!='d' )
            {
                boardView[rowIndex][colIndex]='g';
                goldArray.push(x);
                i++;
            }
    }
    // console.log(goldArray)
    }
    
    
    function setPits() {
        for (let i = 0; i < pitNo;) {
            let x = Math.floor((Math.random() * 100) + 1);
            if ((!wumpusArray.includes(x)) && (x != 2) && (x != 11)) {
                let rowIndex = getIndex_x_fromNumber(x);
                let colIndex = getIndex_y_fromNumber(x);
                boardView[rowIndex][colIndex] = 'p';
                if((rowIndex-1)>=0)
                {
                    if(boardView[rowIndex-1][colIndex]!='w'){
                        if(boardView[rowIndex-1][colIndex]=='s') boardView[rowIndex-1][colIndex]='d';
                        else boardView[rowIndex-1][colIndex]='b';
                    }
                }
                if((colIndex-1)>=0)
                {
                    if(boardView[rowIndex][colIndex-1]!='w'){
                        if(boardView[rowIndex][colIndex-1]=='s') boardView[rowIndex][colIndex-1]='d';
                        else boardView[rowIndex][colIndex-1]='b';
                    }
                }
                if((rowIndex+1)<=9)
                {
                    if(boardView[rowIndex+1][colIndex]!='w'){
                        if(boardView[rowIndex+1][colIndex]=='s') boardView[rowIndex+1][colIndex]='d';
                        else boardView[rowIndex+1][colIndex]='b';
                    }
                }
                if((colIndex+1)<=9)
                {
                    if(boardView[rowIndex][colIndex+1]!='w'){
                        if(boardView[rowIndex][colIndex+1]=='s') boardView[rowIndex][colIndex+1]='d';
                        else boardView[rowIndex][colIndex+1]='b';
                    }
                }
                // wumpusArray.push(x);
                // document.getElementById(x).innerText="red";
                i++;
            }
        }
        // console.log(wumpusArray);
        // console.log(boardView);
    }
    
    function setAttribute(){
        if(score==0)
        {
            alert("Game Over");
            //location.reload();
        }
        score--;
        //document.getElementById("playinfo").innerText="Current score: "+score;
        let textt="";
        let theDiv = document.getElementById(posToDivID(myPos_X,myPos_Y));
        theDiv.classList.add("visited");
        theDiv.classList.add("Nvisited");
        if(boardView[myPos_X][myPos_Y]=='s') theDiv.classList.add("snitchCell")
        else if(boardView[myPos_X][myPos_Y]=='b') theDiv.classList.add("breezeCell")
        else if(boardView[myPos_X][myPos_Y]=='d') theDiv.classList.add("doubleCell")
        else if(boardView[myPos_X][myPos_Y]=='w') theDiv.classList.add("wumpusCell")
        else if(boardView[myPos_X][myPos_Y]=='p') theDiv.classList.add("pitCell")
        else if(boardView[myPos_X][myPos_Y]=='g') theDiv.classList.add("goldCell")
    
        if(boardView[myPos_X][myPos_Y]=='w')
        {
            alert("Game Over! You are eaten by a wumpus!");
            //location.reload();
        }
        if(boardView[myPos_X][myPos_Y]=='p')
        {
            alert("Game Over! You have fallen into a pit");
            //location.reload();
        }
    
        if(boardView[myPos_X][myPos_Y]=='g') 
        {
            let t=myPos_X*10+myPos_Y;
            // console.log(t);
            if(goldArray.includes(t)){
                const index = goldArray.indexOf(t);
    
                goldArray.splice(index, 1);
                score=score+100;
                found_gold++;
                // document.getElementById("goldinfo").innerText=found_gold+" gold found, "+(goldNo-found_gold )+" remaining";
                // document.getElementById("playinfo").innerText="Current score: "+score;
                // console.log(goldArray)
            }
        }
        if(found_gold==goldNo)
        {
            alert("Congratulation Game Finished");
            //location.reload();
        }
    }
    document.onkeydown = function(event) {
             switch (event.keyCode) {
                case 37:
                //    alert('Left key');
                   if(myPos_Y!=0)
                   {
                        let theDiv = document.getElementById(posToDivID(myPos_X,myPos_Y));
                        theDiv.classList.remove("Nvisited");
                        myPos_Y--;
                        setAttribute();
                   }
                break;
                case 38:
                //    alert('Up key');
                   if(myPos_X!=0)
                   {
                    let theDiv = document.getElementById(posToDivID(myPos_X,myPos_Y));
                        theDiv.classList.remove("Nvisited");
                        myPos_X--;
                        setAttribute();
                   }
                break;
                case 39:
                //    alert('Right key');
                   if(myPos_Y!=9)
                   {
                    let theDiv = document.getElementById(posToDivID(myPos_X,myPos_Y));
                        theDiv.classList.remove("Nvisited");
                        myPos_Y++;
                        setAttribute();
                   }
                break;
                case 40:
                //    alert('Down key');
                   if(myPos_X!=9)
                   {
                    let theDiv = document.getElementById(posToDivID(myPos_X,myPos_Y));
                        theDiv.classList.remove("Nvisited");
                        myPos_X++;
                        setAttribute();
                   }
                break;
             }
          };
    
          function goleft(){
            if(myPos_Y!=0)
                   {
                        let theDiv = document.getElementById(posToDivID(myPos_X,myPos_Y));
                        theDiv.classList.remove("Nvisited");
                        myPos_Y--;
                        setAttribute();
                   }
          }
          function goright(){
            if(myPos_Y!=9)
                   {
                    let theDiv = document.getElementById(posToDivID(myPos_X,myPos_Y));
                        theDiv.classList.remove("Nvisited");
                        myPos_Y++;
                        setAttribute();
                   }
          }
          function goup(){
            if(myPos_X!=0)
                   {
                    let theDiv = document.getElementById(posToDivID(myPos_X,myPos_Y));
                        theDiv.classList.remove("Nvisited");
                        myPos_X--;
                        setAttribute();
                   }
          }
          function godown(){
            if(myPos_X!=9)
                   {
                    let theDiv = document.getElementById(posToDivID(myPos_X,myPos_Y));
                        theDiv.classList.remove("Nvisited");
                        myPos_X++;
                        setAttribute();
                   }
          }
    setAttribute();
    setWumpus();
    setPits();
    setGold();

  return (
    <div>
        <div>
            <p>Each move cost 1 score. Each gold add 100 to the score. Initial score is 100. You cann't move when your score is 0</p>
            <p id="goldinfo"></p>
            <p id="playinfo"></p>
        </div>
      
        
        <div>
            <div class="cell" id="00"></div>
            <div class="cell" id="01"></div>
            <div class="cell" id="02"></div>
            <div class="cell" id="03"></div>
            <div class="cell" id="04"></div>
            <div class="cell" id="05"></div>
            <div class="cell" id="06"></div>
            <div class="cell" id="07"></div>
            <div class="cell" id="08"></div>
            <div class="cell" id="09"></div>
        </div>
        <div>
            <div class="cell" id="10"></div>
            <div class="cell" id="11"></div>
            <div class="cell" id="12"></div>
            <div class="cell" id="13"></div>
            <div class="cell" id="14"></div>
            <div class="cell" id="15"></div>
            <div class="cell" id="16"></div>
            <div class="cell" id="17"></div>
            <div class="cell" id="18"></div>
            <div class="cell" id="19"></div>
        </div>
        <div>
            <div class="cell" id="20"></div>
            <div class="cell" id="21"></div>
            <div class="cell" id="22"></div>
            <div class="cell" id="23"></div>
            <div class="cell" id="24"></div>
            <div class="cell" id="25"></div>
            <div class="cell" id="26"></div>
            <div class="cell" id="27"></div>
            <div class="cell" id="28"></div>
            <div class="cell" id="29"></div>
        </div>
        <div>
            <div class="cell" id="30"></div>
            <div class="cell" id="31"></div>
            <div class="cell" id="32"></div>
            <div class="cell" id="33"></div>
            <div class="cell" id="34"></div>
            <div class="cell" id="35"></div>
            <div class="cell" id="36"></div>
            <div class="cell" id="37"></div>
            <div class="cell" id="38"></div>
            <div class="cell" id="39"></div>
        </div>
        <div>
            <div class="cell" id="40"></div>
            <div class="cell" id="41"></div>
            <div class="cell" id="42"></div>
            <div class="cell" id="43"></div>
            <div class="cell" id="44"></div>
            <div class="cell" id="45"></div>
            <div class="cell" id="46"></div>
            <div class="cell" id="47"></div>
            <div class="cell" id="48"></div>
            <div class="cell" id="49"></div>
        </div>
        <div>
            <div class="cell" id="50"></div>
            <div class="cell" id="51"></div>
            <div class="cell" id="52"></div>
            <div class="cell" id="53"></div>
            <div class="cell" id="54"></div>
            <div class="cell" id="55"></div>
            <div class="cell" id="56"></div>
            <div class="cell" id="57"></div>
            <div class="cell" id="58"></div>
            <div class="cell" id="59"></div>
        </div>
        <div>
            <div class="cell" id="60"></div>
            <div class="cell" id="61"></div>
            <div class="cell" id="62"></div>
            <div class="cell" id="63"></div>
            <div class="cell" id="64"></div>
            <div class="cell" id="65"></div>
            <div class="cell" id="66"></div>
            <div class="cell" id="67"></div>
            <div class="cell" id="68"></div>
            <div class="cell" id="69"></div>
        </div>
        <div>
            <div class="cell" id="70"></div>
            <div class="cell" id="71"></div>
            <div class="cell" id="72"></div>
            <div class="cell" id="73"></div>
            <div class="cell" id="74"></div>
            <div class="cell" id="75"></div>
            <div class="cell" id="76"></div>
            <div class="cell" id="77"></div>
            <div class="cell" id="78"></div>
            <div class="cell" id="79"></div>
        </div>
        <div>
            <div class="cell" id="80"></div>
            <div class="cell" id="81"></div>
            <div class="cell" id="82"></div>
            <div class="cell" id="83"></div>
            <div class="cell" id="84"></div>
            <div class="cell" id="85"></div>
            <div class="cell" id="86"></div>
            <div class="cell" id="87"></div>
            <div class="cell" id="88"></div>
            <div class="cell" id="89"></div>
        </div>
        <div>
            <div class="cell" id="90"></div>
            <div class="cell" id="91"></div>
            <div class="cell" id="92"></div>
            <div class="cell" id="93"></div>
            <div class="cell" id="94"></div>
            <div class="cell" id="95"></div>
            <div class="cell" id="96"></div>
            <div class="cell" id="97"></div>
            <div class="cell" id="98"></div>
            <div class="cell" id="99"></div>
        </div>

        <button class="bt up" onclick="goup()">Up</button>
        <button class="bt le" onclick="goleft()">Left</button>
        <button class="bt ri" onclick="goright()">Right</button>
        <button class="bt do" onclick="godown()">Down</button>
    
    </div>
  );
};

export default Board;

/*Memory Grid Game - Jogo da memoria em grid com números - display 40 boxes inside a grid, then sort 10 boxes to display numbers between 1 and 10,
the grid will lights of and the player has to touch each of the number inside the same box that it was shown */



const board = (function(){  

    

    //Display number inside one box-cell in grid
    const aneX = function(i,cells) {
        var tempShow = document.getElementById(`box-${cells[i]}`);
        tempShow = tempShow.appendChild(document.createElement('p'));
        tempShow.innerText = i + 1;
    };
    
    return {
        //PART 0 - Reset board

        resetBoard : function() { 
            let e = document.querySelector(".container"); 
            
                e.innerHTML = ""; 
                 
            
        },

        //PART 1 - Display grid
        createBoard : function() {  
            const grid = document.querySelector(".container");
            for(let i=1;i<41;i++){
                let box = document.createElement("div");
                grid.appendChild(box);
                box = box.setAttribute("id","box-"+i);
            }
            
        },

        //PART 2 - Generates number of the boxes that numbers will show up 
        randomGen : function(n) {
            let cells = [];
            for(let i=0;i<n;i++){
                let x = Math.floor(Math.random() * 39) + 1;
                    if(!cells.includes(x)){
                        cells.push(x); 
                   } else {
                        i--;
                    }
                
            }
            return cells;
        },

        
    
        //PART 3 - Pop up on grid, numbers according to cells previously generated on randomGen(n)
        displayBoard : function(obPlayer,cells) { 
            //for(var i=0; i<round; i++){
                    let i = 0;
                    let intervaloop = setInterval(function() {
                        aneX(i,cells); 
                        i++;
                    if(i>=obPlayer.round)
                        clearInterval(intervaloop);
                    }, 500);
        },
    
        //PART 4 - Hide the numbers
        eraseBoard : function(obPlayer,cells) {
            let i = obPlayer.round - 1;
            do {
            let tempShow = document.getElementById(`box-${cells[i]}`);
            while(tempShow.firstChild){
                tempShow.removeChild(tempShow.firstChild);
                //console.log(cells[i]);
                };
            i--;
            }
            while(i>=0); 
        },

        //PART 5 - needs to be refactored
        setListeners : function(obPlayer,cells,callback) {
            function reInit() {
                obPlayer.round = obPlayer.sum + 1;
                console.log(`round -> ${obPlayer.round}`);
                obPlayer.sum = 0;
                let gridEvnts = document.querySelector("#grid");
                gridEvnts.removeEventListener("click",handles,false);
                board.resetBoard();
                

                callback(memoryGame.init);
            };

            const handles = function(e){
                

                e = e.target;
                console.log(e);
                
                if(e === document.getElementById(`box-${cells[obPlayer.sum]}`)){
                     /**/
                    if(!e.hasChildNodes()){
                        
                        aneX(obPlayer.sum,cells);
                        
                        obPlayer.sum++;
                        obPlayer.round--;
                        if(obPlayer.round==0) {
                            if(obPlayer.sum>=(10*obPlayer.level)) {obPlayer.level = obPlayer.level + 1};
                            setTimeout(reInit,1000);
                        } 
                    
                    }
                } else {
                    obPlayer.attempts++;
                    window.alert('try again! ');
                    setTimeout(reInit,1000);
                    }
                
                
            };
            

            let gridEvnts = document.querySelector("#grid");
            gridEvnts.addEventListener("click", handles, false);
            
                
        }

    }
   

} )();


const player = (function() {

    let Gamer = function(namePlayer) {
        this.namePlayer = namePlayer;
        this.round = 3;
        this.bestScore = 0;
        this.level = 1;
        this.sum = 0;
        this.attempts = 0;
    };

    Gamer.prototype.greetings = function() {
        console.log(`Oi! ID: ${this.idGame} Player: ${this.namePlayer} Round: ${this.round}` );
    };


return {

    newPlayer: function(name) {
        let player = new Gamer(name);
        return player; 
    },

    
};

} )();


const memoryGame = (function(bord, playng) {
    
    const playr = playng.newPlayer();

    return {
        
    init: function() {
        
        bord.createBoard();
        let cells = bord.randomGen(10*playr.level); //(n) de elementos onde será mostrado um número 'display n in box'
        
        bord.displayBoard(playr,cells); //(n,cells) sendo n o round onde está o jogo, determina o número de elementos a ser contado.
        //playng.newPlayer(playng);

        setTimeout(bord.eraseBoard,4000,playr,cells); //4000 = 4s >> quanto maior qtd de numeros "menor" será o tempo de visualização, deve ser
        
        bord.setListeners(playr,cells,memoryGame.init);
        
    }
}
} )(board,player);



memoryGame.init();
    


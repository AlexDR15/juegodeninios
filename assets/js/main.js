var animals = ["elephant", "frog", "pig", "teddy", "whale"];
var colors = ["#c3c3c3", "#0ed145", "#feaec7", "#b97b56", "#00a8f3"];
var counter = 0;
var contentColors = "";
var contentCards = "";
var position = [0, 1, 2, 3, 4]; 
var lastCard = 0;
var cardRow = 0;
var lastCardRow = 0;
var win = [];

function delayBeforeOtherAnimal(pause){ 
    setTimeout(()=>{ 
    // code that must be executed after the pause 
    document.getElementById("animalSound").pause();
    showAnimal();
    }, pause ); 
} 

function showAnimal(){
    position.sort(function(a, b){return 0.5 - Math.random()});
    if (counter == animals.length){
        window.location.href = "memory.html";
    }
    document.getElementById("animalIMG").src = "assets/img/"+animals[counter]+"/white.png" ;
    position.forEach(function(item, index){
        contentColors += '<div id="' + item + '" class="colorButton" style="background: ' +colors[item] + ';" onclick="selectColor('+ item +')" ></div>';
    })
    document.getElementById("containerColorButtons").innerHTML = contentColors;
}

function selectColor(num){
    document.getElementById("animalSound").src = "assets/sound/"+animals[num]+".mp3";
    document.getElementById("animalSound").play();
    if (counter == num){
        document.getElementById("animalIMG").src = "assets/img/"+animals[counter]+"/ok.png" ;
        contentColors = "";
        counter++;
        delayBeforeOtherAnimal(2000);
    }
}

function showCardsGame(){
    contentCards = "";
    position.sort(function(a, b){return 0.5 - Math.random()});
    for (var i = 0; i < position.length; i++) { 
        contentCards += '<img id="1' + position[i] + '" src="assets/img/back-card.png" class="backCard" onclick="selectCard(1'+ position[i] +')" />';
    }
    document.getElementById("containerAnimalCards1").innerHTML = contentCards;
    
    contentCards = "";
    position.sort(function(a, b){return 0.5 - Math.random()});
    for (var i = 0; i < position.length; i++) { 
        contentCards += '<img id="2' + position[i] + '" src="assets/img/back-card.png" class="backCard" onclick="selectCard(2'+ position[i] +')" />';
    }
    document.getElementById("containerAnimalCards2").innerHTML = contentCards;
}

function selectCard(num){
    var num2 = 0;
    var oNum = 0;
    if (num > 19){
        num2 = num-20;
        oNum = num2+10;
        cardRow = 1;
    }else{
        num2 = num-10;
        oNum = num2+20;
        cardRow = 2;
    }

    document.getElementById(num).src = "assets/img/"+animals[num2]+"/ok.png" ;

    if (win.indexOf(num2) > -1){
        // CARTAS YA ACERTADAS (SOLO SONARÁ)
        lastCard = 0;
        lastCardRow = 0;
    }else if (lastCard == num){
        // console.log(1);
        // SI PULSA SOBRE LA MISMA
        document.getElementById(num).src = "assets/img/back-card.png" ;
        lastCard = 0;
        lastCardRow = 0;
    }else if (lastCard == oNum){
        // console.log(2);
        // SI EMPAREJA CON LA ÚLTIMA CARTA
        lastCard = 0;
        lastCardRow = 0;
        win.push(num2);
    }else{
        // SI PULSA OTRA CARTA
        if (cardRow == lastCardRow){
            // console.log("3.1");
            // SI PULSA OTRA CARTA EN LA MISMA FILA
            document.getElementById(lastCard).src = "assets/img/back-card.png" ;
        }else if (lastCard == 0){
            // console.log("3.2");
            // ES LA PRIMERA CARTA QUE PULSA
        }else if (lastCard != oNum){
            // console.log("3.3");
            // SI PULSA OTRA CARTA QUE NO ES LA PAREJA
            document.getElementById(lastCard).src = "assets/img/back-card.png" ;
        }else{
            // ERROR (DEBERÍA DE HABER ENTRADO EN UNA DE LAS ANTERIORES)
            console.log("ERROR");
            console.log(num, oNum, num2, cardRow, lastCard, lastCardRow, animals[num2]);
        }
        lastCardRow = cardRow;
        lastCard = num;
    }
    
    // console.log(lastCard);
    // console.log(num, oNum, num2);
    document.getElementById("animalSound").src = "assets/sound/"+animals[num2]+".mp3";
    document.getElementById("animalSound").play();

    if (win.length == 5){
        document.getElementById("juego1").src = "assets/img/juego1.png" ;
        document.getElementById("juego2").src = "assets/img/juego2.png" ;
    }
}
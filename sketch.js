
/*
<><><><><><><><><><><><><><><><><>
----------------------------------

generatore di glitch in P5js
by frmurgia © 2017-18 MIT License
DSII2018 Lab @UNIRSM

https://it.wikipedia.org/wiki/Glitch_(musica)

10 print

ispirato al lavoro audio/video minimalista
di Ryoji Ikeda

----------------------------------
<><><><><><><><><><><><><><><><><>
*/


/*
::TO DO::
diminuire la frequenza del random S/H controllandola con il BPM
aggiungere un bottone play/stop
*/

var monoSynth;
var osc; // creo un oscillatore
var playing = false; // condizione di play inizialmente falsa
var button;
var uno;
var due;
var tre;
var quattro;
var ele;
function setup() {

createCanvas(windowWidth, windowHeight);

  monoSynth=new p5.MonoSynth();
  osc = new p5.Noise(); // tipo di oscillatore che genera un segnale audio
                        // composto da tutte le frequenze a stessa potenza
  osc.setType('pink');

 }
var avviso='Click to play!';
function draw(){
 uno=random(200);
 due=random(2) ;//*100
 tre=random(100);
 quattro=random(50,72) ;
  background(0);
  //frameRate(60);

  // verifica la condizione di playing per attivare o meno l'oscillatore
  if (playing==true){
      sample_hold();
   visual();//
  }
else {osc.stop();}
noStroke();
fill(255);
if (playing!=true){
text(avviso, (windowWidth/2)-50,(windowHeight/2)-30);
textFont('IBM Plex Mono');
}
}

//condizioni casuali


function visual(){
  fill(255);
  noStroke();
  translate((windowWidth/2)-50,(windowHeight/2)-100);
  rectMode(CENTER);

 rect(0, uno, 100, tre);
 rect(100, due*100, 100, quattro);


}

function keyPressed(){ // freccia a destra== audio ON; freccia a sinistra== audio OFF
    if (keyCode === RIGHT_ARROW){
        playing=true;
    }
    else if (keyCode === LEFT_ARROW){
        playing=false;
    }

  }

// funzione sample & hold https://it.wikipedia.org/wiki/Sample_and_hold
// genera una sequenza random molto veloce di numeri 0 e 1, che corrispondono
// ad un acceso spento dell'oscillatore.
function sample_hold() {

var trigger=int(random(2)); //
  if (trigger==0){
    osc.start();
    var midiVal = round( random(50,72) );
    monoSynth.triggerAttack(midiVal, random(2) );

  }
  else{
      monoSynth.triggerRelease();
  osc.stop();

  }
}
function mouseClicked() {

  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    background(250);

    if (playing) {

      osc.stop();

      playing = false;


    } else {

      osc.start();
      playing = true;



    }
  }
}

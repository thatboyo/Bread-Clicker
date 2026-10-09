let bread = 0;
let toasterPrice = 2000;
let toasters = 0;
let bakeryPrice = 35000;
let bakeries = 0;
let chungies = 0
let chungiePrice = 100;
let robots = 0
let robotPrice = 100000;
let craftingTablePrice = 2000;
let craftingTable = 0;
let commandBlockPrice = 35000;
let commandBlocks = 0;
let villagers = 0
let villagersPrice = 100;
let MagicalBreadCreatingMachine = 0
let MagicalBreadCreatingMachinePrice = 100000;
var breadSprite;
var clickedAmount

breadSprite = document.getElementById("bread"); 
breadSprite.onclick = clicked;
chungieBTN = document.getElementById("1"); 
chungieBTN.onclick = chungieBuy;

function clicked() {
   bread++;
  update();
}
setInterval(function() {
  bread += toasters * 1.0;
  bread += chungies * 0.1;
  bread += bakeries * 2.0;
  bread += robots * 6.0;
  update();
}, 100);
function update(){
   clickedAmount = document.getElementById("amount")
   clickedAmount.textContent = "Bread Baked: " + Math.round(bread);
}
function chungieBuy(){
  if (bread >= chungiePrice){
    bread = bread - chungiePrice;
    chungies ++;
    chungiePrice = chungiePrice * 1.15;
    update();
  }
}
function toasterBuy(){
  if (bread >= toasterPrice){
    bread = bread - toasterPrice;
    chungies ++;
    toasterPrice = toasterPrice * 1.15;
    update();
  }
}
//some fixes and functionality changes










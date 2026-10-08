let bread = 0;
let toasterPrice = 2000;
let toasters = 0;
let bakeryPrice = 35000;
let bakeries = 0;
let chungies = 0
let chugiePrice = 100;
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
var breadClicked;

function breadClicked() {
   breadSprite = document.getElementById("bread"); 
   bread++;
}
  
breadSprite = document.getElementById("bread"); 
breadSprite.onmouseenter = function() {
    bread.style.width = '300pxP';
    bread.style.height = '150px';
}

function update(){
  //  breadClicked = document.getElementById 
}
breadSprite.

timedLoop(1000, function() {
  bread = bread + toasters * 10;
  bread = bread + chungies * 1;
  bread = bread + bakery * 20;
  bread = bread + robots * 60;
  //update();
})
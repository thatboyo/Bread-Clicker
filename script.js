let bread = 0;
let toasterPrice = 2000;
let toasters = 0;
let bakeryPrice = 35000;
let bakeries = 0;
let chungies = 0
let chungiePrice = 100;
let robots = 0
let robotPrice = 100000;
let craftingTablePrice = 200000;
let craftingTables = 0;
let commandBlockPrice = 35000;
let commandBlocks = 0;
let villagers = 0
let villagersPrice = 100;
let MagicalBreadCreatingMachine = 0
let MagicalBreadCreatingMachinePrice = 100000;
var breadSprite;
var clickedAmount
var ChungiePriceText = document.getElementById("1");
var ToasterPriceText = document.getElementById("2");
var BakeryPriceText  = document.getElementById("3");
var RobotPriceText = document.getElementById("4");
var CraftingTablePriceText = document.getElementById("5");
let CPS = 0;
var bps = document.getElementById("BPS");

breadSprite = document.getElementById("bread"); 
breadSprite.onclick = clicked;
chungieBTN = document.getElementById("1"); 
chungieBTN.onclick = chungieBuy;
ToasterBTN = document.getElementById("2"); 
ToasterBTN.onclick = toasterBuy;
BakeryBTN = document.getElementById("3");
BakeryBTN.onclick = bakeryBuy;
robotBTN = document.getElementById("4");
robotBTN.onclick = robotBuy;
craftingTableBTN = document.getElementById("5");
craftingTableBTN.onclick = craftingTableBuy;
const BasePrices = {
  chungie: 100,
  toaster: 2000,
  bakery: 35000,
  robot: 100000,
  craftingTable: 200000,
};
const PriceGrowth = 1.15;
function recalcPrices() {
  chungiePrice       = BasePrices.chungie       * Math.pow(PriceGrowth, chungies);
  toasterPrice       = BasePrices.toaster       * Math.pow(PriceGrowth, toasters);
  bakeryPrice        = BasePrices.bakery        * Math.pow(PriceGrowth, bakeries);
  robotPrice         = BasePrices.robot         * Math.pow(PriceGrowth, robots);
  craftingTablePrice = BasePrices.craftingTable * Math.pow(PriceGrowth, craftingTables);
}

function getSaveCode(){
  const state = {v: 1, bread, chungies, toasters, bakeries, robots, craftingTables};
  return btoa(JSON.stringify(state));
}

function loadSaveCode(code){
  try{
    const s = JSON.parse(atob(code.trim()));
    const counts = ["chungies", "toasters", "bakeries", "robots", "craftingTables"];
    if (typeof s.bread !== "number" || !isFinite(s.bread) || s.bread < 0) return false;
    for (const key of counts) {
      if (!Number.isInteger(s[key]) || s[key] < 0) return false;
    }
    bread = s.bread;
    chungies = s.chungies;
    toasters = s.toasters;
    bakeries = s.bakeries;
    robots = s.robots;
    craftingTables = s.craftingTables;

    recalcPrices();
    recalcCPS();
    update();
    return true;
  } catch (e) {
    return false;
  }
} //idk if this will work or not
function recalcCPS(){
  CPS = chungies * 1
       + toasters * 10
       + bakeries * 20
       + robots * 60
       + craftingTables * 150
}

const menuBtn = document.getElementById("menuBtn");
const menuPanel = document.getElementById("menuPanel");
const saveArea = document.getElementById("saveArea");
const loadArea = document.getElementById("loadArea");
const saveCode = document.getElementById("saveCode");
const loadCode = document.getElementById("loadCode");
const loadMsg= document.getElementById("loadMsg");

menuBtn.onclick = function(){
  menuPanel.hidden = !menuPanel.hidden;
}
document.getElementById("saveBtn").onclick = function(){
  saveCode.value = getSaveCode();
  loadArea.hidden = true;
  saveArea.hidden = false;
}

document.getElementById("loadBtn").onclick = function(){
  saveArea.hidden = true;
  loadArea.hidden = false;
  saveArea.hidden = true;
}
document.getElementById("copyBtn").onclick = function(){
  saveCode.select();
  navigator.clipboard.writeText(saveCode.value).catch(function(){
    document.execCommand("copy");
  })
}
document.addEventListener("click", function (e) {
  if (!document.getElementById("menu").contains(e.target)){
    menuPanel.hidden = true;
  }
})

document.getElementById("loadGo").onclick = function(){
  if(loadSaveCode(loadCode.value)){
    loadMsg.textContent = "Game Loaded!";
    loadCode.value = "";
  } else {
    loadMsg.textContent = "Invalid Code:("
  }
};



function clicked() {
   bread++;
  update();
}
setInterval(function() {
  bread += toasters * 1.0;
  bread += chungies * 0.1;
  bread += bakeries * 2.0;
  bread += robots * 6.0;
  bread += craftingTables * 15.0;
  update();
}, 100);

function update(){
    recalcCPS();
    recalcPrices();
   clickedAmount = document.getElementById("amount")
   clickedAmount.textContent = "Bread Baked: " + Math.round(bread);
   ChungiePriceText.textContent = "Hire a Chungie: $" + Math.round(chungiePrice) + "  Owned: " + chungies;
   ToasterPriceText.textContent = "Buy a Toaster: $" + Math.round(toasterPrice)+ "  Owned: " + toasters;
   BakeryPriceText.textContent = "Buy a Bakery: $" + Math.round(bakeryPrice)+ "  Owned: " + bakeries;
   RobotPriceText.textContent = "Buy a Robot: $" + Math.round(robotPrice) + "  Owned: " + robots;
   CraftingTablePriceText.textContent = "Invest in a Crafting Table: $" + Math.round(craftingTablePrice)+ "  Owned: " + craftingTables;
   bps.textContent = "Bread per Second: " + CPS;
   Afforability();
}

function chungieBuy(){
  if (bread >= chungiePrice){
    bread = bread - chungiePrice;
    chungies ++;
    chungiePrice = chungiePrice * 1.15;
    //CPS ++;;
    update();
  }
}
function toasterBuy(){
  if (bread >= toasterPrice){
    bread = bread - toasterPrice;
    toasters ++;
    toasterPrice = toasterPrice * 1.15;
    //CPS +=  toasters * 10;
    update();
  }
}
function bakeryBuy(){
  if (bread >= bakeryPrice){
    bread = bread - bakeryPrice;
    bakeries++;
    bakeryPrice = bakeryPrice * 1.15;
    //CPS +=  bakeries * 20;
    update();
  }
}
function robotBuy(){
  if (bread >= robotPrice){
    bread = bread - robotPrice;
    robots++;
    robotPrice = robotPrice * 1.15;
   // CPS +=  robots * 60;
    update();
  }
}
function craftingTableBuy(){
  if (bread >= craftingTablePrice){
    bread = bread - craftingTablePrice;
    craftingTables++;
    craftingTablePrice = craftingTablePrice * 1.15;
    //CPS +=  craftingTables* 150;
    update();
  }
}
//some fixes and functionality changes

function Afforability(){
  const prices = {
    "1": chungiePrice,
    "2": toasterPrice,
    "3": bakeryPrice,
    "4": robotPrice,
    "5": craftingTablePrice,
  };
  for (const id in prices){
    document.getElementById(id).disabled = bread < prices[id];
  }
}








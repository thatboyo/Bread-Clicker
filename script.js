var bread = 0;
var toasterPrice = 2000;
var toasters = 0;
var bakeryPrice = 35000;
var bakeries = 0;
var chungies = 0
var chungiePrice = 100;
var robots = 0
var robotPrice = 100000;
var craftingTablePrice = 200000;
var craftingTables = 0;
var commandBlockPrice = 35000000;
var commandBlocks = 0;
var villagers = 0
var villagersPrice = 5600000;
var magicalBreadMachine = 0
var magicalBreadMachinePrice = 190000000;
var amazonPrice = 2820000000000;
var amazons = 0;
var snakeGamePrice = 60000000;
var casinoPrice = 900000;
var breadSprite;
var clickedAmount;
var ChungiePriceText = document.getElementById("1");
var ToasterPriceText = document.getElementById("2");
var BakeryPriceText  = document.getElementById("3");
var RobotPriceText = document.getElementById("4");
var CraftingTablePriceText = document.getElementById("5");
var VillagerPriceText = document.getElementById("7");
var CommandBlockPriceText  = document.getElementById("8");
var MagicBreadPriceText = document.getElementById("9");
var AmazonPriceText = document.getElementById("11");
var CPS = 0;
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
villagerBTN = document.getElementById("7"); 
villagerBTN.onclick = VillagerBuy;
commandBlockBTN = document.getElementById("8"); 
commandBlockBTN.onclick = commandBlockBuy;

magicalBreadMachineBTN = document.getElementById("9");
magicalBreadMachineBTN.onclick = magicalBreadMachineBuy;
amazonBTN = document.getElementById("11");
amazonBTN.onclick = amazonBuy;
testingBTN = document.getElementById("12");
testingBTN.onclick = testingBtn;

var chungieBPS = "";
var toasterBPS = "";
var bakeryBPS = "";
var robotBPS  = "";
var craftingTableBPS = "";
var villagerBPS = "";
var commandBlockBPS = "";
var magicalBreadMachineBPS = "";
var amazonBPS = "";
var chungiesOwned = "";
var toastersOwned = "";
var bakeriesOwned = "";
var robotsOwned = "";
var craftingTablesOwned = "";
var villagersOwned = "";
var commandBlocksOwned = "";
var magicalBreadMachineOwned = "";
var amazonsOwned = "";

const BasePrices = {
  chungie: 100,
  toaster: 2000,
  bakery: 35000,
  robot: 100000,
  craftingTable: 600000,
  villagers: 5600000,
  commandBlocks: 35000000,
  magicalBreadMachine: 190000000,
  amazon: 2820000000000
};
//hopefully this will work
const saveKey = "breadClickerSaveThingy";
const countKeys =["chungies", "toasters", "bakeries", "robots", "craftingTables", "villagers", "commandBlocks", "magicalBreadMachine", "amazons"];
function getState(){
  return {v:2, bread, chungies, toasters, bakeries, robots, craftingTables, villagers, commandBlocks, magicalBreadMachine, amazons};
}
function loadState(s){
  if (!s || typeof s.bread !== "number" || !isFinite(s.bread) || s.bread < 0) return false;
  for (const key of countKeys) {
    const val = s[key] === undefined ? 0 : s[key];
    if (!Number.isInteger(val) || val < 0) return false;
    //didnt know how to do this lol, had to look it up
  }
  bread = s.bread;
  chungies = s.chungies || 0;
  toasters = s.toasters || 0;
  bakeries = s.bakeries || 0;
  robots = s.robots || 0;
  craftingTables = s.craftingTables || 0;
  villagers = s.villagers || 0;
  commandBlocks = s.commandBlocks || 0;
  magicalBreadMachine = s.magicalBreadMachine || 0;
  amazons = s.amazons || 0;
  update();
  return true;
}


const PriceGrowth = 1.15;
function recalcPrices() {
  chungiePrice       = BasePrices.chungie       * Math.pow(PriceGrowth, chungies);
  toasterPrice       = BasePrices.toaster       * Math.pow(PriceGrowth, toasters);
  bakeryPrice        = BasePrices.bakery        * Math.pow(PriceGrowth, bakeries);
  robotPrice         = BasePrices.robot         * Math.pow(PriceGrowth, robots);
  craftingTablePrice = BasePrices.craftingTable * Math.pow(PriceGrowth, craftingTables);
  villagersPrice      = BasePrices.villagers      * Math.pow(PriceGrowth, villagers);
  commandBlockPrice  = BasePrices.commandBlocks  * Math.pow(PriceGrowth, commandBlocks);
  magicalBreadMachinePrice = BasePrices.magicalBreadMachine * Math.pow(PriceGrowth, magicalBreadMachine);
  amazonPrice        = BasePrices.amazon        * Math.pow(PriceGrowth, amazons);
}

function getSaveCode(){
  return btoa(JSON.stringify(getState()));
}

function loadSaveCode(code){
  try {
    return loadState(JSON.parse(atob(code.trim())));}
    catch (e) {return false;
  }
} 
//hopefully this will autosave
function saveToLocalStorage(){
  try { localStorage.setItem(saveKey, JSON.stringify(getState()));}
  catch (e) {}
}
function loadFromLocalStorage(){
  try {
    const raw = localStorage.getItem(saveKey);
    if (raw) loadState(JSON.parse(raw));
  } catch (e) {}
  }
setInterval(saveToLocalStorage, 5000);
window.addEventListener("beforeunload", saveToLocalStorage);

function recalcCPS(){
  CPS = chungies * 1
       + toasters * 10
       + bakeries * 20
       + robots * 60
       + craftingTables * 250
       + villagers * 1000
       + commandBlocks * 6400
       + magicalBreadMachine * 9500
       + amazons * 99999
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
    saveArea.hidden = true;
    loadArea.hidden = true;
    saveArea.hidden = true;
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
    saveArea.hidden = true;
    loadArea.hidden = true;
    saveArea.hidden = true;
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
document.getElementById("infoBtn").onclick = function() {
  window.location.href = "info.html";
}


function clicked() {
   bread++;
  update();
}
setInterval(function() {
  bread += toasters * 0.10;
  bread += chungies * 0.01;
  bread += bakeries * 0.20;
  bread += robots * 0.60;
  bread += craftingTables * 2.5;
  bread += villagers * 10.00;
  bread += commandBlocks * 64.00;
  bread += magicalBreadMachine * 120.00;
  bread += amazons * 999.90;
  update();
}, 10); //made the numbers update more often

function update(){
   recalcCPS();
   recalcPrices();
   clickedAmount = document.getElementById("amount")
   clickedAmount.textContent = "Bread Baked: " + Math.round(bread);
   ChungiePriceText.textContent = "Hire a Chungie: $" + Math.round(chungiePrice) +  chungieBPS + chungiesOwned;
   ToasterPriceText.textContent = "Buy a Toaster: $" + Math.round(toasterPrice)+ toasterBPS + toastersOwned;
   BakeryPriceText.textContent = "Buy a Bakery: $" + Math.round(bakeryPrice)+ bakeryBPS + bakeriesOwned;
   RobotPriceText.textContent = "Buy a Robot: $" + Math.round(robotPrice) + robotBPS + robotsOwned;
   CraftingTablePriceText.textContent = "Buy a Crafting Table: $" + Math.round(craftingTablePrice)+ craftingTableBPS + craftingTablesOwned;

   VillagerPriceText.textContent = "Hire a Villager: $" + Math.round(villagersPrice) + villagerBPS + villagersOwned;
   CommandBlockPriceText.textContent = "Encode a Command Block: $" + Math.round(commandBlockPrice)+ commandBlockBPS + commandBlocksOwned;
   MagicBreadPriceText.textContent = "Invent a Magic Bread Machine: $" + Math.round(magicalBreadMachinePrice)+ magicalBreadMachineBPS + magicalBreadMachineOwned;
   AmazonPriceText.textContent = "Buy the Amazon Company: $" + Math.round(amazonPrice)+ "(Your Goal)";
   bps.textContent = "Bread per Second: " + CPS;
   Afforability();

       if (chungies >= 1){
      chungiesOwned = "  Owned: " + chungies;
      chungieBPS = ",  1 BPS,"  ;
    }
       if (toasters >= 1){
      toastersOwned = "  Owned: " + toasters;
      toasterBPS  = ", 10 BPS,";
    }
     if (bakeries >= 1){
      bakeriesOwned = "  Owned: " + bakeries;
      bakeryBPS = ", 20 BPS,";
    }
    if (robots >= 1){
      robotsOwned =  "  Owned: " + robots;
      robotBPS = ",  60 BPS,";
    }
    if (craftingTables >= 1){
      craftingTablesOwned = "  Owned: " + craftingTables;
      craftingTableBPS = ", 250 BPS,";
    }
    if (villagers >= 1){
      villagersOwned = "  Owned: " + villagers;
      villagerBPS = ", 1000 BPS,";
    }
    if (commandBlocks >= 1){
      commandBlocksOwned = "  Owned: " + commandBlocks;
      commandBlockBPS = ", 6400 BPS,";
    }
    if (magicalBreadMachine >= 1){
      magicalBreadMachineOwned = "  Owned: " + magicalBreadMachine;
      magicalBreadMachineBPS = ", 1200 BPS,";
    }
    if (amazons >= 1){
      amazonsOwned = "  Owned: " + amazons;
      amazonBPS = ", 99990 BPS,";
    }
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
    toasters ++;
    toasterPrice = toasterPrice * 1.15;
    update();
  }
}
function bakeryBuy(){
  if (bread >= bakeryPrice){
    bread = bread - bakeryPrice;
    bakeries++;
    bakeryPrice = bakeryPrice * 1.15;
    update();
  }
}
function robotBuy(){
  if (bread >= robotPrice){
    bread = bread - robotPrice;
    robots++;
    robotPrice = robotPrice * 1.15;
    update();
  }
}
function craftingTableBuy(){
  if (bread >= craftingTablePrice){
    bread = bread - craftingTablePrice;
    craftingTables++;
    craftingTablePrice = craftingTablePrice * 1.15;
    update();
  }
}
function VillagerBuy(){
  if (bread >= villagersPrice){
    bread = bread - villagersPrice;
    villagers++;
    villagersPrice = villagersPrice * 1.15;
    
    update();
  }
}
function commandBlockBuy(){
  if (bread >= commandBlockPrice){
    bread = bread - commandBlockPrice;
    commandBlocks++;
    commandBlockPrice = commandBlockPrice * 1.15;
    update();
  }
}
function magicalBreadMachineBuy(){
  if (bread >= magicalBreadMachinePrice){
    bread = bread - magicalBreadMachinePrice;
    magicalBreadMachine++; 
    magicalBreadMachinePrice = magicalBreadMachinePrice * 1.15;
    update();
  }
}
function amazonBuy(){
  if (bread >= amazonPrice){
    bread = bread - amazonPrice;
    amazons++;
    amazonPrice = amazonPrice * 1.15;
    update();
  }
}

function testingBtn(){
  //testing btn so I can test all the items easier
  var debug = prompt("what variable do you wanna test?");
  if (window.hasOwnProperty(debug)){
    var newValue = prompt("What would like to change the value of " + debug + " to?")
    var numValue = Number(newValue);
    if (!isNaN(numValue)){
      window[debug] = numValue;
      alert(debug + " changed to " + numValue);
      update();
    } else {
      alert("Enter a valid number")
    }
  } else{
    alert("Not a valid variable for testing");
  }
} 
//I gotta add some more stuff to this soon

function Afforability(){
  const prices = {
    "1": chungiePrice,
    "2": toasterPrice,
    "3": bakeryPrice,
    "4": robotPrice,
    "5": craftingTablePrice,
    "6": casinoPrice,
    "7": villagersPrice,
    "8": commandBlockPrice,
    "9": magicalBreadMachinePrice,
    "10":snakeGamePrice,
    "11":amazonPrice
  };
  for (const id in prices){
    document.getElementById(id).disabled = bread < prices[id];
  }
}

loadFromLocalStorage();
update();
//yay! this actually works!



/*
todo: 
Add sound effects and music. 
Add achievements and goals. 
Add more graphics and animations.  
Add a mobile-friendly layout.
add updgrades and cool stuff(Lowk probably with crafting table)
*/

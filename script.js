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
var casinoUnlock = false;
var breadSprite;
var clickedAmount;
var ChungiePriceText = document.getElementById("1");
var ToasterPriceText = document.getElementById("2");
var BakeryPriceText  = document.getElementById("3");
var RobotPriceText = document.getElementById("4");
var CraftingTablePriceText = document.getElementById("5");
var CasinoPriceText = document.getElementById("6")
var VillagerPriceText = document.getElementById("7");
var CommandBlockPriceText  = document.getElementById("8");
var MagicBreadPriceText = document.getElementById("9");
var AmazonPriceText = document.getElementById("11");
var CPS = 0;
var cool = false;
var bps = document.getElementById("BPS");
var password = "Terra123";
var pass = false;

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
casinoBTN = document.getElementById("6");
casinoBTN.onclick = gambling;
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

const menuBtn = document.getElementById("menuBtn");
const menuPanel = document.getElementById("menuPanel");
const saveArea = document.getElementById("saveArea");
const loadArea = document.getElementById("loadArea");
const saveCode = document.getElementById("saveCode");
const loadCode = document.getElementById("loadCode");
const loadMsg= document.getElementById("loadMsg");

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
const countKeys =["chungies", "toasters", "bakeries", "robots", "craftingTables", "villagers", "commandBlocks", "magicalBreadMachine", "amazons" ];
function getState(){
  return {v:2, bread, chungies, toasters, bakeries, robots, craftingTables, villagers, commandBlocks, magicalBreadMachine, amazons, casinoUnlock};
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
  casinoUnlock = s.casinoUnlock == true;
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
       + magicalBreadMachine * 120000
       + amazons * 999999
}

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
  bread += magicalBreadMachine * 1200.00;
  bread += amazons * 9999.99;
  update();
}, 10); //made the numbers update more often

function update(){
   recalcCPS();
   recalcPrices();
   if (bread < 0 || isNaN(bread) ){
    bread = 0;
   }
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
   CasinoPriceText.textContent = casinoUnlock? "Go to the Casino" : "Unlock the Casino: $" + Math.round(casinoPrice); 
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
      magicalBreadMachineBPS = ", 120000 BPS,";
    }
    if (amazons >= 1){
      amazonsOwned = "  Owned: " + amazons;
      amazonBPS = ", 999999 BPS,";
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
function askBet(note){
  var rawBet = prompt("How much would you like to bet?" + (note || ""));
  if (rawBet == null) return null;
  var bet = Number(rawBet);
  if(rawBet.trim() == "" || !Number.isFinite(bet) || bet <= 0){
    alert("Enter a bet above 0.")
    return null;
  }
  if (bet > bread){
    alert("You can't bet more than you have silly!")
    return null;
  }
  return bet;
}

function roulette(){
  var rouletteType = prompt("What would you like to bet on? \n Color: Returns 2x (1) \n Number: Returns 36x (2)");
  if (rouletteType == null) return;

  var bet;
  var rouletteResult = Math.floor(Math.random() * 37);   // 0-36

  if (rouletteType == "1"){
    var rouletteColor = prompt("What color would you like to bet on? \n Red (1) \n Black (2)");
    if (rouletteColor != "1" && rouletteColor != "2"){
      if (rouletteColor != null) alert("Enter 1 or 2");
      return;
    }
    bet = askBet();
    if (bet == null) return;

    var resultText;
    var resultColor;
    if (rouletteResult == 0){ resultText = "Green"; resultColor = 0; }
    else if (rouletteResult % 2 == 0){ resultText = "Red"; resultColor = 1; }
    else { resultText = "Black"; resultColor = 2; }

    if (resultColor == rouletteColor){
      alert("Rolled " + resultText + "! You win " + bet + " bread!");
      bread += bet;
    } else {
      alert("Rolled " + resultText + ": You lose " + bet + " bread!");
      bread -= bet;
    }

  } else if (rouletteType == "2"){
    var rawNumber = prompt("What number would you like to bet on? 0-36");
    if (rawNumber == null) return;
    var rouletteNumber = Number(rawNumber);
    if (rawNumber.trim() == "" || !Number.isInteger(rouletteNumber) || rouletteNumber < 0 || rouletteNumber > 36){
      alert("Enter a whole number from 0-36");
      return;
    }
    bet = askBet();
    if (bet == null) return;

    if (rouletteResult == rouletteNumber){
      alert("You win! You get " + (bet * 36) + " bread :)");
      bread += bet * 36;
    } else {
      alert("Rolled a " + rouletteResult + ": You lose " + bet + " bread :(");
      bread -= bet;
    }

  } else {
    alert("Enter 1 or 2");
    return;
  }
  update();
}

function dice(){
  var diceNum = prompt("What number would you like to bet on? (1-6)")
  diceNum = Number(diceNum);
  if (diceNum >=1 && diceNum <= 6){
    var bet = askBet("(5.5x Multiplier)");
    if (bet == null) return;
    diceResult = Math.floor(Math.random() * 6) + 1;
    if (diceNum == diceResult) {
      bet *=  5.5;
      alert("Die Rolled a " + diceResult + ", You Win: " + bet + " bread :)");
      bread += bet;
    } else {
      alert("Die Rolled a " + diceResult + ", You Lose: " + bet + " bread :(");
      bread -= bet;
    }
  } 
}
function coinFlip(){
  var coinNum = prompt("Heads(1) or Tails(0)?")
  if (coinNum !="1" && coinNum !="0"){
    if (coinNum != null) alert("Enter either 1 or 0")
       return;
  }
    coinNum = Number(coinNum);
    var bet = askBet("(2x Multiplier)");
    if (bet == null) return;

    var coinResult = Math.floor(Math.random() * 2);
    if (coinResult == 1){
      var coinResultText = "Heads";
    } else {
      var coinResultText = "Tails";
    }

    if(coinResult == coinNum){
      alert("Flipped a " + coinResultText + ", You Win: " + bet + " bread :)");
      bread += bet;
    } else {
      alert("Flipped a " + coinResultText + ", You Lose: " + bet + " bread :(")
      bread -= bet;
    }
  }


function gambling()  {
  if (bread >= casinoPrice && !casinoUnlock){
    //I will be changing this and making it better lol
    //this is only temporary
    casinoUnlock = true;
    bread -= casinoPrice;
  } else if (casinoUnlock){
    var gambleType = prompt("What would you like to gamble on? \n Roulette (1) \n Dice (2) \n Coin Flip (3)");
    if (gambleType == null) return;
    if (gambleType == "1"){
      roulette();
    } else if (gambleType == "2"){
      dice();
    } else if (gambleType == "3") {
      coinFlip();
    } else {
      alert("Please enter a number from 1 - 3")
      gambling();
    }
  
  }
}

function secretPassword(){
  //bro really made the most useless function of 2026, lol
 
  var passInput = prompt("What's the Secret Password?")
  
  if (passInput == password || cool == true){
    pass = true;
  } else {
    alert("Wrong Password Buddy!")
  }
}
function testingBtn(){
  secretPassword();
  if (pass = true){
    var debug = prompt("What would you like to test?")
    if (debug == "var"){
      variableTest();
    } else if (debug == "function"){
      functionTest();
    }
  }
}
function functionTest(){
  var functTest = prompt("What function to test?")
  if (functTest == null) return;
  functTest = functTest.trim();
  if (typeof window[functTest] == "function"){
    window[functTest]();
    update();
  }else{
    alert("Not a function!")
  }
}

function variableTest(){
  //testing btn so I can test all the items easier
  var varTest = prompt("what variable do you wanna test?");
  if (window.hasOwnProperty(varTest)){
    var newValue = prompt("What would like to change the value of " + varTest + " to?")
    var numValue = Number(newValue);
    if (!isNaN(numValue)){
      window[varTest] = numValue;
      alert(varTest + " changed to " + numValue);
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
    const btn = document.getElementById(id);
    if (!btn) continue;
    if (id == "6" && casinoUnlock){
      btn.disabled = false;
    } else{
      btn.disabled = bread < prices[id];
    }
  }
}

loadFromLocalStorage();
update();
//yay! this actually works!



/*
todo: 
finish the casino minigame(basic functionality for now). ✓
Add sound effects and music. 
Add achievements and goals. 
Add more graphics and animations.  
Add a mobile-friendly layout.
add updgrades and cool stuff(Lowk probably with crafting table)
*/

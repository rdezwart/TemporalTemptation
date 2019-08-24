// ----Objects---- //

var gameData = {
    time: 0,
    
    money: 0,
    debt: 0,
    borrowAmount: 10,
    
    producers: 0,
    producerCost: 10,
    production: 0
};

// ----Functions---- //

function borrow() {
    gameData.money += gameData.borrowAmount;
    gameData.debt += gameData.borrowAmount;
}

function buy() {
    if (gameData.money >= gameData.producerCost) {
        gameData.money -= gameData.producerCost;
        
        gameData.producers += 1;
        gameData.production += 1;
        gameData.producerCost *= 1.5;
    }
}

// ----Loops---- //

var tick = window.setInterval(function () {
    $("#time").text("Time: " + gameData.time);

    $("#balance").text("Balance: $" + gameData.money);
    $("#debt").text("Debt: $" + gameData.debt);
    $("#borrow").text("Borrow: $" + gameData.borrowAmount);
    
    $("#producers").text("Producers: " + gameData.producers);
    $("#buy").text("Buy Producer: $" + gameData.producerCost);
}, 10);

var time = window.setInterval(function () {
    gameData.time += 1;
    
    gameData.money += gameData.production;
}, 1000);

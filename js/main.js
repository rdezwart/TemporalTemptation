// ----Main---- //


function init() {
    if (debug) console.log("Init");

    addDebt(newDebt(0, 0));
}


// ----Data---- //


var gameData = {
    time: 0,
    autoTime: true,

    money: 0,
    debt: [],
    totalDebt: 0,
    borrowAmount: 10,
    interest: 1.1,

    producers: 0,
    producerCost: 10,
    production: 0,
    
    clockyWealth: 0
};

var debug = true;


// ----Helpers---- //


function getDebt(index, type) {
    var ret;
    var isDebt = gameData.debt.length != 0;

    if (type === 'string') {
        ret = "Debt: $" + ((isDebt) ? gameData.debt[index].amount : 0).toFixed(2) + " | Due: " + ((isDebt) ? gameData.debt[index].due : 0).toFixed(2);
    } else if (type === 'object') {
        ret = ((isDebt) ? gameData.debt[index] : null);
    }

    return ret;
}

function newDebt(_amount, _due) {
    var newDebt = {
        amount: _amount * gameData.interest,
        due: gameData.time + _due
    };

    return newDebt;
}

function addDebt(_debt) {
    gameData.debt.push(_debt);
}


// ----Functions---- //


function toggleTime() {
    gameData.autoTime = !gameData.autoTime;
}

function addTime() {
    timeLoop('manual');
}

function borrow() {
    gameData.money += gameData.borrowAmount;

    addDebt(newDebt(gameData.borrowAmount, 10));
}

function debtCheck() {
    if (gameData.debt.length > 0) {
        // totalDebt calculations
        gameData.totalDebt = 0;
        for (var i = 0; i < gameData.debt.length; i++) {
            gameData.totalDebt += getDebt(i, 'object').amount;
        }

        // sort debt array
        gameData.debt.sort(function (a, b) {
            return a.due - b.due;
        });

        // check for due debts 
        var curDebt = getDebt(0, 'object');

        if (curDebt.due === gameData.time) {
            gameData.money -= curDebt.amount;

            gameData.debt.shift();
        }
    } else {
        gameData.totalDebt = 0;
    }

}

function buy() {
    if (gameData.money >= gameData.producerCost) {
        gameData.money -= gameData.producerCost;

        gameData.producers += 1;
        gameData.production += 0.5;
        gameData.producerCost *= 1.5;
    }
}

function updateText() {
    $("#time").text("Time: " + gameData.time);
    $("#autoTime").text("Auto Time: " + gameData.autoTime);

    $("#balance").text("Balance: $" + gameData.money.toFixed(2));
    $("#production").text("Production: $" + gameData.production.toFixed(2));
    $("#debt").text("Latest " + getDebt(gameData.debt.length - 1, 'string'));
    $("#totalDebt").text("Total Debt: $" + gameData.totalDebt.toFixed(2));
    $("#borrow").text("Borrow: $" + gameData.borrowAmount.toFixed(2));

    $("#producers").text("Producers: " + gameData.producers);
    $("#buy").text("Buy Producer: $" + gameData.producerCost.toFixed(2));
}


// ----Loops---- //

$(document).ready(function () {
    if (debug) console.log("Ready");

    init();

    if (debug) console.log("Loops Started");
    var tick = window.setInterval(tickLoop, 10, 'interval');
    var time = window.setInterval(timeLoop, 1000, 'interval');
});

function tickLoop(source) {
    debtCheck();

    updateText();
}

function timeLoop(source) {
    if (source === 'interval' && !gameData.autoTime) {
        return;
    }

    gameData.time += 1;
    gameData.money += gameData.production;
}

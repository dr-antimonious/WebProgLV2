"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var process = require("process");
// How much money the user has
var walletAmount = 0;
// User's cart
var cart = [];
// Available items
var items = [
    {
        name: 'apple',
        price: 1.99,
    },
    {
        name: 'banana',
        price: 10,
    },
];
// Generic function for retrieving an item "from the shelf"
function getItem(itemName) {
    var item;
    try {
        var index = items.findIndex(function (item) { return item.name === itemName; });
        item = items[index];
    }
    catch (err) {
        console.error(err);
        return null;
    }
    return item;
}
function addToCart(itemName, amount) {
    var item = getItem(itemName);
    if (item == null) {
        console.log("Unknown item.");
        return false;
    }
    var cartIndex;
    if ((cartIndex = cart.findIndex(function (item) { return item.name === itemName; })) !== -1) {
        cart[cartIndex].amount += amount;
    }
    else {
        cart.push({ name: item.name, price: item.price, amount: amount });
    }
    return true;
}
function removeFromCart(itemName, amount) {
    var item = getItem(itemName);
    if (item == null) {
        console.log("Unknown item.");
        return false;
    }
    var cartIndex;
    if ((cartIndex = cart.findIndex(function (item) { return item.name === itemName; })) !== -1) {
        if (cart[cartIndex].amount < amount) {
            console.log("Invalid amount to be removed.");
            return false;
        }
        else if (cart[cartIndex].amount === amount) {
            cart.splice(cartIndex, 1);
        }
        else {
            cart[cartIndex].amount -= amount;
        }
        return true;
    }
    else {
        console.log("Item not in cart.");
        return false;
    }
}
function viewCart() {
    cart.forEach(function (item) { return console.log(item); });
}
function topUp(amount) {
    walletAmount += amount;
    console.log("New balance: ", walletAmount);
}
function checkBalance() {
    console.log(walletAmount);
}
function buy(itemName) {
    var item = getItem(itemName);
    if (item == null) {
        console.log("Unknown item.");
        return false;
    }
    console.log("Buying ".concat(item.name, " with price ").concat(item.price));
    if (item.price > walletAmount) {
        console.log('Not enough money');
        return false;
    }
    return true;
}
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
console.log("Store");
rl.prompt();
rl.on('line', function (line) {
    var split = line.toLowerCase().split(' ');
    var command = split[0];
    var args = split.slice(1);
    switch (command) {
        case 'add':
            addToCart(args[0], Number(args[1]));
            break;
        case 'balance':
            checkBalance();
            break;
        case 'topup':
            topUp(Number(args[0]));
            break;
        case 'cart':
            viewCart();
            break;
        case 'buy':
            buy(args[0]);
            break;
        case 'remove':
            removeFromCart(args[0], Number(args[1]));
            break;
        default:
            console.log("Unknown action: '".concat(command, "'."));
            console.log("Use 'help' for a list of all acceptable actions.");
    }
    rl.prompt();
}).on('close', function () {
    console.log('Exit');
    process.exit(0);
});

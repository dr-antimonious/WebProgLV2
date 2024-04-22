"use strict";

import readline = require('readline');
import process = require('process');

// How much money the user has
let walletAmount : number = 0;

// User's cart
let cart : {name:string, price:number, amount:number}[] = [];

// Available items
let items : {name:string, price:number}[] = [
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
function getItem(itemName: string) : {name: string, price:number} | null {
    let item : {name:string, price:number};
    try{
        const index:number = items.findIndex((item : {name:string, price:number}) : boolean => item.name === itemName);
        item = items[index];
    }
    catch (err){
        console.error(err);
        return null;
    }
    return item;
}

function addToCart(itemName:string, amount:number) : boolean {
    const item : {name:string, price:number} | null = getItem(itemName);
    if (item == null) {
        console.log("Unknown item.");
        return false;
    }

    let cartIndex : number;
    if ((cartIndex = cart.findIndex((item : {name:string, price:number}) : boolean => item.name === itemName)) !== -1) {
        cart[cartIndex].amount += amount;
    }
    else {
        cart.push({name: item.name, price: item.price, amount: amount});
    }

    return true;
}

function removeFromCart(itemName:string, amount:number) : boolean {
    const item : {name:string, price:number} | null = getItem(itemName);
    if (item == null) {
        console.log("Unknown item.");
        return false;
    }

    let cartIndex : number;
    if ((cartIndex = cart.findIndex((item : {name:string, price:number}) : boolean => item.name === itemName)) !== -1) {
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

function viewCart() : void {
    cart.forEach(item => console.log(item));
}

function clearCart() : void {
    cart.forEach(_ => cart.pop());
}

// Increase balance
function topUp(amount: number) : void {
    walletAmount += amount;
    console.log("New balance: ", walletAmount);
}

function checkBalance() : void {
    console.log(walletAmount);
}

function buy(itemName: string) : boolean {
    const item:{name:string, price:number} | null = getItem(itemName);
    if (item == null) {
        console.log("Unknown item.");
        return false;
    }
    console.log(`Buying ${item.name} with price ${item.price}`);

    if (item.price > walletAmount) {
        console.log('Not enough money');
        return false;
    }

    return true;
}

const rl:readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("Store");
rl.prompt();
rl.on('line', (line:string):void => {
    const split:string[] = line.toLowerCase().split(' ');
    const command:string = split[0];
    const args:string[] = split.slice(1);

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
        case 'clear':
            clearCart();
            break;
        case 'buy':
            buy(args[0]);
            break;
        case 'remove':
            removeFromCart(args[0], Number(args[1]));
            break;
        default:
            console.log(`Unknown action: '${command}'.`);
            console.log("Use 'help' for a list of all acceptable actions.")
    }

    rl.prompt();
}).on('close', ():void => {
    console.log('Exit');
    process.exit(0);
});
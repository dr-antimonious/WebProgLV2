"use strict";

// const - constant (immutable)
// let - variable (mutable)
// require() - import
// console.log() - print

const readline = require('readline');
const process = require('process');

let walletAmount = 1.5;

// (Almost all) JavaScript types:
// - number (const a = 1;)
// - string (const a = 'abc';)
// - boolean (const a = true;)
// - object (const a = { name: 'abc', age: 1 };)
// - array (const a = [1, 2, 3];)

let items = [
    {
        name: 'Apple',
        price: 1.99,
    },
    {
        name: 'Banana',
        price: 10,
    },
];

function buy(itemName) {
    const index = items.findIndex((item) => item.name === itemName);
    const item = items[index];
    // string interpolation - `${variable}` (backticks, not single quotes)
    // equivalent of %s in C printf (or %d, %f, etc.)
    console.log(`Buying ${item.name} with price ${item.price}`);

    if (item.price > walletAmount) {
        console.log('Not enough money');
        return;
    }
}

function removeFromCart(itemName) {
    console.log(`Removing from cart ${itemName}`);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("Store");
rl.prompt();

// (argument) => { body } - arrow function
// higher-order function, equivalent of delegate in C#
// rl.on('line', (line) => { ... }) registers a function to 
// get called when the user enters a line
rl.on('line', (line) => {
    const split = line.split(' '); // 'buy Apple' => ['buy', 'Apple']
    const command = split[0];
    const args = split.slice(1); // Rest of the array. (['Apple'])
    console.log(`Command: ${command}`);
    console.log(`Args: ${args}`);

    switch (command) {
        case 'buy':
            buy(args[0]);
            break;
        case 'remove':
            removeFromCart(args[0]);
            break;
        default:
            console.log(`Unknown command: ${command}`);
    }

    rl.prompt();
}).on('close', () => {
    console.log('Exit');
    process.exit(0);
});
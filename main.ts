"use strict";

import readline = require('readline');
import process = require('process');

// Defining necessary types

type Type = {name: string, price: number};
type Item = {name: string, price: number, amount: number};
type TypeArray = Type[];
type ItemArray = Item[];

// How much money the user has
let walletAmount : number = 0;

// User's cart (the items the user intends to purchase)
let cart: ItemArray = [];

// User's bag (the items the user already purchased)
let bag: ItemArray = [];

// "Shelf" (the types of items available for purchase)
const items: TypeArray = [
    { name: "apple", price: 2.49 },
    { name: "banana", price: 1.99 },
    { name: "orange", price: 3.79 },
    { name: "grape", price: 4.29 },
    { name: "pineapple", price: 3.99 },
];

// Help strings

const addToCartHelpStrings: string[] = ["command: add",
                                        "usage: add [<type> | h] [<amount>]",
                                        "Adds items to your cart.",
                                        "type - Type of item to be added to cart (find available types using the 'shelf' command)",
                                        "amount - Amount of items of the type to be added to cart"];
const viewBagHelpStrings: string[] = ["command: bag",
                                      "usage: bag [h]",
                                      "Displays the contents of your bag (the items you already purchased)."];
const checkBalanceHelpStrings: string[] = ["command: balance",
                                           "usage: balance [h]",
                                           "Displays the current balance of your wallet."];
const buyHelpStrings: string[] = ["command: buy",
                                  "usage: buy [h]",
                                  "Purchase the items in your cart."];
const viewCartHelpStrings: string[] = ["command: cart",
                                       "usage: cart [h]",
                                       "Displays the contents of your cart (the items you intend to purchase)."];
const clearCartHelpStrings: string[] = ["command: clear",
                                        "usage: clear [h]",
                                        "Removes all items from your cart."];
const removeFromCartHelpStrings: string[] = ["command: remove",
                                             "usage: remove [<type> | h] [<amount>]",
                                             "Removes items to your cart.",
                                             "type - Type of item to be removed from cart (find available types using the 'cart' command)",
                                             "amount - Amount of items of the type to be removed from cart"];
const viewShelfHelpStrings: string[] = ["command: shelf",
                                        "usage: shelf [h]",
                                        "Displays the contents of the shelf (the types of items available for purchase)."];
const topUpHelpStrings: string[] = ["command: topup",
                                    "usage: topup [<amount> | h]",
                                    "Increases the balance of your wallet by the passed amount."];

/**
 * Checks if an argument `arg` passed to a method that called {@link isHelpRequest} indicates a help request.
 *
 * @remarks
 * This method is not user-accessible. It is utilized by {@link addToCart}, {@link buy}, {@link checkBalance},
 * {@link clearCart}, {@link removeFromCart}, {@link topUp}, {@link viewBag}, {@link viewCart}, {@link viewShelf}.
 *
 * @param helpStrings - The help messages to be output using {@link Console#log|Console.log}.
 * @param arg - The argument to be checked.
 *
 * @returns `true` if `arg` indicates a help request, `false` otherwise.
 */
function isHelpRequest(helpStrings: string[], arg?: string): boolean {
    if (arg === "h") {
        helpStrings.forEach(str => console.log(str));
        return true;
    }

    return false;
}

/**
 * Displays the contents of the given array.
 *
 * @remarks
 * This method is not user-accessible. It is utilized by {@link viewCart} and {@link viewBag}.
 *
 * @param array - The array whose contents will be displayed.
 * @param arrName - The user-understandable name of the array.
 */
function printContents(array: ItemArray, arrName: string): void {
    console.log(`Contents of your ${arrName}:`);
    let totalPrice: number = 0;
    array.forEach(item => {
        const tempPrice: number = item.price * item.amount;
        console.log(`${`${item.amount}x ${item.name} (${item.price} each)`.padEnd(process.stdout.columns / 4, " ")} = ${tempPrice.toFixed(2).padStart(6, " ")}`);
        totalPrice += tempPrice;
    });
    console.log(`The total price of the items in your ${arrName} is`.padEnd(process.stdout.columns / 4, " "), totalPrice.toFixed(2).padStart(8, " "));
}

/**
 * Checks the validity of the call of a possibly-destructive argument-less method.
 *
 * @remarks
 * This method is not user-accessible. It is utilized by {@link clearCart} and {@link buy}.
 *
 * @param arg - The argument to be checked.
 *
 * @returns `true` if `arg` is `undefined`, `false` otherwise.
 */
function isValidArglessCall(arg?: string): boolean {
    if (arg !== undefined) {
        console.log(`Unrecognized argument '${arg}'.`);
        console.log("This action does not take arguments.");
        console.log("To view a list of available actions, execute command 'help'.");
        return false;
    }

    return true;
}

/**
 * Attempts to find an item in an array using {@link Array#findIndex|Array.findIndex}.
 *
 * @remarks
 * This method is not user-accessible. It is utilized by {@link getItem}, {@link addToCart}, {@link removeFromCart}, and {@link buy}.
 *
 * @param array - The array to be searched.
 * @param itemName - The name of the item to be found.
 *
 * @returns Index of the item in the array, `-1` if the item is not present in the array.
 */
function findItemInArray(array: TypeArray | ItemArray, itemName: string): number {
    return array.findIndex((item: Type): boolean => item.name === itemName);
}

/**
 * Checks if an `array` is empty.
 *
 * @remarks
 * This method is not user-accessible. It is utilized by {@link viewCart}, {@link viewBag}, and {@link buy}.
 *
 * @param array - The array to be checked.
 * @param arrName - The user-understandable name of the array.
 *
 * @returns `true` if the `array.length` is zero, `false` otherwise.
 */
function isArrayEmpty(array: ItemArray, arrName: string): boolean {
    if (array.length === 0) {
        console.log(`Your ${arrName} is empty.`);
        return true;
    }

    return false;
}

/**
 * Checks the validity of the item count/`amount`.
 *
 * @remarks
 * This method is not user-accessible. It is utilized by {@link baseCartAction}.
 *
 * @param amount - The amount of items of the same type the user is attempting to add to their cart.
 *
 * @returns `true` if the `amount` is an integer greater than zero, and is not `NaN` or `undefined`, `false` otherwise.
 */
function isAmountValid(amount?: number): boolean {
    if (amount === undefined || amount <= 0 || Number.isNaN(amount) || !Number.isInteger(amount)) {
        console.log(`Invalid amount: '${amount}'.`);
        console.log("Amount must be an integer larger than or equal to 1.")
        return false;
    }

    return true;
}

/**
 * Checks the validity of the wallet top-up `amount`.
 *
 * @remarks
 * This method is not user-accessible. It is utilized by {@link topUp}.
 *
 * @param amount - The amount of money the user is attempting to add to their wallet.
 *
 * @returns `true` if the `amount` is greater than zero and is not `NaN`, `false` otherwise.
 */
function isWalletValid(amount: number): boolean {
    if (amount <= 0 || Number.isNaN(amount)) {
        console.log(`Invalid top-up amount: '${amount}'.`);
        console.log("Top-up must be a number larger than 0.")
        return false;
    }

    return true;
}

/**
 * Gets an item from the list of available items.
 *
 * @remarks
 * This method is not user-accessible. It is utilized by {@link baseCartAction}.
 *
 * @param itemName - The name of the requested item.
 *
 * @returns The requested item or `null` if it does not exist.
 */
function getItem(itemName: string): Type | null {
    let itemIndex: number;
    if ((itemIndex = findItemInArray(items, itemName)) === -1) {
        console.log(`Invalid item: '${itemName}'.`);
        console.log("To view a list of available items, execute command 'shelf'.");
        return null;
    }

    return items[itemIndex];
}

/**
 * Attempts to get the requested item using {@link getItem} and checks validity of the `amount` using {@link isAmountValid}.
 *
 * @remarks
 * This method is not user-accessible and is used as a base method of the {@link addToCart} and {@link removeFromCart} methods.
 *
 * @param itemName - The name of the type of items an action is being performed on.
 * @param amount - The amount of items the action is being performed on.
 *
 * @returns The requested item or `null` if it does not exist or if the amount is not a valid amount per {@link isAmountValid}.
 */
function baseCartAction(itemName: string, amount?: number): Type | null  {
    const item: Type | null = getItem(itemName);
    return isAmountValid(amount) ? item : null;
}

/**
 * Attempts to add items to the user's cart.
 *
 * @param itemName - The name of the type of items being added to the cart.
 * @param amount - The amount of items being added to the cart.
 *
 * @returns `true` if the items were successfully added to the cart, `false` otherwise.
 */
function addToCart(itemName: string, amount?: number): boolean {
    if (isHelpRequest(addToCartHelpStrings, itemName)) return false;

    const item: { name: string; price: number } | null = baseCartAction(itemName, amount);
    if (item === null || amount === undefined) return false;

    let cartIndex: number;
    if ((cartIndex = findItemInArray(cart, itemName)) !== -1) {
        cart[cartIndex].amount += amount;
    }
    else {
        cart.push({name: item.name, price: item.price, amount: amount});
    }
    console.log(`Added ${amount} ${itemName} to cart.`);
    return true;
}

/**
 * Attempts to remove items from the user's cart.
 *
 * @param itemName - The name of the type of items being removed from the cart.
 * @param amount - The amount of items being removed from the cart.
 *
 * @returns `true` if the items were successfully removed from the cart, `false` otherwise.
 */
function removeFromCart(itemName: string, amount?: number): boolean {
    if (isHelpRequest(removeFromCartHelpStrings, itemName)) return false;

    const item: { name: string; price: number } | null = baseCartAction(itemName, amount);
    if (item === null || amount === undefined) return false;

    let cartIndex: number;
    if ((cartIndex = findItemInArray(cart, itemName)) !== -1) {
        if (cart[cartIndex].amount < amount) {
            console.log(`Invalid amount '${amount}' to be removed.`);
            console.log(`There are '${cart[cartIndex].amount}' '${cart[cartIndex].name}' in your cart.`);
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
        console.log(`Item '${itemName}' not in cart.`);
        console.log("To view the contents of your cart, execute command 'cart'.")
        return false;
    }
}

/**
 * Displays the contents of the user's cart (the items the user intends to purchase).
 *
 * @param arg - If the `arg` equals `"h"` the call is interpreted as a help request, otherwise `arg` is ignored.
 */
function viewCart(arg: string): void {
    if (isHelpRequest(viewCartHelpStrings, arg)) return;
    if (isArrayEmpty(cart, 'cart')) return;
    printContents(cart, 'cart');
}

/**
 * Displays the contents of the user's bag (the items the user already purchased).
 *
 * @param arg - If the `arg` equals `"h"` the call is interpreted as a help request, otherwise `arg` is ignored.
 */
function viewBag(arg?: string): void {
    if (isHelpRequest(viewBagHelpStrings, arg)) return;
    if (isArrayEmpty(bag, 'bag')) return;
    printContents(bag, 'bag');
}

/**
 * Displays the contents of the "shelf" (the types of items available for purchase).
 *
 * @param arg - If the `arg` equals `"h"` the call is interpreted as a help request, otherwise `arg` is ignored.
 */
function viewShelf(arg: string): void {
    if (isHelpRequest(viewShelfHelpStrings, arg)) return;
    console.log("Types of items on the shelf:");
    items.forEach(item => {
        console.log(`${item.name} (${item.price} each)`);
    });
}

/**
 * Removes all items from the user's cart.
 *
 * @param arg - If the `arg` equals `"h"` the call is interpreted as a help request, if `arg` equals `undefined`
 * clearing is performed, otherwise the call is interpreted as invalid.
 */
function clearCart(arg?: string): void {
    if (isHelpRequest(clearCartHelpStrings, arg)
        || !isValidArglessCall(arg))
        return;

    cart = [];
}

/**
 * Increases the balance of the user's wallet
 *
 * @param arg - If the `arg` equals `"h"` the call is interpreted as a help request, if `arg` is
 * valid per {@link isWalletValid} the balance is increased, otherwise the call is interpreted as invalid.
 */
function topUp(arg: string): void {
    if (isHelpRequest(topUpHelpStrings, arg)) return;

    const amount = Number(arg);
    if (isWalletValid(amount)) {
        walletAmount += amount;
        console.log(`Your new balance is ${walletAmount.toFixed(2)}.`);
    }
}

/**
 * Displays the balance of the user's wallet.
 *
 * @param arg - If the `arg` equals `"h"` the call is interpreted as a help request, otherwise `arg` is ignored.
 */
function checkBalance(arg: string): void {
    if (isHelpRequest(checkBalanceHelpStrings, arg)) return;
    console.log(`Your current balance is ${walletAmount.toFixed(2)}.`);
}

/**
 * Attempts the purchase of the items in the user's cart.
 *
 * @param arg - If the `arg` equals `"h"` the call is interpreted as a help request, if `arg` is `undefined` the
 * purchase is attempted, otherwise the call is interpreted as invalid.
 */
function buy(arg: string): boolean {
    if (isHelpRequest(buyHelpStrings, arg)
        || !isValidArglessCall(arg)
        || isArrayEmpty(cart, 'cart'))
        return false;

    let cartTotal: number = 0;
    cart.forEach(item => cartTotal += item.price * item.amount);

    if (cartTotal > walletAmount) {
        console.log("Insufficient funds in your account.")
        console.log(`Your current balance is ${walletAmount.toFixed(2)}, but your cart total is ${cartTotal.toFixed(2)}.`);
        return false;
    }

    cart.forEach(item => {
        let bagIndex: number;
        if ((bagIndex = findItemInArray(bag, item.name)) !== -1) {
            bag[bagIndex].amount += item.amount;
        }
        else {
            bag.push({name: item.name, price: item.price, amount: item.amount});
        }
    });

    walletAmount -= cartTotal;
    clearCart();
    viewBag();
    return true;
}

const functions = [addToCart, viewBag, checkBalance, buy, viewCart, clearCart,
    removeFromCart, viewShelf, topUp];

/**
 * Displays the help information.
 */
function help(): void {
    functions.forEach(fun => {
        console.log("-".repeat(process.stdout.columns / 2));
        fun("h");
    });
    console.log("-".repeat(process.stdout.columns / 2));
    console.log("To access help for a specific command, execute it with the 'h' argument (eg. 'add h').");
}

const rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("Welcome to XYZ Store");
console.log("To view a list of available actions, execute command 'help'.");
console.log("To access help for a specific command, execute it with the 'h' argument (eg. 'add h').");

rl.prompt();
rl.on('line', (line: string): void => {
    const split: string[] = line.toLowerCase().split(' ');
    const command: string = split[0];
    const args: string[] = split.slice(1);

    switch (command) {
        case 'add':
            addToCart(args[0], Number(args[1]));
            break;
        case 'bag':
            viewBag(args[0]);
            break;
        case 'balance':
            checkBalance(args[0]);
            break;
        case 'buy':
            buy(args[0]);
            break;
        case 'cart':
            viewCart(args[0]);
            break;
        case 'clear':
            clearCart(args[0]);
            break;
        case 'help':
            help();
            break;
        case 'list':
            help();
            break;
        case 'remove':
            removeFromCart(args[0], Number(args[1]));
            break;
        case 'shelf':
            viewShelf(args[0]);
            break;
        case 'topup':
            topUp(args[0]);
            break;
        default:
            console.log(`Unknown action: '${command}'.`);
            console.log("Use 'help' for a list of all acceptable actions.")
    }

    rl.prompt();
}).on('close', (): void => {
    console.log('Goodbye');
    process.exit(0);
});
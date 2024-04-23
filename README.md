# Node.js shop console app

This is an example console app for a shop, written using [TypeScript](https://www.typescriptlang.org) for [Node.js](https://nodejs.org/en).
An effort was made to improve user experience for users less familiar with CLIs, specifically by:
- creating real-language commands
- writing concise and detailed error messages
- adding useful replies for every successfully executed command

Made using Node.js v21.7.3

## Setup

To set up the project, run the following commands.

```shell
git clone https://github.com/dr-antimonious/WebProgLV2
npm i
```

## Running the app

To run the application, navigate to the root of the project directory in shell, and run the following command.

```shell
npm start
```

## Usage

List of acceptable commands:

- [add](#add)
- [bag](#bag)
- [balance](#balance)
- [buy](#buy)
- [cart](#cart)
- [clear](#clear)
- [exit/quit/leave](#exit)
- [help](#help)
- [remove](#remove)
- [shelf](#shelf)
- [topup](#topup)

Any of the listed commands (except [help](#help) and [exit/quit/leave](#exit)) can be run as shown below to display the help information for that specific command.

```shell
<command> h
```

### add

```shell
add [<type> | h] [<amount>]
```

Adds items to the user's cart.

#### Arguments

type - Type of item to be added to cart (find available types using the [shelf](#shelf) command).

amount - Amount of items of the type to be added to cart.

### bag

```shell
bag [h]
```

Displays the contents of the user's bag (the items the user already purchased).

### balance

```shell
balance [h]
```

Displays the current balance of the user's wallet.

### buy

```shell
buy [h]
```

Allows the user to purchase the items in their cart.

### cart

```shell
cart [h]
```

Displays the contents of the user's cart (the items the user intends to purchase).

### clear

```shell
clear [h]
```

Removes all items from the user's cart.

### exit

```shell
[exit | quit | leave]
```

Closes the app. All three commands are equivalent.

### help

```shell
help
```

Displays the help information.

### remove

```shell
remove [<type> | h] [<amount>]
```

Removes items from the user's cart.

#### Arguments

type - Type of item to be removed from cart (find available types using the [shelf](#shelf) command).

amount - Amount of items of the type to be removed from cart.

### shelf

```shell
shelf [h]
```

Displays the contents of the shelf (the types of items available for purchase).

### topup

```shell
topup [<amount> | h]
```

Increases the balance of the user's wallet by the passed amount.

#### Arguments

amount - Amount of 'money' to be added to the user's wallet.
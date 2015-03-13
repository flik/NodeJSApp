# NodeJSApp
NodeJSApp for Credit card processing

This is a very basic application Node.js n mySQL.
 
## Installation
*for newbies : Clone or download zip to your machine then hit this :

	npm install


	You have to manually copy Paypal kit into modules
	https://github.com/paypal/PayPal-node-SDK

## Configuration (database)
app.js

        host: 'localhost',
        user: 'root',
        password : 'root',
        port : 3306, //port mysql
        database:'nodejs'	


	
You're gonna need to create a DB named 'nodejs' and import nodejs.sql

## NOTES
This repo still use Express 3, you might want to upgrade yourself or you can Go here (https://github.com/codetrash/rest-crud) for newest Express 


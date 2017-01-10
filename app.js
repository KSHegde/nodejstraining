console.log('starting password manager');

var storage = require('node-persist');
storage.initSync();

// account.name Facebook
// account.username User12!
// account.password Password123!

function createAccount (account) {
	var accounts = storage.getItemSync('accounts');

	if (typeof accounts === 'undefined') {
		accounts = [];
	}

	accounts.push(account);
	storage.setItemSync('accounts', accounts);

	return account;
}

function getAccount (accountName) {
	var accounts = storage.getItemSync('accounts');
	var matchedAccount;

	accounts.forEach(function (account) {
		if (account.name === accountName) {
			matchedAccount = account;
		}
	});

	return matchedAccount;
}

 createAccount(
 [{
 	name: 'facebook',
 	username: 'someemail@facebook.com',
 	password: 'Password1234!'
 },
 
 {
 	name: 'twitter',
 	username: 'someemail@facebook.com',
 	password: 'Password1234!'
 }]
 
 );

var twitterAccount = getAccount('facebook');
console.log(twitterAccount);
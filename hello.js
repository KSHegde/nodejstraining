console.log('starting password manager');

var storage = require('node-persist');
storage.initSync();

storage.setItemSync('accounts',[{
  username: 'Krishna',
  balance: 1000
},{
  username: 'satya',
  balance: 2000
}]);

var accounts = storage.getItemSync('accounts');

accounts.push({
  username: 'nikhil',
  balance: 3000
});

storage.setItemSync('accounts',accounts);

console.log(accounts);

var storage = require('node-persist');
var crypto = require('crypto-js')
storage.initSync();

var argv = require('yargs')
	.command('create', 'Create data', function (yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Name of the user',
				type: 'string'
			},
			city: {
				demand: true,
				alias: 'ct',
				description: 'city name',
				type: 'string'
			},
			country: {
				demand: true,
				alias: 'cy',
				description: 'country name',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				description: 'Master Password',
				type: 'string'
			}
		}).help('help');
	}).command('get', 'Get data', function (yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Name of the user',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				description: 'Master Password',
				type: 'string'
			}
		}).help('help');
	})


	.help('help')
	.argv;
var command = argv._[0];

function getUsers(masterPassword) {
	// use getItemSync to fetch accounts
	var encryptedUser = storage.getItemSync('users');
	var users = [];

	// decrypt
	if (typeof encryptedUser !== 'undefined') {
		var bytes = crypto.AES.decrypt(encryptedUser, masterPassword);
		users = JSON.parse(bytes.toString(crypto.enc.Utf8));
	}
	return users;
}

function saveUsers (users, masterPassword) {
	// encrypt accounts
	var encryptedUsers = crypto.AES.encrypt(JSON.stringify(users), masterPassword);

	// setItemSync
	storage.setItemSync('users', encryptedUsers.toString());

	// return accounts
	return users;
}


	function createData(user,masterPassword){
		var users = getUsers(masterPassword);
		users.push(user);
    saveUsers(users,masterPassword);
	  return user;
}

function getData (username,masterPassword) {
	var users = getUsers(masterPassword);
	var matcheduser;

	users.forEach(function (user) {
		if (user.name === username) {
			matcheduser = user;
		}
	});

	return matcheduser;
}

if(command === "create")
{
	var createduser = createData({
		name: argv.name,
		city: argv.city,
		country: argv.country},argv.masterPassword);
	console.log('User created!');
	console.log(createduser);
}

else if (command === 'get') {
		try {
	var fetcheduser = getData(argv.name,argv.masterPassword);

	if (typeof fetcheduser === 'undefined') {
		console.log('User not found');
	} else {
		console.log('User found!');
		console.log(fetcheduser);
	}
}
catch(e){
		console.log('Unable to fetch data.');
}
}

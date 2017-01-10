var storage = require('node-persist');
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
			}
		}).help('help');
	}).command('get', 'Get data', function (yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Name of the user',
				type: 'string'
			}
		}).help('help');
	})


	.help('help')
	.argv;
var command = argv._[0];

function createData(user){
	var users = storage.getItemSync('users');

	if (typeof users === 'undefined') {
		users = [];
	}

	users.push(user);
	storage.setItemSync('users', users);

	return user;
}

function getData (username) {
	var users = storage.getItemSync('users');
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
		country: argv.country

	})
	console.log('User created!');
	console.log(createduser);
}

else if (command === 'get') {
	var fetcheduser = getData(argv.name);

	if (typeof fetcheduser === 'undefined') {
		console.log('User not found');
	} else {
		console.log('User found!');
		console.log(fetcheduser);
	}
}

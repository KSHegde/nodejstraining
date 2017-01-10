var argv = require('yargs')
	.command('hello', 'Hello user', function (yargs) {
		yargs.options({
			name: {
				demand: false,
				alias: 'n',
				description: 'Name of the user',
				type: 'string'
			},
			city: {
				demand: false,
				alias: 'ct',
				description: 'city name',
				type: 'string'
			},
			country: {
				demand: false,
				alias: 'cy',
				description: 'country name',
				type: 'string'
			}
		}).help('help');
	})

	.help('help')
	.argv;
var command = argv._[0];

console.log(argv);
if (command === 'hello' && typeof argv.name !=='undefined' && typeof argv.city !=='undefined' && typeof argv.country !=='undefined') {
	console.log('Hello ' + argv.name+" "+argv.city+" "+argv.country);
}

else if(command === 'hello' && typeof argv.name !=='undefined' && typeof argv.city !=='undefined' )
{
	console.log('Hello ' + argv.name+" "+argv.city);
}

else if(command === 'hello' && typeof argv.name !=='undefined' )
{
	console.log('Hello ' + argv.name);
}

else if (command === 'hello') {
	console.log('Hello world!');
}

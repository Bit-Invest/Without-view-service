let phrasesLng = {
	'auth-common': {
		'#1': '© 2019 Cindx',
	},
	'auth-sign-in': {
		'#1': 'Sign In', //title
		'#2': 'Email', //input placeholder
		'#3': 'Password', //input placeholder
		'#4': 'Sign In', //button send
		'#5': 'You do not have an account?',
		'#6': 'Sign Up', //link
		'#7': 'Fill in email',
		'#8': 'Fill in password',
		'#9': 'Incorrect login or password',
		'#10': 'Loading..',
		'#11': '',
		'#12': '',
		'#13': '',
	},
	'auth-sign-up': {
		'#1': 'Sign Up', //title
		'#2': 'Name', //input placeholder
		'#3': 'Last name', //input placeholder
		'#4': 'Email', //input placeholder
		'#5': 'Password', //input placeholder
		'#6': 'Sign Up', //button
		'#7': 'Do you have an account?',
		'#8': 'Sign In', //link
		'#9': 'Fill in Name',
		'#10': 'Fill in Last name',
		'#11': 'Fill in email',
		'#12': 'Fill in password',
		'#13': 'Request failed, try again.',
		'#14': 'Loading...',
		'#15': 'You are registered, you can log in.',
		'#16': '',
		'#17': '',
		'#18': '',
		'#19': '',
		'#20': '',
	},
};

const proxyToEmptyFn = {
	get(target, prop) {
		const ts = target[prop];

		if (typeof ts === 'object') {
			return new Proxy(ts, proxyToEmptyFn);
		}

		return `${ts} +`;
	}
};

let phrasesLngProxy = new Proxy(phrasesLng, proxyToEmptyFn);

export default phrasesLngProxy;
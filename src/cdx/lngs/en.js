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
	},
	'header': {
		'#1': 'Profile',
		'#2': 'Marketplace',
		'#3': 'Log in',
		'#4': 'Sign up',
	},
	'small-product': {
		'#1': 'Rating',
		'#2': 'Rating processing..', //when processing rating
		'#3': 'week',
		'#4': 'month',
		'#5': 'all',
		'#6': 'Followers:',
		'#7': 'Enter product name if you are really going to delete it.', //alert
		'#8': 'more', //button
		'#9': 'manage', //button
		'#10': 'Change options',
		'#10_1': 'Remove',
		'#11': 'description', //input placeholder adit product
		'#12': 'name', //input placeholder adit product
		'#13': 'Save',
		'#14': 'Cancel',
		'#15': 'Select exchange account',
		'#16': 'You have no spare exchange accounts, please create a new account to create a product, and generate an API key for it.',
		'#17': 'description',
		'#18': 'name',
		'#19': 'Add',
		'#20': 'Cancel',
		'#21': 'Public',
		'#22': 'Private',
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
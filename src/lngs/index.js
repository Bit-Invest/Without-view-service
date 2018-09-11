import en from './en'
import ru from './ru'
import zn from './zn'
import ar from './ar'
import de from './de'
import es from './es'
import fr from './fr'
import ja from './ja'
import ko from './ko'
import pt from './pt'
import tr from './tr'
import vi from './vi'

export const objectLangs = {
    en,
	zn,
	ar,
	de,
	es,
	fr,
	ja,
	ko,
	pt,
	tr,
	vi
};

const 
	linkSearch = [], 
	splitSearch = window.location.search.replace('?','').split('&');

for(let i in splitSearch){
	let key_val_split = splitSearch[i].split('=');
	linkSearch[key_val_split[0]] = key_val_split[1];
}

if (linkSearch['loc']) {
	window.localStorage.setItem('loc', linkSearch['loc']);
}

export const list_lngs = 'en zn ar de es fr ja ko pt tr vi';
const user_lng = linkSearch['loc'] || window.localStorage.getItem('loc') || navigator.language || 'en'
const user_loc = user_lng.split('_')[0].split('-')[0]
const loc = ((list_lngs.indexOf(user_loc) !== -1) ? user_loc : 'en')
export const lng =  loc;
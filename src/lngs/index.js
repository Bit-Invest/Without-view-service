import en from './en'

export const objectLangs = {
    en
}

export const list_lngs = 'en'
const user_lng = window.localStorage.getItem('loc') || navigator.language || 'en'
const user_loc = user_lng.split('_')[0].split('-')[0]
const loc = ((list_lngs.indexOf(user_loc) !== -1) ? user_loc : 'en')
export const lng = loc
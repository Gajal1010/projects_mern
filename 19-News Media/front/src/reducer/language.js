export default function(langueCode=["fr", "fr"], action) {
    if(action.type === 'changeLanguage'){
        return action.langue;
    } else {
        return langueCode;
    }
}
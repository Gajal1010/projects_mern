export default function (userToken = '', action){


    if(action.type === 'addToken'){
        return action.token;
    }else if (action.type === 'deleteToken'){
        return action.token;
    } else {
        return userToken;
    }

}
import { combineReducers } from 'redux';

const initialStateProfile = {
    _id: '',
    email: '',
    fullName: '',
    address: '',
    phone: null,
    gender: '',
    profilePic: '',
    isVerified: null,
};

const ProfileReducer = (state = initialStateProfile, action) => {
    if (action.type === 'SET_PROFILE') {
        return {
            ...state,
            ...action.data,
        };
    };

    if (action.type === 'SET_IMAGE') {
        return {
            ...state,
            profilePic: action.url,
        };
    };
    return state;
}

const initialStateAuth = {
    token: '',
};

const AuthReducer = (state = initialStateAuth, action) => {
    if (action.type === 'SET_TOKEN') {
        return {
            ...state,
            token: action.token,
        };
    };
    return state;
}

const initialStateDetail = {
    member: '',
    event: '',
    donation: '',
};

const DetailReducer = (state = initialStateDetail, action) => {
    if (action.type === 'SET_MEMBER') {
        return {
            ...state,
            member: action.member
        };
    };
    if (action.type === 'SET_EVENT') {
        return {
            ...state,
            event: action.event
        };
    };
    if (action.type === 'SET_DONATION') {
        return {
            ...state,
            donation: action.donation
        };
    };
    return state;
};

const reducer = combineReducers({
    ProfileReducer,
    AuthReducer,
    DetailReducer,
})

export default reducer;

// recebe um objeto "data" com todos os dados do profile
export function updateProfileRequest(data){
    return {
        type: '@user/UPDATE_PROFILE_REQUEST',
        payload: { data },
    };
}

export function updateProfileSuccess(profile){
    return {
        type: '@user/UPDATE_PROFILE_SUCCESS',
        payload: { profile },
    };
}

export function updateProfileFailure(){
    return {
        type: '@user/UPDATE_PROFILE_REQUEST',
    };
}

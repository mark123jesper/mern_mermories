import * as api from '../api';

//Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPost();
        dispatch({ type: "FETCH_ALL", payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: "CREATE", payload: data });
    } catch (error) {
        console.log(error.message);
    }
}
// const action = { type: "FETCH_ALL", payload: [] };
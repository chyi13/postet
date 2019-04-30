const edit = {
    state: {
        headers: [],
        params: [],
        newHeaders: [],
        newParams: [],
    },
    mutations: {
        UPDATE_EDIT_HEADERS(state, headers) {
            state.headers = headers;
        },
        UPDATE_EDIT_PARAMS(state, params) {
            state.params = params;
        },
        ADD_NEW_HEADER(state, {key, value}) {
            state.headers.push({
                checked: false,
                key,
                value,
            })
        }
    },
    actions: {
      
    }
};

export default edit;
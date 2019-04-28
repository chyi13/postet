const edit = {
    state: {
        headers: {},
        params: {},
    },
    mutations: {
        UPDATE_EDIT_HEADERS(state, headers) {
            state.headers = headers;
        },
        UPDATE_EDIT_PARAMS(state, params) {
            state.params = params;
        }
    },
    actions: {
        
    }
};

export default edit;
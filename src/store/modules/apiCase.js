import {
    MODE_NONE, MODE_ADD, MODE_EDIT, MODE_DELETE,
} from "../../constants";

const apiCase = {
    state: {
        type: MODE_NONE,
    },
    mutations: {
        UPDATE_EDIT_TYPE(state, type) {
            state.type = type;
        },
    },
    actions: {
        
    }
};

export default apiCase;
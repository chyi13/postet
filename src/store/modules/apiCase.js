import {
    TYPE_NONE, TYPE_ADD, TYPE_EDIT, TYPE_DELETE,
} from "../../constants";

const apiCase = {
    state: {
        type: TYPE_NONE,
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
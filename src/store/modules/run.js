import {fetchByCrossRequest} from "../../utils";

const run = {
    state: {
        header: {},
        body: {},
        showResult: false,
    },
    mutations: {
        SHOW_RESULT(state) {
            document.body.className += "modal-open";
            state.showResult = true;
        },
        HIDE_RESULT(state) {
            document.body.className = document.body.className.replace("modal-open", '');
            state.showResult = false;
        }
    },
    actions: {
        async DO_REQUEST({commit, state}, {url}) {
            if (url) {
                commit('SHOW_RESULT');
                try {
                    const {header, body} = await fetchByCrossRequest(url);
                    if (header && body) {
                        state.header = header;
                        state.body = body;
                    }
                } catch (e) {
                    state.header = {};
                    state.body = {};
                }
            }
        }
    }
};

export default run;
import {fetchByCrossRequest} from "../../utils";

const run = {
    state: {
        header: {},
        body: {},
        showResult: false,
    },
    mutations: {
        SHOW_RESULT(state) {
            state.showResult = true;
        },
        HIDE_RESULT(state) {
            state.showResult = false;
        }
    },
    actions: {
        async DO_REQUEST({commit, state, rootState}, {id}) {
            const {apiCases, selectedApi} = rootState.core;
            if (Array.isArray(apiCases)) {
                const targetAPI = apiCases.find((item) => {
                    return Number(item.id) === Number(id);
                });
                console.log('targetAPI', targetAPI)
            }

            if (selectedApi) {
                commit('SHOW_RESULT');
                try {
                    const {header, body} = await fetchByCrossRequest(selectedApi.url);
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
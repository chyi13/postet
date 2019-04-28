import {fetchByCrossRequest, fetchByAjax} from "../../utils";

const run = {
    state: {
        headers: {},
        body: {},
        showResult: false,
    },
    mutations: {
        SHOW_RESULT(state) {
            state.showResult = true;
        },
        HIDE_RESULT(state) {
            state.showResult = false;
        },
        CLEAR_RESULT(state) {
            state.headers = {};
            state.body = {};
        }
    },
    actions: {
        async DO_REQUEST({commit, state, rootState}, {id}) {
            const {apiCases, selectedApi} = rootState.core;
            const {headers: requestHeaders = [], params: requestParams = []} = rootState.edit;
            commit('CLEAR_RESULT');
            if (Array.isArray(apiCases)) {
                const targetAPICase = apiCases.find((item) => {
                    return Number(item.id) === Number(id);
                });
                // set request header
                let realReqHeaders = {};
                requestHeaders.map((item) => {
                    realReqHeaders[item.key] = item.value;
                });
                // set request body
                let realReqParams = {};
                requestParams.map((item) => {
                    realReqParams[item.key] = item.value;
                });

                commit('SHOW_RESULT');
                // scroll to location
                document.getElementById("runningResult").scrollIntoView();
                if (selectedApi) {
                    try {
                        const {header, body} = await fetchByCrossRequest(
                            selectedApi.url,
                            'GET',
                            realReqHeaders,
                            realReqParams,
                        );
                        if (header && body) {
                            state.headers = header;
                            state.body = body;
                        }
                    } catch (e) {
                        console.error(e)
                        state.headers = {};
                        state.body = {};
                    }
                }
            }
        }
    }
};

export default run;
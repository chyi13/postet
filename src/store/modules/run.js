import { fetchByCrossRequest, fetchByAjax } from "../../utils";

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
        async DO_REQUEST({ commit, state, rootState }, dataToSend) {
            const { apiCases, selectedApi } = rootState.core;
            const { headers: requestHeaders = [], newHeaders = [], params: requestParams = [], newParams = [], url } = dataToSend;
            commit('CLEAR_RESULT');
            if (url) {
                // merge origin and new headers
                let realReqHeaders = {};
                requestHeaders.map((item) => {
                    if (item.key && item.value && item.checked) {
                        realReqHeaders[item.key] = item.value;
                    }
                });
                newHeaders.map((item) => {
                    if (item.key && item.value) {
                        realReqHeaders[item.key] = item.value;
                    }
                });
                // merge origin and new params
                let realReqParams = {};
                requestParams.map((item) => {
                    if (item.key && item.value && item.checked) {
                        realReqParams[item.key] = item.value;
                    }
                });
                newParams.map((item) => {
                    if (item.key && item.value && item.checked) {
                        realReqParams[item.key] = item.value;
                    }
                });
                commit('SHOW_RESULT');
                // scroll to location
                document.getElementById("runningResult").scrollIntoView();
                try {
                    const { header, body } = await fetchByCrossRequest(
                        url,
                        'GET',
                        realReqHeaders,
                        realReqParams,
                    );
                    if (header && body) {
                        state.headers = header;
                        state.body = body;
                    }
                } catch (e) {
                    state.headers = {};
                    state.body = {};
                }
            }
        }
    }
};

export default run;
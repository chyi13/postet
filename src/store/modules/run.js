import { fetchByCrossRequest, fetchByAjax } from "../../utils";
import { WAITINGFOR_TYPE_INFO } from "../../constants";

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
            const { headers: requestHeaders = [], newHeaders = [], commonHeaders = [], 
                     params: requestParams = [], newParams = [], commonParams = [], 
                    url, method = 'GET' } = dataToSend;
            commit('CLEAR_RESULT');
            if (url) {
                // merge origin and new headers
                let realReqHeaders = {};
                commonHeaders.map((item) => {
                    if (item.key && item.value && item.checked) {
                        realReqHeaders[item.key] = item.value;
                    }
                });
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
                commonParams.map((item) => {
                    if (item.key && item.value && item.checked) {
                        realReqParams[item.key] = item.value;
                    }
                });
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
                commit('SHOW_WAITING', {type: WAITINGFOR_TYPE_INFO, text: '请求中...'}, {root: true});
                // scroll to location
                document.getElementById("runningResult").scrollIntoView();
                try {
                    const {res: {header, body, status} = {}} = await fetchByCrossRequest(
                        url,
                        method,
                        realReqHeaders,
                        realReqParams,
                    );
                    if (header && body) {
                        state.headers = header;
                        state.body = body;
                    } else {
                      state.headers = {msg: 'CrossRequest请求失败'};
                      state.body = {msg: 'CrossRequest请求失败'};
                    }
                } catch (e) {
                  state.headers = {msg: 'CrossRequest请求失败'};
                  state.body = e;
                }
                commit('HIDE_WAITING', {}, {root: true});
            }
        }
    }
};

export default run;
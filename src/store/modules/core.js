import { fetchApis, fetchAPICases, fetchCommonHeaders, fetchCommonParams, fetchCommonValid } from "../../core/core";
import { parseCommonData } from "../../utils"; 

const core = {
    state: {
        apis: [],
        apiCases: [],
        selectedApi: null,
        selectedCommonHeaders: [],  // 选中api的公共请求头
        selectedCommonParams: [],   // 选中api的公共请求参数
        selectedApiCase: null,  // 选中的apicase
        commonHeaders: [],  // 所有公共请求头
        commonParams: [],   // 所有公共请求参数
        commonValid: [],    // 所有公共校验
    },
    mutations: {
        SET_APIS(state, apis) {
            state.apis = apis;
        },
        SET_SELECTED_API(state, selectedApi) {
            state.selectedApi = selectedApi;
        },
        SET_API_CASES(state, apiCases) {
            state.apiCases = apiCases;
        },
        SET_SELECTED_API_CASE(state, apiCase) {
            state.selectedApiCase = apiCase;
        },
        SET_COMMON_HEADERS(state, commonHeaders) {
            state.commonHeaders = commonHeaders;
        },
        SET_COMMON_PARAMS(state, commonParams) {
            state.commonParams = commonParams;
        },
        SET_COMMON_VALID(state, commonValid) {
            state.commonValid = commonValid;
        },
        SET_SELECTED_COMMON_HEADERS(state, selectedCommonHeaders) {
            state.selectedCommonHeaders = selectedCommonHeaders;
        },
        SET_SELECTED_COMMON_PARAMS(state, selectedCommonParams) {
            state.selectedCommonParams = selectedCommonParams;
        },
    },
    actions: {
        async INIT_CORE({commit, dispatch}) {
            dispatch("UPDATE_APIS");
            dispatch("UPDATE_COMMON_HEADERS");
            dispatch("UPDATE_COMMON_PARAMS");
            dispatch("UPDATE_COMMON_VALID");
        },
        async UPDATE_APIS({commit}) {
            const apis = await fetchApis();
            commit('SET_APIS', apis);
        },
        async UPDATE_COMMON_HEADERS({commit}) {
            const commonHeaders = await fetchCommonHeaders();
            commit('SET_COMMON_HEADERS', commonHeaders)
        },
        async UPDATE_COMMON_PARAMS({commit}) {
            const commonParams = await fetchCommonParams();
            commit('SET_COMMON_PARAMS', commonParams)
        },
        async UPDATE_COMMON_VALID({commit}) {
            const commonValid = await fetchCommonValid();
            commit('SET_COMMON_VALID', commonValid);
        },
        UPDATE_SELECTED_API({commit, state, dispatch}, selectedApi) {
            console.log('selected', selectedApi);
            if (selectedApi && selectedApi.id) {
                // clear api cases
                commit('SET_API_CASES', []);
                commit('SET_SELECTED_API', selectedApi);
                // fetch its api cases
                dispatch('UPDATE_API_CASES', selectedApi.id);
                // update select commonHeaders commonParams
                const {commonHeaders = [], commonParams = [], selectedApi: {header, param} = {}} = state;
                const selectedCommonHeaders = parseCommonData(commonHeaders.find((item) => item.id === header));
                const selectedCommonParams = parseCommonData(commonHeaders.find((item) => item.id === param));
                if (selectedCommonHeaders) {
                    commit('SET_SELECTED_COMMON_HEADERS', selectedCommonHeaders);
                }
                if (selectedCommonParams) {
                    commit('SET_SELECTED_COMMON_PARAMS', selectedCommonParams);
                }
            }
        },
        async UPDATE_API_CASES({commit, state}, selectedApiId) {
            if (selectedApiId) {
                // request api cases
                const apiCases = await fetchAPICases(selectedApiId);
                commit('SET_API_CASES', apiCases);
            }
        },
        UPDATE_SELECT_API_CASE({commit, state}, selectedApiCaseId) {
            const {apiCases} = state;
            const targetAPICase = apiCases.find((item) => {
                return Number(item.id) === Number(selectedApiCaseId);
            });
            console.log('targetAPICase', targetAPICase);
            commit('SET_SELECTED_API_CASE', targetAPICase);
        },
    }
};

export default core;
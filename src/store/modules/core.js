import { fetchApis, fetchAPICases, fetchCommonHeaders, fetchCommonParams, fetchCommonValid } from "../../core/core";

const core = {
    state: {
        apis: [],
        apiCases: [],
        selectedApi: null,
        selectedApiCase: null,
        commonHeaders: [],
        commonParams: [],
        commonValid: [],
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
        }
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
        async UPDATE_API_CASES({commit, state}, selectedApi) {
            if (selectedApi && selectedApi.id) {
                commit('SET_SELECTED_API', selectedApi);
                const apiCases = await fetchAPICases(selectedApi.id);
                commit('SET_API_CASES', apiCases);
            }
        },
        UPDATE_SELECT_API_CASE({commit, state}, selectedApiCaseId) {
            const {apiCases} = state;
            const targetAPICase = apiCases.find((item) => {
                return Number(item.id) === Number(selectedApiCaseId);
            });
            commit('SET_SELECTED_API_CASE', targetAPICase);
        },
    }
};

export default core;
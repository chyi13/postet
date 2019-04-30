import { fetchTestApiIds, fetchAPICases } from "../../core/core";

const core = {
    state: {
        apiIds: [],
        apiIdsDummy: [],
        apiCases: [],
        selectedApi: null,
        selectedApiCase: null,
    },
    mutations: {
        SET_API_IDS(state, apiIds) {
            state.apiIds = apiIds;
            state.apiIdsDummy = [...apiIds];
        },
        SET_SELECTED_API(state, selectedApi) {
            state.selectedApi = selectedApi;
        },
        SET_API_CASES(state, apiCases) {
            state.apiCases = apiCases;
        },
        SET_SELECTED_API_CASE(state, selectedApiCase) {
            state.selectedApiCase = selectedApiCase;
        }
    },
    actions: {
        async UPDATE_API_IDS({commit}) {
            const apiIds = await fetchTestApiIds();
            commit('SET_API_IDS', apiIds);
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
            console.log('targetAPICase', targetAPICase)
            commit('SET_SELECTED_API_CASE', targetAPICase);
        },
        FILTER_API_CASES({commit, state}, searchStr) {
            if (searchStr) {
                state.apiIdsDummy = state.apiIds.filter((item) => item.name.indexOf(searchStr) > -1)
            } else {
                state.apiIdsDummy = [...state.apiIds];
            }
        },
    }
};

export default core;
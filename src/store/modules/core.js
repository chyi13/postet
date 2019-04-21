import { fetchTestApiIds } from "../../core/core";

const core = {
    state: {
        apiIds: [],
        apiCases: [],
    },
    mutations: {
        SET_API_IDS(state, apiIds) {
            state.apiIds = apiIds;
        },
        SET_API_CASES(state, apiCases) {
            state.apiCases = apiCases;
        },
    },
    actions: {
        async UPDATE_API_IDS({commit}) {
            // const apiIds = await fetchTestApiIds();
            const apiIds = [  {
                name: '测试1',
            },
                {
                    name: '测试2',
                },
                {
                    name: '测试3',
                },
                {
                    name: '测试5',
                },
                {
                    name: '测试123',
                },
                {
                    name: '测试1',
                },]
            commit('SET_API_IDS', apiIds);
        },
        async UPDATE_TEST_CASES({commit, state}) {
            commit('SET_API_CASES', '');
        }
    }
};

export default core;
const getters = {
    apiIds: state => state.core.apiIds,
    selectedApi: state => state.core.selectedApi,
    apiCases: state => state.core.apiCases,
    selectedApiCase: state => state.core.selectedApiCase,
    showResult: state => state.run.showResult,
    resultHeader: state => state.run.header,
    resultBody: state => state.run.body,
};

export default getters
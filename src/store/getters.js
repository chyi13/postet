const getters = {
    apiIds: state => state.core.apiIds,
    apiIdsDummy: state => state.core.apiIdsDummy,
    selectedApi: state => state.core.selectedApi,
    apiCases: state => state.core.apiCases,
    selectedApiCase: state => state.core.selectedApiCase,
    showResult: state => state.run.showResult,
    requestHeaders: state => state.edit.headers, 
    requestParams: state => state.edit.params,
    resultHeaders: state => state.run.headers,
    resultBody: state => state.run.body,
};

export default getters
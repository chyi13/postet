const getters = {
    apiIds: state => state.core.apiIds,
    apiCases: state => state.core.apiCases,
    showResult: state => state.run.showResult,
    resultHeader: state => state.run.header,
    resultBody: state => state.run.body,
};

export default getters
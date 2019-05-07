const getters = {
  apiIds: state => state.core.apiIds,
  apiIdsDummy: state => state.core.apiIdsDummy,
  selectedApi: state => state.core.selectedApi,
  apiCases: state => state.core.apiCases,
  selectedApiCase: state => state.core.selectedApiCase,
  commonHeaders: state => state.core.commonHeaders,
  commonParams: state => state.core.commonParams,
  commonValid: state => state.core.commonValid,
  showResult: state => state.run.showResult,
  type: state => state.apiCase.type,
  resultHeaders: state => state.run.headers,
  resultBody: state => state.run.body,
  showAddModal: state => state.api.showModal,
  addModalType: state => state.api.modalType,
};

export default getters
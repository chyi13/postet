const getters = {
  apis: state => state.core.apis,
  selectedApi: state => state.core.selectedApi,
  apiCases: state => state.core.apiCases,
  selectedApiCase: state => state.core.selectedApiCase,
  commonHeaders: state => state.core.commonHeaders,
  defaultCommonHeader: state => {
    const {commonHeaders} = state.core;
    return commonHeaders.filter((item) => {
      return (item.name.startsWith('默认'))
    })[0];
  },
  commonParams: state => state.core.commonParams,
  defaultCommonParam: state => {
    const {commonParams} = state.core;
    return commonParams.filter((item) => {
      return (item.name.startsWith('默认'))
    })[0];
  },
  commonValid: state => state.core.commonValid,
  defaultCommonValid: state => {
    const {commonValid = []} = state.core;
    let result = commonValid.filter((item) => {
      return (item.id === 1)
    });
    if (Array.isArray(result) && result.length > 0) {
      return result[0];
    } else {
      return null
    }
  },
  selectedCommonHeaders: state => state.core.selectedCommonHeaders,
  selectedCommonParams: state => state.core.selectedCommonParams,
  setup: state => state.core.setup,
  defaultSetup: state => {
    const {setup = []} = state.core;
    return setup.filter((item) => {
      return (item.name.startsWith('默认'))
    })[0];
  },
  teardown: state => state.core.teardown,
  defaultTeardown: state => {
    const {teardown = []} = state.core;
    return teardown.filter((item) => {
      return (item.name.startsWith('默认'))
    })[0];
  },
  showResult: state => state.run.showResult,
  type: state => state.apiCase.type,
  resultHeaders: state => state.run.headers,
  resultBody: state => state.run.body,
  showAddModal: state => state.api.showModal,
  modalType: state => state.api.modalType,
  modalMode: state => state.api.modalMode,
};

export default getters
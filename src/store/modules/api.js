import {
    MODAL_TYPE_API, MODAL_TYPE_API_CASE, MODAL_TYPE_NONE,
    TYPE_NONE, TYPE_ADD, TYPE_EDIT, TYPE_DELETE,
    WAITINGFOR_TYPE_INFO,
    REQUEST_SUCCESS, REQUEST_FAILED, 
} from "../../constants";
import {createApi, deleteTestApi, createApiCase} from "../../core/core";
import {stringifyHeaderOrParam} from "../../utils";

const api = {
  state: {
    showModal: false,
    modalType: MODAL_TYPE_NONE,
    type: TYPE_NONE,
  },
  mutations: {
    SHOW_MODAL(state, type) {
      document.body.className += "modal-open";
      state.showModal = true;
      state.modalType = type;
    },
    HIDE_MODAL(state) {
      document.body.className = document.body.className.replace("modal-open", '');
      state.showModal = false;
      state.modalType = MODAL_TYPE_NONE;
    },
    UPDATE_TYPE(state, type) {
      state.type = type;
    }
  },
  actions: {
    ADD_NEW_API({state, commit}) {
      commit('SHOW_MODAL', MODAL_TYPE_API);
      commit('UPDATE_TYPE', TYPE_ADD);
    },
    async SAVE_NEW_API({state, commit, dispatch, rootState}, newApiData) {
      console.log('newApiData', newApiData);
      // 1. 展示进度条
      commit('SHOW_WAITING', {type: WAITINGFOR_TYPE_INFO, text: 'Saving...'}, {root: true});
      const {valid, header, param, name, url, stag_url, online_url, setup_suite = null} = newApiData;
      // 2. 发送请求
      const {status, header: resultHeader, body: resultBody} = await createApi({valid, header, param, name, url, stag_url, online_url, setup_suite});
      commit('HIDE_WAITING', {}, {root: true});
      console.log('resultHeader', resultHeader, resultBody);
      // 3. 保存请求结果
      if (status === REQUEST_SUCCESS) {
        commit('HIDE_MODAL');
        // 4. 刷新api
        dispatch("UPDATE_APIS");
        // 5. 提示
        bootbox.alert('创建成功');
      } else {
        bootbox.alert('创建失败: ' + JSON.stringify(resultBody));
      }
    },
    async DELETE_API({state, commit}, apiToDelete) {
      console.log('delete', apiToDelete);  
      deleteTestApi(apiToDelete.id);
    },
    async EDIT_API({state, commit}, api) {
      commit('SHOW_MODAL', MODAL_TYPE_API);
      console.log('api', api);
    },
    async ADD_NEW_API_CASE({state, commit}) {
      commit('SHOW_MODAL', MODAL_TYPE_API_CASE);
    },
    async SAVE_NEW_API_CASE({state, commit, dispatch}, newApiCaseData) {
      console.log('newApiCaseData', newApiCaseData);
      // 1. 展示进度条
      commit('SHOW_WAITING', {type: WAITINGFOR_TYPE_INFO, text: 'Saving...'}, {root: true});
      // 2. 发送请求
      const {valid, header = [], param = [], name, api, setup_suite, teardown} = newApiCaseData;
      const {status, header: resultHeader, body: resultBody} = await createApiCase(
        {valid, header: stringifyHeaderOrParam(header), param: stringifyHeaderOrParam(param), name, api, setup_suite, teardown}
      );
      commit('HIDE_WAITING', {}, {root: true});
      if (status === REQUEST_SUCCESS) {
        commit('HIDE_MODAL');
        // 4. 刷新api
        dispatch("UPDATE_API_CASES", api, {root: true});
        // 5. 提示
        bootbox.alert('创建成功');
      } else {
        bootbox.alert('创建失败: ' + JSON.stringify(resultBody));
      }
    },
    async SAVE_OLD_API_CASE({state, commit}, oldApiCaseData) {
      console.log('oldApiCaseData', oldApiCaseData);
      
    }
  }
};

export default api;

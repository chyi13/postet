import {
    MODAL_TYPE_API, MODAL_TYPE_API_CASE, MODAL_TYPE_NONE,
    MODE_NONE, MODE_ADD, MODE_EDIT, MODE_DELETE,
    WAITINGFOR_TYPE_INFO,
    REQUEST_SUCCESS, REQUEST_FAILED, 
} from "../../constants";
import {createApi, updateApi, deleteTestApi, createApiCase, updateApiCase} from "../../core/core";
import {stringifyHeaderOrParam} from "../../utils";

const api = {
  state: {
    showModal: false,
    modalType: MODAL_TYPE_NONE,
    modalMode: MODE_NONE,
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
    UPDATE_MODAL_MODE(state, modalMode) {
      state.modalMode = modalMode;
    }
  },
  actions: {
    ADD_NEW_API({state, commit}) {
      commit('SHOW_MODAL', MODAL_TYPE_API);
      commit('UPDATE_MODAL_MODE', MODE_ADD);
    },
    async SAVE_NEW_API({state, commit, dispatch, rootState}, newApiData) {
      // 1. 展示进度条
      commit('SHOW_WAITING', {type: WAITINGFOR_TYPE_INFO, text: 'Saving...'}, {root: true});
      const {valid, header, param, name, url, stag_url, online_url, setup_suite = null} = newApiData;
      // 2. 发送请求
      const {status, header: resultHeader, body: resultBody} = await createApi({valid, header, param, name, url, stag_url, online_url, setup_suite});
      commit('HIDE_WAITING', {}, {root: true});
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
    async SAVE_OLD_API({state, commit, dispatch}, oldApiData) {
      // 1. 展示进度条
      commit('SHOW_WAITING', {type: WAITINGFOR_TYPE_INFO, text: 'Saving...'}, {root: true});
      const {id, valid, header, param, name, url, stag_url, online_url, setup_suite = null} = oldApiData;
      // 2. 发送请求
      const {status, header: resultHeader, body: resultBody} = await updateApi({id, valid, header, param, name, url, stag_url, online_url, setup_suite});
      commit('HIDE_WAITING', {}, {root: true});
      // 3. 保存请求结果
      if (status === REQUEST_SUCCESS) {
        commit('HIDE_MODAL');
        // 4. 刷新api
        dispatch("UPDATE_APIS");
        // 5. 提示
        bootbox.alert('更新成功');
      } else {
        bootbox.alert('更新失败: ' + JSON.stringify(resultBody));
      }
    },
    async DELETE_API({state, commit}, apiToDelete) {
      deleteTestApi(apiToDelete.id);
    },
    async EDIT_API({state, commit, dispatch}, api) {
      await dispatch("UPDATE_SELECTED_API", api, {root: true});
      commit('SHOW_MODAL', MODAL_TYPE_API);
      commit('UPDATE_MODAL_MODE', MODE_EDIT);
    },
    async ADD_NEW_API_CASE({state, commit}) {
      commit('SHOW_MODAL', MODAL_TYPE_API_CASE);
    },
    /**
     * 创建apicase
     */
    async SAVE_NEW_API_CASE({state, commit, dispatch}, newApiCaseData) {
      // 1. 展示进度条
      commit('SHOW_WAITING', {type: WAITINGFOR_TYPE_INFO, text: '保存中...'}, {root: true});
      // 2. 发送请求
      const {valid, header = [], param = [], name, api, setup_suite, teardown, method = 'GET'} = newApiCaseData;

      const {status, header: resultHeader, body: resultBody} = await createApiCase(
        {valid, header: stringifyHeaderOrParam(header), param: stringifyHeaderOrParam(param), name, api, setup_suite, teardown, method}
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
    /**
     * 保存apicase
     */
    async SAVE_OLD_API_CASE({state, commit, dispatch}, oldApiCaseData) {
      const {api, name, headers = [], params = [], setup_suite, teardown, valid, id, method} = oldApiCaseData;
      const headerStr = {};
      headers.map((item) => {
        if (item.key !== '' || item.value !== '') {
          headerStr[item.key] = item.value;
        }
      });
      const paramStr = {};
      params.map((item) => {
        if (item.key !== '' || item.value !== '') {
          paramStr[item.key] = item.value;
        }
      });
      commit('SHOW_WAITING', {type: WAITINGFOR_TYPE_INFO, text: '更新中...'}, {root: true});
      const {status, body: resultBody} = await updateApiCase({
        api, name, headers: JSON.stringify(headerStr), param: JSON.stringify(paramStr), setup_suite: Number(setup_suite), teardown: Number(teardown), valid: Number(valid), id, method
      });
      commit('HIDE_WAITING', {}, {root: true});
      if (status === REQUEST_SUCCESS) {
        bootbox.alert('更新成功');
        await dispatch('UPDATE_API_CASES', api, {root: true});
        await dispatch("UPDATE_SELECT_API_CASE", id, {root: true});
      } else {
        bootbox.alert('更新失败: ' + JSON.stringify(resultBody));
      }
    }
  }
};

export default api;

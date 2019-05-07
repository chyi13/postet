import {
    MODAL_TYPE_API, MODAL_TYPE_API_CASE, MODAL_TYPE_NONE,
    TYPE_NONE, TYPE_ADD, TYPE_EDIT, TYPE_DELETE,
} from "../../constants";
import {createTestApi, deleteTestApi} from "../../core/core";

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
    async SAVE_NEW_API({state, commit}, newApiData) {
      commit('HIDE_MODAL');
      console.log('newApiData', newApiData);
      const {valid, header, param, name, url, stag_url, online_url} = newApiData;
      createTestApi({valid, header, param, name, url, stag_url, online_url})
    },
    async DELETE_API({state, commit}, apiToDelete) {
      console.log('delete', apiToDelete);  
      deleteTestApi(apiToDelete.id);
    },
    EDIT_API({state, commit}, api) {
      commit('SHOW_MODAL', MODAL_TYPE_API);
      console.log('api', api);
    },
    ADD_NEW_API_CASE({state, commit}, api) {
      commit('SHOW_MODAL', MODAL_TYPE_API_CASE);
    },
    
  }
};

export default api;

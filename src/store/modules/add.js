import {MODAL_TYPE_ADD_NEW_API, MODAL_TYPE_ADD_NEW_API_CASE, MODAL_TYPE_NONE} from "../../constants";

const add = {
  state: {
    showModal: false,
    modalType: MODAL_TYPE_NONE,
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
  },
  actions: {
    ADD_NEW_API({state, commit}) {
      commit('SHOW_MODAL', MODAL_TYPE_ADD_NEW_API);
    },
    async SAVE_NEW_API({state, commit}, newApiData) {
      commit('HIDE_MODAL');
      console.log('newApiData', newApiData);
    },
    ADD_NEW_API_CASE({state, commit}, api) {
      commit('SHOW_MODAL', MODAL_TYPE_ADD_NEW_API_CASE);
    }
  }
};

export default add;

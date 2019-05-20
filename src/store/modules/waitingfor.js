import { WAITINGFOR_TYPE_INFO } from "../../constants";

const waitingfor = {
    state: {
        type: "",
        text: "",
        
    },
    mutations: {
        SHOW_WAITING(state, {type = WAITINGFOR_TYPE_INFO, text}) {
          state.type = type;
          state.text = text;
          waitingDialog.show(text, {
             dialogSize: 'm',
             progressType: type,
          }) 
        },
        HIDE_WAITING(state, callback) {
          setTimeout(() => {
            waitingDialog.hide();
            if (typeof callback === 'undefined') {
              callback();
            }
          }, 500);
        }
    },
};

export default waitingfor;
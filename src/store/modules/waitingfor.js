import waitingDialog from "bootstrap-waitingfor";

const waitingfor = {
    state: {
        type: "",
        text: "",
        
    },
    mutations: {
        SHOW_WAITING(state, {type, text}) {
          state.type = type;
          state.text = text;
          waitingDialog.show(text, {
             dialogSize: 'm',
              progressType: type,
          }) 
        },
        HIDE_WAITING(state) {
          waitingDialog.hide();
        }
    },
};

export default waitingfor;
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import run from './modules/run';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        run
    },
    getters
});

export default store;
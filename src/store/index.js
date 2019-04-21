import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import run from './modules/run';
import core from './modules/core';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        run,
        core,
    },
    getters
});

export default store;
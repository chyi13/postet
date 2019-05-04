import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import run from './modules/run';
import core from './modules/core';
import edit from './modules/edit';
import add from "./modules/add";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        run,
        core,
        edit,
        add,
    },
    getters
});

export default store;
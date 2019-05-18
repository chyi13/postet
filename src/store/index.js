import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import run from './modules/run';
import core from './modules/core';
import apiCase from './modules/apiCase';
import api from "./modules/api";
import waitingfor from "./modules/waitingfor";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        run,
        core,
        apiCase,
        api,
        waitingfor,
    },
    getters
});

export default store;
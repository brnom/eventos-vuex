import Vue from "vue";
import Vuex from "vuex";
import * as user from '@/store/modules/user';
import * as event from '@/store/modules/event';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        event
    },
    state: {
        categories: [
            'natureza',
            'animal',
            'brisa',
            'coletivo'
        ],
    }
});

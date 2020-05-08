import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        listData: [],
    },
    mutations: {
        setListData(state, payload) {
            state.listData = payload
        }
    },
    actions: {
        getListData() {

        },
    },
    getters: {

    }
})

export default store

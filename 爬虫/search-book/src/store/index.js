import Vue from 'vue'
import Vuex from 'vuex'
import $api from '../util/http'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        listData: {
            count: 0,
            list: [],
            bookName: ""
        },
        queryObj: {

        }
    },
    mutations: {
        setListData(state, payload) {
            state.listData = payload
        },
        setQueryObj(state, payload) {
            state.queryObj = { ...payload }
        },
    },
    actions: {
        async getListData({ commit, state }, params) {
            let data = await $api.get('/', {
                params
            })
            commit('setListData', data)
        },
    },
    getters: {

    }
})

export default store

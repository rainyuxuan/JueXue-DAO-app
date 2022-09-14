import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { eventBus } from './main'
import { Conflux } from 'js-conflux-sdk'
Vue.use(Vuex)

// Create a new store instance.
const store = new Vuex.Store({
  state: {
    cfx: new Conflux({
      url: 'https://test.confluxrpc.com',
      networkId: 1,
    }),
    scholarAddr: undefined,
    backendUrl: 'http://localhost:5000/api',
    platformAddr: 'cfxtest:aane51nxnydk7azb4bz14t2rfacbckp572xa9cur87',
    daoContractAddr: 'cfxtest:acdrykf83s32v1s3wkwz3h7jgf7zeyf3kpgs623mxt',
    lang: 'en',
    isAuthenticated: false,
    gasPrice: 1e9,
  },
  actions: {
    async connectWallet(context) {
      if (this.state.isAuthenticated) {
        return
      }
      if (!window.conflux) {
        alert('Please install ConfluxPortal')
        return
      }
      try {
        if (!this.state.scholarAddr) {
          console.log('requesting account')
          // connect wallet
          await window.conflux.request({ method: 'cfx_requestAccounts' })
          // get accounts
          const accounts = await window.conflux.request({
            method: 'cfx_accounts',
          })
          console.log(accounts)
          alert('Wallet connected')
          const sig = await this.state.cfx.request({
            method: 'personal_sign',
            params: [msg, address],
            from: address,
          })
          context.commit('setScholarAddr', accounts[0])
          alert('Wallet connected')
          // get scholar info from backend
          //todo
        }
      } catch (err) {
        console.log(err)
      }
    },
    notifyWIP() {
      eventBus.$emit('App.notifyWIP')
    },

    notifyLoading(state, payload) {
      const { msg } = payload
      eventBus.$emit('App.notifyLoading', msg)
    },
  },
  mutations: {
    setCfx(state, cfx) {
      state.cfx = cfx
    },
    setScholarAddress: (state, addr) => {
      state.scholarAddr = addr
    },
    setIsAuthenticated: (state, isAuthenticated) => {
      state.isAuthenticated = isAuthenticated
    },
  },
  getters: {
    getCfx: (state) => state.cfx,
    getIsAuthenticated: (state) => state.isAuthenticated,
    getScholarAddr: (state) => state.schoolAddr,
    getBackendUrl: (state) => state.backendUrl,
    getDaoContractAddr: (state) => state.daoContractAddr,
    getlang: (state) => state.lang,
  },
})

export default store

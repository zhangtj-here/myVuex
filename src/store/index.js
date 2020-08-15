import Vue from 'vue'
import Vuex from './myVuex'

// Vue.use = function(plugin) {
//   let installedPlugins = this._installedPlugins || (this._installedPlugins = []);
//   if (installedPlugins.indexOf(plugin) > -1) {
//     return this;
//   }
//
//   let args = Array.prototype.slice.call(arguments, 1);
//   args.unshift(this);
//   if (typeof plugin.install === "function") {
//     plugin.install.apply(plugin, args);
//   } else {
//     plugin.apply(null, plugin, args);
//   }
//   installedPlugins.push(plugin);
//   return this;
// }

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num: 100
  },
  mutations: {
    add(option, arg) {
      option.num += arg;
    }
  },
  getter: {
    getNum(option)  {
      return option.num
    }
  },
  actions: {
    asyncAdd({commit}, arg) {
      setTimeout(() => {
        commit('add', 2);
      }, 1000);
    }
  },
  modules: {
  }
})

import Vue from "vue";

class Store {
    constructor(options) {
        this.vm = new Vue({
            data: {
                state: options.state
            }
        })


        let getters = options.getter || {};
        this.getter = {};
        Object.keys(getters).forEach(getterName => {
            Object.defineProperty(this.getter, getterName, {
                get: () => {
                    return getters[getterName](this.state);
                }
            })
        })

        let mutations = options.mutations || {};
        this.mutations = {};
        Object.keys(mutations).forEach(mutationName => {
            this.mutations[mutationName] = (arg) => {
                mutations[mutationName](this.state, arg);
            }
        })

        let actions = options.actions || {};
        this.actions = {};
        Object.keys(actions).forEach(actionName => {
            this.actions[actionName] = (arg) => {
                actions[actionName](this, arg);
            }
        })
    }

    commit = (method, arg) => {
        this.mutations[method](arg);
    }

    dispatch(method, arg) {
        this.actions[method](arg);
    }



    get state() {
        return this.vm.state;
    }

}

let install = function(Vue) {
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.store){
                this.$store = this.$options.store;
            } else {
                this.$store = this.$parent && this.$parent.$store;
            }
        }
    })
}

// let Vuex =

export default {
    Store,
    install
}
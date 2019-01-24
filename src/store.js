import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		result: {},
		total: 0
	},
	mutations: {
		setTotal(state) {}
	},
	actions: {
		setTotal({ commit }) {
			commit("setTotal");
		}
	},
	getters: {
		getResult: state => {
			return state.result;
		},
		getTotal: state => {
			return state.total;
		}
	}
});

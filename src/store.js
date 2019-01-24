import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		result: [],
		total: null
	},
	mutations: {
		setTotal(state, total) {
			state.total = total;
		},
		updateResult(state, singleResult) {
			// so when people redo the quiz, it won't add a new object into the state.result
			state.result = [...state.result.filter(result => result.quizID !== singleResult.quizID), singleResult];
		}
	},
	actions: {
		setTotal({ commit }) {
			axios
				.get(process.env.VUE_APP_TOTAL)
				.then(response => {
					// handle success
					commit("setTotal", response.data.total);
				})
				.catch(function(error) {
					// handle error
					console.log(error);
				});
		},
		updateResult({ commit }, singleResult) {
			/**
			 * singleResult = {
			 *      id: Number
			 *      selectedOption: Number
			 *      isSelectedOptionCorrect: Boolean
			 * }
			 */
			commit("updateResult", singleResult);
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

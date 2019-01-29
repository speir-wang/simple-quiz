import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		total: null,
		quiz: []
	},
	mutations: {
		setTotal(state, total) {
			state.total = total;
		},
		setQuiz(state, quiz) {
			state.quiz = quiz;
		},
		updateResult(state, result) {
			// so when people redo the quiz, it won't add a new object into the state.quiz
			let answeredQuestion = state.quiz.find(quiz => quiz.id === result.quizID);
			answeredQuestion.userSelection = result.userSelection;

			state.quiz = [
				...state.quiz.map(quiz => {
					if (quiz.id === result.quizID) quiz.userSelection = result.userSelection;

					return quiz;
				})
			];
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
		setQuiz({ commit }) {
			axios
				.get(process.env.VUE_APP_QUIZ)
				.then(response => {
					// handle success
					let quiz = response.data;
					quiz.forEach(quizItem => {
						quizItem.userSelection = null;
					});
					commit("setQuiz", quiz);
				})
				.catch(function(error) {
					// handle error
					console.log(error);
				});
		},
		updateResult({ commit }, result) {
			commit("updateResult", result);
		}
	},
	getters: {
		// getResult: state => state.result,
		getTotal: state => state.total,
		getSingleQuizWidthID: state => id => state.quiz.find(quiz => quiz.id === id)
	}
});

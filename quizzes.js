const faker = require("faker");

function generateQuizzes() {
	const data = { quizzes: [] };
	for (let i = 1; i <= 15; i++) {
		let option = [];

		for (let j = 0; j < 4; j++) {
			let wordLength = Math.floor(Math.random() * 5) + 2;
			option.push(faker.lorem.words(wordLength.toString()));
		}

		data.quizzes.push({
			id: i,
			question: faker.lorem.paragraph(),
			options: option,
			answer: Math.floor(Math.random() * 4) + 1
		});
	}
	data.total = {
		total: data.quizzes.length
	};

	return data;
}
module.exports = generateQuizzes;

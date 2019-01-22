<template>
    <div class="quiz-card">

        <div v-if="quiz">
            <h1 class="my-5">{{quiz.question}}</h1>
            <v-container>
                <v-layout
                    row
                    wrap
                >
                    <v-flex
                        xs6
                        mb-5
                        v-for="option in quiz.options"
                        :key="option.answer"
                    >
                        <QuizOption
                            ref="option"
                            :option="option"
                            :showSelect="showSelect"
                            @checkAnswer="onCheckAnswer"
                        />
                    </v-flex>
                </v-layout>
            </v-container>

            <CountDownTimer
                :duration=15
                :answerSubmitted="answerSubmitted"
                @timeFinished="onTimeFinished"
            />
            <div v-if="answerSubmitted">
                <router-link :to="{name: 'quiz', params:{id: `${nextQuizID}`}}">Next Quiz</router-link>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import QuizOption from "@/components/QuizOption";
import CountDownTimer from "@/components/CountDownTimer";
import axios from "axios";

export default {
    name: "quiz",

    data() {
        return {
            answerSubmitted: false,
            quiz: null,
            nextQuizID: parseInt(this.$route.params.id) + 1,
            showSelect: false
        };
    },

    components: { QuizOption, CountDownTimer },

    mounted() {
        let quizID = this.$route.params.id;
        axios
            .get("http://localhost:3000/quizs/" + quizID)
            .then(response => {
                // handle success
                this.quiz = response.data;
            })
            .catch(function(error) {
                // handle error
                console.log(error);
            });
    },
    methods: {
        showAnswer() {
            this.answerSubmitted = true;

            this.$refs.option.forEach(e => {
                e.$el.classList.add(e.option.isCorrect.toString());
                e.$off("checkAnswer");
            });
        },
        onCheckAnswer(e) {
            // once this function is fired, that means the user selects an answer, then we need to change the value of `answerSubmitted` and stop the timer.
            e.target.classList.add("clicked");
            this.showAnswer();
        },
        onTimeFinished() {
            this.showAnswer();
        }
    }
};
</script>



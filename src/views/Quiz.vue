<template>
    <div class="quiz-card">

        <div v-if="quiz">

            <v-container>
                <v-layout
                    row
                    wrap
                    align-center
                >
                    <v-flex xs8>
                        <h1 class="my-5 text-xs-left">{{quiz.question}}</h1>
                    </v-flex>
                    <v-flex xs4>
                        <CountDownTimer
                            :duration=15
                            :answerSubmitted="answerSubmitted"
                            @timeFinished="onTimeFinished"
                        />
                    </v-flex>

                </v-layout>

                <v-layout
                    row
                    wrap
                    align-center
                >
                    <!-- Options -->
                    <v-flex xs8>
                        <v-layout
                            row
                            wrap
                        >
                            <v-flex
                                xs6
                                my-3
                                text-xs-left
                                v-for="(option, index) in quiz.options"
                                :key="index"
                            >
                                <QuizOption
                                    ref="option"
                                    :option="option"
                                    :showSelect="showSelect"
                                    @checkAnswer="onCheckAnswer"
                                />
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <!-- Options End -->

                    <v-flex xs4>
                        <router-link
                            v-if="answerSubmitted"
                            :to="{name: 'quiz', params:{id: `${nextQuizID}`}}"
                        >Next Quiz</router-link>
                    </v-flex>
                </v-layout>
            </v-container>

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
            .get("http://localhost:3000/quizzes/" + quizID)
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
                // e.$el.classList.add(e.option.isCorrect.toString());
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



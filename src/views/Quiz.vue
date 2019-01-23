<template>
    <div class="quiz-card">

        <div v-if="quiz">

            <v-container>
                <v-layout
                    row
                    wrap
                    align-center
                >
                    <v-flex
                        xs8
                        text-xs-left
                    >
                        <span>Question {{quiz.id}}: </span>
                        <h2 class="question mb-5 mt-3">{{quiz.question}}</h2>
                    </v-flex>
                    <v-flex xs4>
                        <CountDownTimer
                            :duration=2
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
                                    @answerSelected="checkAnswer"
                                    ref="option"
                                    :option="option"
                                    :index="index"
                                />
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <!-- Options End -->

                    <v-flex xs4>
                        <v-btn
                            v-if="answerSubmitted"
                            color="primary"
                            :to="{name: 'quiz', params:{id: `${nextQuizID}`}}"
                        >
                            Next Quiz
                        </v-btn>

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
            nextQuizID: parseInt(this.$route.params.id) + 1
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
                // console.log(response.data);
            })
            .catch(function(error) {
                // handle error
                console.log(error);
            });
    },
    methods: {
        checkAnswer(index = index) {
            if (index) {
                console.log(index);
            }
            this.answerSubmitted = true;
            this.$refs.option.forEach(e => {
                // e.$el.classList.add(e.option.isCorrect.toString());
                e.$off("answerSelected");
            });
        },

        onTimeFinished() {
            this.checkAnswer();
        }
    }
};
</script>


<style lang="scss" scoped>
</style>

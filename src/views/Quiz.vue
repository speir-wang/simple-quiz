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
                        <span class="subheading font-italic">Question {{quiz.id}}: </span>
                        <h2 class="question mb-5 mt-4">{{quiz.question}}</h2>
                    </v-flex>
                    <v-flex xs4>
                        <CountDownTimer
                            :duration=10
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
        console.log(process.env.VUE_APP_QUIZ);
        console.log(process.env.VUE_APP_TOTAL);
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
        checkAnswer(selectedOption = null) {
            if (selectedOption && selectedOption.index !== this.quiz.answer) {
                selectedOption.$el.children[0].classList.add("red--text");
            }
            this.answerSubmitted = true;
            this.$refs.option.forEach(e => {
                if (e.index === this.quiz.answer) {
                    e.$el.children[0].classList.add("green--text");
                }

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

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
                        <span class="subheading font-italic">Question {{quiz.id}} of {{this.getTotal}}: </span>
                        <h2 class="question mb-5 mt-4">{{quiz.question}}</h2>
                    </v-flex>
                    <v-flex xs4>
                        <CountDownTimer
                            :duration=5
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
                    <!-- Options, probably need to extract this part into another components called Options -->
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
                                    @answerSelected="onSelectingAnswer"
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
                            v-if="answerSubmitted || timeFinished"
                            color="primary"
                            :to="changeRoute()"
                        >
                            {{btnText}}
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
import { mapGetters, mapActions } from "vuex";

export default {
    name: "quiz",

    data() {
        return {
            answerSubmitted: false,
            timeFinished: false,
            quiz: null,
            btnText: "Next Quiz"
        };
    },

    components: { QuizOption, CountDownTimer },

    mounted() {
        let quizID = parseInt(this.$route.params.id);
        this.quiz = this.getSingleQuizWidthID(quizID);
    },
    computed: {
        ...mapGetters(["getTotal", "getSingleQuizWidthID"])
    },
    methods: {
        ...mapActions(["updateResult"]),

        changeRoute() {
            let nextRoute = {};
            if (this.getTotal >= parseInt(this.$route.params.id) + 1)
                nextRoute = {
                    name: "quiz",
                    params: { id: `${parseInt(this.$route.params.id) + 1}` }
                };
            else {
                nextRoute = {
                    name: "result"
                };
                this.btnText = "Check Result";
            }

            return nextRoute;
        },
        showCorrectAnswer() {
            this.$refs.option.forEach(e => {
                if (e.index === this.quiz.answer) {
                    e.$el.children[0].classList.add("green--text");
                }
                e.$off("answerSelected");
            });
        },

        onSelectingAnswer(selectedOption = null) {
            this.answerSubmitted = true;
            this.showCorrectAnswer();
            if (selectedOption && selectedOption.index !== this.quiz.answer) {
                selectedOption.$el.children[0].classList.add("red--text");
            }

            let result = {
                quizID: this.quiz.id,
                userSelection: selectedOption.index
            };
            this.updateResult(result);
        },

        onTimeFinished() {
            this.timeFinished = true;
            this.showCorrectAnswer();
            this.updateResult(this.quiz.id, null);
        }
    }
};
</script>


<style lang="scss" scoped>
</style>

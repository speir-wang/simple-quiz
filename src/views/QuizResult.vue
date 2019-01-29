<template>
    <div>
        <h1 class="my-5">Result</h1>
        <v-data-table
            :headers="headers"
            :items="getResult"
            class="elevation-1"
        >
            <template
                slot="items"
                slot-scope="props"
            >
                <td class="text-xs-center">{{ props.item.id }}</td>
                <td class="text-xs-center">{{ indexConvertion(props.item.answer) }}</td>
                <td class="text-xs-center">{{ props.item.answer === props.item.userSelection ? "Correct" : "Wrong"}}</td>
                <td
                    class="text-xs-center"
                    ref="score"
                >{{ props.item.answer === props.item.userSelection ? 10 : 0 }}</td>

            </template>
            <template slot="footer">
                <td
                    :colspan="1"
                    class="text-xs-center"
                >
                    <strong>Total Score</strong>
                </td>
                <td
                    :colspan="headers.length - 2"
                    class="text-xs-left"
                >

                </td>
                <td
                    :colspan="1"
                    class="text-xs-center"
                >
                    <strong>{{totalScore()}}</strong>
                </td>
            </template>
        </v-data-table>
    </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            expand: false,
            headers: [
                {
                    text: "Quiz ID",
                    align: "center",
                    value: "quizID"
                },
                {
                    text: "Selected Option",
                    align: "center",
                    sortable: false,
                    value: "selectedOption"
                },
                {
                    text: "is Correct?",
                    align: "center",
                    sortable: false,
                    value: "correctAnswer"
                },
                {
                    text: "Score",
                    align: "center",
                    value: "score"
                }
            ]
        };
    },
    computed: {
        ...mapGetters(["getResult"])
    },

    methods: {
        totalScore() {
            return this.getResult.reduce((total, singleResult) => {
                singleResult.answer === singleResult.userSelection
                    ? (total += 10)
                    : (total += 0);
                return total;
            }, 0);
        },
        indexConvertion(selectedOption) {
            // conver index to charactor,
            // 65 is the charCode of "A"
            // e.g. index 0 => A, index 1 => B
            let charCode = 65 + selectedOption;
            return String.fromCharCode(charCode);
        }
    }
};
</script>


<style lang="scss" scoped>
</style>

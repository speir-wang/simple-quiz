<template>
    <v-hover>
        <v-chip
            label
            slot-scope="{hover}"
            :class="`elevation-${hover ? 8 : 2}`"
            @click.once="answerSelected"
        >
            <v-avatar
                tile
                class="blue-grey white--text"
            >{{indexConvertion}}</v-avatar>
            <h3>{{option}}</h3>
        </v-chip>
    </v-hover>

</template>


<script>
export default {
    name: "quiz-option",
    props: {
        option: String,
        optionClass: String,
        index: Number
    },
    computed: {
        indexConvertion() {
            // conver index to charactor,
            // 65 is the charCode of "A"
            // e.g. index 0 => A, index 1 => B
            let charCode = 65 + this.index;
            return String.fromCharCode(charCode);
        }
    },
    methods: {
        answerSelected(e) {
            this.$emit("answerSelected", this);
        }
    }
};
</script>

<style lang="scss" >
.v-chip__content {
    cursor: pointer !important;
}
</style>


<template>
    <v-chip>
        <v-avatar class="teal">A</v-avatar>
        <h2 @click.once="checkAnswer">{{option.answer}}<span> - You Answer </span></h2>
    </v-chip>

</template>


<script>
export default {
    name: "quiz-option",
    props: {
        option: Object,
        optionClass: String
    },
    methods: {
        checkAnswer(e) {
            this.$emit("checkAnswer", e);
        }
    }
};
</script>

<style lang="scss" scoped>
.clicked span {
    display: inline;
}
h2 {
    span {
        display: none;
        font-size: 16px;
    }
    font-size: 24px;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        color: lighten($color: #2c3e50, $amount: 20);
    }
}

.true {
    color: green;
    &:hover {
        color: green;
    }
}

.false {
    color: red;
    &:hover {
        color: red;
    }
}
</style>


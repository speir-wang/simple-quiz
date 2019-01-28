<template>
    <v-container>
        <v-layout
            row
            wrap
            align-center
            justify-center
        >
            <v-flex xs6>
                <h1 class="display-1 mb-5">Welcome to the Quiz</h1>
                <p class="mb-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <v-btn
                    large
                    color="info"
                    to="/quiz/1"
                >Start Quiz Now</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: "welcome"
};
</script>

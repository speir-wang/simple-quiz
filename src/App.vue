<template>
    <v-app id="app">
        <v-content>
            <v-container>
                <router-view :key="$route.path"></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
import { mapActions } from "vuex";
export default {
    mounted() {
        this.setTotal();
    },
    methods: {
        ...mapActions(["setTotal"])
    }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons");

#app {
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>

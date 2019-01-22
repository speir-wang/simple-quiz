<template>
    <div class="item">
        <h2 id="timer">{{duration}}</h2>
        <svg
            width="160"
            height="160"
        >
            <circle
                id="circle"
                class="circle_animation"
                r="69.85699"
                cy="81"
                cx="81"
                stroke-width="15"
                stroke="#6fdb6f"
                fill="none"
            />
            <circle
                id="circle-1"
                class="circle-1"
                r="69.85699"
                cy="81"
                cx="81"
                stroke-width="15"
                stroke="#ccc"
                fill="none"
            />
        </svg>
    </div>
</template>
<script>
export default {
    name: "countdown",
    props: {
        duration: Number,
        answerSubmitted: Boolean
    },
    data() {
        return {
            currentTimeSpent: 0
        };
    },

    mounted() {
        let time = this.duration; /* how long the timer will run (seconds) */
        let initialOffset = "440";

        let interval = setInterval(() => {
            this.$el.querySelector("#timer").textContent =
                time - this.currentTimeSpent;
            if (this.currentTimeSpent == time) {
                clearInterval(interval);
                this.$emit("timeFinished");
                return;
            }
            if (this.answerSubmitted) {
                clearInterval(interval);
                return;
            }

            this.$el.querySelector("circle").style.strokeDashoffset =
                initialOffset -
                (this.currentTimeSpent + 1) * (initialOffset / time);
            this.$el.querySelector("#circle-1").style.strokeDashoffset =
                0 - (this.currentTimeSpent + 1) * (initialOffset / time);
            this.currentTimeSpent++;
        }, 1000);
    }
};
</script>

<style lang="scss" scoped>
.item {
    position: relative;
}

.item h2 {
    text-align: center;
    position: absolute;
    line-height: 155px;
    width: 100%;
}

svg {
    -webkit-transform: rotate(-90deg);
    transform: rotate(-90deg);
}

#circle {
    stroke-dasharray: 440; /* this value is the pixel circumference of the circle */
    stroke-dashoffset: 440;
    transition: all 1s linear;
}
#circle-1 {
    stroke-dasharray: 440; /* this value is the pixel circumference of the circle */
    stroke-dashoffset: 0;
    transition: all 1s linear;
}
</style>

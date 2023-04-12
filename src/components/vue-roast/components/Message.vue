<template>
    <section
        :class="level"
        @mouseenter="timer.stop()"
        @mouseleave="timer.restart(timer.ttl/2)"
        class="toast-message"
        role="alert">
        <div class="toast-header">
            <span class="title bigger">{{ title }}</span>
            <span @click="close()" class="close-btn smaller" role="button">&#10006;</span>
        </div>
        <section class="toast-body" @click="click" :class="{'cursor-pointer': !!(this.options.action && this.options.action.click)}">
            <span>{{ content }}</span>
            <span v-if="options.action"
                  @click="options.action.method  || Function.prototype"
                  role="button">
                {{ options.action.placeholder }}
            </span>
        </section>
        <div class="toast-footer">
            <div class="smaller" v-html="footer" />
        </div>
    </section>
</template>

<style lang="scss">
@import '../style/message';
</style>


<script>
export default {
    props: {
        id: { type: Number, required: true },
        title: { type: String, default: '' },
        body: { type: String, default: '' },
        footer: { type: String, default: '' },
        level: { type: String, required: true },
        options: {
            action: {
                placeholder: String,
                method: Function,
                click: Function
            },
            truncateAfter: { type: Number, required: false }
        },
        timer: { type: Object, required: true }
    },
    computed: {
        content() {
            const { truncateAfter } = this.options
            return truncateAfter ? this.body : this.body.substr(0, truncateAfter)
        }
    },
    methods: {
        close() {
            this.$emit('close', this.id)
        },
        click() {
            if (this.options.action && this.options.action.click) {
                this.options.action.click()
                setTimeout(()=>{
                    this.close()
                },1000)
            }
        }
    },
    mounted() {
        this.timer.action = this.close
        this.timer.start()
    }
}
</script>
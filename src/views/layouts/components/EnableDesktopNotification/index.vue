<template>
    <a class="nk-news-item" href="#">
        <div class="nk-news-icon">
            <em class="icon ni ni-card-view"></em>
        </div>
        <div class="nk-news-text">
            <p>Do you know the latest update of 2022?
                <span> A overview of our is now available on YouTube</span>
            </p>
            <em class="icon ni ni-external"></em>
        </div>
    </a>
</template>

<script>
import ModalEnableDesktopNotificationGuide from '@/views/layouts/components/EnableDesktopNotification/_modal'

export default {
    name: 'EnableDesktopNotification',
    components: { ModalEnableDesktopNotificationGuide },
    data() {
        return {
            showRequestDesktopNotification: false,
            showModalDesktopNotification: false
        }
    },
    mounted() {
        this.requestDesktopNotification()
    },
    methods: {
        requestDesktopNotification() {
            try {
                this.$notification.requestPermission()
                    .then(res => {
                        if (res == 'denied' || res == 'default') {
                            this.showRequestDesktopNotification = true
                        }
                    }) // Prints "granted", "denied" or "default"
            } catch (e) {
                console.log('ErrorForRequestPermission')
            }
        },
        onModalDesktopNotificationClosed() {
            this.showModalDesktopNotification = false
        }
    }
}
</script>

<style scoped>

</style>

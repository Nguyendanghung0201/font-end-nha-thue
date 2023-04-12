<template>
    <b-modal
        ref="modal"
        v-model="show"
        no-close-on-backdrop
        no-close-on-esc
        title-class="w-100 text-center"
        header-class=""
        size="lg"
        body-class="pt-0"
        hide-footer
        no-enforce-focus
        @hidden="onModalHidden()"
        @shown="onModalShown()"
    >
        <template #header-close-content>
            <button type="button" aria-label="Close" class="close">×</button>
        </template>

        <template #modal-title>
            <h5>
                Hướng dẫn nhận thông báo
            </h5>
        </template>

        <div class="mt-3">
            <div class="modal-body">
                Cách bật thông báo đẩy của Hệ thống trên Google Chrome hoặc Firefox:
                <ul class="list">
                    <li> Cài đặt phiên bản Chrome hoặc Firefox mới nhất.</li>
                    <li> Vào hệ thống CRM.</li>
                    <li>Chấp nhận thông báo từ trình duyệt</li>
                    <li>
                        <img src="http://cdn0x68.tadata.info/storage/TUNG_DAP_CHAI/huong-dan-3.jpg" alt="huong dan 1">
                    </li>
                    <li>
                        <strong>Nếu không thấy, hãy làm theo các bước dưới đây</strong>
                    </li>
                    <li> Nhấp vào <span class="text-success"><em class="ni ni-lock"></em></span> ở trên thanh địa chỉ Website.</li>
                    <li>
                        <img src="http://cdn0x68.tadata.info/storage/TUNG_DAP_CHAI/Screenshot_1.png" alt="huong dan 1">
                    </li>
                    <li>
                        Nếu trạng thái "Notifications" đang tắt, hãy bật nó lên
                    </li>
                    <li>
                        <img src="http://cdn0x68.tadata.info/storage/TUNG_DAP_CHAI/Screenshot_2.png" alt="huong dan 2">
                    </li>
                    <li> Lưu ý: Nếu bạn gặp sự cố, hãy xóa dữ liệu duyệt web và cookie rồi đóng và mở lại trình duyệt.</li>
                </ul>
            </div>
        </div>

        <hr class="dashed">
        <b-row>
            <b-col lg="2" class="mx-auto">
                <b-button
                    @click="hideModal()"
                    variant="light"
                    block>
                    Đóng
                </b-button>
            </b-col>
        </b-row>
    </b-modal>

</template>

<script>

export default {
    name: 'ModalEnableDesktopNotificationGuide',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'md'
        }
    },
    data() {
        return {
            show: true
        }
    },
    methods: {
        hideModal() {
            this.$refs['modal'].hide()
        },
        onModalHidden(){
            this.$emit('close', this.value)
        },
        onModalShown(){

        }
    },
    watch: {
        value(newValue, oldValue) {
            this.show = newValue
        },
    },
}
</script>

<style scoped lang="scss">
.overlay {
    opacity: 1 !important;
    position: relative;

    &:after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(#FFF, 0.5);
        z-index: 99;
    }
}

</style>
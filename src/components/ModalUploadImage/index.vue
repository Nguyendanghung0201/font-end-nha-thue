<template>
    <b-modal
        v-model="show"
        ref="modal"
        hide-footer
        :size="size"
        header-class="border-bottom-0"
        body-class="pt-0"
        title-class="w-100 text-center"
        @hidden="onModalHidden()"
        no-enforce-focus
    >
        <template #header-close-content>
            <button type="button" aria-label="Close" class="close">×</button>
        </template>
        <template #modal-title>
            <div class="d-flex justify-content-center flex-column">
                <span class="pt-1">
                    Thêm Ảnh
                </span>
            </div>
        </template>
        <!-- Image Upload -->
        <Upload
            :triggerUpload="requestSubmit"
            @uploading="handleUploading"
            @uploaded="handleUploaded"
            @uploadFailed="handleUploadFailed"
            @uploadCompleted="handleUploadCompleted">
        </Upload>
        <!-- Image Upload -->
        <hr class="dashed">
        <b-row class="px-4">
            <b-col lg="3" class="mx-auto">
                <b-button
                    @click="requestSubmit = true"
                    variant="primary"
                    :disabled="requestSubmit"
                    size="md">
                    <b-spinner
                        small
                        v-if="requestSubmit"
                    ></b-spinner>
                    Tải lên
                </b-button>
            </b-col>
        </b-row>
    </b-modal>
</template>

<script>
import Upload from './upload'

export default {
    name: 'ModalQuickCreateOrder',
    components: { Upload },
    mixins: [],
    props: {
        value: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'md'
        },
        data: {
            type: Object,
            default() {
                return null
            }
        }
    },
    data() {
        return {
            show: false,
            requestSubmit: false
        }
    },
    methods: {
        handleUploadFile(file) {
            this.$emit('uploaded', file)
        },
        handleUploading(val) {
            this.requestSubmit = val
        },
        hideModal() {
            this.$refs['modal'].hide()
        },
        onModalHidden() {
            this.$emit('close', this.value)
        },
        handleUploadCompleted(val) {
            this.requestSubmit = false
            this.$emit('uploadCompleted', true)
            this.hideModal()
        },
        handleUploadFailed(val) {
            this.requestSubmit = false
            this.hideModal()
        },
        handleUploaded(val) {
            this.$emit('uploaded', val)
        }
    },
    mounted() {

    },
    watch: {
        data: {
            handler(newValue, oldValue) {
                if (newValue) {
                    this.show = true
                }
            },
            immediate: true
        }

    }

}
</script>

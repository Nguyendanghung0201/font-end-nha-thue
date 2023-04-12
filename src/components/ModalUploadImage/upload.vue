<!--
Xào nấu bởi: httzip
Cập nhật gần nhất: 29-03-2022
Mô tả: Upload ảnh thông qua plugin FilePond (https://pqina.nl/filepond/docs/api/instance/properties/)
Ví dụ:
<ModalUploadImage
    @close="handleModalUploadImageClosed" // Khi modal upload tắt
    @reload="handleModalUploadImageReload" // Khi modal upload tắt và thực hiện hành động reload list hoặc gì đó
    @uploaded="handleModalUploadImageUploaded" // Khi thành công upload 1 ảnh
    @uploadCompleted="handleModalUploadImageUploadCompleted" // Khi thành công upload tất cả ảnh
    ></ModalUploadImage>
-->
<template>
    <file-pond
        name="file"
        ref="pond"
        label-idle="Kéo file vào hoặc <span class='filepond--label-action'>Ấn đây (Tối đa 20MB)</span>"
        labelButtonProcessItem="'Tải lên'"
        :labelFileProcessingComplete="'Tải lên thành công'"
        :labelFileProcessing="'Đang tải lên'"
        :allow-multiple="allowMultiple"
        allow-revert="false"
        accepted-file-types="image/jpeg, image/png"
        :instantUpload="false"
        :oninitfile="handleInitFile"
        :onprocessfile="handleProcessedFile"
        :onprocessfiles="handleProcessedMultiFiles"
        :onremovefile="handleRemoveFile"
        imagePreviewHeight="150"
    />
</template>

<script>
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { getToken } from '@/helpers/auth'
import { getBaseUrl } from '@/helpers/common'
import { setOptions } from 'filepond'
const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview
)
const token = getToken() // Lấy token user đăng nhập
setOptions({
    server: {
        url: getBaseUrl(),
        process: {
            url: process.env.VUE_APP_UPLOAD_PREFIX,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            timeout: 7000
        }
    }
})
export default {
    name: 'FilePondCRMImageUpload',
    data: function () {
        return {
            selectedFile: [] // TODO: Bỏ qua
        }
    },
    props: {
        triggerUpload: {
            type: Boolean,
            default: false
        },
        allowMultiple: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        /*
        * Init
        * */
        handleInitFile(file) {
            this.selectedFile = [].concat([], this.selectedFile, file)
        },
        /*
        * Sau khi upload tất cả
        * */
        handleProcessedMultiFiles(error, files) {

        },
        /*
        * Sau khi xóa 1 ảnh
        * */
        handleRemoveFile(file) {

        },
        /*
        * Sau khi upload 1 ảnh
        * */
        handleProcessedFile(error, file) {

        },
        /*
        * Upload ảnh
        * */
        handleUploadFile() {
            let files = this.$refs.pond.getFiles()
            if (files.length) {
                /*
                * Bắt đầu tải ảnh
                * */
                this.$emit('uploading', true)
                let isError = true
                this.$refs.pond.processFiles(files).then((res) => {
                    if (res.length) {
                        this.lodash.forEach(res, (v) => {
                            const itemResponse = JSON.parse(v.serverId)
                            if (!itemResponse.status && itemResponse.code == 508){
                                this.$awn.alert(this.getResponseMessage(itemResponse.code))
                                this.$emit('uploadFailed', true)
                                this.handleRemoveFile(files)
                                return false
                            }
                            if (!v.serverId) return // TODO: Dữ liệu response trả về

                            if (!itemResponse || !itemResponse.status) return
                            if (!itemResponse.data || !itemResponse.data.length) return
                            if (!itemResponse.data[0].filename) return
                            /*
                            * Truyền về dữ liệu ảnh đã up (1 ảnh)
                            * */
                            this.$emit('uploaded', itemResponse.data[0].filename)
                            this.$emit('uploadCompleted', true)
                            this.$awn.success('Tải lên thành công')
                            this.$emit('uploading', false)
                        })
                    }
                }).finally(() => {
                    /*
                    * Sau khi hoàn tất upload tất cả ảnh
                    * */
                    if (!isError) {
                        this.$emit('uploadCompleted', true)
                        this.$awn.success('Tải lên thành công')
                        this.$emit('uploading', false)
                    }
                }).catch(err=>{
                    this.$awn.alert('Tải ảnh thất bại!')
                    this.$emit('uploadFailed', true)
                })
            } else {
                this.$awn.alert('Chưa có file nào để upload')
                this.$emit('uploading', false)
            }
        }
    },
    watch: {
        /*
        * Khi có sự kiện 'Tải lên'
        * */
        triggerUpload: {
            immediate: true,
            handler(newValue, oldValue) {
                if (newValue) {
                    this.handleUploadFile()
                }
            }
        }
    },
    mounted() {
    },
    components: {
        FilePond
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
:deep {
    .filepond--hopper {
        cursor: pointer !important;
    }

    .filepond--credits {
        display: none !important;
    }

    .filepond--file-action-button {
        &.filepond--action-process-item {
            display: none !important;
        }
    }
    .filepond--item {
        width: calc(50% - 0.5em);
    }
    @media (min-width: 30em) {
        .filepond--item {
            width: calc(50% - 0.5em);
        }
    }

    @media (min-width: 50em) {
        .filepond--item {
            width: calc(33.33% - 0.5em);
        }
    }
}
</style>

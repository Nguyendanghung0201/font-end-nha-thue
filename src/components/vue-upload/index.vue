<template>
    <div class="vue-upload-file" v-show="value">
        <div class="vuf-drop-area"
             @click="handleClick"
             @dragleave="handleDragleave"
             @dragover="handleDragover"
             @dragenter="handleDragenter"
             @drop="handleDrop">
            <i class="vuf-icon1" v-show="loading != 1">
                <i class="vuf-icon1-arrow"></i>
                <i class="vuf-icon1-body"></i>
                <i class="vuf-icon1-bottom"></i>
            </i>
            <span class="vuf-hint" v-show="loading !== 1">{{ lang.hint }}</span>
            <span class="vuf-loading" v-show="loading === 1">{{ lang.loading }}</span>
            <div class="vuf-progress-wrap" v-show="loading === 1">
                <span class="vuf-progress" :style="progressStyle"></span>
            </div>
            <span class="vuf-no-supported-hint" v-show="!isSupported">{{ lang.noSupported }}</span>
            <input v-if="onlySingle" type="file" accept="image/*" v-show="false" @change="handleChange" ref="fileinput">
            <input v-else multiple type="file" accept="image/*" v-show="false" @change="handleChange" ref="fileinput">
        </div>
        <div class="mt-2">
            <span class="cursor-pointer" @click="handleClickHide">Đóng</span>
        </div>
        <div class="vuf-error" v-show="hasError">
            <i class="vuf-icon2"></i>
            {{ errorMsg }}
        </div>
        <div class="vuf-success" v-show="loading === 2">
            <i class="vuf-icon3"></i>
            {{ lang.success }}
        </div>
    </div>
</template>

<script>
'use strict'

import { getToken } from '@/helpers/auth'

export default {
    props: {
        // 域，上传文件name，触发事件会带上（如果一个页面多个图片上传控件，可以做区分
        field: {
            type: String,
            'default': 'upload'
        },
        // 类似于id，触发事件会带上（如果一个页面多个图片上传控件，可以做区分
        keyItem: {
            'default': 0
        },
        // 显示该控件与否
        value: {
            'default': true
        },
        url: {
            type: String,
            'default': ''
        },
        // 其他要上传文件附带的数据，对象格式
        params: {
            'default': null
        },
        // 单文件大小限制
        maxSize: {
            'default': 2048
        },
        // 仅限图片
        onlyImg: {
            'default': false
        },
        // 仅限单文件上传
        onlySingle: {
            'default': false
        },
        // 语言包
        langType: {
            type: String,
            'default': 'zh'
        },
        // 语言扩展
        langExt: {
            type: Object,
            'default': null
        }
    },
    data() {
        let that = this,
            { langExt, langType } = that,
            isSupported = true,
            langBags = {
                en: {
                    hint: 'Bấm vào đây để tải lên',
                    loading: 'Đang tải……',
                    noSupported: 'Browser does not support, please use IE10+ or other browsers',
                    success: 'Tải ảnh thành công',
                    fail: 'Tải ảnh thất bại',
                    error: {
                        onlyImg: 'Chỉ chấp nhập file là Ảnh',
                        onlySingle: 'Chỉ cho phép tải lên 1 ảnh/lần',
                        outOfSize: 'Ảnh qua nặng, chỉ cho phép: '
                    }
                }
            },
            lang = langBags[langType] ? langBags[langType] : langBags['zh']
        if (langExt) {
            Object.assign(lang, langExt)
        }
        if (typeof FormData != 'function') {
            isSupported = false
        }
        return {
            loading: 0, //0未开始 1正在 2成功 3错误
            lang,
            isSupported,
            hasError: false,
            files: '',
            progress: 0,
            errorMsg: ''
        }
    },
    computed: {
        progressStyle() {
            let { progress } = this
            return {
                width: progress + '%'
            }
        }
    },
    watch: {
        'value'(newValue) {
            if (newValue) {
                this.reset()
            }
        }
    },
    methods: {
        handleDragleave(e) {
            e.preventDefault()
        },
        handleDrop(e) {
            e.preventDefault()
            if (this.loading !== 1) {
                let files = e.dataTransfer.files
                this.reset()
                if (this.checkFiles(files)) {
                    this.upload(files)
                }
            }
        },
        handleDragenter(e) {
            e.preventDefault()

        },
        handleDragover(e) {
            e.preventDefault()

        },
        handleClick(e) {
            if (this.loading !== 1) {
                if (e.target !== this.$refs.fileinput) {
                    e.preventDefault()
                    this.$refs.fileinput.click()
                }
            }
        },
        handleChange(e) {
            if (this.loading !== 1) {
                let files = e.target.files
                this.reset()
                if (this.checkFiles(files)) {
                    this.upload(files)
                }
            }
        },
        checkFiles(files) {
            let that = this,
                { lang, maxSize, onlyImg, onlySingle } = that,
                fileNum = files.length
            // 是否文件为空
            if (fileNum == 0) {
                return false
            }

            // 仅限单文件？
            if (onlySingle && fileNum > 1) {
                that.hasError = true
                that.errorMsg = lang.error.onlySingle
                return false
            }

            for (let i = 0; i < fileNum; i++) {
                // 仅限图片
                if (onlyImg && files[i].type.indexOf('image') === -1) {
                    that.hasError = true
                    that.errorMsg = lang.error.onlyImg
                    return false
                }

                // 超出大小
                if (files[i].size / 1024 > maxSize) {
                    that.hasError = true
                    that.errorMsg = lang.error.outOfSize + maxSize + 'kb'
                    return false
                }
            }
            return true
        },
        reset() {
            let that = this
            that.loading = 0
            that.hasError = false
            that.errorMsg = ''
            that.progress = 0
        },
        upload(files) {
            let that = this,
                { url, params, onlySingle, field, keyItem, lang } = this,
                fmData = new FormData()

            if (onlySingle) {
                fmData.append(field, files[0])
            } else {
                fmData.append(field, files)
            }
            console.log(field)
            return

            // 添加其他参数
            if (typeof params == 'object' && params) {
                Object.keys(params).forEach((k) => {
                    fmData.append(k, params[k])
                })
            }

            // 监听进度回调
            const uploadProgress = function (event) {
                if (event.lengthComputable) {
                    that.progress = 100 * Math.round(event.loaded) / event.total
                }
            }

            // 上传文件
            that.loading = 1
            new Promise(function (resolve, reject) {
                let client = new XMLHttpRequest()
                client.open('POST', url, true)
                client.setRequestHeader('Authorization', that.getAuthHeader())
                client.onreadystatechange = function () {
                    if (this.readyState !== 4) {
                        return
                    }
                    const response = JSON.parse(this.responseText)
                    if (this.status === 200 && response && response.code == 0) {
                        resolve(response.data[0])
                    } else {
                        reject(response)
                    }
                }
                client.upload.addEventListener('progress', uploadProgress, false) //监听进度
                client.send(fmData)
            }).then(
                // 上传成功
                function (resData) {
                    that.loading = 2
                    that.$emit('uploadSuccess', resData, field, keyItem)
                },
                // 上传失败
                function (sts) {
                    that.loading = 3
                    that.hasError = true
                    that.errorMsg = lang.fail
                    that.$emit('uploadFail', sts, field, keyItem)
                }
            )
        },
        getAuthHeader() {
            return 'Bearer ' + getToken()
        },
        handleClickHide(){
            this.$emit('hide',true)
        }
    }
}

</script>

<style lang="scss" src="./style.scss" scoped></style>

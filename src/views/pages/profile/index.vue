<template>
    <div>
        <div class="nk-content nk-content-fluid pt-0">
            <div class="container-xl wide-lg">
                <div class="nk-content-body">
                    <div class="nk-block-head nk-block-head-sm">
                        <div class="nk-block-between">
                            <div class="nk-block-head-content">
                                <h3 class="nk-block-title page-title">{{ $t('profile.profile') }}</h3>
                            </div>
                        </div>
                    </div>
                    <ul class="nav nav-switch-s2 nav-tabs bg-white d-lg-none w-100">
                        <li class="nav-item">
                            <a @click="tab = 'INFO'" href="javascript:void(0)" :class="{'active': tab === 'INFO'}" class="nav-link btn btn-sm btn-outline-light cursor-pointer">
                                <em class="icon ni ni-clock"></em>
                                {{ $t('profile.info') }}
                            </a>
                        </li>
                        <li class="nav-item">
                            <a @click="tab = 'PASSWORD'" href="javascript:void(0)"
                               :class="{'active': tab === 'PASSWORD'}"
                               class="nav-link btn btn-sm btn-outline-light cursor-pointer text-success">
                                <em class="icon ni ni-check-circle"></em>
                                {{ $t('login.password') }}
                            </a>
                        </li>
                       
                    </ul>
                    <div class="card card-bordered">
                        <div class="card-aside-wrap">
                            <change-info-form v-if="tab === 'INFO'" @changePassword="changeTab" />
                            <change-password-form v-if="tab === 'PASSWORD'" @changeInfo="changeTab" />
                            <setting-key-form v-if="tab === 'SETTING'" @changeKey="changeTab"></setting-key-form>
                            <div class="card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg" data-content="userAside" data-toggle-screen="lg" data-toggle-overlay="true">
                                <div class="card-inner-group">
                                    <div class="card-inner">
                                        <div v-if="user" class="user-card">
                                            <div v-if="user.avatar" class="user-avatar bg-transparent">
                                                <b-img
                                                    class="rounded-circle h-100 w-100"
                                                    :src="getPublicAssetUrl(user.avatar)"
                                                    @error="getNoAvatar"
                                                    style="object-fit: cover;"
                                                    width="35" />
                                            </div>
                                            <div v-else-if="user.display_name" class="user-avatar">
                                                <span>
                                                    {{ user.display_name.charAt(0) }}
                                                </span>
                                            </div>
                                            <div v-else class="user-avatar">
                                                <em class="icon ni ni-user-alt fs-20px"></em>
                                            </div>
                                            <div class="user-info">
                                                <p class="lead-text line-1 mb-0">{{ user.display_name }}</p>
                                                <span class="sub-text">{{ user.email }}</span>
                                            </div>
                                            <div class="user-action">
                                                <div class="dropdown">
                                                    <a class="btn btn-icon btn-trigger mr-n2" data-toggle="dropdown" href="#">
                                                        <em class="icon ni ni-more-v"></em>
                                                    </a>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <ul class="link-list-opt no-bdr">
                                                            <li>
                                                                <a class="cursor-pointer" @click="showModal">
                                                                    <em class="icon ni ni-camera-fill"></em>
                                                                    <span>{{ $t('profile.change_avatar') }}</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-inner p-0">
                                        <ul class="link-list-menu">
                                            <li>
                                                <a @click="tab = 'INFO'" href="javascript:void(0)" :class="{'active': tab === 'INFO'}">
                                                    <em class="icon ni ni-user-fill-c"></em>
                                                    <span>{{ $t('profile.personal_info') }}</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a @click="tab = 'PASSWORD'" href="javascript:void(0)" :class="{'active': tab === 'PASSWORD'}">
                                                    <em class="icon ni ni-edit"></em>
                                                    <span>{{ $t('profile.change_password') }}</span>
                                                </a>
                                            </li>
                                            <li v-if="allMyFunction.length">
                                                <a @click="tab = 'SETTING'" href="javascript:void(0)" :class="{'active': tab === 'SETTING'}">
                                                    <b-icon icon="key" aria-hidden="true" class="fs-20px mr-2"></b-icon>
                                                    <span>{{ $t('profile.update_key') }}</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div><!-- .card-inner -->
                                </div><!-- .card-inner-group -->
                            </div><!-- .card-aside -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal ref="my-modal" hide-footer class="modal-sm" title="Ảnh đại diện">
            <div class="d-block text-left pb-3">
                <b-form @submit.prevent="">
                    <b-form-group
                        label-class="form-label-group"
                    >
                        <b-col class="card card-bordered p-0 dropzone-image">
                            <div class="form-control-wrap m-1">
                                <div class="image-layer d-flex justify-content-center">
                                    <b-button size="sm" variant="light" @click="handleSelectImage()">
                                        <span v-if="!form.image_url">{{ $t('profile.up_image') }}</span>
                                        <span v-else>{{ $t('profile.up_image') }}</span>
                                    </b-button>
                                    <input ref="image_upload_input" accept="image/jpg, image/png"
                                           class="d-none"
                                           hidden
                                           type="file"
                                           @change="handleImageChange" />
                                    <div v-model="previewImage" :style="getImage"
                                         class="no-image"></div>
                                    <div v-model="form.image_url" :style="getImage"
                                         class="no-image d-none"></div>
                                </div>
                            </div>
                        </b-col>
                    </b-form-group>
                </b-form>
            </div>
            <div class="d-flex align-items-center justify-content-end mt-2">
                <b-button class="w-fit-content" variant="outline-light" block @click="hideModal">{{ $t('button.cancel') }}</b-button>
                <b-button class="w-fit-content mt-0 ms-2" variant="success"
                          block
                          :disabled="requestSubmit"
                          @click.prevent="handleSubmitForm()"
                >
                    <span v-if="requestLoading" class="spinner-border spinner-border-sm mr-2" role="status" />
                    <span class="visually-hidden">Loading...</span>
                    {{ $t('button.update') }}
                </b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import ChangeInfoForm from './_changeInfoForm'
import ChangePasswordForm from './_changePasswordForm'
import SettingKeyForm from './_settingKeyForm'
import { getPublicAssetUrl, getUploadBaseUrl } from '@/helpers/common'
import { getToken } from '@/helpers/auth'
import NO_IMAGE from '@/assets/images/error/no-image.png'

const
    { validators } = window,
    { email, required, phone, isTrue, $label } = validators
export default {
    name: 'index',
    metaInfo() {
        return {
            title: this.$t('menu.view_profile')
        }
    },
    components: { ChangeInfoForm, ChangePasswordForm, SettingKeyForm },
    data() {
        return {
            tab: 'INFO',
            currentTab: this.$route.name,
            form: {},
            NO_IMAGE,
            requestSubmit: false,
            previewImage: null,
            uploadedImage: null,
            info: null,
            requestLoading: false,
            allMyFunction: []
        }
    },
    validations() {
        const rules = {
            image_url: {
                $label: $label('Ảnh đại diện')
            }
        }
        return {
            form: rules
        }
    },
    mounted() {
        if (this.user.avatar) {
            this.previewImage = this.getPublicAssetUrl(this.user.avatar)
        }
        this.getAllMyFunction()
    },
    methods: {
        getPublicAssetUrl,
        getUploadBaseUrl,
        getToken,
        getAllMyFunction() {
            this.setLoadingState(true)

            let postData = {
                limit: 99999
            }
            this.$store.dispatch('Service/getListFunction', postData).then((response) => {
                if (response.code === 0 && response.success) {
                    this.allMyFunction = response.data
                    this.setLoadingState(false)
                }
            }).catch(e => {
                // this.setFormError(e)
            }).finally(() => {
                this.requestLoading = false
                this.setLoadingState(false)
            })
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        handleSelectImage() {
            const ref = this.$refs.image_upload_input
            if (ref) {
                ref.click()
            }
        },
        handleSubmitForm() {
            if (this.requestLoading) return false
            this.requestLoading = true

            this.$v.form.$touch()
            const isError = this.$v.form.$error

            if (isError || this.requestSubmit) return

            this.requestSubmit = true
            const { image_url } = this.form
            this.handleUploadImage(image_url).then((res) => {
                this.$store.dispatch('Auth/info')
                this.hideModal()
            }).catch(e => {
                // this.setFormError(e)
            }).finally(() => {
                this.requestSubmit = false
                this.requestLoading = false
                this.$store.dispatch('Auth/info')
            })
        },
        handleImageChange(e) {
            const file = e.target.files[0]
            let reader = new FileReader()
            let vm = this
            reader.onload = (e) => {
                vm.form.image_url = file
                vm.previewImage = e.target.result
            }
            reader.readAsDataURL(file)
        },
        handleUploadImage(image) {
            let fmData = new FormData()
            fmData.append('avatar', image)

            const _this = this
            return new Promise((resolve, reject) => {
                if (image.size > 2097152) {
                    reject({ code: 507 })
                } else {
                    let client = new XMLHttpRequest()
                    client.open('POST', this.getUploadBaseUrl(), true)
                    client.setRequestHeader('Authorization', 'Bearer ' + this.getToken())
                    client.onreadystatechange = function () {
                        if (this.readyState !== 4) {
                            return reject()
                        }
                        if (this.status !== 200) {
                            reject()
                        } else {
                            const response = JSON.parse(this.responseText)
                            if (this.status === 200 && response && response.code == 0) {
                                // _this.$awnSuccess(_this.$t('dialog.update_avatar_success'))
                                _this.hideModal()
                                resolve()
                            } else {
                                if (response.code === 507) {
                                    // _this.$awnAlert(_this.$t('message.size_too_big'))
                                } else {
                                    // _this.$awnAlert(_this.$t('dialog.error'))
                                    _this.hideModal()
                                }
                                reject(response)
                            }
                        }
                    }
                    client.send(fmData)
                }
            })
        },
        changeTab(val) {
            this.tab = val
        }
    },
    computed: {
        user() {
            return this.$store.getters['Auth/user']
        },
        getImage() {
            if (!this.previewImage) {
                return 'background-image:url(' + this.NO_IMAGE + ')'
            }
            return 'background-image:url(' + this.previewImage + ')'
        }
    },
    watch: {
        'currentTab': {
            immediate: true,
            deep: true,
            handler(newVal) {
                if (newVal && newVal === 'profile.password') {
                    this.tab = 'PASSWORD'
                } else if (newVal && newVal === 'profile.info') {
                    this.tab = 'INFO'
                } else {
                    this.tab = 'SETTING'
                }
            }
        },
        'tab'(newVal) {
            if (newVal && newVal === 'PASSWORD') {
                this.$router.push({ name: 'profile.password' })
            } else if (newVal && newVal === 'SETTING') {
                this.$router.push({ name: 'profile.setting' })
            } else {
                this.$router.push({ name: 'profile.info' })
            }
        },
        'user': {
            immediate: true,
            deep: true,
            handler(newVal) {
                if (newVal && newVal.avatar) {
                    this.previewImage = this.getPublicAssetUrl(newVal.avatar)
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@media screen and (max-width: 549px) {
    .nav-switch-s2 {
        justify-content: space-between;
        margin-bottom: 10px;

        .nav-item {
            width: calc(50% - 5px);
            margin-left: 0 !important;
            margin-right: 0 !important;
            margin-bottom: 10px;

            .nav-link {
                width: 100%;
                border-radius: 0 !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
                justify-content: center;
            }
        }
    }
}
</style>
<style scoped lang="scss" src="../../../assets/scss/utilities/app.scss"></style>

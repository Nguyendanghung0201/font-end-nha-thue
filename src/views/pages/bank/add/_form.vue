<template>
    <div>
        <div class="nk-ibx-head">
            <div class="steps-bar w-100">
                <div class="d-flex align-items-center">
                    <div :class="{'active': currentStep >= 1}"
                         class="step-number image-circle d-flex align-items-center justify-content-center text-large fw-600 text-white">
                        1
                    </div>
                    <span class="text-large fw-600 text-center step-title">{{ $t('bank.verify')}}</span>
                </div>

                <span :class="{'active': currentStep >= 2}"
                      class="step-line"></span>
                <div class="d-flex align-items-center">
                    <div :class="{'active': currentStep >= 2}"
                         class="step-number image-circle d-flex align-items-center justify-content-center text-large fw-600 text-white">
                        2
                    </div>
                    <span class="text-large fw-600 text-center step-title">{{ $t('bank.choose_child_account')}}</span>
                </div>
            </div>
        </div><!-- .nk-ibx-head -->
        <div class="nk-ibx-list">
            <template v-if="currentStep == 1">

                <!-- Preloader -->
                <div v-if="requestLoading"
                     class="min-h-500px d-flex align-items-center justify-content-center w-100 bg-white"
                >
                    <div class="text-center">
                        <div class="spinner-border spinner-border-lg" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
                <!-- End Preloader -->

                <template v-else>
                    <div class="card-sm w-50 w-sm-100 mx-auto" v-if="detail">
                        <div class="user-avatar lg bg-primary mx-auto">
                            <b-img :src="detail.logo"></b-img>
                        </div>
                        <div class="nk-block-head nk-block-head-lg wide-sm mx-auto">
                            <div class="nk-block-head-content text-center mt-3">
                                <h4 class="nk-block-title fw-normal">{{ $t('bank.link_bank_account')}}</h4>
                                <h4 class="nk-block-title fw-normal">{{ detail.bank_name ?? '--' }}</h4>
                                <div class="nk-block-des">
                                    <p class="lead fs-14px text-success">{{ detail.type == 'personal' ? $t('bank.personal') :  $t('bank.enterprise') }}</p>
                                </div>
                            </div>
                        </div>
                        <b-form @submit.prevent="handleSubmitForm" aria-autocomplete="off" class="card-inner-group mx-auto">

                            <b-form-group
                                v-if="settings"
                                v-for="(item, i) in settings"
                                :key="i"
                                class="flex-grow-1 text-left"
                                label-class="form-label-group d-flex align-item-center"
                                :invalid-feedback="showHtmlError(item, 'form')"
                            >
                                <div class="form-control-wrap">
                                    <b-form-input
                                        type="text"
                                        v-model="$v.form[item].$model"
                                        autocomplete="off"
                                        :placeholder="item.charAt(0).toUpperCase() + item.slice(1).replace('_', ' ')"
                                        :class="{'is-invalid':(showHtmlError(item, 'form'))}"
                                        size="lg"
                                    />
                                </div>
                            </b-form-group>

                            <div class="nk-block-content ml-auto mt-sm-3 justify-content-center d-flex">
                                <router-link :to="{name: 'bank.add'}" class="btn btn-outline-light me-1 d-flex align-items-center justify-content-center  w-sm-50">Trở về</router-link>
                                <b-button
                                    class="btn btn-primary ml-0 ml-1 w-fit-content w-sm-50"
                                    variant="primary mt-0"
                                    block
                                    type="submit"
                                    :disabled="requestSubmit || $v.form.$error"
                                >
                                    <span v-if="requestSubmit" class="spinner-border spinner-border-sm mr-2" role="status" />
                                    <span class="visually-hidden">Loading...</span>
                                    {{ $t('bank.link')}}
                                </b-button>
                            </div>
                        </b-form>
                    </div>
                </template>
            </template>
            <template v-if="currentStep == 2">
                <ReviewBlock @back="prevStep" />
            </template>
        </div><!-- .nk-ibx-list -->
    </div>
</template>

<script>
import ReviewBlock from '@/views/pages/bank/add/_review.vue'

const
    { validators } = window,
    { email, required, phone, $label, sameAs, minLength, maxLength, numeric } = validators
export default {
    name: 'FormAddBank',
    components: {
        ReviewBlock
    },
    validations() {
        let settingRules = {}
        if (this.settings && this.settings.length) {
            for (const setting of this.settings) {
                settingRules = Object.assign({}, settingRules, {
                    [setting]: {
                        required,
                        $label: $label([setting.replace('_', ' ')])
                    }
                })
            }
        }
        return {
            form: Object.assign({}, settingRules)
        }
    },
    data() {
        return {
            form: {},
            requestLoading: false,
            showModal: false,
            showModalCancel: false,
            currentStep: 1,
            id: this.$route.params.id ?? null,
            settings: [],
            detail: null,
            requestSubmit: false
        }
    },
    mounted() {
        if (!this.id) {
            return this.$router.push({ name: 'catchAll' })
        }
        this.getSettingBank()
    },
    methods: {
        getSettingBank() {
            this.requestLoading = true
            this.$store.dispatch('Bank/getSettingBank', { id: this.id }).then((response) => {
                this.detail = response

                /*
                * TODO:
                * */
                let formData = {}
                let keySetting = this.lodash.map(response.setting, (v) => {
                    if (!v) return
                    let temp = {}
                    temp[v['key']] = v['value'] ?? null

                    formData = Object.assign({}, formData, temp)
                    return temp
                })
                this.form = formData
                let data = []
                this.lodash.forEach(keySetting, (v) => {
                    data.push(...Object.keys(v))
                })
                this.settings = data
                /*
                * */

            }).catch(e => {
                this.setFormError(e)
            }).finally(() => {
                setTimeout(() => {
                    this.requestLoading = false
                }, 1000)
            })
        },

        handleSubmitForm() {
            this.$v.form.$touch()
            const isError = this.$v.form.$error
            if (!isError) {
                this.requestSubmit = true
                let postData = {}
                for (const setting of this.settings) {
                    postData = Object.assign({}, postData, {
                        [setting]: this.form[setting]
                    })
                }

                postData['bank_id'] = this.id

                // this.$store.dispatch('Service/getSupport', postData).then((response) => {
                //     if(response.code === 0 && response.success) {
                //         this.showModal = true
                //     }
                // }).catch(e => {
                //     this.showModalCancel = true
                //     this.requestLoading = false
                // }).finally(() => {
                //     this.requestLoading = false
                // })
                setTimeout(() => {
                    this.currentStep = 2
                    this.requestSubmit = false
                }, 1000)
            }
        },

        handleBuy() {
            this.showModal = true
        },

        closeModal() {
            this.showModal = false
            this.showModalCancel = false
            this.requestLoading = false
            if (this.$route.name !== 'history-support.index') {
                this.$router.push({ name: 'history-support.index' })
            }
            this.$v.$reset()
        },

        handleExist() {
            history.back()
        },

        prevStep(val) {
            if (val) {
                this.currentStep = val
            }
        }
    },
    computed: {
        user() {
            return this.$store.getters['Auth/user']
        }
    },
    watch: {
        'user': {
            immediate: true,
            deep: true,
            handler(newVal) {
                if (newVal) {
                    this.form.username = this.user.username
                    this.form.email = this.user.email
                    this.form.phone = this.user.phone
                }
            }
        }
    }
}
</script>
<style scoped lang="scss">
:deep {
    .input-counter {
        display: none !important;
    }

    .data-label {
        width: 150px;
        max-width: 100%;
        flex-shrink: 0;
    }
}
</style>
<style scoped lang="scss" src="../../../../assets/scss/utilities/app.scss"></style>

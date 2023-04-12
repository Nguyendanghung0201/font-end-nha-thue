<template>
    <div>
        <div v-if="!data.length" class="d-flex align-items-center border rounded-3 justify-content-center min-h-300px">
            {{ $t('utilities.no_data') }}
        </div>
        <div v-else class="settings-wrapper">
            <div class="nk-block-head">
                <div class="nk-block-head-content w-100 title-fixed">
                    <div class="border border-purple bg-purple-light rounded-3 w-fit-content mx-auto py-1 px-4 d-flex align-items-center">
                        <b-img
                            width="30"
                            :src="require('@/assets/images/svg/webhook.svg')"
                        />
                        <h5 class="nk-block-title ml-2 text-purple">{{ $t('service.config') }}</h5>
                    </div>
                </div>
            </div>
            <div class="nk-block">
                <b-form class="gy-3 mt-3">
                    <div v-for="(item, index) in data" :key="index">
                        <b-form-group
                            v-if="item.key === 'bank_code'"
                            label-class="form-label-group"
                            :invalid-feedback="showHtmlError('bank_code', 'form')"
                        >
                            <template #label>
                                <label class="form-label">
                                    {{ getLabel('bank_code', 'form', true) }}
                                </label>
                            </template>
                            <BootstrapSelect
                                :search="true"
                                v-model.trim="form.setting[item.key]"
                                :options="options"
                                :dropdown-classes="'w-100'"
                                :dropdown-menu-classes="'w-100'"
                                class="form-control-lg border" />
                        </b-form-group>
                        <b-form-group
                            v-else
                            label-class="form-label-group"
                            class="position-relative"
                            :invalid-feedback="showHtmlError(item.key, 'form')"
                        >
                            <template #label>
                                <label class="form-label">
                                    {{ getLabel(item.key, 'form', true) }}
                                </label>
                            </template>
                            <span v-if="item.key === 'password_bank'" class="form-icon form-icon-right passcode-switch cursor" @click="showPassword = !showPassword">
                                <em class="passcode-icon icon-show icon ni ni-eye" v-if="!showPassword"></em>
                                <em class="passcode-icon icon-show icon ni ni-eye-off" v-else></em>
                            </span>
                            <b-form-input
                                v-model.trim="form.setting[item.key]"
                                :placeholder="getLabel(item.key, 'form')"
                                autocomplete="off"
                                :type="item.key === 'password_bank' && !showPassword  ? 'password' : 'text'"
                                ref="autofocus"
                                :class="{'is-invalid':(showHtmlError(item.key, 'form')),
                            'input-disable': !item.agent_update}"
                            />
                            <span @click="copyToClipBoard(form.setting[item.key])" class="not-change-text cursor-pointer bg-white pl-2" :class="{'d-none': item.agent_update}">
                                <em class="icon ni ni-copy fs-18px"></em>
                            </span>
                        </b-form-group>
                    </div>
                    <div v-if="hasConfig" class="form-group mt-2">
                        <b-button
                            size="lg"
                            variant="primary"
                            block
                            type="submit"
                            @click="showModal"
                            :disabled="requestSubmit && $v.form.$error && !form.bank && !form.branch && !form.account_number && !form.account_name"
                        >
                            <span v-if="requestSubmit" class="spinner-border spinner-border-sm mr-3" />
                            {{ $t('button.confirm') }}
                        </b-button>
                    </div>
                </b-form>
            </div>
            <b-modal ref="my-modal" hide-footer hide-header class="modal-sm">
                <div class="d-block text-left pb-3">
                    <p class="fs-18px d-flex align-items-center lh-20">
                        {{ $t('message.change_info_confirm') }}
                    </p>
                </div>
                <div class="d-flex align-items-center justify-content-end mt-2">
                    <b-button class="w-fit-content" variant="outline-light" block @click="hideModal">{{ $t('button.cancel') }}</b-button>
                    <b-button class="w-fit-content mt-0 ms-2" variant="success" block @click="handleSubmit">{{ $t('button.update') }}</b-button>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
import BootstrapSelect from '@/components/BootstrapSelect'
import { getLanguage, removeAccents } from '@/helpers/common.js'
const
    { validators } = window,
    { email, required, phone, sameAs, $label, minLength, maxLength, numeric } = validators
export default {
    name: 'settingForm',
    validations() {
        let rules = {}
        if (this.form.setting) {
            this.lodash.forEach(this.form.setting, (v, k) => {
                rules = Object.assign({}, rules, {
                    [k]: {
                        $label: $label(this.$t(`service.${k}`))
                    }
                })
            })
        }
        return {
            form: rules
        }
    },
    data() {
        return {
            form: { setting: {} },
            requestLoading: false,
            requestSubmit: false,
            isShow: false,
            options: [],
            data: [],
            showPassword: false,
            hasConfig: false
        }
    },
    props: {
        code: {
            type: String
        }
    },
    components: {
        BootstrapSelect
    },
    created() {
        this.getListBank()
    },
    methods: {
        removeAccents,
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
            this.getConfigService(this.code)
        },
        handleSubmit() {
            this.$v.form.$touch()
            const isError = this.$v.form.$error
            if (!isError) {
                this.requestLoading = true

                let postData = {
                    code_service: this.code,
                    lang: this.lang || 'vi'
                }

                let temp = {}
                this.lodash.map(this.data, (v, k) => {
                    if (v.agent_update) {
                        return temp = Object.assign(temp, {
                            [v.key]: v.value
                        })
                    }
                })

                this.lodash.map(temp, (v, k) => {
                    postData = Object.assign(postData, {
                        [k]: this.form.setting[k]
                    })
                })

                this.$store.dispatch('Service/updateConfigService', postData).then((response) => {
                    this.$awnSuccess(this.$t('message.change_info_successfully'))
                    this.isShow = false
                }).catch(e => {
                    this.setFormError(e)
                }).finally(() => {
                    this.requestLoading = false
                    this.hideModal()
                })
            }
        },
        getConfigService(code) {
            this.setLoadingState(true)
            let payload = {
                code_service: code,
                lang: this.lang || 'vi'
            }

            this.$store.dispatch('Service/getConfigService', payload).then((response) => {
                if (response.code === 0 && response.success) {
                    this.data = response.data

                    let temp = {}

                    this.lodash.map(this.data, (v, k) => {
                        if (v.agent_update) {
                            this.hasConfig = true
                        }
                        return temp = Object.assign(temp, {
                            [v.key]: v.value
                        })
                    })
                    this.form.setting = temp

                }
            }).catch(e => {
                this.setFormError(e)
            }).finally(() => {
                this.requestLoading = false
                this.setLoadingState(false)
            })
        },
        getListBank() {
            let postData = {
                limit: 999999
            }
            this.$store.dispatch('Bank/getListBank', postData).then((response) => {
                if (response.code === 0 && response.success) {

                    const data = response.data
                    if(this.lang === 'en') {
                        this.lodash.forEach(data, (v, k) => {
                            this.options.push({
                                value: v.short_code,
                                text: removeAccents(v.name) + ' (' + v.short_code + ')'
                            })
                        })
                    } else {
                        this.lodash.forEach(data, (v, k) => {
                            this.options.push({
                                value: v.short_code,
                                text: v.name + ' (' + v.short_code + ')'
                            })
                        })
                    }
                }
            }).catch(e => {
                this.setFormError(e)
            }).finally(() => {
                this.requestLoading = false
                this.setLoadingState(false)
            })
        }
    },
    computed: {
        lang() {
            return getLanguage()
        }
    },
    watch: {
        'code': {
            immediate: true,
            deep: true,
            handler(newVal) {
                if (newVal) {
                    this.getConfigService(newVal)
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
}
</style>


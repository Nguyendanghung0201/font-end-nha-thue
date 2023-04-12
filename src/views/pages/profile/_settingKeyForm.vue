<template>
    <div class="card-inner card-inner-lg">
        <div class="nk-block-head nk-block-head-lg pb-4">
            <div class="nk-block-between">
                <div class="nk-block-head-content">
                    <h4 class="nk-block-title">{{ $t('profile.update_key') }}</h4>
                </div>
            </div>
            <div v-if="isRegisterService" class="nk-block-content mt-4 alert alert-danger rounded-3 p-2">
                <span class="text-danger fw-medium fs-16px d-flex align-items-center mb-1">
                    <b-icon icon="lightbulb" aria-hidden="true" class="mr-1"></b-icon>
                    {{ $t('message.note') }}
                </span>
                <ul style="list-style: inside">
                    <li style="list-style: unset">{{ $tc('message.get_key', 1) }}</li>
                    <li style="list-style: unset" class="mt-1">
                        <span>{{ $tc('message.get_key', 2) }}</span>
                        <br>
                        <a href="https://sales.timebitotc.com/generate-keygen" target="_blank" class="fw-medium mt-1 d-block">
                            <em class="icon ni ni-curve-down-right"></em>
                            Public key
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="nk-block">
            <div class="mb-3">
                <div class="mb-1 d-flex align-center">
                    <span class="text-dark fw-medium mr-1">{{ $t('profile.api_key') }}</span>
                    <a class="dropdown-toggle" data-toggle="dropdown">
                        <em class="icon ni ni-help text-danger fs-18px"></em>
                    </a>
                    <div class="dropdown-menu reject-note dropdown-menu-left">
                        <div class="link-list-opt no-bdr p-3 w-300px text-break-spaces">{{ $t('profile.api_key_note') }}
                        </div>
                    </div>
                </div>
                <div class="border rounded-3 position-relative p-3">
                    {{ api_key }}
                    <span @click="copyToClipBoard(api_key)" class="not-change-text cursor-pointer bg-white pl-2">
                        <em class="icon ni ni-copy fs-18px"></em>
                    </span>
                </div>
            </div>
            <div class="mb-3">
                <div class="mb-1 d-flex align-center">
                    <span class="text-dark fw-medium mr-1">{{ $t('profile.public_key_system') }}</span>
                    <a class="dropdown-toggle" data-toggle="dropdown">
                        <em class="icon ni ni-help text-danger fs-18px"></em>
                    </a>
                    <div class="dropdown-menu reject-note dropdown-menu-left">
                        <div class="link-list-opt no-bdr p-3 w-300px text-break-spaces">{{ $tc('profile.public_key_notes', 2) }}
                        </div>
                    </div>
                </div>
                <div class="border rounded-3 position-relative p-3">
                    {{ public_key_system ?? '--' }}
                    <span @click="copyToClipBoard(public_key_system)" class="not-change-text cursor-pointer bg-white pl-2">
                        <em class="icon ni ni-copy fs-18px"></em>
                    </span>
                </div>
            </div>
            <b-form v-if="isRegisterService" @submit.prevent="" aria-autocomplete="off">
                <div class="border-bottom-0">
                    <b-form-group
                        class="flex-grow-1 mb-0 text-left"
                        :class="{'mt-4': form.public_key_system}"
                        label-class="form-label-group d-flex align-item-center"
                        :invalid-feedback="showHtmlError('key', 'form')"
                    >
                        <div class="d-flex align-center mb-1">
                            <label class="form-label d-flex align-center mb-0">
                                <span> {{ getLabel('key', 'form', true) }}
                                </span>
                            </label>
                            <a class="dropdown-toggle ml-1" data-toggle="dropdown">
                                <em class="icon ni ni-help text-danger fs-18px"></em>
                            </a>
                            <div class="dropdown-menu reject-note dropdown-menu-left">
                                <div class="link-list-opt no-bdr p-3 w-300px text-break-spaces">{{ $tc('profile.public_key_notes', 1) }}</div>
                            </div>
                        </div>
                        <div class="form-control-wrap">
                            <b-form-textarea
                                class="mx-auto rounded-3 fs-14px"
                                v-model.trim="$v.form.key.$model"
                                autocomplete="off"
                                :placeholder="getLabel('key', 'form')"
                                debounce="500"
                                rows="6"
                                max-rows="6">

                            </b-form-textarea>
                        </div>
                    </b-form-group>
                </div>
                <div class="form-group text-end mt-4">
                    <b-button
                        size="md"
                        variant="success"
                        block
                        class="w-fit-content"
                        type="submit"
                        @click="showModal"
                        :disabled="requestLoading || $v.form.$error || !form.key"
                    >
                        <span v-if="requestLoading" class="spinner-border spinner-border-sm mr-2" role="status" />
                        <span class="visually-hidden">Loading...</span>
                        {{ $t('button.update') }}
                    </b-button>
                </div>
            </b-form>
            <div v-else class="alert alert-danger">
                <span class="d-flex align-items-center">
                    <em class="icon ni ni-alert-circle fs-18px mr-1"></em>
                    {{ $t('message.not_register_service') }}
                </span>
            </div>
        </div>
        <b-modal ref="my-modal" hide-footer hide-header class="modal-sm">
            <div class="d-block text-left pb-3">
                <p class="fs-18px d-flex align-items-center lh-20">
                    <em class="icon ni ni-info me-1 fs-20px"></em>
                    {{ $t('message.update_key') }}
                </p>
            </div>
            <div class="d-flex align-items-center justify-content-end mt-2">
                <b-button class="w-fit-content" variant="outline-light" block @click="hideModal">{{ $t('button.cancel') }}</b-button>
                <b-button class="w-fit-content mt-0 ms-2" variant="success" block @click="handleSubmit">
                    <span v-if="requestLoading" class="spinner-border spinner-border-sm mr-2" role="status" />
                    <span class="visually-hidden">Loading...</span>
                    {{ $t('button.update') }}
                </b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
const
    { validators } = window,
    { required, $label, sameAs, minLength, maxLength, password } = validators
export default {
    name: 'settingKeyForm',
    metaInfo() {
        return {
            title: this.$t('profile.update_key')
        }
    },
    validations() {
        const rules = {
            key: {
                required,
                $label: $label(this.$t('profile.public_key')),
                minLength: minLength(6),
                maxLength: maxLength(500)
            }

        }
        return {
            form: rules
        }
    },
    data() {
        return {
            form: {
                key: null
            },
            public_key_system: null,
            requestLoading: false,
            isRegisterService: true,
            api_key: null
        }
    },
    mounted() {
        this.getSettingKey()
    },
    methods: {
        getSettingKey() {
            this.setLoadingState(true)
            this.$store.dispatch('Auth/getSettingKey').then((response) => {
                if (response.code === 0 && response.success) {
                    if (response.data.api_key === '') {
                        this.isRegisterService = false
                    }
                    if (response.data.public_key_agent) {
                        this.form.key = response.data.public_key_agent
                    }
                    if (response.data.public_key) {
                        this.public_key_system = response.data.public_key
                    }
                    if (response.data.api_key) {
                        this.api_key = response.data.api_key
                    }
                }
            }).catch(e => {
                this.setFormError(e)
            }).finally(() => {
                this.requestLoading = false
                this.setLoadingState(false)
            })
        },
        handleSubmit() {
            this.$v.form.$touch()
            const isError = this.$v.form.$error
            if (!isError) {
                this.requestLoading = true

                const {
                    key
                } = this.form

                let postData = {
                    public_key_agent: key
                }

                this.$store.dispatch('Auth/updateSettingKey', postData).then((response) => {
                    if (!response.success) {
                        this.setFormError(e)
                        this.$awnAlert(this.$t('message.change_key_failed'))
                    }
                    this.$awnSuccess(this.$t('message.change_key_successfully'))
                    this.$v.$reset()

                    this.getSettingKey()
                }).catch(e => {
                    this.setFormError(e)
                }).finally(() => {
                    this.hideModal()
                    this.requestLoading = false
                })
            }
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        changeKey() {
            this.$emit('changeKey', 'SETTING')
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
<style scoped lang="scss" src="../../../assets/scss/utilities/app.scss"></style>

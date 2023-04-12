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
    >
        <template #header-close-content>
            <button type="button" aria-label="Close" class="close">×</button>
        </template>

        <template #modal-title>
            <h5>
                {{ $t('bank.edit_app')}}
            </h5>
        </template>

        <div class="mt-0">
            <div class="modal-body">

                <!-- Preloader -->
                <div v-if="requestLoading"
                     class="min-h-300px d-flex align-items-center justify-content-center w-100 bg-white"
                >
                    <div class="text-center">
                        <div class="spinner-border spinner-border-lg" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
                <!-- End Preloader -->

                <template v-else>
                    <div class="example-alert cursor-pointer pb-4">
                        <div class="alert alert-gray alert-icon px-4">
                            <div class="user-card">
                                <div class="user-avatar" style="background: none">
                                    <img :src="data.img" alt="">
                                </div>
                                <div class="user-info">
                                    <span class="lead-text">
                                        {{ data.name }}
                                    </span>
                                    {{ data.description }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <b-form @submit.prevent="handleSubmitForm" aria-autocomplete="off" class="card-inner-group mx-auto">
                        <b-form-group
                            v-if="settings"
                            v-for="(item, i) in settings"
                            :key="i"
                            label-cols-lg="3"
                            content-cols-sm
                            content-cols-lg="9"
                            class="flex-grow-1 text-left"
                            label-class="form-label-group d-flex align-item-center"
                            :invalid-feedback="showHtmlError(item, 'form')"
                        >
                            <template #label>
                                <label class="form-label">
                                    {{ (item.charAt(0).toUpperCase() + item.slice(1)).replace('_', ' ') }}
                                    <span class="text-danger">*</span>
                                </label>
                            </template>
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
                        <hr class="dashed">

                        <b-row>
                            <div class="d-flex align-items-center justify-content-center col-lg-6 mx-auto">
                                <button
                                    @click="hideModal()"
                                    type="button"
                                    class="btn w-fit-content btn-outline-light btn-block btn-lg"
                                >
                                    {{ $t('button.cancel')}}
                                </button>
                                <button
                                    type="button"
                                    class="btn w-fit-content mt-0 ms-2 btn-primary btn-block btn-lg"
                                    :disabled="requestSubmit || $v.form.$error"
                                >
                                    <span v-if="requestSubmit" class="spinner-border spinner-border-sm mr-2" role="status" />
                                    <span class="visually-hidden">Loading...</span>
                                    {{ $t('button.update')}}
                                </button>
                            </div>
                        </b-row>

                    </b-form>
                </template>
            </div>
        </div>
    </b-modal>

</template>

<script>
const
    { validators } = window,
    { email, required, phone, $label, sameAs, minLength, maxLength, numeric } = validators
export default {
    name: 'ModalEdit',
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
            default: () => {
                return null
            }
        }
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
            show: true,
            form: null,
            requestSubmit: false,
            requestLoading: false,
            settings: []
        }
    },
    mounted() {
        this.requestLoading = true

        setTimeout(() => {
            this.requestLoading = false
        }, 2000)
    },
    methods: {
        hideModal() {
            this.$refs['modal'].hide()
        },

        onModalHidden() {
            this.$emit('close', this.value)
        },

        handleSubmitForm() {
            this.$v.form.$touch()
            const isError = this.$v.form.$error
            if (!isError) {
                this.requestSubmit = true
            }
        }
    },
    watch: {
        value(newValue, oldValue) {
            this.show = newValue
        },
        'data': {
            immediate: true,
            handler(value) {
                if (value) {
                    let formData = {}
                    let keySetting = this.lodash.map(value.setting, (v) => {
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
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
.spinner-border-lg {
    width: 1.8rem!important;
    height: 1.8rem!important;
}
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

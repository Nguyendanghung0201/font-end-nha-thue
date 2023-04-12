<template>
    <div id="support" class="d-flex align-items-start justify-content-center">
        <div class="card card-bordered w-450px m-auto support-content">
            <div class="card-inner text-center px-sm-5">
                <svg class="d-none d-sm-block mx-auto" width="100px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 118"><path d="M8.916,94.745C-.318,79.153-2.164,58.569,2.382,40.578,7.155,21.69,19.045,9.451,35.162,4.32,46.609.676,58.716.331,70.456,1.845,84.683,3.68,99.57,8.694,108.892,21.408c10.03,13.679,12.071,34.71,10.747,52.054-1.173,15.359-7.441,27.489-19.231,34.494-10.689,6.351-22.92,8.733-34.715,10.331-16.181,2.192-34.195-.336-47.6-12.281A47.243,47.243,0,0,1,8.916,94.745Z" transform="translate(0 -1)" fill="#f6faff"></path><rect x="18" y="32" width="84" height="50" rx="4" ry="4" fill="#fff"></rect><rect x="26" y="44" width="20" height="12" rx="1" ry="1" fill="#e5effe"></rect><rect x="50" y="44" width="20" height="12" rx="1" ry="1" fill="#e5effe"></rect><rect x="74" y="44" width="20" height="12" rx="1" ry="1" fill="#e5effe"></rect><rect x="38" y="60" width="20" height="12" rx="1" ry="1" fill="#e5effe"></rect><rect x="62" y="60" width="20" height="12" rx="1" ry="1" fill="#e5effe"></rect><path d="M98,32H22a5.006,5.006,0,0,0-5,5V79a5.006,5.006,0,0,0,5,5H52v8H45a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H73a2,2,0,0,0,2-2V94a2,2,0,0,0-2-2H66V84H98a5.006,5.006,0,0,0,5-5V37A5.006,5.006,0,0,0,98,32ZM73,94v4H45V94Zm-9-2H54V84H64Zm37-13a3,3,0,0,1-3,3H22a3,3,0,0,1-3-3V37a3,3,0,0,1,3-3H98a3,3,0,0,1,3,3Z" transform="translate(0 -1)" fill="#798bff"></path><path d="M61.444,41H40.111L33,48.143V19.7A3.632,3.632,0,0,1,36.556,16H61.444A3.632,3.632,0,0,1,65,19.7V37.3A3.632,3.632,0,0,1,61.444,41Z" transform="translate(0 -1)" fill="#6576ff"></path><path d="M61.444,41H40.111L33,48.143V19.7A3.632,3.632,0,0,1,36.556,16H61.444A3.632,3.632,0,0,1,65,19.7V37.3A3.632,3.632,0,0,1,61.444,41Z" transform="translate(0 -1)" fill="none" stroke="#6576ff" stroke-miterlimit="10" stroke-width="2"></path><line x1="40" y1="22" x2="57" y2="22" fill="none" stroke="#fffffe" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line><line x1="40" y1="27" x2="57" y2="27" fill="none" stroke="#fffffe" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line><line x1="40" y1="32" x2="50" y2="32" fill="none" stroke="#fffffe" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line><line x1="30.5" y1="87.5" x2="30.5" y2="91.5" fill="none" stroke="#9cabff" stroke-linecap="round" stroke-linejoin="round"></line><line x1="28.5" y1="89.5" x2="32.5" y2="89.5" fill="none" stroke="#9cabff" stroke-linecap="round" stroke-linejoin="round"></line><line x1="79.5" y1="22.5" x2="79.5" y2="26.5" fill="none" stroke="#9cabff" stroke-linecap="round" stroke-linejoin="round"></line><line x1="77.5" y1="24.5" x2="81.5" y2="24.5" fill="none" stroke="#9cabff" stroke-linecap="round" stroke-linejoin="round"></line><circle cx="90.5" cy="97.5" r="3" fill="none" stroke="#9cabff" stroke-miterlimit="10"></circle><circle cx="24" cy="23" r="2.5" fill="none" stroke="#9cabff" stroke-miterlimit="10"></circle></svg>
                <div class="nk-block-head nk-block-head-lg wide-sm mx-auto">
                    <div class="nk-block-head-content text-center mt-3">
                        <h4 class="nk-block-title fw-normal">{{ $t('message.can_i_help')}}</h4>
                        <div class="nk-block-des">
                            <p class="lead fs-14px">{{ $tc('message.support_message', 1) }}<br> {{ $tc('message.support_message', 2) }}</p>
                        </div>
                    </div>
                </div>
                <b-form @submit.prevent="" aria-autocomplete="off" class="card-inner-group mx-auto">
                    <b-form-group
                        :invalid-feedback="showHtmlError('email', 'form')"
                        label-class="form-label-group"
                        class="text-left"
                    >
                        <b-form-input
                            v-model.trim="$v.form.email.$model"
                            :placeholder="getLabel('email', 'form')"
                            autocomplete="off"
                            class="fs-14px input-disable"
                            type="email"
                            :class="{'is-invalid':(showHtmlError('email', 'form'))}"
                            :counter="getInputMaxLength('email', 'form')"
                            ref="autofocus"
                            size="lg"
                        />
                    </b-form-group>
                    <b-form-group
                        class="flex-grow-1 text-left"
                        label-class="form-label-group d-flex align-item-center"
                        :invalid-feedback="showHtmlError('username', 'form')"
                    >
                        <!--                                            <template #label>-->
                        <!--                                                <label class="form-label">-->
                        <!--                                                    {{ getLabel('username', 'form', true) }}-->
                        <!--                                                </label>-->
                        <!--                                            </template>-->
                        <div class="form-control-wrap">
                            <b-form-input
                                type="text"
                                v-model.trim="$v.form.username.$model"
                                autocomplete="off"
                                :placeholder="getLabel('username', 'form')"
                                :class="{'is-invalid':(showHtmlError('username', 'form')), 'input-disable': user.username}"
                                :counter="getInputMaxLength('username', 'form')"
                                size="lg"
                            />
                        </div>
                    </b-form-group>

                    <b-form-group
                        class="flex-grow-1 text-left"
                        :invalid-feedback="showHtmlError('phone', 'form')"
                        label-class="form-label-group"
                    >
                        <div class="form-control-wrap">
                            <b-form-input
                                type="number"
                                class="input-disable"
                                v-model.trim="$v.form.phone.$model"
                                autocomplete="off"
                                :placeholder="getLabel('phone', 'form')"
                                :class="{'is-invalid':(showHtmlError('phone', 'form'))}"
                                :counter="getInputMaxLength('phone', 'form')"
                                size="lg"
                            />
                        </div>
                    </b-form-group>
                    <b-form-group
                        class="flex-grow-1 mb-0 text-left"
                        label-class="form-label-group d-flex align-item-center"
                        :invalid-feedback="showHtmlError('description', 'form')"
                    >
                        <div class="form-control-wrap">
                            <b-form-textarea
                                class="mx-auto rounded-3 fs-14px"
                                v-model.trim="$v.form.description.$model"
                                autocomplete="off"
                                :placeholder="getLabel('description', 'form')"
                                debounce="500"
                                rows="5"
                                max-rows="5">

                            </b-form-textarea>
                        </div>
                    </b-form-group>
                    <div class="nk-block-content w-fit-content ml-auto mt-sm-3 support-action">
                        <b-button
                            class="btn btn-primary ml-0 support-button mr-1"
                            variant="primary mt-0"
                            block
                            @click="handleExist"
                            type="submit"
                        >
                            {{ $t('button.exist') }}
                        </b-button>
                        <b-button
                            class="btn btn-primary ml-0 support-button ml-1"
                            variant="primary mt-0"
                            block
                            type="submit"
                            @click="handleSupport"
                            :disabled="requestLoading || $v.form.$error || !form.description || !form.email || !form.username || !form.phone"
                        >
                            <span v-if="requestLoading" class="spinner-border spinner-border-sm mr-2" role="status" />
                            <span class="visually-hidden">Loading...</span>
                            {{ $t('button.send') }}
                        </b-button>
                    </div>
                </b-form>
            </div>
        </div>
        <div v-if="showModal" id="modal-buy" class="d-flex align-items-center justify-center">
            <div class="modal-buy-wrapper bg-white position-relative">
                <em @click="closeModal" class="icon ni ni-cross-sm close-modal-btn cursor-pointer"></em>
                <div class="modal-buy-content text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 118"><path d="M8.916,94.745C-.318,79.153-2.164,58.569,2.382,40.578,7.155,21.69,19.045,9.451,35.162,4.32,46.609.676,58.716.331,70.456,1.845,84.683,3.68,99.57,8.694,108.892,21.408c10.03,13.679,12.071,34.71,10.747,52.054-1.173,15.359-7.441,27.489-19.231,34.494-10.689,6.351-22.92,8.733-34.715,10.331-16.181,2.192-34.195-.336-47.6-12.281A47.243,47.243,0,0,1,8.916,94.745Z" transform="translate(0 -1)" fill="#f6faff"></path><rect x="18" y="32" width="84" height="50" rx="4" ry="4" fill="#fff"></rect><rect x="26" y="44" width="20" height="12" rx="1" ry="1" fill="#e5effe"></rect><rect x="50" y="44" width="20" height="12" rx="1" ry="1" fill="#e5effe"></rect><rect x="74" y="44" width="20" height="12" rx="1" ry="1" fill="#e5effe"></rect><rect x="38" y="60" width="20" height="12" rx="1" ry="1" fill="#e5effe"></rect><rect x="62" y="60" width="20" height="12" rx="1" ry="1" fill="#e5effe"></rect><path d="M98,32H22a5.006,5.006,0,0,0-5,5V79a5.006,5.006,0,0,0,5,5H52v8H45a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H73a2,2,0,0,0,2-2V94a2,2,0,0,0-2-2H66V84H98a5.006,5.006,0,0,0,5-5V37A5.006,5.006,0,0,0,98,32ZM73,94v4H45V94Zm-9-2H54V84H64Zm37-13a3,3,0,0,1-3,3H22a3,3,0,0,1-3-3V37a3,3,0,0,1,3-3H98a3,3,0,0,1,3,3Z" transform="translate(0 -1)" fill="#798bff"></path><path d="M61.444,41H40.111L33,48.143V19.7A3.632,3.632,0,0,1,36.556,16H61.444A3.632,3.632,0,0,1,65,19.7V37.3A3.632,3.632,0,0,1,61.444,41Z" transform="translate(0 -1)" fill="#6576ff"></path><path d="M61.444,41H40.111L33,48.143V19.7A3.632,3.632,0,0,1,36.556,16H61.444A3.632,3.632,0,0,1,65,19.7V37.3A3.632,3.632,0,0,1,61.444,41Z" transform="translate(0 -1)" fill="none" stroke="#6576ff" stroke-miterlimit="10" stroke-width="2"></path><line x1="40" y1="22" x2="57" y2="22" fill="none" stroke="#fffffe" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line><line x1="40" y1="27" x2="57" y2="27" fill="none" stroke="#fffffe" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line><line x1="40" y1="32" x2="50" y2="32" fill="none" stroke="#fffffe" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></line><line x1="30.5" y1="87.5" x2="30.5" y2="91.5" fill="none" stroke="#9cabff" stroke-linecap="round" stroke-linejoin="round"></line><line x1="28.5" y1="89.5" x2="32.5" y2="89.5" fill="none" stroke="#9cabff" stroke-linecap="round" stroke-linejoin="round"></line><line x1="79.5" y1="22.5" x2="79.5" y2="26.5" fill="none" stroke="#9cabff" stroke-linecap="round" stroke-linejoin="round"></line><line x1="77.5" y1="24.5" x2="81.5" y2="24.5" fill="none" stroke="#9cabff" stroke-linecap="round" stroke-linejoin="round"></line><circle cx="90.5" cy="97.5" r="3" fill="none" stroke="#9cabff" stroke-miterlimit="10"></circle><circle cx="24" cy="23" r="2.5" fill="none" stroke="#9cabff" stroke-miterlimit="10"></circle></svg>
                    <h5 class="fw-bold text-center mt-3">{{ $tc('message.buy_message', 1) }}</h5>
                    <p class="fs-15px text-center mt-3 mb-4">{{ $tc('message.buy_message', 2) }} {{ $t('message.as_soon_as') }}.</p>
                    <div class="modal-action d-flex align-items-center justify-center">
                        <button @click="closeModal" class="btn btn-primary ml-1 cursor-pointer">
                            {{ $t('button.close') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="showModalCancel" id="modal-process" class="d-flex align-items-center justify-center">
            <div class="modal-buy-wrapper bg-white position-relative">
                <em @click="closeModal" class="icon ni ni-cross-sm close-modal-btn cursor-pointer"></em>
                <div class="modal-buy-content text-center">
                    <em class="icon ni ni-alert-circle text-danger fs-50px"></em>
                    <h5 class="fw-bold text-center mt-3">{{ $tc('message.wait_process', 1) }}</h5>
                    <p class="fs-15px text-center mt-3 mb-4">{{ $tc('message.wait_process', 2) }}</p>
                    <div class="modal-action d-flex align-items-center justify-center">
                        <button @click="closeModal" class="btn btn-primary ml-1 cursor-pointer">
                            {{ $t('button.close') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const
    { validators } = window,
    { email, required, phone, $label, sameAs, minLength, maxLength, numeric } = validators
export default {
    name: 'index',
    metaInfo() {
        return {
            title: this.$t('menu.support')
        }
    },
    validations() {
        const rules = {
            email: {
                required,
                email,
                $label: $label(this.$t('login.email')),
                maxLength: maxLength(50)
            },
            username: {
                $label: $label(this.$t('profile.name')),
                minLength: minLength(6),
                maxLength: maxLength(50)
            },
            phone: {
                $label: $label(this.$t('profile.phone')),
                minLength: minLength(10),
                maxLength: maxLength(20)
            },
            description: {
                required,
                $label: $label(this.$t('message.content_support')),
                minLength: minLength(10)
            }
        }
        return {
            form: rules
        }
    },
    data() {
        return {
            form: {
                email: null,
                username: null,
                phone: null,
                description: null,
            },
            requestLoading: false,
            showModal: false,
            showModalCancel: false,
        }
    },
    methods: {
        handleSupport() {
            this.$v.form.$touch()
            const isError = this.$v.form.$error
            if (!isError) {
                this.requestLoading = true
                const { email, username, phone, description } = this.form

                let postData = {
                    email: email,
                    name: username,
                    phone: phone,
                    description: description
                }

                this.$store.dispatch('Service/getSupport', postData).then((response) => {
                    if(response.code === 0 && response.success) {
                        this.showModal = true
                    }
                }).catch(e => {
                    this.showModalCancel = true
                    this.requestLoading = false
                }).finally(() => {
                    this.requestLoading = false
                })
            }
        },
        handleBuy() {
            this.showModal = true
        },
        closeModal() {
            this.showModal = false
            this.showModalCancel = false
            this.requestLoading = false
            if(this.$route.name !== 'history-support.index') {
                this.$router.push({name: 'history-support.index'})
            }
            this.$v.$reset()
        },
        handleExist() {
            history.back()
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
}
</style>
<style scoped lang="scss" src="../../../assets/scss/utilities/app.scss"></style>

<template>
    <div class="card-sm mx-auto w-100">
        <div class="nk-block-head nk-block-head-lg wide-sm mx-auto">
            <div class="nk-block-head-xs">
                <div class="nk-block-between g-2">
                    <div class="nk-block-head-content mx-auto">
                        <h6 class="nk-block-title title mb-1 mb-md-3">{{ $t('bank.select_account')}}</h6>
                    </div>
                </div>
            </div><!-- .nk-block-head -->
            <div class="nk-block-body">
                <div class="card card-bordered">
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

                    <!--  No Data -->
                    <div v-else-if="!requestLoading && !data" class="d-flex align-items-center justify-content-center min-h-300px">
                        {{ $t('utilities.no_data') }}
                    </div>
                    <!--  End No Data -->

                    <template v-else>
                        <div class="card-inner">
                            <div class="user-card">
                                <div class="user-avatar bg-primary">
                                    <!--                                <span>AB</span>-->
                                    <b-img
                                        :src="data.logo" @error="getNoImage2"></b-img>
                                </div>
                                <div class="user-info">
                                    <span class="lead-text">{{ data.account_number }}</span>
                                    <span class="text-uppercase fw-600">{{ data.account_name }}</span>
                                </div>
                                <div class="user-action">
                                    <div class="dropdown">
                                        <a class="btn btn-icon btn-trigger me-n2" data-bs-toggle="dropdown" href="#">
                                            <em class="icon ni ni-more-v"></em>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <ul class="link-list-opt no-bdr">
                                                <li>
                                                    <a href="#">
                                                        <em class="icon ni ni-camera-fill"></em>
                                                        <span>Change Photo</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <em class="icon ni ni-edit-fill"></em>
                                                        <span>Update Profile</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="data.child_accounts" class="card-inner border-top">
                            <div v-for="(account, i) in data.child_accounts"
                                 :key="i"
                                 class="card-bordered card card-bank">
                                <div class="card-inner p-3 d-flex align-items-center justify-content-between">
                                    <div class="user-account-info py-0">
                                        <h6 class="overline-title-alt">{{ account.account_name }}</h6>
                                        <div class="user-balance">{{ account.account_number }}</div>
                                        <div class="user-balance-sub">
                                            <span>{{ toNumberNoRound(account.balance) }}
                                                <span class="currency currency-btc">{{ account.currency}}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="custom-control custom-switch">
                                        <input :value="account.id" type="checkbox"
                                               v-model="chosenAccount[account.id]"
                                               name=""
                                               class="custom-control-input"
                                               :id="`account-${account.id}`">
                                        <label class="custom-control-label" :for="`account-${account.id}`"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="alert alert-warning mt-3">
                                <em class="icon ni ni-report"></em>
                                {{ $t('bank.select_account_note')}}
                            </div>
                            <div class="d-flex align-items-stretch justify-content-end mt-4">
                                <div @click="prevStep" class="btn btn-outline-light me-1 w-sm-50 d-flex justify-content-center">{{ $t('dialog.back')}}</div>
                                <button @click.prevent="handleAddBank"
                                        :disabled="requestSubmit || Object.keys(chosenAccount).length === 0"
                                        class="btn btn-primary ms-1 w-sm-50 d-flex justify-content-center">
                                    <span v-if="requestSubmit" class="spinner-border spinner-border-sm mr-2" role="status" />
                                    {{ $t('bank.add_bank')}}
                                </button>
                            </div>
                        </div>
                    </template>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { toNumberNoRound } from '@/helpers/common'
export default {
    name: 'review',
    data() {
        return {
            requestLoading: false,
            data: null,
            chosenAccount: {},
            requestSubmit: false
        }
    },
    mounted() {
        this.getAccountInfo()
    },
    methods: {
        toNumberNoRound,
        prevStep() {
            this.$emit('back', 1)
        },
        getAccountInfo() {
            this.requestLoading = true

            this.data = {
                logo: "https://inkythuatso.com/uploads/images/2021/11/logo-agribank-inkythuatso-3-01-09-15-15-16.jpg",
                account_number: '228822288',
                account_name: 'Huynh Thanh Tung',
                child_accounts: [
                    {
                        account_name: 'Huynh Thanh Tung',
                        account_number: '27272727',
                        balance: 1999292,
                        currency: "VND",
                        id: 1
                    },
                    {
                        account_name: 'Huynh Thanh Tung',
                        account_number: '939939393',
                        balance: 3833883,
                        currency: "VND",
                        id: 2
                    }
                ]

            }
            setTimeout(() => {
                this.requestLoading = false
            }, 1000)
        },
        handleAddBank() {
            this.requestSubmit = true

            this.lodash.forEach(this.chosenAccount, (v, k) => {
                if(v) {
                    console.log(k)
                }
            })

            this.requestSubmit = false
        }
    }
}
</script>

<template>
    <div class="nk-content ">
        <div class="container-fluid">
            <div class="nk-content nk-content-fluid pt-0">
                <div class="container-xl wide-lg">
                    <div id="orders" class="orders section-balance">
                        <div class="header-section d-flex align-items-center justify-content-between">
                            <div class="header-section d-flex align-items-center justify-content-between">
                                <h3 class="text-dark header-title c-text-dark">{{ $t('service.affi') }}</h3>
                            </div>
                        </div>
                        <div class="wrapper-balance section-dark mt-16">
                            <div class="position-relative"><!---->
                                <table class="table custom-table">
                                    <thead>

                                        <tr>
                                            <th scope="col">stt</th>
                                            <th scope="col">{{ $t('service.name') }}</th>
                                            <th scope="col">{{ $t('service.phone') }}</th>
                                            <th scope="col">{{ $t('service.date') }}</th>
                                            <th scope="col">{{ $t('service.status') }}</th>
                                        </tr>
                                    </thead><!---->
                                    <tbody>
                                        <tr v-for="item,index in data">
                                            <th scope="row">{{ index+1 }}</th>
                                            <td>{{ item.display_name }}</td>
                                            <td>{{ item.phone }}</td>
                                            <td>{{ item.created_at }}</td>
                                            <td>{{ $t('service.status_active') }}</td>
                                        </tr>
                                    </tbody>

                                </table>

                                <div v-if="data.length==0" class="d-flex justify-content-center align-items-center min-h-300">
                                    <p class="text-muted"> {{ $t('service.data_type') }} </p>
                                </div><!---->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatViDate, formatEnDate, getLanguage } from '@/helpers/common'
import NoData from '@/views/components/NoData/index'

export default {
    name: 'index',
    metaInfo() {
        return {
            title: this.$t('menu.my_service')
        }
    },
    data() {
        return {
            data: [],
           
        }
    },
    components: { NoData },
    mounted() {
        this.getListMyService()
        
    },
    computed: {
        lang() {
            return getLanguage()
        }
    },
    methods: {
        formatViDate,
        formatEnDate,
        getListMyService() {
            this.setLoadingState(true)
            this.$store.dispatch('affi/getListService').then(data=>{
              if(data.success){
                this.data =data.data
              }
            }).catch(e => {
                this.setFormError(e)
            }).finally(() => {
                this.requestLoading = false
                this.setLoadingState(false)
            })
            
        }
    },
    watch: {
    
    }
}
</script>


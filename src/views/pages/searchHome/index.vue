<template>
  <div class="nk-content nk-content-fluid pt-0">
    <div class="container-xl wide-lg">
      <div class="nk-content-body">
        <div class="nk-block-head nk-block-head-sm">
          <div
            class="nk-block-between flex-column flex-sm-row align-items-start align-items-sm-center justify-content-start justify-content-sm-between">
            <div class="nk-block-head-content">
              <!-- <h3 class="nk-block-title page-title">
                {{ $t("home.list_houses_for_rent") }}
              </h3> -->
             
            </div>
          </div>
        </div>
        <!-- button filter -->
        <div class="d-md-flex d-none nk-block-head nk-block-head-sm d-flex justify-content-end">
          <a href="javascript:void(0)" type="button" :class="typemap ? 'btn btn-map2 mr-2' : 'btn btn-map mr-2'"
            v-on:click="changemap()">
            <span>
              <em class="icon ni ni-location"></em>
            </span>
          </a>
          <a href="javascript:void(0)" type="button" class="btn btn-primary mr-2" data-toggle="modal"
            data-target="#modalDefault"><span>{{ $t("home.city") }}</span><em class="icon ni ni-filter"></em></a>
          <a href="javascript:void(0)" type="button" class="btn btn-primary mr-2" data-toggle="modal"
            data-target="#modalAlong"><span>{{ $t("home.train_station") }}</span><em class="icon ni ni-filter"></em></a>
          <a href="javascript:void(0)" class="btn btn-danger" v-on:click="resetListRealHouse">
            <span style="margin-right: 8px">{{ $t("home.reset") }}</span>
            <b-icon icon="arrow-counterclockwise" style="width: 18px; height: 18px"></b-icon></a>
        </div>
        <!-- end -->
        <div class="d-md-none d-block nk-block-head nk-block-head-sm d-flex justify-content-end">
          <!-- <a
            href="#"
            type="button"
            class="btn btn-primary mr-2"
            data-toggle="modal"
            data-target="#modalDefault"
            ><em class="icon ni ni-filter"></em
          ></a> -->
          <div class="dropdown">
            <a class="dropdown-toggle btn btn-icon btn-light" data-toggle="dropdown" aria-expanded="false"><em
                class="icon ni ni-filter"></em></a>
            <div class="dropdown-menu dropdown-menu-right" style="">
              <ul class="link-list-opt no-bdr">
                <li>
                  <a href="#" data-toggle="modal" data-target="#modalDefault"><span>{{ $t("home.city") }}</span></a>
                </li>
                <li>
                  <a href="#" data-toggle="modal" data-target="#modalAlong"><span>{{ $t("home.train_station")
                  }}</span></a>
                </li>
                <li>
                  <a href="#" v-on:click="resetListRealHouse">
                    <span style="margin-right: 8px">{{
                      $t("home.reset")
                    }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="nk-block" v-if="typemap == false">
          <div class="row g-gs">
            <div v-if="data.length === 0"
              class="min-h-500px no-data d-flex align-items-center justify-center card border text-center font-weight-bold">
              {{ $t("home.no_data") }}
            </div>
            <div v-else class="col-xxl-12 col-lg-12 col-sm-12" v-for="item in formatListHome" :key="item.id">
              <div class="card card-bordered product-card test_card">
                <div class="d-xxl-flex d-lg-flex">
                  <div class="col-xxl-3 col-lg-3 col-12">
                    <router-link :to="{
                      name: 'search_home.detail',
                      params: { id: item.id },
                    }">
                      <img class="card-img-top" :src="item.images" alt="" />
                    </router-link>
                  </div>
                  <div class="col-xxl-9 col-lg-9 col-12 p-0">
                    <div class="card-inner">
                      <div class="d-flex justify-content-between align-center">
                        <h5 class="product-title">
                          <router-link :to="{
                            name: 'search_home.detail',
                            params: { id: item.id },
                          }">
                            <span>{{ item.name }} </span>
                          </router-link>
                        </h5>
                        <div>
                          <a href="javascript:void(0)" v-on:click="careAboutHome(item.id, item.name, item.mybuild)"
                            :class="item.mybuild === false ? 'btn btn-round btn-icon btn-outline-danger' : 'btn btn-round btn-icon btn-outline-danger-hover'"><em
                              class="icon ni ni-heart"></em></a>
                        </div>
                      </div>

                      <!-- gia -->

                      <div class="row">
                        <div class="col-sm-6 col-12">
                          <span class="text-dark font-weight-bold">月額賃料:</span>
                          <span class="price text-danger">
                            {{ item.price ?? "--" }} ~
                          </span>
                          <span class="text-dark font-weight-bold">(共益費:
                            {{ item.rental_fee ?? "--" }})</span>
                        </div>
                        <div class="col-sm-6 col-12">
                          沿線: {{ item.line ?? "--" }}
                        </div>
                        <div class="col-sm-6 col-12">
                          住所: {{ item.address ?? "--" }}
                        </div>
                        <div class="col-sm-6 col-12">
                          お問合せ先: {{ item.phone ?? "--" }}
                        </div>
                      </div>
                      <!-- end -->
                      <hr />
                      <div class="row">
                        <div class="col-6 col-sm-6">
                          <ul>
                            <li>
                              <span class="font-weight-bold text-dark">間取</span>: {{ item.area }}
                            </li>

                            <li>
                              <span class="font-weight-bold text-dark">
                                入居可能日
                              </span>: {{ item.date ?? "--" }}
                            </li>
                          </ul>
                        </div>
                        <div class="col-6 col-sm-6">
                          <ul>
                            <li>
                              <span class="font-weight-bold text-dark">構造</span>: {{ item.cautruc ?? "--" }}
                            </li>

                            <li>
                              <span class="font-weight-bold text-dark">
                                築年月
                              </span>: {{ item.namxaydung ?? "--" }}
                            </li>
                          </ul>
                        </div>
                        <!-- <div class="col-6 col-sm-4">
                          <ul>
                            <li v-for="item in item.infoRoom" :key="item.index">
                              <span class="font-weight-bold text-dark">{{
                                item.key
                              }}</span
                              >: {{ item.value ?? "--" }}
                            </li>
                          </ul>
                        </div>
                        <div class="col-6 col-sm-4">567</div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Paginate -->
      <b-row v-if="data.length && typemap == false" class="row mt-3 mb-3">
        <b-col class="ml-auto col-auto">
          <nav>
            <b-pagination v-model.trim="paginationData.currentPage" :per-page="paginationData.perPage"
              :total-rows="paginationData.total" align="right" size="sm"></b-pagination>
          </nav>
        </b-col>
      </b-row>
      <!--End Paginate -->
      <!-- <GmapMap
      :center='center'
      :zoom='12'
      style='width:100%;  height: 400px;'
    />
  -->
      <GmapMap :center='center' :zoom='15' style='width:90vw; height: 100%;left: 0;'>
        <gmap-marker :key="index" v-for="(m, index) in markers" :position="m"
          @click="center = m"></gmap-marker>
      </GmapMap>

    </div>
    <modal-Filter-Province v-on:confim-filter-city="handleFilterCity"
      v-on:reset-filter="resetFilter"></modal-Filter-Province>

    <modal-Filter-Along v-on:confim-filter="handleFilterAlong" v-on:reset-filter="resetFilterAlong"></modal-Filter-Along>
  </div>
</template>

<script>
import { formatViDate, formatEnDate, getLanguage } from "@/helpers/common";
import NoData from "@/views/components/NoData/index";
import modalFilterProvince from "./modalFilterProvince.vue";
import modalFilterAlong from "./modalFilterAlong.vue";
import i18n from "@/utils/i18n";
import test from './test.json';

export default {
  name: "Dashboard",
  data() {
    return {
      center: { lat: 34.6937249, lng: 135.5022535 },
      name_map: '大阪',
      data_rooms: test,
      markers: [{
        lat: 34.6629662,
        lng: 135.5237088,
      },{
        lat: 34.628604,
        lng: 135.5692449,
      },{
        lat: 34.639196,
        lng: 135.4993239,
      },{
        lat: 34.63918,
        lng: 135.4992135,
      },{
        lat: 34.6322584,
        lng: 135.4939149,
      },{
        lat: 34.6352107,
        lng: 135.4885364,
      },{
        lat: 34.6289455,
        lng: 135.4913527,
      },{
        lat: 34.6361407,
        lng: 135.5018279,
      }],
      zoom: 15,
      data: [],
      typemap: true,
      paginationData: {
        currentPage: 1,
        perPage: 4,
        total: 0,
        sort: "desc",
      },
      filter: {
        provice_code: null,
        city_code: null,
        along_code: null,
        search: null,
      },
      searchTimer: null,
      optionShow: [
        { value: 4, text: 4 },
        { value: 8, text: 8 },
        { value: 12, text: 12 },
      ],
      optionSort: [
        { value: "desc", text: "DESC" },
        { value: "asc", text: "ASC" },
      ],
    };
  },
  components: {
    NoData,
    modalFilterProvince,
    modalFilterAlong,
  },
  mounted() {
    this.getListService();
  },
  computed: {
    lang() {
      return getLanguage();
    },
    formatListHome() {
      return this.data.map((v) => {
        let amount = v.price
          .replace(/\s/g, "")
          .split("円")
          .join("円 ")
          .trim()
          .split(" ");
        let formatFee = v.fee.trim().split("敷引・償却:");
        let date = v.date.trim().split("\n");
        let infoRoom = JSON.parse(v.list_infor_user);
        v.price = amount[0];
        v.rental_fee = amount[1];
        v.formatFee = formatFee[1].trim();
        v.date = date[0];
        v.infoRoom = infoRoom;
        let data = JSON.parse(v.list_infor_room)
        let cautruc = data.filter(e => e.key == '構造')
        if (cautruc && cautruc[0]) {
          v.cautruc = cautruc[0].value
        }
        let namxaydung = data.filter(e => e.key == '築年月')
        if (namxaydung && namxaydung[0]) {
          v.namxaydung = namxaydung[0].value
        }
        return v;
      });
    },
  },
  methods: {
    formatViDate,
    formatEnDate,
    getListService() {
      this.setLoadingState(true);
      let postData = {
        page: this.paginationData.currentPage,
        perPage: this.paginationData.perPage,
        sort: this.paginationData.sort,
      };

      if (this.filter) {
        this.lodash.forEach(this.filter, (v, k) => {
          if (!v) return;
          postData[k] = v;
        });
      }

      this.$store
        .dispatch("Home/getListHome", postData)
        .then((response) => {
          if (response.code === 0 && response.success) {
            this.data = response.data.data;
            const pagination = response.data.pagination;
            this.paginationData = this.lodash.extend({}, this.paginationData, {
              currentPage: pagination.currentPage,
              total: pagination.total,
            });

            this.setLoadingState(false);
            if (this.typemap) {
              this.loadingMap()
            }
          }
        })
        .catch((e) => {
          this.setFormError(e);
        })
        .finally(() => {
          this.requestLoading = false;
          this.setLoadingState(false);
        });
    },
    changemap() {
      this.typemap = !this.typemap

    },
    submiCareHome(id) {
      const postData = {
        id,
      };
      this.$store
        .dispatch("Home/saveCareHome", postData)
        .then((response) => {
          if (response.code === 0 && response.success) {
            console.log({ response });
          }
        })
        .catch((e) => {
          this.setFormError(e);
        })
        .finally(() => {
          this.requestLoading = false;
        });
    },
    careAboutHome(id, name, check) {
      if (check) {
        return
      }
      if (!id) return;
      this.$confirm(
        this.$i18n.t("home.title_home_care_save", {
          code: name,
        }),
        i18n.t("home.please_confirm"),
        {
          icon: "warning",
          confirmButtonColor: "#1ee0ac",
          cancelButtonColor: "#d33",
          cancelButtonText: i18n.t("button.cancel"),
          confirmButtonText: i18n.t("button.confirm"),
        }
      ).then(({ value }) => {
        if (value) {
          this.submiCareHome(id);
          this.data.map((v) => {
            if (v.id === id) {
              v.mybuild = true;
            }
            return v;
          });
          this.$awnSuccess(this.$t("dialog.successfully"));
        }
      });
    },
    handleFilterCity(provice, city, name) {
      this.filter.provice_code = provice;
      this.filter.city_code = city;
      this.filter.along_code = null;
      this.name_map = name
      $("#modalDefault").modal("hide");
      if (provice !== null) {
        this.getListService();
      }
    },
    resetFilter(provice, city) {
      $("#modalDefault").modal("hide");
      if (provice === null && city === null) {
        this.filter.provice_code = provice;
        this.filter.city_code = city;
        this.getListService();
      }
    },
    handleFilterAlong(provice, along) {
      this.filter.provice_code = provice;
      this.filter.along_code = along;
      this.filter.city_code = null;

      $("#modalAlong").modal("hide");
      if (provice !== null) {
        this.getListService();
      }
    },
    resetFilterAlong(provice, along) {
      $("#modalAlong").modal("hide");
      if (provice === null && along === null) {
        this.filter.provice_code = provice;
        this.filter.along_code = along;
        this.getListService();
      }
    },
    resetListRealHouse() {
      this.filter.provice_code = null;
      this.filter.city_code = null;
      this.filter.along_code = null;
      this.getListService();
    },
    loadingMap() {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.name_map}&key=AIzaSyAaHZ6LVyzZAhnBKHCrb7PcTjBcUttqIeY`)
        .then(data => data.json())
        .then(response => {
          console.log(response);
          this.center = response.results.geometry.location
        })
      // this.$store
      //   .dispatch("Home/getdetailmap", this.name_map)
      //   .then((response) => {
      //     if (response.status == 'OK') {
      //       console.log({ response });
      //       if(response.results){
      //         this.center = response.results.geometry.location
      //       }

      //     }
      //   })


    }
    ,
    getPosition() {

    }
  },
  watch: {
    "paginationData.currentPage"(newVal, oldVal) {
      if (newVal && +newVal !== +oldVal) {
        this.getListService();
      }
    },
    "paginationData.perPage"(newVal) {
      if (newVal) {
        this.paginationData.currentPage = 1;
        this.getListService();
      }
    },
    "paginationData.sort"(newVal) {
      if (newVal) {
        this.getListService();
      }
    },
    "filter.search"(newVal, oldVal) {
      if (this.searchTimer) clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        this.paginationData.currentPage = 1;
        this.getListService();
      }, 500);
    },
  },
  metaInfo() {
    return {
      title: this.$t("menu.dashboard"),
    };
  },
};
</script>
<style lang="scss" scoped>
.card-inner {
  .product-title {
    a {
      text-decoration: underline;
    }

    a:hover {
      color: #f90 !important;
      text-decoration: none;
    }
  }

  .price {
    font-size: 18px;
    font-weight: 900;
  }

}
.test_card{
  border-top: 1px solid rgb(179, 206, 255) !important;
    border: 1px solid #b3ceff!important;
    border-radius: 6px;
    background: #f0f7ff;
}

.btn-map {
  background: #57606f;
  color: white;
  border: #669900 3px solid;
  border-radius: 3px;
}

.btn-map:hover {
  background-color: #669900;
}

.btn-map2 {
  background-color: #669900;
  color: white;
  border-radius: 3px;
}
</style>

<style scoped lang="scss" src="../../../assets/scss/utilities/app.scss"></style>

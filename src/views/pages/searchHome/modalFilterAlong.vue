<template>
  <div>
    <!-- Modal Content Code -->
    <div class="modal fade" tabindex="-1" id="modalAlong">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <a href="javascript:void(0)" class="close" data-dismiss="modal" aria-label="Close">
            <em class="icon ni ni-cross"></em>
          </a>
          <div class="modal-header">
            <h5 class="modal-title">{{ $t("home.filter_train_station") }}</h5>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="row">
                <div class="col-12 col-md-6">
                  <div class="form-group">
                    <label class="form-label" for="default-1-01">{{
                      $t("home.provice")
                    }}</label>
                    <div class="form-control-wrap">
                      <bootstrap-select
                        :dropdown-classes="'w-100'"
                        :dropdownMenuClasses="'w-100'"
                        v-model="provice"
                        :placeholder="$t('home.select_province')"
                        :search="true"
                        :options="formatProvice"
                      >
                      </bootstrap-select>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-md-6 text-right mt-auto">
                  <div class="d-flex justify-content-md-end justify-between">
                    <b-button
                      class="btn mr-2 col-5 mt-2 mt-md-0"
                      block
                      variant="primary mt-0"
                      @click="emitEventConfirmFilter"
                      :disabled="!provice"
                    >
                      <span>{{ $t("home.confirm") }}</span
                      ><em class="icon ni ni-filter"></em>
                    </b-button>
                    <b-button
                      class="btn col-5  mt-2 mt-md-0"
                      block
                      variant="danger mt-0"
                      @click="resetFilter"
                      :disabled="!provice"
                    >
                      <span style="margin-right: 8px">{{
                        $t("home.reset")
                      }}</span>
                      <b-icon
                        icon="arrow-counterclockwise"
                        style="width: 18px; height: 18px"
                      ></b-icon>
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="card card-bordered card-inner">
              <div class="row list-city">
                <div
                  v-if="cityOptions.length === 0"
                  class="col-12 text-center font-weight-bold"
                >
                  {{ $t("home.null_data_city") }}
                </div>
                <template v-else>
                  <div class="col-12 mb-2">
                    <div class="col-12 col-md-3 p-0 form-group">
                      <div class="form-control-wrap">
                        <div class="form-icon form-icon-right">
                          <em class="icon ni ni-search"></em>
                        </div>
                        <input
                          type="text"
                          v-model="searchCity"
                          class="form-control"
                          id="default-04"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="city col-4 col-md-2"
                    v-for="item in cityOptions"
                    v-on:click="handleActiveCity(item.id)"
                    :key="item.id"
                  >
                    <a
                      href="javascript:void(0)"
                      class="btn btn-outline-light product-card w-100 align-center justify-content-between"
                      :class="{ 'active-city': activeCity == item.id }"
                      >{{ item.AlongName }}</a
                    >
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!-- <div class="modal-footer bg-light">
            <span class="sub-text">Modal Footer Text</span>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatViDate, formatEnDate, getLanguage } from "@/helpers/common";
import NoData from "@/views/components/NoData/index";
import BootstrapSelect from "@/components/BootstrapSelect";

export default {
  name: "modelFilterAlong",
  data() {
    return {
      cityOptions: [],
      cityOptionsCoppy: [],
      city: null,
      provice: null,
      proviceOptions: [],
      id: this.$route.params.name ?? "",
      searchCity: null,
      activeCity: null,
    };
  },
  components: {
    NoData,
    BootstrapSelect,
  },
  mounted() {
    this.getListProvince();
  },
  methods: {
    formatViDate,
    formatEnDate,
    getListProvince() {
      this.setLoadingState(true);
      this.$store
        .dispatch("Home/listProvice")
        .then((response) => {
          if (response.code === 0 && response.success) {
            this.proviceOptions = response.data;

            this.setLoadingState(false);
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
    getListCity() {
      this.setLoadingState(true);
      let postData = {
        id: this.provice,
      };
      this.$store
        .dispatch("Home/listAlong", postData)
        .then((response) => {
          if (response.code === 0 && response.success) {
            this.cityOptions = response.data;
            this.cityOptionsCoppy = response.data;
            this.setLoadingState(false);
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
    handleSearchCity() {
      this.cityOptions = this.cityOptions.filter((v) =>
        v.AlongName.includes(this.searchCity)
      );
    },
    backSearchCity() {
      this.cityOptions = this.cityOptionsCoppy;
    },
    handleActiveCity(id) {
      if (id === this.activeCity) {
        this.activeCity = null;
      } else {
        this.activeCity = id;
      }
    },
    emitEventConfirmFilter() {
      this.$emit("confim-filter", this.provice, this.activeCity);
    },
    resetFilter() {
      this.provice = null;
      this.activeCity = null;
      this.cityOptions = [];
      this.cityOptionsCoppy = [];
      this.$emit("reset-filter", this.provice, this.activeCity);
    },
  },
  computed: {
    lang() {
      return getLanguage();
    },
    formatProvice() {
      return (this.proviceOptions = this.lodash.map(
        this.proviceOptions,
        (v) => {
          return {
            text: `${v.code} - ${v.name} - ${v.area}`,
            value: v.id,
          };
        }
      ));
    },
  },
  watch: {
    provice(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        this.getListCity();
      }
    },
    searchCity(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        this.handleSearchCity();
      } else {
        this.backSearchCity();
      }
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep {
  .bootstrap-select {
    border: 1px solid #dbdfea;
    border-radius: 4px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    .dropdown-menu {
      &.show {
        max-height: 500px !important;
      }
    }
    .btn {
      padding-left: 15px !important;
    }
  }

  .icon-show {
    margin-bottom: 0.5rem;
  }
  .city {
    margin-bottom: 2rem !important;
  }
  .active-city {
    border: 1px solid #0860d8 !important;
    color: #0860d8 !important;
  }
}
</style>

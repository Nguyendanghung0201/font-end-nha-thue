<template>
  <div class="nk-content nk-content-fluid" style="background: #DBCEBB;">
    <div class="container-xl wide-lg">
      <div class="nk-content-body">
        <div class="nk-block-head nk-block-head-sm">
          <div class="nk-block-between g-3">
            <div class="nk-block-head-content">
              <h3 class="nk-block-title page-title">
                {{ $t("home.home_detail") }}
              </h3>
              <div class="nk-block-des text-soft">
                <p>{{ $t("home.home_detail_description") }}</p>
              </div>
            </div>
            <div class="nk-block-head-content">
              <a
                href="javascript:void(0)"
                @click="backFunction()"
                class="btn btn-outline-light bg-white d-none d-sm-inline-flex"
                ><em class="icon ni ni-arrow-left"></em
                ><span>{{ $t("dialog.back") }}</span></a
              >
              <a
                href="javascript:void(0)"
                @click="backFunction()"
                class="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"
                ><em class="icon ni ni-arrow-left"></em
              ></a>
            </div>
          </div>
        </div>
        <!-- .nk-block-head -->
        <div class="nk-block">
          <div class="card card-bordered" style="background: #BB6936;border-radius: 10px;">
            <div class="card-inner">
              <div class="row pb-5">
                <div class="col-lg-6">
                  <div
                    class="product-gallery mr-xl-1 mr-xxl-5"
                    style="border: none"
                  >
                    <div class="slider" v-if="slides.length">
                      <agile
                        ref="main"
                        :options="options1"
                        :as-nav-for="asNavFor1"
                        style="padding: 0px 5px"
                        class="mb-2"
                      >
                        <div
                          class="slide"
                          v-for="(slide, index) in slides"
                          :key="index"
                          :class="`slide--${index}`"
                        >
                          <img :src="slide" alt="" class="rounded w-100" />
                        </div>
                      </agile>
                      <agile
                        ref="thumbnails"
                        :options="options2"
                        :as-nav-for="asNavFor2"
                        class="list-slide"
                      >
                        <div
                          class="slide slide--thumbniail"
                          @click="$refs.thumbnails.goTo(index)"
                          v-for="(slide, index) in slides"
                          :key="index"
                          :class="`slide--${index}`"
                        >
                          <img :src="slide" alt="" class="rounded w-100" />
                        </div>
                      </agile>
                    </div>
                  </div>
                  <!-- .product-gallery -->
                </div>
                <!-- .col -->
                <div class="col-lg-6">
                  <div class="product-info mt-5 mr-xxl-5">
                    <h4 class="product-price text-danger">
                      月額賃料: {{ formatDetailHome.price }} ~
                      <small class="text-dark font-weight-bold"
                        >(共益費:
                        {{ formatDetailHome.rental_fee ?? "--" }})</small
                      >
                    </h4>
                    <h2 class="product-title">{{ formatDetailHome.name }}</h2>
                    <!-- .product-rating -->
                    <div class="product-excrept text-soft">
                      <div class="lead">
                        <ul>
                          <li>
                            <em class="icon ni ni-bullet">{{
                              formatDetailHome.phone
                            }}</em>
                          </li>
                          <li>
                            <em class="icon ni ni-bullet">住所: {{
                              formatDetailHome.address
                            }}</em>
                          </li>
                          <li>
                            <em class="icon ni ni-bullet">沿線: {{
                              formatDetailHome.line
                            }}</em>
                          </li>
                          <li>
                            <em class="icon ni ni-bullet">間: {{
                              formatDetailHome.area
                            }}</em>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <!-- .product-meta -->
                    <div
                      class="product-meta"
                      v-if="formatDetailHome.mybuild === false"
                    >
                      <ul class="d-flex flex-wrap ailgn-center g-2 pt-1">
                        <li>
                          <a
                            href="javascript:void(0)"
                            v-on:click="careAboutHome(formatDetailHome.id)"
                            class="btn btn-round btn-icon btn-outline-danger"
                          >
                            <em class="icon ni ni-heart"></em>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <!-- .product-meta -->
                  </div>
                  <!-- .product-info -->
                </div>
                <!-- .col -->
              </div>
              <!-- .row -->
              <hr class="hr border-light" />
              <div class="row g-gs flex-lg-row-reverse pt-5">
                <!-- <div class="col-lg-5">
                  <div class="video">
                    <img class="video-poster w-100" src="#" alt="" />
                    <a
                      class="video-play popup-video"
                      href="https://www.youtube.com/watch?v=SSo_EIwHSd4"
                    >
                      <em class="icon ni ni-play"></em>
                      <span>Watch Video</span>
                    </a>
                  </div>
                </div>
                <div class="col-lg-7">
                  <div class="product-details entry mr-xxl-3">
                    <h3>Product details of Comfy cushions</h3>
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis et
                      quasi architecto beatae vitae dicta sunt explicabo. Neque
                      porro quisquam est, qui dolorem consectetur, adipisci
                      velit.Nam libero tempore, cum soluta nobis est eligendi
                      optio cumque nihil impedit quo minus.
                    </p>
                    <ul class="list list-sm list-checked">
                      <li>Meets and/or exceeds performance standards.</li>
                      <li>Liumbar support.</li>
                      <li>Made of bonded teather and poiyurethane.</li>
                      <li>Metal frame.</li>
                      <li>Anatomically shaped cork-latex</li>
                      <li>
                        As attractively priced as you look attractive in one
                      </li>
                    </ul>
                    <p>
                      Unde omnis iste natus error sit voluptatem accusantium
                      doloremque laudantium, totam rem aperiam, eaque ipsa quae
                      ab illo inventore veritatis et quasi architecto beatae.
                    </p>
                    <h3>The best seats in the house</h3>
                    <p>
                      I must explain to you how all this mistaken idea of
                      denouncing pleasure and praising pain was born and I will
                      give you a complete account of the system, and expound the
                      actual teachings. Unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis et
                      quasi architecto beatae.
                    </p>
                  </div>
                </div> -->
                <div class="col-lg-12">
                  <!-- <div class="nk-block-head">
                    <div class="nk-block-head-content">
                      <h5 class="nk-block-title title">
                        Applicant Information
                      </h5>
                      <p>Basic info, like name, phone, address, country etc.</p>
                    </div>
                  </div> -->
                  <div class="card card-bordered">
                    <ul class="data-list">
                      <li
                        class="data-item"
                        v-for="(item, key) in formatDetailHome.infoRoom"
                        :key="key"
                      >
                        <div class="data-col">
                          <div class="data-label">
                            {{ item.key ? item.key : "--" }}
                          </div>
                          <div class="data-value">
                            {{ item.value ? item.value : "--" }}
                          </div>
                        </div>
                      </li>
                    </ul>
                  
                      <li
                        class="data-item"
                        v-for="(item, key) in formatDetailHome.infoUser"
                        :key="key"
                      >
                        <div class="data-col">
                          <div class="data-label">
                            {{ item.key ? item.key : "--" }}
                          </div>
                          <div class="data-value">
                            <span v-if="item.value" v-for="(item2, index) in item.value.split(',')" :key="index">
                              {{ item2 ?? "--" }}
                            </span>
                           
                          </div>
                        </div>
                      </li>
                  
                  </div>
                </div>
              </div>
              <!-- .row -->
            </div>
          </div>
        </div>
        <!-- .nk-block -->
      </div>
    </div>
  </div>
</template>

<script>
import { formatViDate, formatEnDate, getLanguage } from "@/helpers/common";
import NoData from "@/views/components/NoData/index";
import { Carousel, Slide } from "vue-carousel";
import { VueAgile } from "vue-agile";
import i18n from "@/utils/i18n";

export default {
  name: "detailService",
  components: {
    Carousel,
    Slide,
    agile: VueAgile,
  },
  data() {
    return {
      data: [],
      id: this.$route.params.id ?? "",
      detailHome2: {
        id: 22,
        name: "ラフォーレ50",
        real_id: "382094",
        address: "札幌市東区北二十四条東２１丁目",
        line: "地下東豊線「元町」徒歩12分",
        infor: "",
        phone:
          "お問合せ先\n                                株式会社札幌カンリセンター\n                                Tel :011-676-8884 (問合せ先が異なる部屋があります)",
        images:
          "https://file.realnetpro.com/photo/0006416/building/large/b0000382094152059168401.jpg",
        price: "36,000円\n                        \t\t3,000円",
        years: null,
        area: "2LDK\n                                41.2㎡",
        date: "即入\n\t\t\t\t\t\t\t\t------",
        web: "realnetpro",
        fee: "敷引・償却:なし",
        detail_id: "browsing_2441739",
        province_id: 1,
        city_id: 3,
        city_category: "city",
        along_id: 69,
        along_category: "along",
        town_id: 0,
        data: "住所：札幌市東区北二十四条東２１丁目\n                                    沿線：地下東豊線「元町」徒歩12分",
        list_infor_room:
          '[{"key":"物件種別","value":"[住居用] マンション"},{"key":"物件名","value":"ラフォーレ50"},{"key":"号室名","value":"101（1階部分）"},{"key":"所在地","value":"北海道札幌市東区北二十四条東２１丁目6-3地図を見る"},{"key":"交通","value":"地下東豊線「元町」徒歩12分"},{"key":"賃料 / 管理費・共益費","value":"36,000円 / 3,000円"},{"key":"敷金 / 礼金","value":"礼金:なし"},{"key":"保証金 / 敷引・償却","value":"保証金:なし 敷引・償却:なし"},{"key":"更新料","value":"11,000円"},{"key":"間取","value":"2LDK [&nbsp;DK9x6x6&nbsp;] 41.2m2"},{"key":"部屋タイプ","value":"-----"},{"key":"状態","value":"空室"},{"key":"入居可能時期","value":"即入"},{"key":"構造","value":"鉄骨造 地上4階"},{"key":"総戸数","value":"8戸"},{"key":"築年月","value":"1992年06月"},{"key":"駐車場","value":""},{"key":"方位","value":""},{"key":"情報更新日","value":"2023-03-21 11:23:34"}]',
        list_infor_user:
          '[{"key":"位置","value":",○ 角部屋"},{"key":"キッチン","value":",○ 給湯器（プロパンガス）"},{"key":"水廻り","value":",○ 風呂（ユニットバス）,○ トイレ（水洗）,○ シャワートイレ,○ 洗髪洗面化粧台,○ バス・トイレ別"},{"key":"冷暖房","value":",○ 暖房（灯油）"},{"key":"放送・通信","value":",○ ケーブルTV"},{"key":"その他","value":",○ 電気,○ ガス（プロパンガス）,○ 水道,○ 排水"}]',
        pdf: "/common/building_sheet.php?id=382094",
        room: '[{"id":"browsing_2441739","yeucau":"無","layout":"https://file.realnetpro.com/photo/0006416/layout/room/l00024417391496305614.jpg","st_td":"空室","date":"即入\\n\\t\\t\\t\\t\\t\\t\\t\\t------","dientich":"2LDK\\n                                41.2㎡","tien":"36,000円\\n                        \\t\\t3,000円","key_money":"0\\n                        \\t\\tなし","datcoc":"なし\\n                        \\t\\tなし","qc":"[広告料] 2ヶ月"}]',
        status: 1,
        created_at: "2023-03-26T04:37:36.000Z",
        updated_at: "2023-03-26T04:37:36.000Z",
        list_img_url:
          ",https://file.realnetpro.com/photo/0006416/building/x-large/b0000382094152059168401.jpg?1679650875,https://file.realnetpro.com/photo/0006416/room/x-large/r0002441739167938372301.jpg?1679650875,https://file.realnetpro.com/photo/0006416/room/x-large/r0002441739167938373002.jpg?1679650875,https://file.realnetpro.com/photo/0006416/room/x-large/r0002441739167938373503.jpg?1679650875,https://file.realnetpro.com/photo/0006416/room/x-large/r0002441739167938375304.jpg?1679650875,https://file.realnetpro.com/photo/0006416/room/x-large/r0002441739167938376205.jpg?1679650875,https://file.realnetpro.com/photo/0006416/room/x-large/r0002441739167938378406.jpg?1679650875,https://file.realnetpro.com/photo/0006416/room/x-large/r0002441739167938378707.jpg?1679650875,https://file.realnetpro.com/photo/0006416/room/x-large/r0002441739167938379208.jpg?1679650875,https://file.realnetpro.com/photo/0006416/layout/room_l/l00024417391496305614.jpg?1679650875",
      },
      detailHome: {},
      asNavFor1: [],
      asNavFor2: [],
      options1: {
        dots: false,
        fade: true,
        navButtons: false,
      },

      options2: {
        autoplay: false,
        centerMode: true,
        dots: false,
        navButtons: false,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 4,
            },
          },

          {
            breakpoint: 1000,
            settings: {
              navButtons: false,
            },
          },
        ],
      },
      slides: [],
    };
  },
  components: {
    NoData,
  },
  mounted() {
    // this.getDetailService();
    this.asNavFor1.push(this.$refs.thumbnails);
    this.asNavFor2.push(this.$refs.main);
  },
  created() {
    this.getDetailService();
  },
  methods: {
    formatViDate,
    formatEnDate,
    async getDetailService() {
      this.setLoadingState(true);
      this.$store
        .dispatch("Home/detailHome", { id: this.id })
        .then((response) => {
          if (response.code === 0 && response.success) {
            this.detailHome = response.data;
            this.formatSlider();

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
    formatSlider() {
      if (this.detailHome["id"]) {
        let list_image = this.detailHome.list_img_url.split(",");
        for (let i = 0; i < list_image.length; i++) {
          if (list_image[i]) {
            this.slides.push(list_image[i]);
          }
        }
      }
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
    careAboutHome(id, name) {
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
          this.formatDetailHome.mybuild = true;
          this.$awnSuccess(this.$t("dialog.successfully"));
        }
      });
    },
    backFunction() {
      this.$router.go(-1);
    },
  },
  computed: {
    lang() {
      return getLanguage();
    },
    formatDetailHome() {
      let detailHome = this.detailHome;
      if (detailHome["id"]) {
        let amount = detailHome.price
          .replace(/\s/g, "")
          .split("円")
          .join("円 ")
          .trim()
          .split(" ");
        let formatFee = detailHome.fee.trim().split("敷引・償却:");
        let date = detailHome.date.trim().split("\n");
        let infoUser = JSON.parse(detailHome.list_infor_user);
        let list_image = detailHome.list_img_url.split(",");
        let infoRoom = JSON.parse(detailHome.list_infor_room);
        detailHome.price = amount[0];
        detailHome.rental_fee = amount[1];
        detailHome.formatFee = formatFee[1].trim();
        detailHome.date = date[0];
        detailHome.infoRoom = infoRoom;
        detailHome.infoUser = infoUser;
        detailHome.list_image = list_image;
        return detailHome;
      }
      return {};
    },
  },
  watch: {
    slides(newValue) {
      console.log(newValue);

      if (newValue) {
        this.$nextTick(() => {
          this.asNavFor1.push(this.$refs.thumbnails);
          this.asNavFor2.push(this.$refs.main);
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
.product-info *{
  color: white!important;
}
.agile {
  &__nav-button {
    background: transparent;
    border: none;
    color: #ccc;
    cursor: pointer;
    font-size: 24px;
    transition-duration: 0.3s;

    .thumbnails & {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      &--prev {
        left: -45px;
      }
      &--next {
        right: -45px;
      }
    }
    &:hover {
      color: #888;
    }
  }
  &__dot {
    margin: 0 10px;

    button {
      background-color: #eee;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: block;
      height: 10px;
      font-size: 0;
      line-height: 0;
      margin: 0;
      padding: 0;
      transition-duration: 0.3s;
      width: 10px;
    }
    &--current,
    &:hover {
      button {
        background-color: #888;
      }
      // Slides styles
    }
  }
}
.slide {
  align-items: center;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  height: 450px;
  justify-content: center;

  &--thumbniail {
    cursor: pointer;
    height: 100px;
    padding: 0 5px;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.75;
    }
  }
  img {
    height: 100%;
    object-fit: cover;
    object-position: center;
    width: 100%;
  }
}
</style>

<script>
import Loading from "vue-loading-overlay";
import productModel from "../../components/ProductModel.vue";
const { VITE_APP_API, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      products: [],
      productId: "",
      cart: [],
      loadingId: "",
      user: {},
      isLoading: false,
    };
  },
  components: {
    Loading,
    productModel,
  },
  //方法
  methods: {
    getProducts() {
      this.isLoading = true;
      this.$http
        .get(`${VITE_APP_API}/v2/api/${VITE_APP_PATH}/products`)
        .then((res) => {
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    openModal(id) {
      this.productId = id;
    },
    addToCart(product_id, qty = 1) {
      //傳入商品ID及數量 數量預設為1
      const data = {
        product_id,
        qty,
      };
      this.loadingId = product_id;
      this.isLoading = true;
      this.$http
        .post(`${VITE_APP_API}/api/${VITE_APP_PATH}/cart`, { data })
        .then((res) => {
          alert(res.data.message);
          // this.$refs.modalProductHide.hide();
          this.loadingId = "";
          this.isLoading = false;
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<template>
  <loading v-model:active="isLoading" />
  <div class="container">
    <product-model
      :id="productId"
      :add-to-cart="addToCart"
      :open-modal="openModal"
    ></product-model>
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td style="width: 10%">
            <div
              style="padding-top: 100%; background-size: contain"
              :style="{ backgroundImage: `url(${product.imageUrl})` }"
            ></div>
          </td>
          <td>
            {{ product.title }}
          </td>
          <td>
            <div class="h5" v-if="product.price === product.origin_price">
              {{ product.price }} 元
            </div>
            <div v-else>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="openModal(product.id)"
              >
                <i class="fa-pulse text-end">查看更多</i>
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addToCart(product.id)"
                :disabled="product.id === loadingId"
              >
                <i class="f fa-pulse"></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

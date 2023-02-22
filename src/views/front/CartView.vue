<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
const { VITE_APP_API, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      cart: [],
      loadingId: "",
      user: {},
      isLoading: false,
    };
  },
  components: {
    Loading,
  },
  methods: {
    getCatr() {
      this.isLoading = true;
      this.$http
        .get(`${VITE_APP_API}/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data;
          this.isLoading = false;
        });
    },
    UpdateCart(cartItem) {
      const data = {
        product_id: cartItem.product.id,
        qty: cartItem.qty,
      };
      this.isLoading = true;
      this.$http
        .put(`${VITE_APP_API}/api/${VITE_APP_PATH}/cart/${cartItem.id}`, {
          data,
        })
        .then(() => {
          this.getCatr();
          this.isLoading = false;
        });
    },
    DeleteCart(cartItem) {
      this.loadingId = cartItem.product_id;
      this.isLoading = true;
      this.$http
        .delete(`${VITE_APP_API}/api/${VITE_APP_PATH}/cart/${cartItem.id}`)
        .then(() => {
          this.getCatr();
          this.isLoading = false;
        });
    },
    DeleteCartAll() {
      if (this.cart.carts.length > 0) {
        this.isLoading = true;
        this.$http
          .delete(`${VITE_APP_API}/api/${VITE_APP_PATH}/carts`)
          .then(() => {
            this.getCatr();
            this.isLoading = false;
          });
      } else {
        alert("目前購物車裡沒有品項");
      }
    },
  },
  mounted() {
    this.getCatr();
  },
};
</script>

<template>
  <loading v-model:active="isLoading" />
  <div class="container">
    <div class="mt-4">
      <div class="text-end">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="DeleteCartAll()"
        >
          清空購物車
        </button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th class="text-center">單價</th>
            <th class="text-end">單品總價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="cartItem in cart.carts" :key="cartItem.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="DeleteCart(cartItem)"
                >
                  <i class="fa-pulse"></i>
                  x
                </button>
              </td>
              <td>{{ cartItem.product.title }}</td>
              <td>
                <div class="input-group input-group-sm">
                  <select
                    class="form-select"
                    v-model="cartItem.qty"
                    @change="UpdateCart(cartItem)"
                  >
                    <option :value="i" v-for="i in 100" :key="i + '115'">
                      {{ i }}
                    </option>
                  </select>
                </div>
              </td>
              <td class="text-center">{{ cartItem.product.price }}</td>
              <td class="text-end">{{ cartItem.total }}</td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-end">總計</td>
            <td class="text-end">{{ cart.total }}</td>
          </tr>
          <tr>
            <td colspan="4" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{ cart.final_total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
const { VITE_APP_API, VITE_APP_PATH } = import.meta.env;
import { RouterLink } from "vue-router";
export default {
  data() {
    return {
      products: [],
      productId: "",
      cart: [],
      loadingId: "",
      user: {},
      isLoading: true,
    };
  },
  components: {
    RouterLink,
  },
  //方法
  methods: {
    getProducts() {
      this.$http
        .get(`${VITE_APP_API}/v2/api/${VITE_APP_PATH}/products`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<template>
  <div>
    <div class="container">
      <div class="row py-3">
        <div class="col-md-6">
          <h2>產品列表</h2>
          <table class="table table-hover mt-4">
            <thead>
              <tr>
                <th width="150">產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="150">是否啟用</th>
                <th width="120">查看細節</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in products" :key="item.id">
                <td width="150">{{ item.title }}</td>
                <td width="120">
                  {{ item.origin_price }}
                </td>
                <td width="120">
                  {{ item.price }}
                </td>
                <td width="150">
                  <span v-if="item.is_enabled" class="text-success">啟用</span>
                  <span v-else>未啟用</span>
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            目前有 <span>{{ products.length }}</span> 項產品
          </p>
        </div>
        <div class="col-md-6">
          <RouterLink :to="`/Product/${products.id}`">單一產品細節</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

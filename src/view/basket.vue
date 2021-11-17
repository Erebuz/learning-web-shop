<template>
  <v-container fluid>
    <v-col cols="8" offset="2" class="d-flex flex-column justify-center">
      <template v-for="product of products_list">
        <v-card :key="product.id" class="ma-2 d-flex justify-space-between">
          <v-card-title class="d-flex my-4">
            {{ product_title(product) }}
          </v-card-title>
          <v-card-title class="d-flex my-4">
            Кол-во: {{ product.counter }}
          </v-card-title>
          <v-card-title>
            <v-btn @click="add_to_basket(product)"
              ><span style="font-size: 2em">+</span></v-btn
            >
            <v-btn @click="enc_to_basket(product)"
              ><span style="font-size: 2em">-</span></v-btn
            >
          </v-card-title>
        </v-card>
      </template>
    </v-col>
    <v-btn @click="$router.push({ name: 'order' })">
      Перейти к оформлению</v-btn
    >
  </v-container>
</template>

<script>
export default {
  name: "basket",
  data() {
    return {
      flag: false,
      products: [],
    };
  },
  created() {
    this.load_products();
  },
  computed: {
    products_list() {
      this.flag;

      let basket = JSON.parse(localStorage.getItem("basket"));
      let temp = [];

      if (!basket) return [];

      basket.forEach((product) => {
        let prod = this.products.find((item) => item.id === product.id);
        temp.push({ counter: product.count, ...prod });
      });

      return temp;
    },
  },
  methods: {
    load_products() {
      this.$http.get("/product/all").then((res) => {
        this.products = res.data;
      });
    },
    product_title(product) {
      switch (product.name) {
        case "лист":
          return `Лист ${product.width}x${product.height}x${product.thickness}`;
        case "труба":
          return `Труба ${product.width}x${product.thickness}x${product.height}`;
        case "круг":
          return `Круг ${product.thickness}x${product.height}`;
      }
    },
    add_to_basket(product) {
      let basket = JSON.parse(localStorage.getItem("basket"));
      let basket_item = basket.find((item) => item.id === product.id);

      if (basket_item.count < product.count) {
        basket_item.count++;
      }

      this.flag = !this.flag;
      localStorage.setItem("basket", JSON.stringify(basket));
    },
    enc_to_basket(product) {
      let basket = JSON.parse(localStorage.getItem("basket"));
      let basket_item = basket.find((item) => item.id === product.id);

      basket_item.count--;

      if (basket_item.count === 0) {
        basket.splice(
          basket.findIndex((item) => item.id === product.id),
          1
        );
      }

      this.flag = !this.flag;
      localStorage.setItem("basket", JSON.stringify(basket));
    },
  },
};
</script>

<style scoped></style>

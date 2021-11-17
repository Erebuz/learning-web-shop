<template>
  <div class="d-flex justify-center">
    <v-col cols="10">
      <v-row class="justify-space-around">
        <template v-for="(product, index) in showing_products_list">
          <v-card
            :key="product.id"
            width="400px"
            class="ma-2 d-flex flex-column"
          >
            <v-card-title
              >{{ product_title(product) }}<v-spacer />{{
                product.material
              }}</v-card-title
            >

            <v-card-text
              ><img
                :id="`image_${index}`"
                width="360px"
                height="300px"
                style="object-fit: contain"
                :alt="product.image"
            /></v-card-text>
            <v-card-text class="font-weight-bold"
              >{{ product.price }} у.е./шт.</v-card-text
            >
            <v-card-text>{{ product.description }}</v-card-text>

            <v-card-actions class="flex-grow-1 d-flex align-end" :key="flag">
              <v-btn
                v-if="!check_basket(product)"
                block
                @click="add_to_basket(product)"
                >Добавить в корзину</v-btn
              >
              <div
                class="d-flex justify-space-between"
                style="width: 100%"
                v-else
              >
                <v-btn @click="enc_to_basket(product)" width="150px"
                  ><span style="font-size: 2em">-</span></v-btn
                >
                <div style="font-size: 1.5em">{{ check_basket(product) }}</div>
                <v-btn @click="add_to_basket(product)" width="150px"
                  ><span style="font-size: 2em">+</span></v-btn
                >
              </div>
            </v-card-actions>
          </v-card>
        </template>
      </v-row>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>Фильтр</v-card-title>
        <v-card-text>
          <v-select
            v-model="find_material"
            :items="material_list"
            label="Материал"
            @change="set_max_min_price"
          />
          <v-select
            v-model="find_type"
            :items="type_list"
            label="Тип товара"
            @change="set_max_min_price"
          />
          <v-range-slider
            v-model="find_price"
            :value="find_price"
            :max="max"
            :min="min"
            hide-details
            class="align-center"
            @change="filter_product"
          >
            <template v-slot:prepend>
              <v-text-field
                v-model="find_price[0]"
                label="Мин. цена"
                @change="filter_product"
              />
            </template>
            <template v-slot:append>
              <v-text-field
                v-model="find_price[1]"
                label="Макс. цена"
                @change="filter_product"
              />
            </template>
          </v-range-slider>
        </v-card-text>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import products from "@/view/products";

export default {
  name: "general",
  data() {
    return {
      flag: false,
      find_material: "Не выбран",
      find_type: "Не выбран",
      find_price: [0, 100000000],
      min: 0,
      max: 1000000000,
      products: [],
    };
  },
  created() {
    this.load_products();
  },
  watch: {
    showing_products_list() {
      this.load_image();
    },
    flag() {
      this.$emit("flag");
    },
  },
  computed: {
    showing_products_list() {
      return this.filter_product();
    },
    material_list() {
      let material = ["Не выбран"];

      this.products.forEach((product) => {
        if (!material.includes(product.material)) {
          material.push(product.material);
        }
      });

      return material;
    },
    type_list() {
      let product_type = ["Не выбран"];

      this.products.forEach((product) => {
        if (!product_type.includes(product.name)) {
          product_type.push(product.name);
        }
      });

      return product_type;
    },
  },
  methods: {
    load_products() {
      this.$http.get("/product/all").then((res) => {
        this.products = res.data;
        this.set_max_min_price();
      });
    },
    filter_product() {
      let temp = this.products;
      if (this.find_material !== "Не выбран") {
        temp = temp.filter((item) => item.material === this.find_material);
      }
      if (this.find_type !== "Не выбран") {
        temp = temp.filter((item) => item.name === this.find_type);
      }

      temp = temp.filter(
        (item) =>
          item.price >= this.find_price[0] && item.price <= this.find_price[1]
      );

      return temp;
    },
    load_image() {
      this.showing_products_list.forEach((product, index) => {
        this.$http.get(`/product/image${product.image}`).then((res) => {
          document.getElementById(`image_${index}`).src =
            `data:image/jpeg;base64,` + res.data;
        });
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
    check_basket(product) {
      if (!localStorage.getItem("basket")) {
        return true;
      }

      let basket = JSON.parse(localStorage.getItem("basket"));
      let basket_item = basket.find((item) => item.id === product.id);

      return basket_item?.count;
    },
    add_to_basket(product) {
      if (!localStorage.getItem("basket")) {
        localStorage.setItem(
          "basket",
          JSON.stringify([{ id: product.id, count: 1 }])
        );
      } else {
        let basket = JSON.parse(localStorage.getItem("basket"));
        let basket_item = basket.find((item) => item.id === product.id);

        if (basket_item) {
          if (basket_item.count < product.count) {
            basket_item.count++;
          }
        } else {
          basket.push({ id: product.id, count: 1 });
        }

        this.flag = !this.flag;
        localStorage.setItem("basket", JSON.stringify(basket));
      }
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
    set_max_min_price() {
      let min = 100000000000,
        max = 0;
      this.products.forEach((item) => {
        if (item.price < min) min = item.price;
        if (item.price > max) max = item.price;
      });

      this.max = max;
      this.min = min;
      if (this.find_price[0] < min) this.find_price[0] = min;
      if (this.find_price[1] > max) this.find_price[1] = max;
    },
  },
};
</script>

<style scoped></style>

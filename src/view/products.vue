<template>
  <div class="d-flex justify-center">
    <v-col cols="10">
      <v-data-table :headers="headers" :items="products" group-by="name">
        <template v-slot:item.size="{ item }">
          {{ product_title(item) }}
        </template>
        <template v-slot:item.add="{ item }">
          <v-form
            class="d-flex pt-2 align-center"
            style="width: 250px"
            @submit.prevent="add_product_count(item)"
          >
            <v-text-field
              type="number"
              :min="0"
              v-model.number="item.add"
              class="mx-2"
            />
            <v-btn type="submit" :disabled="!item.add">Добавить</v-btn>
          </v-form>
        </template>
        <template v-slot:item.new_price="{ item }">
          <v-form
            class="d-flex pt-2 align-center"
            style="width: 250px"
            @submit.prevent="change_product_price(item)"
          >
            <v-text-field
              type="number"
              :min="0"
              v-model.number="item.new_price"
              class="mx-2"
            />
            <v-btn type="submit" :disabled="!item.new_price">Изменить</v-btn>
          </v-form>
        </template>
      </v-data-table>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "products",
  data() {
    return {
      headers: [
        {
          text: "Тип",
          value: "name",
        },
        {
          text: "Размеры",
          value: "size",
        },
        {
          text: "Материал",
          value: "material",
        },
        {
          text: "Описание",
          value: "description",
        },
        {
          text: "Цена",
          value: "price",
        },
        {
          text: "На складе",
          value: "count",
        },
        {
          text: "Новая цена",
          value: "new_price",
        },
        {
          text: "Приход",
          value: "add",
        },
      ],
      products: [],
    };
  },
  created() {
    this.load_products();
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
          return `${product.width}x${product.height}x${product.thickness}`;
        case "труба":
          return `D${product.width}x${product.thickness}x${product.height}`;
        case "круг":
          return `D${product.thickness}x${product.height}`;
      }
    },
    add_product_count(product) {
      this.$http
        .post("/store/add", {
          product_id: product.id,
          count: product.count + product.add,
        })
        .then(() => {
          product.add = null;
          this.load_products();
        });
    },
    change_product_price(product) {
      this.$http
        .post("/product/set_price", {
          product_id: product.id,
          new_price: product.new_price,
        })
        .then(() => {
          this.load_products();
        });
    },
  },
};
</script>

<style scoped></style>

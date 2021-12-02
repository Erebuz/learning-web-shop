<template>
  <v-container fluid>
    <v-col cols="8" offset="2" class="d-flex flex-column justify-center">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Выберите период"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable range>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
          <v-btn
            text
            color="primary"
            @click="
              $refs.menu.save(date);
              get_product_profit(date);
            "
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <template v-if="products_profit.length !== 0">
        <v-divider class="my-4" />
        <div>
          Суммарная прибыль за указанный период: <b>{{ summ_profit }} у.е.</b>
        </div>
        <v-divider class="my-4" />
        <h4>Рейтинг товаров</h4>
        <v-data-table
          :headers="headers"
          :items="product_list"
          :sort-by.sync="sort"
          :sort-desc.sync="desk"
        ></v-data-table>
      </template>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "rating",
  data() {
    return {
      menu: false,
      date: null,
      sort: "summ",
      desk: true,
      product_types: [],
      products_profit: [],
      headers: [
        {
          text: "Товар",
          value: "name",
        },
        {
          text: "Продано",
          value: "count",
        },
        {
          text: "Прибыль на ед.",
          value: "profit_one",
        },
        {
          text: "Суммарная прибыль",
          value: "summ",
        },
      ],
    };
  },
  computed: {
    summ_profit() {
      let summ = 0;
      this.products_profit.forEach((item) => {
        summ += item.count * item.profit_one;
      });
      return summ;
    },
    product_list() {
      let temp = [];
      this.products_profit.forEach((item) => {
        let product = this.product_types.find((prod) => item.type === prod.id);

        temp.push({
          name: this.product_title(product),
          count: item.count,
          profit_one: item.profit_one,
          summ: item.count * item.profit_one,
        });
      });
      return temp;
    },
  },
  created() {
    this.load_data();
  },
  methods: {
    load_data() {
      this.$http.get("/product/get_types").then((res) => {
        this.product_types = res.data;
      });
    },
    get_product_profit(date) {
      let start = date[0];
      let end = date[1] ? date[1] : date[0];

      if (new Date(start) > new Date(end)) {
        let temp = start;
        start = end;
        end = temp;
      }

      this.$http
        .post("/product/get_profit", {
          start: `${start} 00:00:00`,
          end: `${end} 23:59:59`,
        })
        .then((res) => {
          this.products_profit = res.data;
        });
    },
    product_title(product) {
      switch (product.name) {
        case "лист":
          return `Лист ${product.width}x${product.height}x${product.thickness}`;
        case "труба":
          return `Труба D${product.width}x${product.thickness}x${product.height}`;
        case "круг":
          return `Круг D${product.thickness}x${product.height}`;
      }
    },
  },
};
</script>

<style scoped></style>

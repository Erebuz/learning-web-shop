<template>
  <v-container>
    <v-row class="justify-center">
      <v-col class="col-6">
        <v-expansion-panels>
          <v-expansion-panel v-for="order in history" :key="order.date">
            <v-expansion-panel-header>
              Дата покупки: {{ order.date }}, на сумму: {{ order.summ }},
              статус: {{ order.status }}
            </v-expansion-panel-header>
            <v-expansion-panel-content
              v-for="product in order.products"
              :key="product.product_id"
              class="text-left"
            >
              {{ product.name }}, {{ product.count }}шт. на сумму
              {{ product.price }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "history",
  data() {
    return {
      history: [],
    };
  },
  created() {
    this.refresh_history();
  },
  methods: {
    refresh_history() {
      this.$http.get("/order/history").then((res) => {
        this.set_history(res.data);
      });
    },
    set_history(data_arr) {
      data_arr.forEach((order) => {
        let history_order = this.history.find((item) => {
          return item.date === order.date;
        });
        if (!history_order) {
          this.history.push({
            date: order.date,
            summ: order.id,
            status: order.status,
            products: [],
          });
          history_order = this.history.find((item) => item.date === order.date);
        }

        history_order.products.push({
          id: order.product_id,
          name: order.description,
          count: order.count,
          price: order.price,
        });
      });
    },
  },
};
</script>

<style scoped></style>

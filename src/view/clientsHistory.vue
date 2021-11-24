<template>
  <v-container>
    <v-row class="justify-center">
      <v-col class="col-6">
        <v-expansion-panels>
          <v-expansion-panel v-for="order in history" :key="order.date">
            <v-expansion-panel-header>
              Дата покупки: {{ order.date }}, на сумму: {{ order.summ }}, тел.:
              {{ order.phone }} статус: {{ order.status }}
            </v-expansion-panel-header>
            <v-expansion-panel-content
              v-for="product in order.products"
              :key="product.product_id"
              class="text-left"
            >
              {{ product.name }}, {{ product.count }}шт. на сумму
              {{ product.price }}<br />
            </v-expansion-panel-content>
            <v-btn class="my-2" block @click="set_pay(order.products)"
              >Оплачено</v-btn
            >
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "clientsHistory",
  data() {
    return {
      history: [],
    };
  },
  created() {
    this.load_data();
  },
  methods: {
    load_data() {
      this.history = [];
      this.$http.get("/order/all").then((res) => {
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
            summ: 0,
            phone: order.phone,
            status: order.status,
            products: [],
          });
          history_order = this.history.find((item) => item.date === order.date);
        }

        history_order.products.push({
          order_id: order.id,
          name: order.description,
          count: order.count,
          price: order.price,
        });

        history_order.summ = 0;
        history_order.products.forEach(
          (product) => (history_order.summ += product.price * product.count)
        );
      });
    },
    set_pay(products) {
      for (let product of products) {
        this.$http
          .post("/order/paid", { order_id: product.order_id })
          .then(() => {
            this.load_data();
          });
      }
    },
  },
};
</script>

<style scoped></style>

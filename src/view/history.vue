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
              :key="product.name"
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
      history: [
        {
          date: "12.03.2021 13:30:24",
          summ: 1250,
          status: "завершена",
          products: [
            {
              name: "товар 1",
              count: 2,
              price: 625,
            },
            {
              name: "товар 2",
              count: 1,
              price: 1240,
            },
          ],
        },
      ],
    };
  },
  created() {
    this.refresh_history();
  },
  methods: {
    refresh_history() {
      //  TODO: Запрос истории от сервера
    },
  },
};
</script>

<style scoped></style>

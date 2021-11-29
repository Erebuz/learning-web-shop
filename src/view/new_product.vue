<template>
  <v-container fluid>
    <v-col cols="8" offset="2" class="d-flex flex-column justify-center">
      <v-form ref="form" @submit.prevent="set_new_product">
        <v-select
          v-model="new_product.type"
          :items="types_list"
          item-text="name"
          item-value="id"
          label="Тип продукта"
          :rules="[required]"
        ></v-select>
        <v-select
          v-model="new_product.material"
          :items="materials"
          label="Материал"
          :rules="[required]"
        >
          <template v-slot:prepend-item>
            <div class="d-flex">
              <v-text-field
                v-model="custon_material"
                class="ml-12"
                placeholder="Введите материал, если его нет в списке"
              ></v-text-field>
              <v-btn @click="add_new_material" class="mr-12 ml-4"
                >Добавить</v-btn
              >
            </div>
          </template>
        </v-select>
        <v-text-field
          v-model.number="new_product.seller_price"
          type="number"
          :min="0"
          label="Цена продажи"
          :rules="[required]"
        />
        <v-text-field
          v-model.number="new_product.buying_price"
          type="number"
          :min="0"
          label="Цена покупки"
          :rules="[required]"
        />
        <v-text-field
          v-model="new_product.description"
          label="Описание"
          :rules="[required]"
        />
        <v-file-input
          v-model="new_product.image"
          accept="image/*"
          label="Выбрать изображение"
          :rules="[required]"
        />
        <v-btn type="submit">Создать товар</v-btn>
        <div v-if="success" class="green--text mt-2">
          Товар добавлен успешно
        </div>
      </v-form>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "new_product",
  data() {
    return {
      new_product: {
        type: null,
        material: null,
        seller_price: null,
        buying_price: null,
        description: null,
        image: null,
      },
      success: false,
      types: [],
      materials: [],
      custon_material: "",
      required: (val) => (val != "" && val != null) || "Обязательно",
    };
  },
  created() {
    this.load_data();
  },
  computed: {
    types_list() {
      let temp = [];
      this.types.forEach((type) => {
        temp.push({ id: type.id, name: this.product_title(type) });
      });
      return temp;
    },
  },
  methods: {
    load_data() {
      this.$http.get("/product/get_types").then((res) => {
        this.types = res.data;
      });
      this.$http.get("/product/get_materials").then((res) => {
        this.materials = res.data;
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
    add_new_material() {
      this.materials.push(this.custon_material);
    },
    set_new_product() {
      this.success = false;
      if (this.$refs.form.validate()) {
        let reader = new FileReader();

        reader.readAsDataURL(this.new_product.image);

        reader.onload = () => {
          this.$http
            .post("/product/set_new_product", {
              ...this.new_product,
              image: reader.result.split(/,(.+)/)[1],
            })
            .then(() => {
              for (let key in this.new_product) {
                this.new_product[key] = null;
              }
              this.success = true;
            });
        };
      }
    },
  },
};
</script>

<style scoped></style>

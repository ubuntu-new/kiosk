<template>
    <div class="container">
      <div class="catSort mt-3">
        <ul class="ulHorizontal">
          <li class="liHorizontal" @click="sortCat(3)">Pizza</li>
          <li class="liHorizontal" @click="sortCat(2)">Extras</li>
          <li class="liHorizontal" @click="sortCat(1)">Other</li>
          <li class="liHorizontal" @click="sortCat(0)">All</li>
          <li class="liHorizontal" @click="toggleConstructor">Open Constructor</li>    
          <li class="liHorizontal" @click="toogleCart">    

          <v-badge floating :content="cartLength" color="error">
            Cart
          </v-badge>
          </li>
        </ul>
      </div>
      <br>
      <ProductModal :product="selectedItem" :productModal="productModal" @closeProductDialog="closeProductModal" :imgS="productImgS" :imgM="productImgM" :imgXL="productImgXl" :ingredientss="ingredients"  />
      <v-row>
        <ProductSingle v-for="(product, index) in sortedProducts" :key="index" :product="product"  @onProductSelect="productSelect" />
      </v-row>
      <SelectDineOption v-if="dineOption == ''" @onDineOption="selectDineOption" />
    </div>

    <Cart :open="cartOpened" @openCheckout="openCheckoutModal"/>
    <Constructor :activeConstructor="openTest" @closeConstructorDialog="toggleConstructor" />
    <Checkout :activeCheckout="openCheckout" />
</template>

<script setup>
  import SelectDineOption from '@/components/DineOption.vue'
  import ProductModal from '@/components/ProductModal.vue'
  import ProductSingle from '@/components/ProductSingle.vue'
  import Constructor from '@/components/Constructor.vue'
  import Cart from '@/components/Cart.vue'
  import Checkout from '@/components/Checkout.vue'

  import axios from 'axios'

</script>

<script>
export default {
    data () {
        return {
          hostname: 'http://new.ronnys.info/rest/web/index.php?r=v1/',
          TOKEN: "TodKtEjTTqj8HBVGmQPE3gW5TFY",
          dineOption: '',
          selectedItem: {},
          openTest: false,
          productModal: false,
          divModal: false,
          recipe: [],
          toppingPrice: [],
          ingredients: [],
          ingredientsA: [],
          ingredientsB: [],
          sticksIngredients: [],
          productImgS: null,
          productImgM: null,
          productImgXl: null,
          sortedProducts: [],
          cartOpened: false,
          openCheckout: false,
        }
    },
    computed: {
      dineInOption(){
        return this.$store.getters.dineOption;
      },
      productList(){
        return this.$store.getters.productList;
      },
      cart(){
        return this.$store.getters.cartList;
      },
      cartLength(){
        return this.cart.length
      }
    },
    methods: {
        openCheckoutModal(){
          this.openCheckout = !this.openCheckout;
        },
        toggleConstructor(){
          // alert('bla');
          this.openTest = !this.openTest;
        },
        closeConstructor() {
          this.openTest = false;
        },
        toogleCart(){
          this.cartOpened = !this.cartOpened;
        },
        sortCat(cat_id){
          if(cat_id == 0){
            this.sortedProducts = this.productList;
          } else {
            var temp = this.productList;
            this.sortedProducts = temp.filter((x) => x.category_id == cat_id);
          }
        },
        selectDineOption(option){
          this.dineOption = option;
          this.$store.dispatch('dineOption', option);
        },
        productSelect(product){
          console.log("selected Product: " + product);
          this.selectedItem = product;
          this.getProductRecipe();
          this.productImgS = product.s;
          this.productImgM = product.m;
          this.productImgXl = product.xl;
          this.productModal = true;
        },
        productDivSelect(product){
          console.log("selected Product: " + product);
          this.selectedItem = product;
          this.productImgM = product.m;
          this.divModal = true;
        },
        closeProductModal(){
          this.productModal = false;
        },
        getProductRecipe(){
            const TOKEN = "TodKtEjTTqj8HBVGmQPE3gW5TFY";
            var bodyFormData = new FormData();
            bodyFormData.set("product_id", this.selectedItem.id);

            axios
                .request({
                method: "post",
                url: this.hostname + "products/get-reciept-by-product-id",
                headers: {
                    Authorization: "Bearer " + TOKEN,
                },
                data: bodyFormData,
                })
                .then((response) => {
                  this.recipe = response.data;

                  this.recipe.forEach((x) => {
                      x.isDeleted = false;
                      if (x.isPremium == "1") {
                      x.price = this.toppingPrice[1].m;
                      } else {
                      x.price = this.toppingPrice[0].m;
                      }
                  });
                  this.selectedItem.defaultToppings = this.recipe;
                  // this.selectedItem.half1.defaultToppings = this.recipe;
                  // this.selectedItem.half2.defaultToppings = this.recipe;
                  this.selectedItem.toppings = [];
                });
        },
        getIngredients(){
          axios
            .request({
              method: "post",
              url: this.hostname + "products/get-ingredientsweb",
              headers: {
                Authorization: "Bearer " + this.TOKEN,
              },
            })
            .then((response) => {
              this.ingredients = response.data;
              var arr = [];
              var sticks = [];
              this.ingredients.forEach((x) => {
                if(this.locale == 'ka'){
                  x.name_en = x.name;
                  x.name = x.name_ge;
                }
                if (x.product_category_id != 2) {
                  if (!x.price) {
                    x.price = 0;
                    x.qty = 0
                  }
                  arr.push(x);
                } else {
                  if (!x.price) {
                    x.price = 0;
                    x.qty = 0;
                  }
                  if (x.id != 31) {
                    sticks.push(x);
                  }
                }
              });
              this.$store.dispatch('addIngredientsList', arr);
              this.sticksIngredients = JSON.parse(JSON.stringify(sticks));
              this.ingredients = JSON.parse(JSON.stringify(arr));
              this.ingredientsA = JSON.parse(JSON.stringify(arr));
              this.ingredientsB = JSON.parse(JSON.stringify(arr));
            });
        },
    },
    mounted() {
      this.$store.dispatch('clearCart');
      this.getIngredients();
      axios.request({
        method: "post",
        url: this.hostname + "products/get-productssite",
        headers: {
          Authorization: "Bearer " + this.TOKEN,
        },
      })
      .then((response) => {
        // this.products = response.data;
        var tempArr = response.data;
        
        var pizzaArr = [];

        tempArr.forEach(x => {
          if(x.category_id == 3) {
            pizzaArr.push(x)
            x.half1 = {
              toppings: [],
              default: [],
            }
            x.half2 = {
              toppings: [],
              default: [],
            }
            x.price = x.priceBySizes.m;
          }
        });

        // pizzaArr = Object.freeze((pizzaArr))
        
        this.$store.dispatch('addPizzaList', pizzaArr)
        this.$store.dispatch('addProductList', tempArr);

        this.sortCat(0);
      });

      axios
      .request({
        method: "post",
        url: this.hostname + "products/get-ingredients-price",
        headers: {
          Authorization: "Bearer " + this.TOKEN,
        },
      })
      .then((response) => {
        this.toppingPrice = response.data;
      });
    },
    created(){
      this.sortedProducts = this.productList;
    },
}
</script>

<template style="background-color: #F5E1AB;">
  <section >
  <div class="container-fluid h-100">
    <div class="d-flex align-items-center justify-content-center h-100">
      <div class="d-flex flex-column">
        <figure>
          <img src="../assets/img/header.jpg" class="header-image" alt="Responsive image">
        </figure>
      </div>
    </div>
  </div>
</section>
  <div class="container position-relative" style="top: -20px;">
    <div class="row d-flex align-items-center justify-content-center h-100">
      <div class="col"  @click="sortCat(3)">
        <div class="d-flex justify-content-center align-items-center p-4 rounded-3">
					<div class="ms-4 h6 fw-normal mb-0">
						<div class="d-flex">
							<div class="position-relative">                 
                  <img src="../assets/img/logo.png" alt="tab1" class="mb-5 logo">                 
              </div>
						</div>
					</div>
				</div>
      </div>
      <div class="col"  @click="sortCat(3)">
        <div class="d-flex justify-content-center align-items-center p-4 rounded-3">
					<div class="ms-4 h6 fw-normal mb-0">
						<div class="d-flex">
							<div class="position-relative">                 
                  &nbsp;               
              </div>
						</div>
					</div>
				</div>
      </div>
      <div class="col"  @click="sortCat(3)">
        <div class="d-flex justify-content-center align-items-center p-4 rounded-3 cat-background active">
					<div class="ms-4 h6 fw-normal mb-0">
						<div class="d-flex">
							<div class="position-relative">  
                <h3 class="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="10" data-purecounter-delay="200" data-purecounter-duration="0">
                  Pizza
                </h3>                 
              </div>
						</div>
					</div>
				</div>
      </div>
      <div class="col"  @click="sortCat(2)">
        <div class="d-flex justify-content-center align-items-center p-4 rounded-3 cat-background">
					<div class="ms-4 h6 fw-normal mb-0">
						<div class="d-flex">
							<h3 class="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="10" data-purecounter-delay="200" data-purecounter-duration="0">
                Extras
              </h3>
						</div>
					</div>
				</div>
      </div>
      <div class="col"  @click="sortCat(1)">
        <div class="d-flex justify-content-center align-items-center p-4 rounded-3 cat-background">
					<div class="ms-4 h6 fw-normal mb-0">
						<div class="d-flex">
							<h3 class="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="10" data-purecounter-delay="200" data-purecounter-duration="0">
                Other
              </h3>
						</div>
					</div>
				</div>
      </div>
      <div class="col"  @click="sortCat(0)">
        <div class="d-flex justify-content-center align-items-center p-4 rounded-3 cat-background">
					<div class="ms-4 h6 fw-normal mb-0">
						<div class="d-flex">
							<h3 class="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="10" data-purecounter-delay="200" data-purecounter-duration="0">
                All
              </h3>
						</div>
					</div>
				</div>
      </div>
      <div class="col"  @click="toogleCart()">
        <div class="d-flex justify-content-center align-items-center p-4 rounded-3 cat-background">
					<div class="ms-4 h6 fw-normal mb-0">
						<div class="d-flex">
							<h3 class="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="10" data-purecounter-delay="200" data-purecounter-duration="0">
                Cart
              </h3>
						</div>
					</div>
				</div>
      </div>
    </div>
  </div>
    <div class="container">
      <!-- <div class="catSort mt-3">
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
      </div> -->
      <div class="row align-items-center mt-70">
          <div class="col-lg-4 col-12" @click="toggleConstructor">
            <div class="position-relative">
              <figure>
                  <img src="../assets/img/half-half.png" alt="tab1" class="mb-5 const-image">
              </figure>
            </div>
          </div>
          <div class="col-lg-8 col-12">
            <div class="mx-xl-5">
                <div class="mb-5">
                  <h3>Half & Half Pizza</h3>
                  <p class="mb-0">Two pizzas in one! Double your flavor experience. Great for sharing between friends with different tastes.</p>
                </div>
            </div>
          </div>
      </div>
      <br>
      <ProductModal :toppingPrice="toppingPrice" :product="selectedItem" :cheeseLoversActive="cheeseLoversActive" 
                    :productModal="productModal" @closeProductDialog="closeProductModal" :imgS="productImgS"
                    :imgM="productImgM" :imgXL="productImgXl" :ingredients="ingredients" :ingredientsA="ingredientsA" :ingredientsB="ingredientsB" :sticks="sticksIngredients"  />
      <v-row class="g-2">
        <ProductSingle v-for="(product, index) in sortedProducts" :key="index" :product="product"  @onProductSelect="productSelect" />
      </v-row>
      <SelectDineOption v-if="dineOption == ''" @onDineOption="selectDineOption" />
    </div>
    <div class="footer" @click="toogleCart()">
      CARD
    </div>

    <Cart :open="cartOpened" @openCheckout="openCheckoutModal"/>
    <Constructor :activeConstructor="openTest" @closeConstructorDialog="toggleConstructor" :toppingPrice="toppingPrice" :ingredients="ingredients" :ingredientsA="ingredientsA" :ingredientsB="ingredientsB"/>
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
          // hostname: 'http://new.ronnys.info/rest/web/index.php?r=v1/', // TEST
          hostname: 'https://api.ronnyspizza.grena.ge/rest/web/index.php?r=v1/', // GRENA PRODUCTION
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
          cheeseLoversActive: false,
          size: 'm',
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
          this.ingredients = this.$store.getters.ingredientsList;
          this.ingredientsA = this.$store.getters.ingredientsList;
          this.ingredientsB = this.$store.getters.ingredientsList;
          this.getIngredients();
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
          if(product.id == 56){
            alert('Cheese Lovers');
            this.cheeseLoversActive = true;
          }
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
          this.ingredients = this.$store.getters.ingredientsList;
          this.ingredientsA = this.$store.getters.ingredientsList;
          this.ingredientsB = this.$store.getters.ingredientsList;
          this.productModal = false;
          this.getIngredients();
          // this.cheeseLoversActive = false;
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
        getProductRecipeById(product){
            const TOKEN = "TodKtEjTTqj8HBVGmQPE3gW5TFY";
            var bodyFormData = new FormData();
            bodyFormData.set("product_id", product.id);

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
                  product.defaultToppings = this.recipe;
                  // this.selectedItem.half1.defaultToppings = this.recipe;
                  // this.selectedItem.half2.defaultToppings = this.recipe;
                  product.toppings = [];
                });
        },
        getIngredients(){

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
                    x.isDeleted = false;
                    sticks.push(x);
                  }
                }
              });
              
              this.sticksIngredients = JSON.parse(JSON.stringify(sticks));
              this.ingredients = JSON.parse(JSON.stringify(arr));
              this.ingredientsA = JSON.parse(JSON.stringify(arr));
              this.ingredientsB = JSON.parse(JSON.stringify(arr));
              this.$store.dispatch('addIngredientsList', arr);
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
            this.getProductRecipeById(x);
            pizzaArr.push(x)
            x.half1 = {
              toppings: [],
              default: [],
            }
            x.half2 = {
              toppings: [],
              default: [],
            }
            x.price = Number(x.priceBySizes.m);
          }
        });

        // pizzaArr = Object.freeze((pizzaArr))
        
        this.$store.dispatch('addPizzaList', pizzaArr)
        this.$store.dispatch('addProductList', tempArr);

        this.sortCat(0);
      });

      
    },
    created(){
      this.sortedProducts = this.productList;
    },
}
</script>

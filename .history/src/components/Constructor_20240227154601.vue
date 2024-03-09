<template>
    <!-- <div  v-show="openDialog" class="modal-container"> -->
        <v-dialog fullscreen persistent v-model="openDialog" transition="dialog-bottom-transition">
        <v-card v-if="!bothHalfSelected">
            <!-- <v-btn @click="closeDialog" > -->
                <v-icon @click="closeDialog">mdi-close</v-icon>
            <!-- </v-btn> -->
            <v-card-text>
                <v-row>
                    <v-col 
                    cols="3"
                    offset="2"
                    >
                        <div class="constructorBox constructorBoxBorder">
                            <img
                                :src="selectedItem.half1.m"
                                class="imgResize"
                            />
                            <v-row>
                                <div class="text-title">
                                    {{ selectedItem.half1.name }}
                                </div>
                            </v-row>
                        </div>
                    </v-col>
                    <v-col cols="2">
                        <!-- <v-icon size="x-large" style="margin-top: 100px;" >mdi-close</v-icon> -->
                    </v-col>
                    <v-col cols="3">
                        <div class="constructorBox constructorBoxBorder">
                            <img
                                :src="selectedItem.half2.m"
                                class="imgResize"
                            />
                            <v-row>
                                <div class="text-title">
                                    {{ selectedItem.half2.name }}
                                </div>
                            </v-row>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                        <v-col v-for="(product, index) in pizzaList" :key="index" cols="4" class="unselectable" @click="halfSelect(product)" :class="product.isSelected ? 'pizza_inactive' : ''" >
                            <span :class="product.isSelected ? 'checkmark' : ''"></span>
                            <img
                            :src="product.m"
                            class="imgResizeConstructor"
                            />
                            <v-row>
                                <div class="text-title">
                                   <h3> {{ product.name }} </h3>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="text-description card-body">
                                   <h6> {{ product.description }} </h6>
                                </div>
                                <br />
                                <!-- <div class="text-price">
                                    From {{ product.priceBySizes.s }} &#8382;
                                </div> -->
                            </v-row>

                        </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-card v-else>
            <v-icon @click="closeDialog">mdi-close</v-icon>
            <div class="backgraundi">
              <img src="@/assets/img/pizzaBack.png" class="mainImage" />
              <div class="insideImageSHalfL" :class="{ hidden: size !== 's' }">
                <img :src="selectedItem.half1.s" />
              </div>
              <div class="insideImageSHalfR" :class="{ hidden: size !== 's' }">
                <img :src="selectedItem.half2.s" />
              </div>
              <div class="insideImageMHalfL" :class="{ hidden: size !== 'm' }">
                <img :src="selectedItem.half1.m" />
              </div>
              <div class="insideImageMHalfR" :class="{ hidden: size !== 'm' }">
                <img :src="selectedItem.half2.m" />
              </div>
              <div
                class="insideImageXlHalfL"
                :class="{ hidden: size !== 'xl' }"
              >
                <img :src="selectedItem.half1.xl" />
              </div>
              <div
                class="insideImageXlHalfR"
                :class="{ hidden: size !== 'xl' }"
              >
                <img :src="selectedItem.half2.xl" />
              </div>
            </div>


            <div class="row orderTitle">
              <div class="md-12">
                <v-card class="pa-2">
                  <div class="product-info mb-2">
                  <h5 class="base">{{ sizeFull }}  <strong> {{ selectedItem.name }} </strong>  
                    <span class="orange" v-if="crust != 'original'">
                        {{ crustFull }};
                    </span>
                    <span class="orange" v-if="sauce != 'sauce'">
                        {{ sauceFull }} 
                    </span >
                    </h5>
                  </div> 

                  <h5 class="mt-2"> A Side</h5>
                 
                  <ul class="defToppingebi  mb-2">
                    <li
                      class="halfToppings"
                      v-for="(defTopping, index) in selectedItem.half1
                        .defaultToppings"
                      :key="index"
                      @click="deleteDefaultTopping(defTopping, 'a')"
                    >
                      <h6
                        :class="defTopping.isDeleted ? 'deletedTopping' : ''"
                        >{{ defTopping.name }}</h6>
                      <span
                        :class="defTopping.isDeleted ? 'deletedTopping' : ''"
                        v-if="
                          defTopping.isDeleted &&
                          selectedItem.is_special == 0 &&
                          defTopping.id != 5
                        "
                      >
                        - {{ defTopping.price }}
                      </span>
                      <v-icon v-if="defTopping.isDeleted"> local_pizza </v-icon>
                      <v-icon v-else> close </v-icon>
                    </li>
                  </ul>
                  <h5> B Side</h5>
                  <ul class="defToppingebi mb-2">
                    <li
                      class="halfToppings"
                      v-for="(defTopping, index) in selectedItem.half2
                        .defaultToppings"
                      :key="index"
                      @click="deleteDefaultTopping(defTopping, 'b')"
                    >
                      <h6
                        :class="defTopping.isDeleted ? 'deletedTopping' : ''"
                        >{{ defTopping.name }}</h6
                      >
                      <span
                        :class="defTopping.isDeleted ? 'deletedTopping' : ''"
                        v-if="
                          defTopping.isDeleted &&
                          selectedItem.is_special == 0 &&
                          defTopping.id != 5
                        "
                      >
                        - {{ defTopping.price }}
                      </span>
                      <v-icon v-if="defTopping.isDeleted"> local_pizza </v-icon>
                      <v-icon v-else> close </v-icon>
                    </li>
                  </ul>
                  <span  v-if="selectedItem.toppings.length">
                    <h5> A/B SIDE</h5>
                  </span>
                  <div class="wholeTopping">
                    <div
                      class="d-flex justify-content-between halfToppings"
                      v-for="(topping, index) in selectedItem.toppings"
                      :key="index"
                    >
                      <h6 v-if="topping.qty == 1">+ {{ topping.name }}</h6>
                      <h6 v-if="topping.qty != 1"
                        >+ {{ topping.qty }} {{ topping.name }}</h6
                      >
                      <span class="pading-10"
                        >{{ (topping.price * topping.qty).toFixed(2) }}
                      </span>
                    </div>
                  </div>

                  <div class="bSideTopping mt-2">
                    <span v-if="selectedItem.half1.toppings.length">
                    <h5> A Side</h5>
                    </span>
                    <div
                      class="d-flex justify-content-between halfToppings"
                      v-for="(topping, index) in selectedItem.half1.toppings"
                      :key="index"
                    >
                      <h6 v-if="topping.qty == 1"
                        >A + {{ topping.name }}</h6
                      >
                      <h6 v-if="topping.qty != 1"
                        >A + {{ topping.qty }} {{ topping.name }}</h6
                      >
                      <span>
                        {{ (topping.price * topping.qty).toFixed(2) }}
                      </span>
                    </div>
                  </div>

                  <div class="bSideTopping mt-2">
                    <span v-if="selectedItem.half2.toppings.length">
                      <h5>B Side</h5>
                    </span>
                    <div
                      class="d-flex justify-content-between halfToppings"
                      v-for="(topping, index) in selectedItem.half2.toppings"
                      :key="index"
                    >
                      <h6 v-if="topping.qty == 1"
                        >B + {{ topping.name }}</h6
                      >
                      <span v-if="topping.qty != 1"
                        >B + {{ topping.qty }} {{ topping.name }}</span
                      >
                      <span>
                        {{ (topping.price * topping.qty).toFixed(2) }}
                      </span>
                    </div>
                  </div>
                </v-card>
              </div>
            </div>

            <v-row>
                <div class="product-size-wrapper orderTitle">
                    <div class="row">
                        <div
                            class="col-md-4 btn1 btn-yellow pizzaSize"
                            @click="sizeBtn('s')"
                            :class="{ active: size === 's' }"
                        >
                            Small
                        </div>
                        <div
                            class="col-md-4 btn1 btn-yellow pizzaSize"
                            @click="sizeBtn('m')"
                            :class="{ active: size === 'm' }"
                        >
                            Medium
                        </div>
                        <div
                            class="col-md-4 btn1 btn-yellow pizzaSize"
                            @click="sizeBtn('xl')"
                            :class="{ active: size === 'xl' }"
                        >
                            XL
                    </div>
                    </div>
                    <div class="row">
                        <div
                            class="col-md-6 btn btn-yellow crustSize"
                            @click="changeCrust('original')"
                            :class="{ active: crust === 'original' }"
                        >
                            Original
                        </div>
                        <div
                            class="col-md-6 btn btn-yellow crustSize"
                            @click="changeCrust('thin')"
                            :class="{ active: crust === 'thin' }"
                        >
                            Thin
                        </div>
                    </div>
                    <div class="row">
                        <div
                            class="col-sm-3 btn btn-yellow sauceSize"
                            @click="changeSauce('sauce')"
                            :class="{ active: sauce === 'sauce' }"
                        >
                            Original Sauce
                        </div>
                        <div
                            class="col-sm-3 btn btn-yellow sauceSize"
                            @click="changeSauce('less sauce')"
                            :class="{ active: sauce === 'less sauce' }"
                        >
                            Less Sauce
                        </div>
                        <div
                            class="col-sm-3 btn btn-yellow sauceSize"
                            @click="changeSauce('more sauce')"
                            :class="{ active: sauce === 'more sauce' }"
                        >
                        Heavy Sauce
                        </div>
                        <div
                            class="col-sm-3 btn btn-yellow sauceSize"
                            @click="changeSauce('no sauce')"
                            :class="{ active: sauce === 'no sauce' }"
                        >
                            No Sauce
                        </div>
                    </div>
                    <div class="row">
                        <div
                            class="col-md-4 btn btn-yellow halfSize"
                            @click="half = 'a'"
                            :class="{ active: half === 'a'}"
                        >
                            A Side
                        </div>
                        <div
                            class="col-md-4 btn btn-yellow halfSize"
                            @click="half = 'b'"
                            :class="{ active: half === 'b' }"
                        >
                            B Side
                        </div>
                        <div
                            class="col-md-4 btn btn-yellow halfSize"
                            @click="half = 'w'"
                            :class="{ active: half === 'w' }"
                        >
                            A/B SIDE
                        </div>
                    </div>
                </div>
            </v-row>    
            <v-row>
                        <v-col cols="4" offset="2">
                            <table class="table mb-250" v-if="half == 'w'">
                                <tr
                                v-for="(ingredient, index) in this.ingredients.slice(
                                    0,
                                    11
                                )"
                                :key="index"
                                @click="clickIncrement(ingredient)"
                                class="ingredientsTable unselectable"
                                >
                                <td class="toppimgTitle">
                                    <div class="toppingName">
                                    {{ ingredient.name }}
                                    <div class="toppingSettInner">
                                        <span
                                        v-if="ingredient.price == 0"
                                        class="toppimgPrice"
                                        :class="{
                                            activeBla: highlightDefToppings(ingredient),
                                        }"
                                        >
                                        </span>
                                        <span
                                        class="toppimgPrice"
                                        v-else
                                        :class="{
                                            activeBla: highlightDefToppings(ingredient),
                                        }"
                                        >{{ parseFloat(ingredient.price).toFixed(2) }}
                                        </span>
                                        <span
                                        class="green"
                                        v-if="highlightDefToppings(ingredient)"
                                        ></span>
                                    </div>
                                    </div>
                                </td>
                                <td class="toppimgQty">
                                    <div class="qty">
                                    <span
                                        class="count w-plius"
                                        v-if="ingredient.qty > 0"
                                    >
                                        {{ ingredient.qty }}
                                    </span>

                                    <span v-else class="w-plius-empty">
                                        <span class="plusIcon">+</span>
                                    </span>
                                    </div>
                                </td>
                                </tr>
                            </table>
                            <table class="table mb-250" v-if="half == 'a'">
                                <tr
                                v-for="(ingredient, index) in this.ingredientsA.slice(
                                    0,
                                    11
                                )"
                                :key="index"
                                @click="clickIncrement(ingredient)"
                                class="ingredientsTable unselectable"
                                >
                                <td class="toppimgTitle">
                                    <div class="toppingName">
                                    {{ ingredient.name }}
                                    <div class="toppingSettInner">
                                        <span
                                        v-if="ingredient.price == 0"
                                        class="toppimgPrice"
                                        :class="{
                                            activeBla: highlightDefToppings(ingredient),
                                        }"
                                        >
                                        </span>
                                        <span
                                        class="toppimgPrice"
                                        v-else
                                        :class="{
                                            activeBla: highlightDefToppings(ingredient),
                                        }"
                                        >{{ parseFloat(ingredient.price).toFixed(2) }}
                                        </span>
                                        <span
                                        class="green"
                                        v-if="highlightDefToppings(ingredient)"
                                        ></span>
                                    </div>
                                    </div>
                                </td>
                                <td class="toppimgQty">
                                    <div class="qty">
                                    <span
                                        class="count w-plius"
                                        v-if="ingredient.qty > 0"
                                    >
                                        {{ ingredient.qty }}
                                    </span>

                                    <span v-else class="w-plius-empty">
                                        <span class="plusIcon">+</span>
                                    </span>
                                    </div>
                                </td>
                                </tr>
                            </table>
                            <table class="table mb-250" v-if="half == 'b'">
                                <tr
                                v-for="(ingredient, index) in this.ingredientsB.slice(
                                    0,
                                    11
                                )"
                                :key="index"
                                @click="clickIncrement(ingredient)"
                                class="ingredientsTable unselectable"
                                >
                                <td class="toppimgTitle">
                                    <div class="toppingName">
                                    {{ ingredient.name }}
                                    <div class="toppingSettInner">
                                        <span
                                        v-if="ingredient.price == 0"
                                        class="toppimgPrice"
                                        :class="{
                                            activeBla: highlightDefToppings(ingredient),
                                        }"
                                        >
                                        </span>
                                        <span
                                        class="toppimgPrice"
                                        v-else
                                        :class="{
                                            activeBla: highlightDefToppings(ingredient),
                                        }"
                                        >{{ parseFloat(ingredient.price).toFixed(2) }}
                                        </span>
                                        <span
                                        class="green"
                                        v-if="highlightDefToppings(ingredient)"
                                        ></span>
                                    </div>
                                    </div>
                                </td>
                                <td class="toppimgQty">
                                    <div class="qty">
                                    <span
                                        class="count w-plius"
                                        v-if="ingredient.qty > 0"
                                    >
                                        {{ ingredient.qty }}
                                    </span>

                                    <span v-else class="w-plius-empty">
                                        <span class="plusIcon">+</span>
                                    </span>
                                    </div>
                                </td>
                                </tr>
                            </table>
                        </v-col>
                        <v-col cols="4">
                            <table class="table mb-250" v-if="half == 'w'">
                                <tr
                                v-for="(ingredient, index) in this.ingredients.slice(
                                    11,
                                    22
                                )"
                                :key="index"
                                @click="clickIncrement(ingredient)"
                                class="ingredientsTable unselectable"
                                >
                                <td class="toppimgTitle">
                                    <div class="toppingName">
                                    {{ ingredient.name }}
                                    <div class="toppingSettInner">
                                        <span
                                        v-if="ingredient.price == 0"
                                        class="toppimgPrice"
                                        :class="{
                                            activeBla: highlightDefToppings(ingredient),
                                        }"
                                        >
                                        </span>
                                        <span
                                        class="toppimgPrice"
                                        v-else
                                        :class="{
                                            activeBla: highlightDefToppings(ingredient),
                                        }"
                                        >{{ parseFloat(ingredient.price).toFixed(2) }}
                                        </span>
                                        <span
                                        class="green"
                                        v-if="highlightDefToppings(ingredient)"
                                        ></span>
                                    </div>
                                    </div>
                                </td>
                                <td class="toppimgQty">
                                    <div class="qty">
                                    <span
                                        class="count w-plius"
                                        v-if="ingredient.qty > 0"
                                    >
                                        {{ ingredient.qty }}
                                    </span>

                                    <span v-else class="w-plius-empty">
                                        <span class="plusIcon">+</span>
                                    </span>
                                    </div>
                                </td>
                                </tr>
                            </table>
                            <table class="table mb-250" v-if="half == 'a'">
                                <tr
                                v-for="(ingredient, index) in this.ingredientsA.slice(
                                    11,
                                    22
                                )"
                                :key="index"
                                @click="clickIncrement(ingredient)"
                                class="ingredientsTable unselectable"
                                >
                                <td class="toppimgTitle">
                                    <div class="toppingName">
                                    {{ ingredient.name }}
                                    <div class="toppingSettInner">
                                        <span
                                        v-if="ingredient.price == 0"
                                        class="toppimgPrice"
                                        :class="{
                                            activeBla: highlightDefToppings(ingredient),
                                        }"
                                        >
                                        </span>
                                        <span
                                        class="toppimgPrice"
                                        v-else
                                        :class="{
                                            activeBla: highlightDefToppings(ingredient),
                                        }"
                                        >{{ parseFloat(ingredient.price).toFixed(2) }}
                                        </span>
                                        <span
                                        class="green"
                                        v-if="highlightDefToppings(ingredient)"
                                        ></span>
                                    </div>
                                    </div>
                                </td>
                                <td class="toppimgQty">
                                    <div class="qty">
                                    <span
                                        class="count w-plius"
                                        v-if="ingredient.qty > 0"
                                    >
                                        {{ ingredient.qty }}
                                    </span>

                                    <span v-else class="w-plius-empty">
                                        <span class="plusIcon">+</span>
                                    </span>
                                    </div>
                                </td>
                                </tr>
                            </table>
                            <table class="table mb-250" v-if="half == 'b'">
                                <tr
                                v-for="(ingredient, index) in this.ingredientsB.slice(
                                    11,
                                    22
                                )"
                                :key="index"
                                @click="clickIncrement(ingredient)"
                                class="ingredientsTable unselectable"
                                >
                                <td class="toppimgTitle">
                                    <div class="toppingName">
                                    {{ ingredient.name }}
                                    <div class="toppingSettInner">
                                        <span
                                        v-if="ingredient.price == 0"
                                        class="toppimgPrice"
                                        :class="{
                                            activeBla: highlightDefToppings(ingredient),
                                        }"
                                        >
                                        </span>
                                        <span
                                        class="toppimgPrice"
                                        v-else
                                        :class="{
                                            activeBla: highlightDefToppings(ingredient),
                                        }"
                                        >{{ parseFloat(ingredient.price).toFixed(2) }}
                                        </span>
                                        <span
                                        class="green"
                                        v-if="highlightDefToppings(ingredient)"
                                        ></span>
                                    </div>
                                    </div>
                                </td>
                                <td class="toppimgQty">
                                    <div class="qty">
                                    <span
                                        class="count w-plius"
                                        v-if="ingredient.qty > 0"
                                    >
                                        {{ ingredient.qty }}
                                    </span>

                                    <span v-else class="w-plius-empty">
                                        <span class="plusIcon">+</span>
                                    </span>
                                    </div>
                                </td>
                                </tr>
                            </table>
                        </v-col>
                    </v-row> 
            <v-card-actions class="justify-end">
                <div class="modalTotal">
                    Price: {{ countPrice.toFixed(2) }}
                </div>
                <v-btn
                variant="text"
                color="success"
                size="x-large"
                @click="addToCart(this.selectedItem)"
            >Done</v-btn>
            <v-btn
                variant="text"
                @click="closeDialog"
                size="x-large"
            >Close</v-btn>
            </v-card-actions>
        </v-card>

    <!-- </div> -->
</v-dialog>

    <v-dialog
      v-model="confirmHalfDialog"
      persistent
      width="auto"
    >
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to select this pizzas?
        </v-card-title>
        <v-card-text>Or you can go back and select new ones</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="declineHalfs"
          >
            Disagree
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="confirmHalfs"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script>

import axios from 'axios'


export default {

    props: ['activeConstructor', 'ingredients', 'ingredientsA', 'ingredientsB', 'toppingPrice'],
    data () {
        return {
            hostname: 'http://new.ronnys.info/rest/web/index.php?r=v1/',
            TOKEN: "TodKtEjTTqj8HBVGmQPE3gW5TFY",
            size: "",
            crust: "original",
            sauce: "sauce",
            half: "w",
            sizeFull: "",
            crustFull: "",
            sauceFull: "",
            countChange: 0,
            openDialog: false,
            selectedItem: {
              crust: "original",
              sauce: "sauce",
              size: "",
              price: 0,
              name: "",
              custom: "yes",
              toppings: [],
              half1: { name: "", sauce: "sauce", defaultToppings: [], toppings: [], m: '' },
              half2: { name: "", sauce: "sauce", defaultToppings: [], toppings: [], m: '' },
              toppingChange: 0,
              qty: 0,
            },
            itemHalf: 1,
            bothHalfSelected: false,
            confirmHalfDialog: false,
            itemFirstHalf: {
                name: '',
                price: 0,
            },
            productQty: 1,
        }
    },
    emits: {
      closeConstructorDialog: null,
    },
    computed: {
        pizzaList(){
            var temp = this.$store.getters.pizzaList;
            // var arr = temp.filter((x) => x.category_id == 3);
            return temp;
      },
      countPrice() {
      // var total = this.selectedItem.priceBySizes.m;
      this.countChange;
      var total = 0;
      var toppingsTotal = 0;

      if (this.selectedItem.toppings) {
        this.selectedItem.toppings.forEach((x) => {
          toppingsTotal = x.price * x.qty;
          total = total + x.price * x.qty;
          this.selectedItem.newPrice = this.selectedItem.newPrice + total;
        });
      }
      if (this.selectedItem.half1.toppings) {
        this.selectedItem.half1.toppings.forEach((x) => {
          toppingsTotal = x.price * x.qty;
          total = total + x.price * x.qty;
        });
      }
      if (this.selectedItem.half2.toppings) {
        this.selectedItem.half2.toppings.forEach((x) => {
          toppingsTotal = x.price * x.qty;
          total = total + x.price * x.qty;
        });
      }

      return total + this.selectedItem.price;
    },
    },
    methods: {
      clickAddDefTopping(topping, half) {
        if (half == "a") {
            this.selectedItem.half1.defaultToppings.forEach((t, index) => {
          if (topping.id == t.id && t.name.slice(0, 3) === "No ") {
              t.name = t.name.slice(3);
              t.isDeleted = false;
              if (
                this.selectedItem.is_special == "0" &&
                t.id != "5" &&
                this.selectedItem.category_name != "Sticks"
              ) {
                this.selectedItem.newPrice = this.selectedItem.newPrice + t.price;
              }
              this.countChange++;
            }
          });
        } else {
          this.selectedItem.half2.defaultToppings.forEach((t, index) => {
            if (topping.id == t.id && t.name.slice(0, 3) === "No ") {
              t.name = t.name.slice(3);
              t.isDeleted = false;
              if (
                this.selectedItem.is_special == "0" &&
                t.id != "5" &&
                this.selectedItem.category_name != "Sticks"
              ) {
                this.selectedItem.newPrice = this.selectedItem.newPrice + t.price;
              }
              this.countChange++;
            }
          });
        }
      },
      highlightDefToppings(ingredient) {
        if (this.half == "a") {
          if (this.selectedItem.half1.defaultToppings) {
            for (
              var i = 0;
              i < this.selectedItem.half1.defaultToppings.length;
              i++
            ) {
              if (
                String(this.selectedItem.half1.defaultToppings[i].id) ===
                String(ingredient.id)
              ) {
                return true;
              }
            }
          }
        } else if (this.half == "b") {
          if (this.selectedItem.half2.defaultToppings) {
            for (
              var i = 0;
              i < this.selectedItem.half2.defaultToppings.length;
              i++
            ) {
              if (
                String(this.selectedItem.half2.defaultToppings[i].id) ===
                String(ingredient.id)
              ) {
                return true;
              }
            }
          }
        }
      },
      decrement(topping) {
        if (topping.qty == 1) {
          topping.qty = 0;
          this.countChange--;
          if (this.half == "w") {
            var index = this.selectedItem.toppings.indexOf(topping);
            this.selectedItem.toppings.splice(index, 1);
          } else if (this.half == "a") {
            var index = this.selectedItem.half1.toppings.indexOf(topping);
            this.selectedItem.half1.toppings.splice(index, 1);
          } else if (this.half == "b") {
            var index = this.selectedItem.half2.toppings.indexOf(topping);
            this.selectedItem.half2.toppings.splice(index, 1);
          }
        } else if (topping.qty == 0) {
        } else {
          topping.qty = topping.qty - 1;
        }
        this.countChange--;
        this.$forceUpdate();
      },
      deleteTopping(topping) {
        if (this.half == "w") {
          var index = this.selectedItem.toppings.indexOf(topping);
          this.selectedItem.toppings.splice(index, 1);
          topping.qty = 0;
        } else if (this.half == "a") {
          var index = this.selectedItem.half1.toppings.indexOf(topping);
          this.selectedItem.half1.toppings.splice(index, 1);
          topping.qty = 0;
        } else if (this.half == "b") {
          var index = this.selectedItem.half2.toppings.indexOf(topping);
          this.selectedItem.half2.toppings.splice(index, 1);
          topping.qty = 0;
        }
      },
      clickIncrement(topping) {
        if (topping.qty < 3 || !topping.qty) {
          this.increment(topping);
        } else if (topping.qty === 3 && this.toppingCount <= 5) {
          this.deleteTopping(topping);
        }

        var toppings = this.selectedItem.toppings.length;
        var toppingsA = this.selectedItem.half1.toppings.length;
        var toppingsB = this.selectedItem.half2.toppings.length;

        this.toppingCount = toppings + toppingsA + toppingsB;

        this.countChange++;
        this.$forceUpdate();
      },
      increment(topping) {
        if (this.half == "w") {
          if (
            this.selectedItem.toppings.filter((x) => x.name === topping.name)
              .length > 0
          ) {
            var index = this.selectedItem.toppings.indexOf(topping);
            if (this.selectedItem.toppings[index].qty < 3) {
              this.selectedItem.toppings[index].qty =
                this.selectedItem.toppings[index].qty + 1;

              this.selectedItem.toppings[index].count =
                this.selectedItem.toppings[index].count + 1;
            }
            topping.qty = this.selectedItem.toppings[index].qty;
            topping.count = this.selectedItem.toppings[index].count;
          } else if(this.toppingCount < 5){
            topping.qty = 1;
            topping.count = 1;
            this.selectedItem.toppings.push(topping);
          }
        } else if (this.half == "a") {
          if (
            this.selectedItem.half1.toppings.filter(
              (x) => x.name === topping.name
            ).length > 0
          ) {
            var index = this.selectedItem.half1.toppings.indexOf(topping);
            if (this.selectedItem.half1.toppings[index].qty < 3) {
              this.selectedItem.half1.toppings[index].qty =
                this.selectedItem.half1.toppings[index].qty + 1;

              this.selectedItem.half1.toppings[index].count =
                this.selectedItem.half1.toppings[index].count + 1;
            }
            topping.qty = this.selectedItem.half1.toppings[index].qty;
            topping.count = this.selectedItem.half1.toppings[index].count;
          } else if(this.toppingCount < 5){
            if (this.highlightDefToppings(topping)) {
              this.clickAddDefTopping(topping, "a");
            }
            topping.qty = 1;
            topping.count = 1;
            this.selectedItem.half1.toppings.push(topping);
          }
        } else if (this.half == "b") {
          if (
            this.selectedItem.half2.toppings.filter(
              (x) => x.name === topping.name
            ).length > 0
          ) {
            var index = this.selectedItem.half2.toppings.indexOf(topping);
            if (this.selectedItem.half2.toppings[index].qty < 3) {
              this.selectedItem.half2.toppings[index].qty =
                this.selectedItem.half2.toppings[index].qty + 1;

              this.selectedItem.half2.toppings[index].count =
                this.selectedItem.half2.toppings[index].count + 1;
            }
            topping.qty = this.selectedItem.half2.toppings[index].qty;
            topping.count = this.selectedItem.half2.toppings[index].count;
          } else if(this.toppingCount < 5){
            if (this.highlightDefToppings(topping)) {
              this.clickAddDefTopping(topping, "b");
            }
            topping.qty = 1;
            topping.count = 1;
            this.selectedItem.half2.toppings.push(topping);
          }
        }
        this.countChange++;
        this.$forceUpdate();
      },
      increaseQty(){
            this.productQty++;
        },
        decreaseQty(){
            if(this.productQty != 1){
                this.productQty--;
            }
        },
        halfSelect(item) {
            item.isSelected = true;
            // this.getRecipe(item);
            if (this.itemHalf == 1) {
                this.selectedItem = {
                crust: "original",
                sauce: "sauce",
                size: "",
                price: 0,
                name: "",
                custom: "yes",
                toppings: [],
                half1: {
                    id: '',
                    name: "",
                    sauce: "sauce",
                    defaultToppings: [],
                    toppings: [],
                    s: "",
                    m: "",
                    xl: "",
                },
                half2: {
                    id: '',
                    name: "",
                    sauce: "sauce",
                    defaultToppings: [],
                    toppings: [],
                    s: "",
                    m: "",
                    xl: "",
                },
                toppingChange: 0,
                qty: 0,
                };
                this.itemFirstHalf.name = item.name;
                this.selectedItem.name = item.name;
                this.selectedItem.half1.id = item.id;
                this.selectedItem.half1.name = item.name;
                this.selectedItem.half1.is_special = item.is_special;
                this.selectedItem.half1.priceBySizes = item.priceBySizes;
                this.selectedItem.half1.defaultToppings = item.defaultToppings;
                this.selectedItem.price = item.priceBySizes.m / 2;
                this.itemFirstHalf.price = item.priceBySizes.m /2;
                this.selectedItem.size = "m";
                this.selectedItem.cuts = false;
                this.selectedItem.half1.s = item.s;
                this.selectedItem.half1.m = item.m;
                this.selectedItem.half1.xl = item.xl;
                this.e1 = 2;
                this.itemHalf++;
            } else if (this.itemHalf == 2) {
                this.selectedItem.name = this.itemFirstHalf.name + "/" + item.name;
                this.selectedItem.half2.id = item.id;
                this.selectedItem.half2.name = item.name;
                this.selectedItem.half2.is_special = item.is_special;
                this.selectedItem.half2.priceBySizes = item.priceBySizes;
                this.selectedItem.price =
                this.itemFirstHalf.price + item.priceBySizes.m / 2;
                this.selectedItem.price = this.selectedItem.price.toFixed(2);
                this.selectedItem.half2.defaultToppings = item.defaultToppings;
                this.selectedItem.half2.s = item.s;
                this.selectedItem.half2.m = item.m;
                this.selectedItem.half2.xl = item.xl;
                this.e1 = 3;
                this.confirmHalfDialog = true;
                this.itemHalf++;
            }
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

                //   this.recipe.forEach((x) => {
                //       x.isDeleted = false;
                //       if (x.isPremium == "1") {
                //       x.price = this.toppingPrice[1].m;
                //       } else {
                //       x.price = this.toppingPrice[0].m;
                //       }
                //   });
                  product.defaultToppings = this.recipe;
                  // this.selectedItem.half1.defaultToppings = this.recipe;
                  // this.selectedItem.half2.defaultToppings = this.recipe;
                  product.toppings = [];
                });
        },
        selectSide(selectedHalf){
            selectedHalf.isSelected = true;
            if(this.itemHalf == 1){
                this.selectedHalf1 = selectedHalf;
                this.itemHalf++;
            } else if(this.itemHalf == 2){
                this.selectedHalf2 = selectedHalf;
                this.confirmHalfDialog = true;
                // this.bothHalfSelected = true;
            }
        },
        
        closeDialog(){
            this.selectedItem.half1 = {m: '', name:''};
            this.selectedItem.half2 = {m: '', name:''};
            this.itemHalf = 1;
            this.bothHalfSelected = false;
            axios.request({
                method: "post",
                url: this.hostname + "products/get-productssite",
                headers: {
                Authorization: "Bearer " + this.TOKEN,
                },
            })
            .then((response) => {
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
                    x.price = x.priceBySizees.m;
                }
                });
                this.$store.dispatch('addPizzaList', pizzaArr)
              });
              this.$emit('closeConstructorDialog');
            // this.$forceUpdate();
        },
        confirmHalfs(){
            this.bothHalfSelected = true;
            this.confirmHalfDialog = false;
        },
        declineHalfs(){
            this.bothHalfSelected = false;
            this.confirmHalfDialog = false;
        },
        addToCart(item){

          var newItem = {};
          newItem.id = Math.floor(Math.random() * 10000);
          newItem.name = item.name;
          newItem.category = item.category_name;
          newItem.category_id = 3;
          newItem.custom = "yes";
          newItem.crust = this.crust;
          newItem.sauce = this.sauce;
          newItem.size = this.size;
          newItem.img = item.half1.m;
          newItem.price = item.price;
          newItem.totalPrice = this.countPrice;
          newItem.qty = this.productQty;
          // this.order.items.push(newItem);

          const product = 
            {
              id: newItem.id,
              name: newItem.name,
              category: newItem.category,
              custom: newItem.custom,
              category_id: newItem.category_id,
              price: newItem.price,
              totalPrice: newItem.totalPrice,
              size: newItem.size,
              sizeFull: this.sizeFull,
              image: newItem.img,
              img: newItem.img,
              sauce: newItem.sauce,
              crust: newItem.crust,
              toppings: this.selectedItem.toppings,
              defaultToppings: this.selectedItem.defaultToppings,
              half1: this.selectedItem.half1,
              half2: this.selectedItem.half2,
              qty: this.productQty,
            };
            this.$store.dispatch('addToCart', product);
            this.closeDialog();
        },
        sizeBtn(val) {
            this.size = val;
            // this.product.size = val;
            this.changePrice();
        },
        changePrice() {
          if (this.size == "s") {
            this.selectedItem.price =
              this.selectedItem.half1.priceBySizes.s / 2 +
              this.selectedItem.half2.priceBySizes.s / 2;
          } else if (this.size == "m") {
            this.selectedItem.price =
              this.selectedItem.half1.priceBySizes.m / 2 +
              this.selectedItem.half2.priceBySizes.m / 2;
          } else if (this.size == "xl") {
            this.selectedItem.price =
              this.selectedItem.half1.priceBySizes.xl / 2 +
              this.selectedItem.half2.priceBySizes.xl / 2;
          }

          if (this.half == "w") {
            this.ingredients.forEach((t) => {
              if (t.isPremium == 1) {
                if (this.size == "s") {
                  t.price = this.toppingPrice[1].s;
                } else if (this.size == "m") {
                  t.price = this.toppingPrice[1].m;
                } else if (this.size == "xl") {
                  t.price = this.toppingPrice[1].xl;
                }
              } else if (t.isPremium == 0) {
                if (this.size == "s") {
                  t.price = this.toppingPrice[0].s;
                } else if (this.size == "m") {
                  t.price = this.toppingPrice[0].m;
                } else if (this.size == "xl") {
                  t.price = this.toppingPrice[0].xl;
                }
              } else if (t.isPremium == 3) {
                if (this.size == "s") {
                  t.price = this.toppingPrice[3].s;
                } else if (this.size == "m") {
                  t.price = this.toppingPrice[3].m;
                } else if (this.size == "xl") {
                  t.price = this.toppingPrice[3].xl;
                }
              }
            });
          } else if (this.half == "a") {
            this.ingredientsA.forEach((t) => {
              if (t.isPremium == 1) {
                if (this.size == "s") {
                  t.price = this.toppingPrice[1].s / 2;
                } else if (this.size == "m") {
                  t.price = this.toppingPrice[1].m / 2;
                } else if (this.size == "xl") {
                  t.price = this.toppingPrice[1].xl / 2;
                }
              } else if (t.isPremium == 0) {
                if (this.size == "s") {
                  t.price = this.toppingPrice[0].s / 2;
                } else if (this.size == "m") {
                  t.price = this.toppingPrice[0].m / 2;
                } else if (this.size == "xl") {
                  t.price = this.toppingPrice[0].xl / 2;
                }
              } else if (t.isPremium == 3) {
                if (this.size == "s") {
                  t.price = this.toppingPrice[3].s / 2;
                } else if (this.size == "m") {
                  t.price = this.toppingPrice[3].m / 2;
                } else if (this.size == "xl") {
                  t.price = this.toppingPrice[3].xl / 2;
                }
              }
            });
          } else if (this.half == "b") {
            this.ingredientsB.forEach((t) => {
              if (t.isPremium == 1) {
                if (this.size == "s") {
                  t.price = this.toppingPrice[1].s / 2;
                } else if (this.size == "m") {
                  t.price = this.toppingPrice[1].m / 2;
                } else if (this.size == "xl") {
                  t.price = this.toppingPrice[1].xl / 2;
                }
              } else if (t.isPremium == 0) {
                if (this.size == "s") {
                  t.price = this.toppingPrice[0].s / 2;
                } else if (this.size == "m") {
                  t.price = this.toppingPrice[0].m / 2;
                } else if (this.size == "xl") {
                  t.price = this.toppingPrice[0].xl / 2;
                }
              } else if (t.isPremium == 3) {
                if (this.size == "s") {
                  t.price = this.toppingPrice[3].s / 2;
                } else if (this.size == "m") {
                  t.price = this.toppingPrice[3].m / 2;
                } else if (this.size == "xl") {
                  t.price = this.toppingPrice[3].xl / 2;
                }
              }
            });
          }
          
          // this.$store.dispatch('addIngredients', this.ingredients)
          this.countChange++;
          this.$forceUpdate();
        },

        changeSauce(val){
            this.sauce = val;
            // this.product.sauce = val;
        },
        changeCrust(val){
            this.crust = val;
            // this.product.crust = val;
        },
    },
    mounted() {

    },
    watch: {
        activeConstructor(val){
            this.openDialog = val;
            
        },
        size(val) {
            if (val == "s") {
                this.sizeFull = "Small";
            } else if (val == "m") {
                this.sizeFull = "Medium";
            } else if (val == "xl") {
                this.sizeFull = "XL";
            }
        },
        // itemHalf(val){
        //   if(val == 3){
        //     this.sizeBtn('m');
        //   }
        // },
        half(val){
          this.changePrice();
        },
        bothHalfSelected(val){
          if(val){
            this.sizeBtn('m');
          }
        },
        crust(val) {
        if (val == "original") {
            this.crustFull = "Original Crust";
        } else if (val == "thin") {
            this.crustFull = "Thin Crust";
        }
        },
        sauce(val) {
            if (val == "sauce") {
                this.sauceFull = 'Original Sauce';
            } else if (val == "less sauce") {
                this.sauceFull = "Less Sauce";
            } else if (val == "more sauce") {
                this.sauceFull = "More Sauce";
            } else if (val == "no sauce") {
                this.sauceFull = "No Sauce";
            }
        },
    },

}

</script>
<style>
.modal-header {
    position: relative;
    top: 0;
}
</style>
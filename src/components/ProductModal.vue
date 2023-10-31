<template>

    <transition name="bounce">
        <div v-if="product.category_id == 3" v-show="openModal" class="modal-container">
            <v-btn @click="closeDialog">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col cols="5">
                                <div class="backgraundi">
                                    <img src="../assets/img/pizzaBack.png" class="mainImage" />
                                    <img
                                        :src="imgS"
                                        class="insideImageS"
                                        :class="{ hidden: size !== 's' }"
                                    />
                                    <img
                                        :src="imgM"
                                        class="insideImageM"
                                        :class="{ hidden: size !== 'm' }"
                                    />
                                    <img
                                        :src="imgXL"
                                        class="insideImageXl"
                                        :class="{ hidden: size !== 'xl' }"
                                    />
                                </div>
                                <div class="row orderTitle">
                                        <div class="mb-2">
                                        <h5 class="base">{{ size }}  <strong> {{ product.name }} </strong>  
                                    <span class="orange" v-if="crust != 'original'">
                                        {{ crust }}
                                    </span>
                                    <span class="orange" v-if="sauce != 'sauce'">
                                        {{ sauce }} 
                                    </span >
                                    </h5>
                                </div>
                                <ul class="defToppingebi">
                                    <li
                                    class="halfToppings"
                                    v-for="(
                                        defTopping, index
                                    ) in product.defaultToppings"
                                    :key="index"
                                    @click="deleteDefaultTopping(defTopping)"
                                    >
                                    <span
                                        :class="
                                        defTopping.isDeleted ? 'deletedTopping' : ''
                                        "
                                        >{{ defTopping.name }}
                                    </span>

                                    <span
                                        :class="
                                        defTopping.isDeleted ? 'deletedTopping' : ''
                                        "
                                        v-if="
                                        defTopping.isDeleted &&
                                        product.is_special == 0 &&
                                        defTopping.id != 5
                                        "
                                    >
                                        - {{ defTopping.price }}
                                    </span>
                                    <v-icon v-if="defTopping.isDeleted">
                                        local_pizza
                                    </v-icon>
                                    <v-icon> mdi-close </v-icon>
                                    </li>
                                </ul>
                            </div>
                            <div class="qtyComponent">
                            <div class="minusBtn unselectable" :class="productQty > 1 ? 'minusBtn' : 'hiddenAnimation'" @click="decreaseQty">-</div>
                            <div class="qtyNum unselectable">{{ productQty }}</div>
                            <div class="plusBtn unselectable" @click="increaseQty">+</div>
                        </div>
                        </v-col>
                        <v-col cols="7">
                            <div class="product-size-wrapper">
                                <div class="row">
                                    <div
                                        class="col-md-4 btn1 btn-yellow pizzaSize"
                                        @click="sizeBtn('s')"
                                        :class="{ active: size === 's', btn_inactive : cheeseLoversActive }"
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
                                        :class="{ active: size === 'xl' , btn_inactive : cheeseLoversActive}"
                                    >
                                        XL
                                </div>
                                </div>
                                <div class="row">
                                    <div
                                        class="col-md-6 btn btn-yellow crustSize"
                                        @click="crust = 'original'"
                                        :class="{ active: crust === 'original' }"
                                    >
                                        Original
                                    </div>
                                    <div
                                        class="col-md-6 btn btn-yellow crustSize"
                                        @click="crust = 'thin'"
                                        :class="{ active: crust === 'thin' }"
                                    >
                                        Thin
                                    </div>
                                </div>
                                <div class="row">
                                    <div
                                        class="col-sm-3 btn btn-yellow sauceSize"
                                        @click="sauce = 'sauce'"
                                        :class="{ active: sauce === 'sauce' }"
                                    >
                                        Original Sauce
                                    </div>
                                    <div
                                        class="col-sm-3 btn btn-yellow sauceSize"
                                        @click="sauce = 'less sauce'"
                                        :class="{ active: sauce === 'less sauce' }"
                                    >
                                        Less Sauce
                                    </div>
                                    <div
                                        class="col-sm-3 btn btn-yellow sauceSize"
                                        @click="sauce = 'more sauce'"
                                        :class="{ active: sauce === 'more sauce' }"
                                    >
                                    Heavy Sauce
                                    </div>
                                    <div
                                        class="col-sm-3 btn btn-yellow sauceSize"
                                        @click="sauce = 'no sauce'"
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

                            <v-row>
                                <v-col>
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
                                    <table class="table mb-250" v-if="half == 'b'">
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
                                </v-col>
                                <v-col>
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
                                    <table class="table mb-250" v-if="half == 'b'">
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
                                </v-col>
                            </v-row>

                            <div class="container toppingInner">
                                <div class="row">
                                    <!-- <div class="col">
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
                                    <table class="table mb-250" v-if="half == 'b'">
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
                                    </div>
                                    
                                    <div class="col">
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
                                    <table class="table mb-250" v-if="half == 'b'">
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
                                    </div> -->
                                </div>
                                </div>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="justify-end">
                <v-btn
                variant="text"
                color="success"
                @click="addToCart(product)"
                >Done</v-btn>
                <v-btn
                    variant="text"
                    @click="closeDialog"
                >Close</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </transition>

        <!-- <v-dialog
        v-if="product.category_id == 3"
        v-model="openModal"
        no-gutters
        persistent
        scrollable
        content-class="product-dialog"
        min-width="100%"
        transition="dialog-top-transition"
        >
            <v-card height="70vh">
                <v-card-text>
                    <v-row>
                        <v-col cols="5">
                                <div class="backgraundi">
                                    <img src="../assets/img/pizzaBack.png" class="mainImage" />
                                    <img
                                        :src="imgS"
                                        class="insideImageS"
                                        :class="{ hidden: size !== 's' }"
                                    />
                                    <img
                                        :src="imgM"
                                        class="insideImageM"
                                        :class="{ hidden: size !== 'm' }"
                                    />
                                    <img
                                        :src="imgXL"
                                        class="insideImageXl"
                                        :class="{ hidden: size !== 'xl' }"
                                    />
                                </div>
                                <div class="row orderTitle">
                                        <div class="mb-2">
                                        <h5 class="base">{{ size }}  <strong> {{ product.name }} </strong>  
                                    <span class="orange" v-if="crust != 'original'">
                                        {{ crust }}
                                    </span>
                                    <span class="orange" v-if="sauce != 'sauce'">
                                        {{ sauce }} 
                                    </span >
                                    </h5>
                                </div>
                                <ul class="defToppingebi">
                                    <li
                                    class="halfToppings"
                                    v-for="(
                                        defTopping, index
                                    ) in product.defaultToppings"
                                    :key="index"
                                    @click="deleteDefaultTopping(defTopping)"
                                    >
                                    <span
                                        :class="
                                        defTopping.isDeleted ? 'deletedTopping' : ''
                                        "
                                        >{{ defTopping.name }}
                                    </span>

                                    <span
                                        :class="
                                        defTopping.isDeleted ? 'deletedTopping' : ''
                                        "
                                        v-if="
                                        defTopping.isDeleted &&
                                        product.is_special == 0 &&
                                        defTopping.id != 5
                                        "
                                    >
                                        - {{ defTopping.price }}
                                    </span>
                                    <v-icon v-if="defTopping.isDeleted">
                                        local_pizza
                                    </v-icon>
                                    <v-icon> mdi-close </v-icon>
                                    </li>
                                </ul>
                            </div>
                            <div class="qtyComponent">
                            <div class="minusBtn unselectable" :class="productQty > 1 ? 'minusBtn' : 'hiddenAnimation'" @click="decreaseQty">-</div>
                            <div class="qtyNum unselectable">{{ productQty }}</div>
                            <div class="plusBtn unselectable" @click="increaseQty">+</div>
                        </div>
                        </v-col>
                        <v-col cols="7">
                            <div class="product-size-wrapper">
                                <div class="row">
                                    <div
                                        class="col-md-4 btn1 btn-yellow pizzaSize"
                                        @click="sizeBtn('s')"
                                        :class="{ active: size === 's', btn_inactive : cheeseLoversActive }"
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
                                        :class="{ active: size === 'xl' , btn_inactive : cheeseLoversActive}"
                                    >
                                        XL
                                </div>
                                </div>
                                <div class="row">
                                    <div
                                        class="col-md-6 btn btn-yellow crustSize"
                                        @click="crust = 'original'"
                                        :class="{ active: crust === 'original' }"
                                    >
                                        Original
                                    </div>
                                    <div
                                        class="col-md-6 btn btn-yellow crustSize"
                                        @click="crust = 'thin'"
                                        :class="{ active: crust === 'thin' }"
                                    >
                                        Thin
                                    </div>
                                </div>
                                <div class="row">
                                    <div
                                        class="col-sm-3 btn btn-yellow sauceSize"
                                        @click="sauce = 'sauce'"
                                        :class="{ active: sauce === 'sauce' }"
                                    >
                                        Original Sauce
                                    </div>
                                    <div
                                        class="col-sm-3 btn btn-yellow sauceSize"
                                        @click="sauce = 'less sauce'"
                                        :class="{ active: sauce === 'less sauce' }"
                                    >
                                        Less Sauce
                                    </div>
                                    <div
                                        class="col-sm-3 btn btn-yellow sauceSize"
                                        @click="sauce = 'more sauce'"
                                        :class="{ active: sauce === 'more sauce' }"
                                    >
                                    Heavy Sauce
                                    </div>
                                    <div
                                        class="col-sm-3 btn btn-yellow sauceSize"
                                        @click="sauce = 'no sauce'"
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

                            <div class="container toppingInner mt-30">
                                <div class="row">
                                    <div class="col-5">
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
                                    <table class="table mb-250" v-if="half == 'b'">
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
                                </div>
                                    <div class="col-5">
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
                                    <table class="table mb-250" v-if="half == 'b'">
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
                                    </div>
                                </div>
                                </div>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="justify-end">
                <v-btn
                variant="text"
                color="success"
                @click="addToCart(product)"
                >Done</v-btn>
                <v-btn
                    variant="text"
                    @click="closeDialog"
                >Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
        <!-- <transition name="bounce">
            <div v-show="openModal" class="modal-container">
                123
            </div>
        </transition> -->

        <transition name="bounce">
            <div v-if="product.category_id != 3" v-show="openModal" class="modal-container">
            <v-btn @click="closeDialog">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-card min-height="70vh">
                <v-card-text>
                        <v-row>
                            <v-col cols="6" offset="3" >
                                <div class="backgraundi">
                                <img
                                    :src="imgM"
                                    class="insideImageProduct"
                                />
                                </div>
                            </v-col>
                        </v-row>
                        <div class="row orderTitle">
                            <div class="mb-2">
                                <h5 class="base"><strong> {{ product.name }} </strong>  
                                </h5>
                                <br>
                                <h4>
                                    {{ product.price }} GEL 
                                </h4>
                            </div>
                            <div class="qtyComponent">
                                <div class="minusBtn unselectable" :class="productQty > 1 ? 'minusBtn' : 'hiddenAnimation'" @click="decreaseQty">-</div>
                                <div class="qtyNum unselectable">{{ productQty }}</div>
                                <div class="plusBtn unselectable" @click="increaseQty">+</div>
                            </div>
                        </div>
                        
                </v-card-text>
                <v-card-actions class="justify-end">
                <v-btn
                variant="text"
                color="success"
                @click="addToCart(product)"
                >Done</v-btn>
                <v-btn
                    variant="text"
                    @click="closeDialog"
                >Close</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </transition>
</template>

<script>
export default {
    data () {
        return {
            openModal: false,
            hostname: 'http://new.ronnys.info/rest/web/index.php?r=v1/',
            size: "m",
            crust: "original",
            sauce: "sauce",
            cheeseLoversActive: false,
            half: "w",
            countChange: 0,
            toppingCount: 0,
            productQty: 1,
        }
    },
    props: ['productModal', 'product', 'imgS', 'imgM', 'imgXL', 'ingredientss'],
    mounted() {
        
    },
    computed: {
        ingredients(){
            return this.$store.getters.ingredientsList;
        },
    },
    methods: {
        addToCart(product){
            product.qty = this.productQty;
            product.img = product.m;
            this.$store.dispatch('addToCart', product);
            this.closeDialog();
        },
        closeDialog(){
            this.productQty = 1;
            this.openModal = false;
            this.ingredients = this.ingredientsList
            this.$emit('closeProductDialog');
            
        },
        increaseQty(){
            this.productQty++;
        },
        decreaseQty(){
            if(this.productQty != 1){
                this.productQty--;
            }
        },
        deleteDefaultTopping(topping) {
        this.product.defaultToppings.forEach((t, index) => {
            if (topping.id == t.id) {
            if (t.name.slice(0, 3) === "No ") {
                t.name = t.name.slice(3);
                t.isDeleted = false;
                if (
                this.product.is_special == "0" &&
                t.id != "5" &&
                this.product.is_sticks != 1
                ) {
                this.product.newPrice = this.product.newPrice + t.price;
                }
                this.countChange++;
            } else {
                t.name = "No " + t.name;
                t.isDeleted = true;

                if (
                this.product.is_special == "0" &&
                t.id != "5" &&
                this.product.is_sticks != 1
                ) {
                this.product.newPrice = this.product.newPrice - t.price;
                }

                // this.countChange++;
                this.$forceUpdate();
            }
            }
        });
        },
        sizeBtn(val) {
            if(val == 's'){
                this.product.price = this.product.priceBySizes.s;
            } else if(val == 'm') {
                this.product.price = this.product.priceBySizes.m;
            } else {
                this.product.price = this.product.priceBySizes.xl;
            }
            this.size = val;
            // this.changePrice();
        },
        highlightDefToppings(ingredient) {
            // this.defTop = this.selectedItem.defaultToppings;
            if (this.product.defaultToppings) {
                for (var i = 0; i < this.product.defaultToppings.length; i++) {
                if (
                    String(this.product.defaultToppings[i].id) ===
                    String(ingredient.id)
                ) {
                    return true;
                }
                }
            }
        },
        clickIncrement(topping) {
            // if ((topping.qty < 3 || topping.qty == 0) && this.toppingCount <= 5) {
            if (topping.qty < 3 || topping.qty == 0) {
            this.increment(topping);
            } else if(topping.qty == 0){
            
            }
            else {
            // this.toppingCount = this.toppingCount - topping.qty; // OLD
            // alert(123);
            this.deleteTopping(topping);
            }
            // var toppings = this.product.toppings.length;
            // var toppingsA = this.product.half1.toppings.length;
            // var toppingsB = this.product.half2.toppings.length;

            // this.toppingCount = toppings + toppingsA + toppingsB;
            
            this.countChange++;
            this.$forceUpdate();
        },
        clickAddDefTopping(topping) {
            this.product.defaultToppings.forEach((t, index) => {
                if (topping.id == t.id && t.name.slice(0, 3) === "No ") {
                t.name = t.name.slice(3);
                t.isDeleted = false;
                if (
                    this.product.is_special == "0" &&
                    t.id != "5" &&
                    this.product.is_sticks != 1
                ) {
                    this.product.newPrice = this.product.newPrice + t.price;
                }
                this.countChange++;
                }
            });
        },
        highlightDefToppings(ingredient) {
            // alert('BLA');
            // this.defTop = this.selectedItem.defaultToppings;
            if (this.product.defaultToppings) {
                for (var i = 0; i < this.product.defaultToppings.length; i++) {
                if (
                    String(this.product.defaultToppings[i].id) ===
                    String(ingredient.id)
                ) {
                    return true;
                }
                }
            }
        },
        deleteTopping(topping) {
            alert('delete');
            if (this.half == "w") {
                var index = this.product.toppings.indexOf(topping);
                this.product.toppings.splice(index, 1);
                topping.qty = 0;
            } else if (this.half == "a") {
                var index = this.product.half1.toppings.indexOf(topping);
                this.product.half1.toppings.splice(index, 1);
                topping.qty = 0;
            } else if (this.half == "b") {
                var index = this.product.half2.toppings.indexOf(topping);
                this.product.half2.toppings.splice(index, 1);
                topping.qty = 0;
            }
        },
        increment(topping) {
            if (this.half == "w") {
            if (
                this.product.toppings.filter((x) => x.name === topping.name)
                .length > 0
            ) {
                var index = this.product.toppings.indexOf(topping);
                if (this.product.toppings[index].qty < 3) {
                this.product.toppings[index].qty =
                    this.product.toppings[index].qty + 1;

                    this.product.toppings[index].count =
                    this.product.toppings[index].count + 1;
                }
                topping.qty = this.product.toppings[index].qty;
                topping.count = this.product.toppings[index].count;
            } else if(this.toppingCount < 5) {
                if (this.highlightDefToppings(topping)) {
                this.clickAddDefTopping(topping);
                }
                topping.qty = 1;
                topping.count = 1;
                this.product.toppings.push(topping);
            }
            } else if (this.half == "a") {
            if (
                this.product.half1.toppings.filter(
                (x) => x.name === topping.name
                ).length > 0
            ) {
                var index = this.product.half1.toppings.indexOf(topping);
                if (this.product.half1.toppings[index].qty < 3) {
                this.product.half1.toppings[index].qty =
                    this.product.half1.toppings[index].qty + 1;

                this.product.half1.toppings[index].count =
                    this.product.half1.toppings[index].count + 1;
                }
                topping.qty = this.product.half1.toppings[index].qty;
                topping.count = this.product.half1.toppings[index].count;
            } else if(this.toppingCount < 5){
                if (this.highlightDefToppings(topping)) {
                this.clickAddDefTopping(topping);
                }
                topping.qty = 1;
                topping.count = 1;
                this.product.half1.toppings.push(topping);
            }
            } else if (this.half == "b") {
            if (
                this.product.half2.toppings.filter(
                (x) => x.name === topping.name
                ).length > 0
            ) {
                var index = this.product.half2.toppings.indexOf(topping);
                if (this.product.half2.toppings[index].qty < 3) {
                this.product.half2.toppings[index].qty =
                    this.product.half2.toppings[index].qty + 1;

                this.product.half2.toppings[index].count =
                    this.product.half2.toppings[index].qty + 1;
                }
                topping.qty = this.product.half2.toppings[index].qty;
                topping.count = this.product.half2.toppings[index].count;
            } else if(this.toppingCount < 5){
                if (this.highlightDefToppings(topping)) {
                this.clickAddDefTopping(topping);
                }
                this.product.half2.toppings.push(topping);
                topping.qty = 1;
                topping.count = 1;
            }
            }
        this.countChange++;
        this.$forceUpdate();
        },
    },
    watch: {
        productModal(val){
            this.openModal = val;
        },
        half(val){
            alert(val);
        },
    },
}
</script>
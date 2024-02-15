<template>
    <!-- Pizza Render -->
        <v-dialog v-if="product.category_id == 3" fullscreen persistent v-model="openModal" transition="dialog-bottom-transition">
            <v-card>
                <v-icon  @click="closeDialog" size="x-large">mdi-close</v-icon>
                <v-card-text class="v-container">
                    <v-row>
                        <div class="backgraundi orderTitle">
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
                                <h4 class="base">{{ sizeFull }}  <strong> {{ product.name }} </strong>  
                            <span class="orange" v-if="crust != 'original'">
                                {{ crustFull }}
                            </span>
                            <span class="orange" v-if="sauce != 'sauce'">
                                {{ sauceFull }} 
                            </span >
                            </h4>
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
                            <h6
                                :class="
                                defTopping.isDeleted ? 'deletedTopping' : ''
                                "
                                >{{ defTopping.name }}
                        </h6>

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
                    <div class="qtyComponent orderTitle">
                        <div class="minusBtn unselectable" :class="productQty > 1 ? 'minusBtn' : 'hiddenAnimation'" @click="decreaseQty">-</div>
                        <div class="qtyNum unselectable">{{ productQty }}</div>
                        <div class="plusBtn unselectable" @click="increaseQty">+</div>
                    </div>

                        
                </v-row>
                    <v-row>
                        <div class="product-size-wrapper orderTitle">
                            <div class="row ">
                                <div
                                    class="col-md-4  btn1 btn-yellow pizzaSize transition"
                                    @click="sizeBtn('s')"
                                    :class="{ active: size === 's', btn_inactive : cheeseLoversActive }"
                                >
                                    Small
                                </div>
                                <div
                                    class="col-md-4 btn1 btn-yellow pizzaSize transition"
                                    @click="sizeBtn('m')"
                                    :class="{ active: size === 'm' }"
                                >
                                    Medium
                                </div>
                                <div
                                    class="col-md-4 btn1 btn-yellow pizzaSize transition"
                                    @click="sizeBtn('xl')"
                                    :class="{ active: size === 'xl' , btn_inactive : cheeseLoversActive}"
                                >
                                    XL
                            </div>
                            </div>
                            <div class="row">
                                <div
                                    class="col-md-6 btn btn-yellow crustSize transition"
                                    @click="changeCrust('original')"
                                    :class="{ active: crust === 'original' }"
                                >
                                    Original
                                </div>
                                <div
                                    class="col-md-6 btn btn-yellow crustSize transition"
                                    @click="changeCrust('thin')"
                                    :class="{ active: crust === 'thin' }"
                                >
                                    Thin
                                </div>
                            </div>
                            <div class="row">
                                <div
                                    class="col-sm-3 btn btn-yellow sauceSize transition"
                                    @click="changeSauce('sauce')"
                                    :class="{ active: sauce === 'sauce' }"
                                >
                                    Original Sauce
                                </div>
                                <div
                                    class="col-sm-3 btn btn-yellow sauceSize transition"
                                    @click="changeSauce('less sauce')"
                                    :class="{ active: sauce === 'less sauce' }"
                                >
                                    Less Sauce
                                </div>
                                <div
                                    class="col-sm-3 btn btn-yellow sauceSize transition"
                                    @click="changeSauce('more sauce')"
                                    :class="{ active: sauce === 'more sauce' }"
                                >
                                Heavy Sauce
                                </div>
                                <div
                                    class="col-sm-3 btn btn-yellow sauceSize transition"
                                    @click="changeSauce('no sauce')"
                                    :class="{ active: sauce === 'no sauce' }"
                                >
                                    No Sauce
                                </div>
                            </div>
                            <div class="row">
                                <div
                                    class="col-md-4 btn btn-yellow halfSize transition"
                                    @click="half = 'a'"
                                    :class="{ active: half === 'a'}"
                                >
                                    A Side
                                </div>
                                <div
                                    class="col-md-4 btn btn-yellow halfSize transition" 
                                    @click="half = 'b'"
                                    :class="{ active: half === 'b' }"
                                >
                                    B Side
                                </div>
                                <div
                                    class="col-md-4 btn btn-yellow halfSize transition"
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
                                <td class="ingredient-image">
                                    <span>
                                        <img src="../assets/img/ingredients.png" class="ingredientImage"/>
                                    </span>
                                </td>
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
                                <td class="ingredient-image">
                                    <span>
                                        <img src="../assets/img/ingredients.png" class="ingredientImage"/>
                                    </span>
                                </td>
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
                                <td class="ingredient-image">
                                    <span>
                                        <img src="../assets/img/ingredients.png" class="ingredientImage"/>
                                    </span>
                                </td>
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
                        <v-col cols="4" v-if="half == 'w'">

                            <!-- Ingredients component with images -->
                            <!-- <v-card
                                v-for="(ingredient, index) in this.ingredients" :key="index"
                                class="mx-auto"
                                max-width="400"
                            >
                                <v-card-text>
                                <v-row  no-gutters>
                                    <v-col
                                    cols="4"
                                    >
                                    <v-avatar
                                            size="100"
                                            rounded="0"
                                        >
                                            <v-img :src="ingredient.image"></v-img>
                                        </v-avatar>
                                    </v-col>

                                    <v-col cols="8" class="text-left">
                                        <v-card-title>
                                            {{ ingredient.name }}
                                        </v-card-title>
                                        <v-card-subtitle>
                                            {{ productQty }} X {{ ingredient.price }} = {{ (productQty*ingredient.price).toFixed(2) }} Gel
                                        </v-card-subtitle>
                                        <div class="qtyComponent-cart">
                                            <div class="minusBtn-cart unselectable" :class="productQty > 1 ? 'minusBtn' : 'hiddenAnimation'" @click="decreaseQty">-</div>
                                            <div class="qtyNum unselectable">{{ productQty }}</div>
                                            <div class="plusBtn-cart unselectable" @click="increaseQty">+</div>
                                        </div>
                                    </v-col>
                                </v-row>
                                </v-card-text>


                                <v-divider></v-divider>

                            </v-card> -->
                            <!-- END OF COMPONENT -->

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
                                <td class="ingredient-image">
                                    <span>
                                        <img src="../assets/img/ingredients.png" class="ingredientImage"/>
                                    </span>
                                </td>
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
                                <td class="ingredient-image">
                                    <span>
                                        <img src="../assets/img/ingredients.png" class="ingredientImage"/>
                                    </span>
                                </td>
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
                                <td class="ingredient-image">
                                    <span>
                                        <img src="../assets/img/ingredients.png" class="ingredientImage"/>
                                    </span>
                                </td>
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
                                        class="green white"
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
                </v-card-text>

                <v-card-actions class="justify-end">
                    <div class="modalTotal">
                       ფასი: {{ countPrice.toFixed(2) }}
                    </div>
                    <v-col cols="auto" @click="addToCart(product)">
                        <v-btn
                        :ripple="false"
                        height="100"
                        min-width="164"
                        class="green"
                        >
                        დამატება
                        </v-btn>
                    </v-col>
                    <v-col cols="auto" @click="closeDialog">
                        <v-btn
                        :ripple="false"
                        height="100"
                        min-width="164"
                        class="gray"
                        >
                        დახურვა
                        </v-btn>
                    </v-col>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Sticks Render -->
        <v-dialog v-if="product.is_sticks == 1" fullscreen persistent v-model="openModal" transition="dialog-bottom-transition">
            <v-card>
                <v-icon @click="closeDialog">mdi-close</v-icon>
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
                            <div class="container">
                                    <v-card
                                        v-for="(ingredient, index) in sticks" :key="index"
                                        class="mx-auto"
                                        max-width="400"
                                    >
                                        <v-card-text>
                                        <v-row  no-gutters>
                                            <v-col
                                            cols="8"
                                            >
                                            <v-card-title>
                                                {{ ingredient.name }}
                                            </v-card-title>
                                            <v-card-subtitle>
                                            {{ ingredient.price }} Gel
                                            </v-card-subtitle>
                                            </v-col>
                                            <v-col cols="4">
                                                <div class="qty unselectable" v-if="ingredient.id == 24" @click="clickIncrement(ingredient)">
                                                    <span
                                                        class="count w-plius single-ingredient-icon"
                                                        v-if="ingredient.qty > 0 "
                                                    >
                                                        {{ ingredient.qty }}
                                                    </span>

                                                    <span v-else class="w-plius-empty single-ingredient-icon">
                                                        <span class="plusIcon">+</span>
                                                    </span>
                                                </div>
                                                
                                                <div class="qty unselectable" v-else-if="ingredient.isDeleted" @click="sticksIncrement(ingredient)">
                                                    <!-- <span
                                                        class="count w-plius single-ingredient-icon"
                                                        v-if="ingredient.qty > 0 || highlightDefToppings(ingredient)"
                                                    >
                                                        <v-icon>mdi-check</v-icon>
                                                    </span> -->

                                                    <span class="w-plius-empty single-ingredient-icon">
                                                        <span class="plusIcon">+</span>
                                                    </span>
                                                </div>
                                                <div class="qty unselectable" v-else @click="sticksDecrement(ingredient)">
                                                    <span
                                                        class="count w-plius single-ingredient-icon"
                                                        v-if="ingredient.qty > 0 || highlightDefToppings(ingredient)"
                                                    >
                                                        <v-icon>mdi-check</v-icon> 
                                                    </span>

                                                    <span v-else class="w-plius-empty single-ingredient-icon">
                                                        <span class="plusIcon">+</span>
                                                    </span>
                                                </div>
                                            </v-col>
                                        </v-row>
                                        </v-card-text>
                                    </v-card>
                                </div>
                        </div>
                        <div class="row orderTitle">
                            <div class="mb-2">
                                <h5 class="base"><strong> {{ product.name }} </strong>  
                                </h5>
                                <br>
                                <h4>
                                    {{ countPrice }} GEL 
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
                variant="tonal"
                color="success"
                class="doneButton"
                size="x-large"
                @click="addToCart(product)"
                >Done</v-btn>
                <v-btn
                    class="doneButton"
                    variant="tonal"
                    @click="closeDialog"
                >Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Everything Else Render -->
        <v-dialog v-if="product.is_sticks != 1 && product.category_id != 3" fullscreen persistent v-model="openModal" transition="dialog-bottom-transition">
        <v-card>
            <v-icon @click="closeDialog">mdi-close</v-icon>
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
                            <h1 class="base"><strong> {{ product.name }} </strong></h1>
                            <br>
                            <h4 class="base"> {{ product.description }}</h4>
                            <br>
                            <h2>
                                {{ product.price }} GEL 
                            </h2>
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
                size="x-large"
                @click="addToCart(product)"
            >Done</v-btn>
            <v-btn
                variant="text"
                size="x-large"
                @click="closeDialog"
            >Close</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
</template>

<script>
export default {
    data () {
        return {
            openModal: false,
            hostname: 'http://new.ronnys.info/rest/web/index.php?r=v1/',
            size: "",
            crust: "original",
            sauce: "sauce",
            half: "w",
            // cheeseLoversActive: false,
            countChange: 0,
            toppingCount: 0,
            productQty: 1,
            sticksActive: false,
            sizeFull: '',
            crustFull: 'Original crust',
            sauceFull: 'Original Sauce',
            // ingredients: [],
            // ingredientsA: [],
            // ingredientsB: [],
        }
    },
    props: ['productModal', 'product', 'imgS', 'imgM', 'imgXL', 'sticks', 'ingredients', 'ingredientsA', 'ingredientsB', 'cheeseLoversActive', 'toppingPrice'],
    mounted() {
        // this.sizeBtn('m');
        // this.ingredients = this.ingredientsList
        // this.ingredientsA = this.ingredientsList
        // this.ingredientsB = this.ingredientsList
        this.changePrice();
        this.$forceUpdate();
    },
    emits: {
        closeProductDialog: null,
    },
    computed: {
        ingredientsList(){
            return this.$store.getters.ingredientsList;
        },
        countPrice() {
            // var total = this.selectedItem.priceBySizes.m;
            this.countChange;
            var total = 0;
            var toppingsTotal = 0;
            if (this.product.category_name == "Pizza") {
                if (this.product.toppings) {
                this.product.toppings.forEach((x) => {
                    toppingsTotal = x.price * x.qty;
                    total = total + x.price * x.qty;
                    this.product.newPrice = this.product.newPrice + total;
                });
                }
                if (this.product.half1.toppings) {
                this.product.half1.toppings.forEach((x) => {
                    toppingsTotal = x.price * x.qty;
                    total = total + x.price * x.qty;
                });
                }
                if (this.product.half2.toppings) {
                this.product.half2.toppings.forEach((x) => {
                    toppingsTotal = x.price * x.qty;
                    total = total + x.price * x.qty;
                });
                }
                return total + this.product.price;
            } else if (
                this.product.category_id == 2 ||
                this.product.is_sticks == 1
            ) {
                this.product.newPrice = this.product.price;
                if (this.product.toppings) {
                this.product.toppings.forEach((x) => {
                    toppingsTotal = x.price * x.qty;
                    total = total + toppingsTotal;
                    this.product.newPrice = (Number(this.product.price) + Number(total)).toFixed(2);
                });
                return this.product.newPrice;
                }
            } else {
                return this.product.price;
            }
            },
    },
    methods: {
        changePrice() {
        // this.ingredients.forEach((t) => {
        //     t.qty = 0;
        //     if (t.isPremium == 1) {
        //     if (this.size == "s") {
        //         t.price = this.toppingPrice[1].s;
        //     } else if (this.size == "m") {
        //         t.price = this.toppingPrice[1].m;
        //     } else if (this.size == "xl") {
        //         t.price = this.toppingPrice[1].xl;
        //     }
        //     } else if (t.isPremium == 0) {
        //     if (this.size == "s") {
        //         t.price = this.toppingPrice[0].s;
        //     } else if (this.size == "m") {
        //         t.price = this.toppingPrice[0].m;
        //     } else if (this.size == "xl") {
        //         t.price = this.toppingPrice[0].xl;
        //     }
        //     }
        // });
        // this.$forceUpdate();

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
        },
        changeSauce(val){
            this.sauce = val;
            // this.product.sauce = val;
        },
        changeCrust(val){
            this.crust = val;
            // this.product.crust = val;
        },
        sizeBtn(val) {
            if(this.product.category_id == 3){
                if(val == 's'){
                    this.product.price = this.product.priceBySizes.s;
                } else if(val == 'm') {
                    this.product.price = this.product.priceBySizes.m;
                } else {
                    this.product.price = this.product.priceBySizes.xl;
                }
                this.size = val;
            }
            // this.product.size = val;
            this.changePrice();
        },
        changeQty(ingredient){
            if(ingredient.qty < 3){
                ingredient.qty++;
            } else {
                ingredient.qty = 0;
            }
        },

        
        addToCart(product){
            var temp = JSON.parse(JSON.stringify(product))
            if(temp.category_id == 3){
                this.product.size = this.size;
                this.product.sauce = this.sauce;
                this.product.crust = this.crust;
            }
            temp.qty = this.productQty;
            temp.custom = 'no'
            temp.oldPrice = temp.price;
            temp.newPrice = this.countPrice;
            temp.price = this.countPrice;
            temp.img = temp.m;
            this.$store.dispatch('addToCart', temp);
            // temp.price = temp.oldPrice;
            this.closeDialog();
        },
        closeDialog(){
            this.productQty = 1;
            this.openModal = false;
            this.size = 'm';
            this.crust = 'original';
            this.sauce = 'sauce';
            this.half = 'w';
            // this.ingredients = this.$store.getters.ingredientsList;
            // this.ingredientsA = this.$store.getters.ingredientsList;
            // this.ingredientsB = this.$store.getters.ingredientsList;
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

        sticksDecrement(topping) {
            this.sticks.forEach((x) => {
                if (topping.id == x.id) {
                x.isDeleted = true;
                }
            });
            this.product.defaultToppings.forEach((t) => {
                if (topping.id == t.id) {
                // alert('IF');
                t.name = "No " + topping.name;
                t.isDeleted = true;
                topping.isDeleted = true;
                } else {
                // alert('ELSE');
                topping.qty = 0;
                topping.count = 0;
                var index = this.product.toppings.indexOf(topping);
                this.product.toppings.splice(index, 1);
                // t.isDeleted = true;
                topping.isDeleted = true;
                }
            });
            this.$forceUpdate();
            this.countChange++;
        },

        sticksIncrement(topping) {
            this.sticks.forEach((x) => {
                if (topping.id == x.id) {
                x.isDeleted = false;
                }
            });
            this.product.defaultToppings.forEach((t) => {
                if (topping.id == t.id) {
                t.name = t.name.slice(3);
                t.isDeleted = false;
                topping.isDeleted = false;
                } else if (this.product.toppings.includes(topping)) {
                this.$forceUpdate();
                } else if (topping.id != t.id) {
                if (this.highlightDefToppings(topping)) {
                    this.$forceUpdate();
                } else {
                    topping.qty = 1;
                    topping.count = 1;
                    this.product.toppings.push(topping);
                }

                topping.isDeleted = false;
                this.countChange++;
                }
            });
            this.$forceUpdate();
            this.countChange++;
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
        size(val) {
            if (val == "s") {
                this.sizeFull = "Small";
            } else if (val == "m") {
                this.sizeFull = "Medium";
            } else if (val == "xl") {
                this.sizeFull = "XL";
            }
        },
        productModal(val){
            if(this.product.is_sticks == 1){
                this.sticks.forEach(x => {
                    if (x.id == 24) {
                    x.price = 2.4;
                    this.$forceUpdate();
                }
                });
        }
            this.openModal = val;
            this.sizeBtn('m');
        },
        half(val){
            if(this.product.category_id == 3){
                this.changePrice();
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
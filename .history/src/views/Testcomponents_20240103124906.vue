<template>
    <ul>
        <li @click="changeVersion(1)">Version 1</li>
        <li @click="changeVersion(2)">Version 2</li>
        <li @click="changeVersion(3)">Version 3</li>
        <li @click="changeVersion(4)">Version 4</li>
        
    </ul>

    

    <!-- Version 1 -->
    <div class="container single-ingredient" v-if="version == 1">
        <v-card
            v-for="index in 5" :key="index"
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

                    <div class="qty unselectable" @click="changeQty">
                        <span
                            class="count w-plius single-ingredient-icon"
                            v-if="ingredient.qty > 0"
                        >
                            {{ ingredient.qty }}
                        </span>

                        <span v-else class="w-plius-empty single-ingredient-icon">
                            <span class="plusIcon">+</span>
                        </span>
                    </div>
                </v-col>
            </v-row>
            </v-card-text>


            <v-divider></v-divider>

        </v-card>
    </div>
   
   
    <!-- Version 2 -->
    <div class="container single-ingredient" v-if="version == 2">
        <v-card
            v-for="index in 5" :key="index"
            class="mx-auto"
            max-width="400"
        >
            <v-card-text>
            <v-row  no-gutters>
                <v-col
                cols="2"
                >
                <v-avatar
                        size="75"
                        rounded="0"
                    >
                        <v-img :src="ingredient.img"></v-img>
                    </v-avatar>
                </v-col>
                <v-col
                cols="6"
                >
                <v-card-title>
                    {{ ingredient.name }}
                </v-card-title>
                <v-card-subtitle>
                  From {{ ingredient.price }} Gel
                </v-card-subtitle>
                </v-col>

                <v-col cols="4">
                    <div class="qtyComponent-cart single-ingredient-icon">
                        <div class="minusBtn-cart unselectable" :class="ingredient.qty > 1 ? 'minusBtn' : 'hiddenAnimation'" @click="decreaseQty">-</div>
                        <div class="qtyNum unselectable">{{ ingredient.qty }}</div>
                        <div class="plusBtn-cart unselectable" @click="increaseQty">+</div>
                    </div>
                </v-col>
            </v-row>
            </v-card-text>


            <v-divider></v-divider>

        </v-card>
    </div>

    <!-- Version 3 -->
    <div class="container single-ingredient" v-if="version == 3">
        <v-card
            v-for="index in 5" :key="index"
            class="mx-auto"
            max-width="500"
        >
            <v-card-text>
            <v-row  no-gutters>
                <v-col cols="2">
                    <div class="qtyComponent-cart single-ingredient-icon">
                        <div class="minusBtn-cart unselectable" :class="ingredient.qty > 1 ? 'minusBtn' : 'hiddenAnimation'" @click="decreaseQty">-</div>
                    </div>
                </v-col>

                <v-col
                cols="8"
                >
                <v-card-title>
                   {{ ingredient.qty }} X {{ ingredient.name }} = {{ (ingredient.qty * ingredient.price).toFixed(2) }}
                </v-card-title>
                </v-col>

                <v-col cols="2">
                    <div class="qtyComponent-cart single-ingredient-icon">
                        <div class="plusBtn-cart unselectable" @click="increaseQty">+</div>
                    </div>
                </v-col>
            </v-row>
            </v-card-text>


            <v-divider></v-divider>

        </v-card>
    </div>

    <!-- Version 4 -->
    <div class="container cart-item" v-if="version == 4">
        <v-card
            v-for="index in 5" :key="index"
            class="mx-auto"
            max-width="400"
        >
            <v-card-text>
            <v-row  no-gutters>
                <v-col
                cols="2"
                >
                <v-avatar
                        size="100"
                        rounded="0"
                    >
                        <v-img :src="ingredient.img"></v-img>
                    </v-avatar>
                </v-col>

                <v-col cols="5" class="text-left">
                    <v-card-title>
                        {{ product.name }}
                    </v-card-title>
                    <v-card-subtitle>
                        {{ ingredient.qty }} X {{ ingredient.price }} = {{ (ingredient.qty*ingredient.price).toFixed(2) }} Gel
                    </v-card-subtitle>
                </v-col>
                <v-col cols="5" class="text-left">
                    <div class="qtyComponent-cart single-ingredient-icon">
                        <div class="minusBtn-cart unselectable" :class="ingredient.qty > 1 ? 'minusBtn' : 'hiddenAnimation'" @click="decreaseQty">-</div>
                        <div class="qtyNum unselectable">{{ ingredient.qty }}</div>
                        <div class="plusBtn-cart unselectable" @click="increaseQty">+</div>
                    </div>
                </v-col>
            </v-row>
            </v-card-text>


            <v-divider></v-divider>

        </v-card>
    </div>
    <div style="width: 300px;">
        <v-slider
            :ticks="sliderTicks"
            v-model="sliderValue"
            :min="0"
            :max="2"
            :step="1"
            show-ticks="always"
            tick-size="4"
        ></v-slider>
    </div>

    <div>
        <b-button>I am a Button</b-button>
        <b-button href="#">I am a Link</b-button>
    </div>

</template>

<script>

export default {

    data () {
        return {
            sliderTicks: {0: 'A side', 1: "A/B Side", 2: "B Side"},
            sliderValue: 1,
            side: 'w',
            version: 0,
            productQty: 1,
            product: {
                name: 'Root beer',
                price: 3.8,
                img: "https://api.ronnyspizza.grena.ge/product_images/R-Rootbeer.png",
            },
            ingredient: {
                name: 'Pepperoni',
                price: 2.4,
                qty: 0,
                img: "https://api.ronnyspizza.grena.ge/product_images/R-Rootbeer.png",
            },
        }
    },
    computed: {
      
    },
    watch: {
        sliderValue(val){
            // alert(val)
            if(val == 0){
                this.side = 'a';
            } else if(val ==2){
                this.side = 'b';
            } else {
                this.side = 'w';
            }
        },
    },
    methods: {
        changeQty(){
            if(this.ingredient.qty < 3){
                this.ingredient.qty++;
            } else {
                this.ingredient.qty = 0;
            }
        },
        changeVersion(val){
            this.ingredient.qty = 0;
            this.version = val;
        },
        increaseQty(){
            this.ingredient.qty++;
        },
        decreaseQty(){
            if(this.ingredient.qty != 1){
                this.ingredient.qty--;
            }
        },
    },
    mounted() {

    },

}

</script>
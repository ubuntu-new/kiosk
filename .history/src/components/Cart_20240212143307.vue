<template>
    <v-app>
        <VueSidePanel
        v-model="cartOpen"
        lock-scroll
        width="600px"
        transition-name="slide-bottom"
        >
        <template #header>
            <div>
                <v-row>
                    <v-col cols="12" style="text-align: center;height: 80px;padding: 0px;padding-top: 20px;">
                        <img src="../assets/img/logo.png" alt="tab1" class="mb-5 logo cart-sidebar">     
                    </v-col>
                </v-row>
                <v-row style="margin: 0px;">
                    <v-col  cols="12" style="text-align: center;height: 80px;padding: 0px;padding-top: 20px;">
                        <h4>Total Price: {{ cartTotal }}</h4>  
                    </v-col>
                </v-row>
            </div>
        </template>

        <v-card
            v-for="(product, index) in cart" :key="index"
            class="mx-auto mt-30"
        >
            <v-card-text>
            <v-row  no-gutters>
                <v-col
                cols="4"
                >
                <v-avatar
                        size="180"
                        rounded="0"
                    >
                        <v-img v-if="product.custom != 'yes' " :src="product.img"></v-img>
                        <v-img v-else src="@/assets/img/half-half.png"></v-img>
                    </v-avatar>
                </v-col>

                <v-col cols="8" class="text-left">
                    <v-card-title>
                       <h4> {{ product.name }}</h4>
                    </v-card-title>
                    <v-card-subtitle>
                        <h6>
                        {{ product.qty }} X {{ product.price }} = {{ (product.qty*product.price).toFixed(2) }} Gel
                    </h6>
                    </v-card-subtitle>
                    <v-card-subtitle v-for="(topping, index) in product.toppings" :key="index">
                       {{ topping.name }} X {{ topping.qty }}
                    </v-card-subtitle>
                    <div class="qtyComponent-cart kalati">
                        <div class="minusBtn unselectable" :class="product.qty > 1 ? 'minusBtn' : 'hiddenAnimation'" @click="decreaseQty(product)">-</div>
                        <div class="qtyNum unselectable">{{ product.qty }}</div>
                        <div class="plusBtn unselectable" @click="increaseQty(product)">+</div>
                    </div>
                </v-col>
            </v-row>
            </v-card-text>


            <v-divider></v-divider>

        </v-card>
        <!-- <h2 style="color: #f14668; padding: 10px;">
                    Cart
                    <v-icon @click="clearCart">
                        mdi-trash-can
                    </v-icon>
                </h2> -->
        <template #footer>
            <v-row>
                <v-col cols="auto">
                    <v-btn
                    height="72"
                    min-width="164"
                    @click="clearCart"
                    >
                    გასუფთავება
                    </v-btn>
                </v-col>
            </v-row>
        </template>
        </VueSidePanel>
    </v-app>
</template>

<script>
export default {
    data () {
        return {
            cartOpen: false,
        }
    },
    watch: {
        open(val){
            this.cartOpen = val;
        },
    },
    computed: {
      cart(){
        return this.$store.getters.cartList;
      },
      cartTotal(){
        return this.$store.getters.cartTotalPrice;
      },
    },
    props: ['open'],
    methods: {
        checkout(){
            this.cartOpen = !this.cartOpen;
            this.$emit('openCheckout');
        },
        selectDineOption(option){
            this.dineModal = false;
            this.$emit('onDineOption', option);
        },
        clearCart(){
            this.$store.dispatch('clearCart');
        },
        increaseQty(product){
            product.qty++;
        },
        decreaseQty(product){
            if(product.qty != 1){
                product.qty--;
            }
        },
    }
}
</script>
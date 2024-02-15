<template>
    <v-app>
        <template #header>
            <div>
                <h2 style="color: #f14668; padding: 10px;">
                    Cart
                    <v-icon @click="clearCart">
                        mdi-trash-can
                    </v-icon>
                </h2>
                <h3 style="color: aquamarine; padding: 10px;" @click="checkout">
                    Checkout
                </h3>
            </div>
        </template>
        <v-card
            v-for="(product, index) in cart" :key="index"
            class="mx-auto"
            max-width="400"
        >
            <v-card-text>
            <v-row no-gutters>
            <v-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4"
            >
                <v-sheet class="ma-2 pa-2">
                One of three columns
                </v-sheet>
            </v-col>
            </v-row>
           
            </v-card-text>


            <v-divider></v-divider>

        </v-card>

        <template #footer>
            <h2>Total Price: {{ cartTotal }}</h2>
        </template>
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
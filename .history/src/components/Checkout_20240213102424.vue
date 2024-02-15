<template>
    <v-app>
    <v-dialog
      v-model="openDialog"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
    <template #header>
            <div class="background-gray">
                <v-row>
                    <v-col cols="12" style="text-align: center;height: 80px;padding: 0px;padding-top: 20px;">
                        <img src="../assets/img/logo.png" alt="tab1" class="mb-5 logo cart-sidebar">     
                    </v-col>
                </v-row>
                <v-row style="margin: 0px;" class="shadow-bottom">
                    <v-col  cols="12" style="text-align: center;height: 80px;padding: 0px;padding-top: 20px;">
                        <h5>მთლიანი შეკვეთის ჯამი: {{ cartTotal }} ₾</h5>  
                    </v-col>
                </v-row>
            </div>
        </template>
    <v-card class="mx-auto"
            max-width="500">
        <v-icon @click="openDialog = false">mdi-close</v-icon>
        <span v-for="(product, index) in cart" :key="index" >
            <v-card-text>
            <v-row  no-gutters>
                <v-col
                cols="2"
                >
                  <v-avatar
                      size="150"
                      rounded="0"
                  >
                      <v-img :src="product.img"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="10" class="text-left">
                    <v-card-title>
                        <h4>{{ product.name }}</h4>
                    </v-card-title>
                    <v-card-subtitle>
                       <h6> {{ product.qty }} X {{ Number(product.price).toFixed(2) }} = {{ (product.qty*product.price).toFixed(2) }}</h6> ₾
                    </v-card-subtitle>
                    <div class="qtyComponent-cart">
                        <div class="minusBtn unselectable" :class="product.qty > 1 ? 'minusBtn' : 'hiddenAnimation'" @click="decreaseQty(product)">-</div>
                        <div class="qtyNum unselectable">{{ product.qty }}</div>
                        <div class="plusBtn unselectable" @click="increaseQty(product)">+</div>
                    </div>
                </v-col>
            </v-row>
            </v-card-text>
            <v-divider></v-divider>
        </span>
        <v-footer fixed>
            <!-- <v-row>
                <v-col cols="6" offset="3" style="margin-top: auto">
                <h1 class="text-color"> Where will you be eating today?</h1>
                </v-col>
            </v-row> -->
            <v-row>
                <v-col cols="3" offset="3">
                        <div class="dine-btn" @click="payOrder('card')">
                            <v-icon class="dine-icon" style="font-size: 72px;">mdi-credit-card</v-icon>
                            <div class="dine-text">
                               Pay By Card
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="dine-btn" @click="payOrder('cash')">
                            <v-icon class="dine-icon" style="font-size: 72px;">mdi-cash</v-icon>
                            <div class="dine-text">
                               Pay By Cash
                            </div>
                        </div>
                    </v-col>
            </v-row>
        </v-footer>
    </v-card>
    </v-dialog>

</v-app>
</template>

<script>

export default {
    props: ['activeConstructor'],
    data () {
        return {
            openDialog: false,
        }
    },
    props: ['activeCheckout'],
    computed: {
        cart(){
            return this.$store.getters.cartList;
        },
        cartTotal(){
            return this.$store.getters.cartTotalPrice;
        },
    },
    methods: {
        payOrder(val){
            alert("Total of - "+ this.cartTotal +" will be paid by " + val);
        },
        increaseQty(product){
            product.qty++;
        },
        decreaseQty(product){
            if(product.qty != 1){
                product.qty--;
            }
        },
    },
    mounted() {

    },
    watch: {
        activeCheckout(val){
            this.openDialog = val;
        }
    },

}

</script>
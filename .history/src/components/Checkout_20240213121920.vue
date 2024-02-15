<template>
    <v-app>
    <v-dialog
      v-model="openDialog"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >

            <div class="background-gray">
                <!-- <v-row>
                    <v-col cols="12" style="text-align: center;height: 80px;padding: 0px;padding-top: 20px;">
                        <img src="../assets/img/logo.png" alt="tab1" class="mb-5 logo cart-sidebar">     
                    </v-col>
                </v-row>
                <v-row style="margin: 0px;" class="shadow-bottom">
                    <v-col  cols="12" style="text-align: center;height: 80px;padding: 0px;padding-top: 20px;">
                        <h5>მთლიანი შეკვეთის ჯამი: {{ cartTotal }} ₾</h5>  
                    </v-col>
                </v-row> -->
                <v-row no-gutters>
                    <v-col cols="8">
                        <v-card class="pa-2" outlined tile >
                            <span v-for="(product, index) in cart" :key="index" >
                                <v-card-text>
                                <v-row  no-gutters>
                                    <v-col cols="2">
                                    <v-avatar  size="150" rounded="0">
                                        <v-img :src="product.img"></v-img>
                                    </v-avatar>
                                    </v-col>
                                    <v-col cols="6" class="text-left">
                                        <v-card-title>
                                            <h4>{{ product.name }}</h4>
                                        </v-card-title>
                                        <v-card-subtitle>
                                        <h6> {{ product.qty }} X {{ Number(product.price).toFixed(2) }} = {{ (product.qty*product.price).toFixed(2) }}  ₾</h6>
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col cols="4">
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
                        </v-card>
                    </v-col>
                    <v-col cols="4">
                        <v-card class="pa-2 h-100" outlined tile>
                        <v-col cols="12" style="text-align: center;height: 80px;padding: 0px;padding-top: 20px;">
                            <img src="../assets/img/logo.png" alt="tab1" class="mb-5 logo cart-sidebar">     
                        </v-col>
                        <v-col  cols="12" style="text-align: center;height: 80px;padding: 0px;padding-top: 20px;">
                            <h5>მთლიანი შეკვეთის ჯამი: {{ cartTotal }} ₾</h5>  
                        </v-col>
                        <v-col cols="12">
                            <v-card
                                width="90%"
                                title="გადახდა ბარათით"
                                @click="payOrder('card')"
                                class="yellow"
                                >
                                <v-icon class="dine-icon" style="font-size: 72px;">mdi-credit-card</v-icon>
                            </v-card>
                            </v-col>
                        <v-col cols="12">
                            <v-card
                                    width="90%"
                                    title="გადახდა ნაღდი ფულით"
                                    @click="payOrder('cash')"
                                    class="green white"
                                    >
                                    <v-icon class="dine-icon" style="font-size: 72px;">mdi-cash</v-icon>
                                </v-card>
                            </v-col>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="12" sm="6" md="8">
                        <v-card class="pa-2" outlined tile >
                        .col-12 .col-sm-6 .col-md-8
                        </v-card>
                    </v-col>
                    <v-col cols="6" md="4">
                        <v-card class="pa-2" outlined tile >
                        .col-6 .col-md-4
                        </v-card>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="12" sm="6" md="8">
                        <v-card class="pa-2" outlined tile >
                        .col-12 .col-sm-6 .col-md-8
                        </v-card>
                    </v-col>
                    <v-col cols="6" md="4">
                        <v-card class="pa-2" outlined tile >
                        .col-6 .col-md-4
                        </v-card>
                    </v-col>
                </v-row>
            </div>
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
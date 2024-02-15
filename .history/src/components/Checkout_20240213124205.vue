<template>
    <v-app>
    <v-dialog
      v-model="openDialog"
      persistent
      fullscreen
      
      transition="dialog-bottom-transition"
    >

            <div class="background-gray">
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-card class="pa-2" outlined tile >
                            <v-icon @click="openDialog = false">mdi-close</v-icon>
                        </v-card>
                    </v-col>
                </v-row>
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
                    <v-col cols="12">
                        <v-card class="pa-2" outlined tile >
                            <v-card-title>anything to add?</v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-card class="pa-2" outlined tile >
                            <v-card
                            class="mx-auto"
                            max-width="344"
                        >
                            <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                            height="200px"
                            ></v-img>

                            <v-card-title>
                            Top western road trips
                            </v-card-title>

                            <v-card-subtitle>
                            1,000 miles of wonder
                            </v-card-subtitle>

                            <v-card-actions>
                            <v-btn
                                color="orange lighten-2"
                                text
                            >
                                Explore
                            </v-btn>

                            <v-spacer></v-spacer>

                            <v-btn
                                icon
                                @click="show = !show"
                            >
                                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                            </v-card-actions>

                            <v-expand-transition>
                            <div v-show="show">
                                <v-divider></v-divider>

                                <v-card-text>
                                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                                </v-card-text>
                            </div>
                            </v-expand-transition>
                        </v-card>
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
<template>
    <v-app>
    <v-dialog
      v-model="openDialog"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
            <div class="background-gray h-100" style="overflow: auto;">
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-card class="pa-2" outlined tile >
                            <v-icon @click="closeModal">mdi-close</v-icon>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="12" class="h100 relative">
                        <v-card class="pa-2" outlined tile>
                            <img src="../assets/img/logo.png" alt="tab1" class="logo ">   
                        </v-card>
                    </v-col>
                </v-row>
                <v-row no-gutters >
                    <v-col cols="8">
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
                                    <span v-if="product.category_id != 3">
                                        <v-card-title>
                                        <h4> {{ product.name }}</h4>
                                        </v-card-title>
                                        <v-card-subtitle>
                                            <h6>
                                            {{ product.qty }} X {{ product.price.toFixed(2) }} = {{ (product.qty*product.price).toFixed(2) }} Gel
                                        </h6>
                                        </v-card-subtitle>
                                    </span>
                                    <span v-else>
                                        <v-card-title>
                                        <h4> {{ product.name }}</h4>
                                        </v-card-title>
                                        <v-card-subtitle>
                                        <h4> {{ product.sizeFull }}, {{ capitalizeFirstLetter(product.crust) }} Crust, {{ capitalizeFirstLetter(product.sauce) }}</h4>
                                        </v-card-subtitle>
                                        <v-card-subtitle>
                                            <h6>
                                            {{ product.qty }} X {{ product.price.toFixed(2) }} = {{ (product.qty*product.price).toFixed(2) }} Gel
                                        </h6>
                                        </v-card-subtitle>
                                        <v-card-subtitle v-if="product.toppings.length != 0" bold>
                                            A/B Side
                                        </v-card-subtitle>
                                        <v-card-subtitle v-for="(topping, index) in product.toppings" :key="index">
                                        {{ topping.name }} X {{ topping.qty }} 
                                        </v-card-subtitle>
                                        <v-card-subtitle v-if="product.half1.toppings.length != 0">
                                            A Side
                                        </v-card-subtitle>
                                        <v-card-subtitle v-for="(topping, index) in product.half1.toppings" :key="index">
                                        {{ topping.name }} X {{ topping.qty }}
                                        </v-card-subtitle>
                                        <v-card-subtitle v-if="product.half2.toppings.length != 0">
                                            B Side
                                        </v-card-subtitle>
                                        <v-card-subtitle v-for="(topping, index) in product.half2.toppings" :key="index">
                                        {{ topping.name }} X {{ topping.qty }}
                                        </v-card-subtitle>
                                    </span>
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
                            <v-card-title>&nbsp;</v-card-title>
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
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        closeModal(){
            this.$emit('closeDialog');
            this.openDialog = false;
        },
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
    emits: {
      closeDialog: null,
    },
    watch: {
        activeCheckout(val){
            this.openDialog = val;
        }
    },

}

</script>
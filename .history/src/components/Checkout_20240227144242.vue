<template>
    <v-app>
    <v-dialog
      v-model="openDialog"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
            <div class="background-white h-100" style="overflow: auto;">
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-card class="pa-2" outlined tile >
                            <v-icon @click="closeModal">mdi-close</v-icon>
                        </v-card>
                    </v-col>
                </v-row>
                <!-- <v-row no-gutters>
                    <v-col cols="12" class="h100 relative">
                        <v-card class="pa-2" outlined tile>
                            <img src="../assets/img/logo.png" alt="tab1" class="logo ">   
                        </v-card>
                    </v-col>
                </v-row> -->
                <v-row no-gutters >
                    <v-col cols="8">
                        <v-card
                            v-for="(product, index) in cart" :key="index"
                            class="mx-auto"
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

                                <v-col cols="6" class="text-left">
                                    <span v-if="product.category_id != 3">
                                        <v-card-title class="carttitle">
                                         {{ product.name }}
                                        </v-card-title>
                                        <v-card-subtitle>
                                            {{ product.qty }} X {{ Number(product.price).toFixed(2) }} = {{ (product.qty*product.price).toFixed(2) }} Gel
                                        </v-card-subtitle>
                                    </span>
                                    <span v-else>
                                        <v-card-title class="carttitle">
                                         {{ product.name }}
                                        </v-card-title>
                                        <v-card-subtitle >
                                         {{ product.sizeFull }}, {{ capitalizeFirstLetter(product.crust) }} Crust, {{ capitalizeFirstLetter(product.sauce) }}
                                        </v-card-subtitle>
                                        <v-card-subtitle class="cartqty">
                                            {{ product.qty }} X {{ Number(product.price).toFixed(2) }} = {{ (product.qty*product.price).toFixed(2) }} ₾
                                        </v-card-subtitle>
                                        <v-card-subtitle class="racxa" v-if="product.toppings.length != 0" bold>
                                            A/B Side: 
                                        </v-card-subtitle>
                                        <v-card-subtitle class="racxa" v-for="(topping, index) in product.toppings" :key="index">
                                            {{ topping.name }} X {{ topping.qty }} &nbsp;
                                        </v-card-subtitle>
                                        <v-card-subtitle class="racxa" v-if="product.half1.toppings.length != 0">
                                             A Side: 
                                        </v-card-subtitle>
                                        <v-card-subtitle class="racxa" v-for="(topping, index) in product.half1.toppings" :key="index">
                                             {{ topping.name }} X {{ topping.qty }}&nbsp;
                                        </v-card-subtitle>
                                        <v-card-subtitle v-if="product.half2.toppings.length != 0">
                                             B Side: 
                                        </v-card-subtitle>
                                        <v-card-subtitle class="racxa" v-for="(topping, index) in product.half2.toppings" :key="index">
                                            {{ topping.name }} X {{ topping.qty }} &nbsp;
                                        </v-card-subtitle>
                                    </span>
                                </v-col>
                                <v-col cols="2" class="h100 relative">
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
                                    title="გადახდა სალაროსთან"
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
    <v-dialog
        v-model="paymentDialog"
        persistent
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        >
        <img src="../assets/img/header.jpg" class="header-image-checkout" alt="Responsive image">
        <div class="background-white h-100" style="overflow: auto;">
            <v-card v-if="paymentStep == 1 && paymentMethod == 'card'">
                <v-row>
                    <v-col cols="2">&nbsp;</v-col>
                    <v-col cols="8" class="text-center"><h1>Logo here</h1></v-col>
                    <v-col cols="2">&nbsp;</v-col>
                </v-row>
                <v-row class="my-10">
                    <v-col cols="2">&nbsp;</v-col>
                    <v-col cols="8" class="text-center"><h3>Total: {{ cartTotal }}</h3></v-col>
                    <v-col cols="2">&nbsp;</v-col>
                </v-row>
                <v-row class="my-10">
                    <v-col cols="2">&nbsp;</v-col>
                    <v-col cols="8" class="text-center">
                        <h3>
                            გთხოვთ მიჰყვეთ ტერმინალზე გადახდის ინსტრუქციას!
                        </h3>
                        (ეს გვერდი იქამდეა ჩატვირთული სანამ ტერმინალი
                         არ დააბრუნებს გადახდის სტატუსს, თუ წარმატებულია გადახდა უნდა 
                         დაიბეჭდოს ჩეკი და მიენიჭოს შეკვეთის ნომერი, თუ არა უნდა დაბრუნდეს ჩექაუთის გვერძე)
                    </v-col>
                    <v-col cols="2">&nbsp;</v-col>
                </v-row>
            </v-card>
            <v-card v-if="paymentStep == 2 && paymentMethod == 'card'">
                <v-row>
                    <v-col cols="2">&nbsp;</v-col>
                    <v-col cols="8" class="text-center"><h1>Logo here</h1></v-col>
                    <v-col cols="2">&nbsp;</v-col>
                </v-row>
                <v-row class="my-10">
                    <v-col cols="2">&nbsp;</v-col>
                    <v-col cols="8" class="text-center"><h3>შეკვეთა წარმატებულია!</h3></v-col>
                    <v-col cols="2">&nbsp;</v-col>
                </v-row>
                <v-row class="my-10">
                    <v-col cols="2">&nbsp;</v-col>
                    <v-col cols="8" class="text-center">
                        <h2>
                            თქვენი შეკვეთის ნომერია: 
                        </h2>
                        <p/>
                        <div class="orderId">
                            69
                        </div>
                        <h3>
                            გთხოვთ აიღოთ ჩეკი და დაელოდოთ ნომრის გამოძახებას ეკრანზე
                        </h3>
                    </v-col>
                    <v-col cols="2">&nbsp;</v-col>
                </v-row>
            </v-card>
            <v-card v-if="paymentStep == 1 && paymentMethod == 'cash'">
                <v-row>
                    <v-col cols="2">&nbsp;</v-col>
                    <v-col cols="8" class="text-center"><h1>Logo here</h1></v-col>
                    <v-col cols="2">&nbsp;</v-col>
                </v-row>
                <v-row class="my-10">
                    <v-col cols="2">&nbsp;</v-col>
                    <v-col cols="8" class="text-center"><h3>შეკვეთა წარმატებულია!</h3></v-col>
                    <v-col cols="2">&nbsp;</v-col>
                </v-row>
                <v-row class="my-10">
                    <v-col cols="2">&nbsp;</v-col>
                    <v-col cols="8" class="text-center">
                        <h2>
                            თქვენი შეკვეთის ნომერია: 
                        </h2>
                        <div class="orderId">
                            69
                        </div>
                        <h1>Total: {{ cartTotal }} GEL</h1>
                        <h3>
                            შეკვეთის გადასახდელად გთხოვთ აიღოთ ჩეკი და გადაიხადოთ სალაროსთან 
                        </h3>
                    </v-col>
                    <v-col cols="2">&nbsp;</v-col>
                </v-row>
            </v-card>
            <v-footer>
                <v-btn @click="changeStep">Change Step</v-btn>
                <v-btn @click="paymentProcess">Pay</v-btn>
            </v-footer>
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
            paymentMethod: null,
            paymentDialog: false,
            paymentStep: 1,
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
        changeStep(){
            if(this.paymentStep == 1){
                if(this.paymentMethod == 'card'){
                    alert('ამ დროს უნდა დაიბეჭდოს ჩეკი სადაც ორდერს მინიჭებული ექნება იდ.');
                }
                this.paymentStep = 2;
            } else if(this.paymentStep == 2){
                this.paymentStep = 1;
            }
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        closeModal(){
            this.$emit('closeDialog');
            this.openDialog = false;
        },
        paymentProcess(){
            this.paymentDialog = false;
            this.openDialog = true;
        },
        payOrder(val){
            this.paymentStep = 1;
            if(val == 'cash') {
                alert('ამ დროს უნდა დაიბეჭდოს ჩეკი სადაც ორდერს მინიჭებული ექნება იდ.');
            }
            this.paymentMethod = val;
            this.paymentDialog = true;
            this.openDialog = false;
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
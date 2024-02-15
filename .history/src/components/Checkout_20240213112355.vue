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
       
            <div data-v-7f211326="" class="shadow-sm br-8  mb-4 v-card v-sheet theme--light" style="max-width: 100%;"><div class="pa-4"><div class="row"><div class="col col-12"><div class="d-flex"><div class="v-avatar me-3 primary" style="height: 30px; min-width: 30px; width: 30px;"><p class="white--text mb-0">1</p></div><h3 class="font-weight-light">Delivery Details</h3></div></div><div class="col-lg-6 col-xl-6 col-12"><p class="text-14 mb-1">Delivery Date</p><div class="v-input v-input--dense theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined v-select"><div class="v-input__control"><div role="button" aria-haspopup="listbox" aria-expanded="false" aria-owns="list-2108" class="v-input__slot"><fieldset aria-hidden="true"><legend style="width: 0px;"><span class="notranslate">​</span></legend></fieldset><div class="v-select__slot"><label for="input-2108" class="v-label theme--light" style="left: 0px; right: auto; position: absolute;">select...</label><div class="v-select__selections"><input id="input-2108" readonly="readonly" type="text" aria-readonly="false" autocomplete="off"></div><div class="v-input__append-inner"><div class="v-input__icon v-input__icon--append"><i aria-hidden="true" class="v-icon notranslate mdi mdi-menu-down theme--light"></i></div></div><input type="hidden"></div><div class="v-menu"><!----></div></div><div class="v-text-field__details"><div class="v-messages theme--light"><div class="v-messages__wrapper"></div></div></div></div></div></div><div class="col-lg-6 col-xl-6 col-12"><p class="text-14 mb-1">Delivery Time</p><div class="v-input v-input--dense theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined v-select"><div class="v-input__control"><div role="button" aria-haspopup="listbox" aria-expanded="false" aria-owns="list-2113" class="v-input__slot"><fieldset aria-hidden="true"><legend style="width: 0px;"><span class="notranslate">​</span></legend></fieldset><div class="v-select__slot"><label for="input-2113" class="v-label theme--light" style="left: 0px; right: auto; position: absolute;">select...</label><div class="v-select__selections"><input id="input-2113" readonly="readonly" type="text" aria-readonly="false" autocomplete="off"></div><div class="v-input__append-inner"><div class="v-input__icon v-input__icon--append"><i aria-hidden="true" class="v-icon notranslate mdi mdi-menu-down theme--light"></i></div></div><input type="hidden"></div><div class="v-menu"><!----></div></div><div class="v-text-field__details"><div class="v-messages theme--light"><div class="v-messages__wrapper"></div></div></div></div></div></div><div class="py-0 col col-12"><p class="text-14 mb-0">Delivery Address</p></div><div class="col-lg-4 col-xl-4 col-12"><div class="pa-4 grey lighten-2 br-8"><h5 class="font-600 mb-2">Home</h5><p>435 Bristol Avenue, Abington MA 2351</p></div></div><div class="col-lg-4 col-xl-4 col-12"><div class="pa-4 grey lighten-2 br-8"><h5 class="font-600 mb-2">Office</h5><p>777 Brockton Avenue, Abington MA 2351</p></div></div><div class="col-lg-4 col-xl-4 col-12"><div class="pa-4 grey lighten-2 br-8"><h5 class="font-600 mb-2">Office 2</h5><p>777 Kazi Avenue, Abington MA 2351</p></div></div></div></div></div>
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
                <v-col cols="8" class="text-left">
                    <v-card-title>
                        <h4>{{ product.name }}</h4>
                    </v-card-title>
                    <v-card-subtitle>
                       <h6> {{ product.qty }} X {{ Number(product.price).toFixed(2) }} = {{ (product.qty*product.price).toFixed(2) }}</h6> ₾
                    </v-card-subtitle>
                   
                </v-col>
                <v-col
                cols="2"
                >
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
                    <v-card
                        width="90%"
                        title="გადახდა ბარათით"
                        @click="payOrder('card')"
                        class="yellow"
                        >
                        <v-icon class="dine-icon" style="font-size: 72px;">mdi-credit-card</v-icon>
                    </v-card>
                        <!-- <div class="dine-btn" @click="payOrder('card')">
                            <v-icon class="dine-icon" style="font-size: 72px;">mdi-credit-card</v-icon>
                            <div class="dine-text">
                               Pay By Card
                            </div>
                        </div> -->
                    </v-col>
                <v-col cols="3">
                    <v-card
                        width="90%"
                        title="გადახდა ნაღდი ფულით"
                        @click="payOrder('cash')"
                        class="green white"
                        >
                        <v-icon class="dine-icon" style="font-size: 72px;">mdi-cash</v-icon>
                    </v-card>
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
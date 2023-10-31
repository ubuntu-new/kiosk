<template>
    <v-app>
    <v-dialog
      v-model="openDialog"
      scrollable
      persistent
      min-height="80vh"
      transition="dialog-bottom-transition"
    >
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="openDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Checkout</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-card
            v-for="(product, index) in cart" :key="index"
            
        >
            <v-card-text>
            <v-row  no-gutters>
                <v-col
                cols="4"
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
                        {{ product.name }}
                    </v-card-title>
                    <v-card-subtitle>
                        {{ product.qty }} X {{ product.price }} = {{ (product.qty*product.price).toFixed(2) }} Gel
                    </v-card-subtitle>
                    <div class="qtyComponent-cart">
                        <div class="minusBtn-cart unselectable" :class="product.qty > 1 ? 'minusBtn' : 'hiddenAnimation'" @click="decreaseQty(product)">-</div>
                        <div class="qtyNum unselectable">{{ product.qty }}</div>
                        <div class="plusBtn-cart unselectable" @click="increaseQty(product)">+</div>
                    </div>
                </v-col>
            </v-row>
            </v-card-text>
            <v-divider></v-divider>
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
    },
    methods: {

        
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
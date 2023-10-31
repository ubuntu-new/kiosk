<template>

    <transition name="bounce">
        <div v-show="divModel" class="modal-container">
            <v-btn @click="openModal">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="modal-internal">
                <v-card>
                    <v-card-text>
                            <v-row>
                                <v-col cols="6" offset="3" >
                                    <div class="backgraundi">
                                    <img
                                        :src="product.img"
                                        class="insideImageProduct"
                                    />
                                    </div>
                                </v-col>
                            </v-row>
                            <div class="row orderTitle">
                                <div class="mb-2">
                                    <h5 class="base"><strong> {{ product.name }} </strong>  
                                    </h5>
                                    <br>
                                    <h4>
                                        {{ product.price }} GEL 
                                    </h4>
                                </div>
                                <div class="qtyComponent">
                                    <div class="minusBtn unselectable" :class="productQty > 1 ? 'minusBtn' : 'hiddenAnimation'" @click="decreaseQty">-</div>
                                    <div class="qtyNum unselectable">{{ productQty }}</div>
                                    <div class="plusBtn unselectable" @click="increaseQty">+</div>
                                </div>
                            </div>
                            
                    </v-card-text>
                    <v-card-actions class="justify-end">
                    <v-btn
                    variant="text"
                    color="success"
                    @click="addToCart(product)"
                    >Done</v-btn>
                    <v-btn
                        variant="text"
                        @click="closeDialog"
                    >Close</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </transition>
    <transition name="bounce">
        <div v-show="divModelRight" class="modal-container-right">
            <v-btn @click="openModalRight">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="modal-internal">
                <v-card>
                    <v-card-text>
                            <v-row>
                                <v-col cols="6" offset="3" >
                                    <div class="backgraundi">
                                    <img
                                        :src="product.img"
                                        class="insideImageProduct"
                                    />
                                    </div>
                                </v-col>
                            </v-row>
                            <div class="row orderTitle">
                                <div class="mb-2">
                                    <h5 class="base"><strong> {{ product.name }} </strong>  
                                    </h5>
                                    <br>
                                    <h4>
                                        {{ product.price }} GEL 
                                    </h4>
                                </div>
                                <div class="qtyComponent">
                                    <div class="minusBtn unselectable" :class="productQty > 1 ? 'minusBtn' : 'hiddenAnimation'" @click="decreaseQty">-</div>
                                    <div class="qtyNum unselectable">{{ productQty }}</div>
                                    <div class="plusBtn unselectable" @click="increaseQty">+</div>
                                </div>
                            </div>
                            
                    </v-card-text>
                    <v-card-actions class="justify-end">
                    <v-btn
                    variant="text"
                    color="success"
                    @click="addToCart(product)"
                    >Done</v-btn>
                    <v-btn
                        variant="text"
                        @click="closeDialog"
                    >Close</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </transition>

    <transition name="bounce">
        <div class="button-transition" v-show="btnModel">
            <ul >
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            <v-bnt>
                <v-icon @click="btnTransition">mdi-close</v-icon>
            </v-bnt>
        </div>
    </transition>

    <div class="container cart-item">
        <!-- <v-row>
            <v-col>
                <img 
                    :src="product.img"
                    class="cart-item-image test-border"
                />
            </v-col>
            <v-col class="bg-color-green test-border">Text</v-col>
        </v-row> -->

        <!-- <div class="row">
            <div class="col-lg-3 test-border">
                <img 
                    :src="product.img"
                    class="cart-item-image test-border"
                />
            </div>
            <div class="col-lg-9 test-border">Text</div>
        </div> -->

        <v-card
            v-for="index in 5" :key="index"
            class="mx-auto"
            max-width="400"
        >
            <v-card-text>
            <v-row  no-gutters>
                <v-col
                cols="4"
                >
                <v-avatar
                        size="100"
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
                        {{ productQty }} X {{ product.price }} = {{ (productQty*product.price).toFixed(2) }} Gel
                    </v-card-subtitle>
                    <div class="qtyComponent-cart">
                        <div class="minusBtn-cart unselectable" :class="productQty > 1 ? 'minusBtn' : 'hiddenAnimation'" @click="decreaseQty">-</div>
                        <div class="qtyNum unselectable">{{ productQty }}</div>
                        <div class="plusBtn-cart unselectable" @click="increaseQty">+</div>
                    </div>
                </v-col>
            </v-row>
            </v-card-text>


            <v-divider></v-divider>

        </v-card>
    </div>

    <v-btn @click="openModal">
        Open Bottom
    </v-btn>
    <v-btn @click="openModalRight">
        Open Right
    </v-btn>
    <br>
    <transition name="bouncea">
        <div class="button-transition-btn" @click="btnTransition" v-show="!btnModel">
            <v-btn>
                Button Transition
            </v-btn>
        </div>
    </transition>
</template>

<script>




export default {

    data () {
        return {
            divModel: false,
            btnModel: false,
            divModelRight: false,
            productQty: 1,
            product: {
                name: 'Root beer',
                price: 3.8,
                img: "https://api.ronnyspizza.grena.ge/product_images/R-Rootbeer.png",
            },
        }
    },
    computed: {
      
    },
    methods: {
        openModal(){
            this.divModel = !this.divModel;
        },
        openModalRight(){
            this.divModelRight = !this.divModelRight;
        },
        btnTransition(){
            this.btnModel = !this.btnModel;
        },
        addToCart(product){
            product.qty = this.productQty;
            // alert(product.id);
            this.$store.dispatch('addToCart', product);
            this.closeDialog();
        },
        closeDialog(){
            this.productQty = 1;
            this.openModal = false;
            this.$emit('closeProductDialog');
            
        },
        increaseQty(){
            this.productQty++;
        },
        decreaseQty(){
            if(this.productQty != 1){
                this.productQty--;
            }
        },
    },
    mounted() {

    },

}

</script>
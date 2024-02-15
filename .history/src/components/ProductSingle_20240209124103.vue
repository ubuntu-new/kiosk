<template>
    <v-col cols="4" @click="selectItem" class="unselectable  p-3 shadow-bottom bg-light mb-3 ">
        <img
          :src="product.m"
          class="imgResize"
        />
        <v-row>
            <div class="text-title">
                <h3>{{ product.name }}</h3>
            </div>
        </v-row>
        <v-row>
            <div class="text-description card-body">
                <H6 style="font-weight: 500;">{{ product.description }}</H6>
            </div>
            <br />
            <!-- <div class="text-price">
                From {{ product.priceBySizes.s }} &#8382;
            </div> -->
        </v-row>

    </v-col>
</template>

<script>
export default {
    data () {
        return {
            dineModal: true,
        }
    },
    props: ['product'],
    methods: {
        selectItem(){
            this.$emit('onProductSelect', this.product);
        },

        selectDineOption(option){
            this.dineModal = false;
            this.$emit('onDineOption', option);
        }
    }
}
</script>
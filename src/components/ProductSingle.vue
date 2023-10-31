<template>
    <v-col cols="4" @click="selectItem" class="unselectable">
        <img
          :src="product.m"
          class="imgResize"
        />
        <v-row>
            <div class="text-title">
                {{ product.name }}
            </div>
        </v-row>
        <v-row>
            <div class="text-description card-body">
                {{ product.description }}
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
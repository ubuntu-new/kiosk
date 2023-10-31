<template>
    <!-- <div  v-show="openDialog" class="modal-container"> -->
        <v-dialog fullscreen persistent v-model="openDialog" transition="dialog-bottom-transition">
        <v-card v-if="!bothHalfSelected">
            <!-- <v-btn @click="closeDialog" > -->
                <v-icon @click="closeDialog">mdi-close</v-icon>
            <!-- </v-btn> -->
            <v-card-text>
                <v-row>
                    <v-col 
                    cols="3"
                    offset="2"
                    >
                        <div class="constructorBox constructorBoxBorder">
                            <img
                                :src="selectedHalf1.m"
                                class="imgResize"
                            />
                            <v-row>
                                <div class="text-title">
                                    {{ selectedHalf1.name }}
                                </div>
                            </v-row>
                        </div>
                    </v-col>
                    <v-col cols="2">
                        <v-icon size="x-large" style="margin-top: 100px;" >mdi-close</v-icon>
                    </v-col>
                    <v-col cols="3">
                        <div class="constructorBox constructorBoxBorder">
                            <img
                                :src="selectedHalf2.m"
                                class="imgResize"
                            />
                            <v-row>
                                <div class="text-title">
                                    {{ selectedHalf2.name }}
                                </div>
                            </v-row>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                        <v-col v-for="(product, index) in pizzaList" :key="index" cols="4" class="unselectable" @click="selectSide(product)" :class="product.isSelected ? 'pizza_inactive' : ''" >
                            <span :class="product.isSelected ? 'checkmark' : ''"></span>
                            <img
                            :src="product.m"
                            class="imgResizeConstructor"
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
                </v-row>
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
        <v-card v-else>
            <v-icon @click="closeDialog">mdi-close</v-icon>
            <v-card-text>
                123
            </v-card-text>
        </v-card>
    <!-- </div> -->
</v-dialog>

    <v-dialog
      v-model="confirmHalfDialog"
      persistent
      width="auto"
    >
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to select this pizzas?
        </v-card-title>
        <v-card-text>Or you can go back and select new ones</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="declineHalfs"
          >
            Disagree
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="confirmHalfs"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script>




export default {

    props: ['activeConstructor'],
    data () {
        return {
            openDialog: false,
            selectedHalf1: {m: '', name:''},
            selectedHalf2: {m: '', name:''},
            half: 1,
            bothHalfSelected: false,
            confirmHalfDialog: false,
        }
    },
    computed: {
        pizzaList(){
            var temp = this.$store.getters.pizzaList;
            // var arr = temp.filter((x) => x.category_id == 3);

            return temp;
      },
    },
    methods: {
        closeDialog(){
            this.selectedHalf1 = {m: '', name:''},
            this.selectedHalf2 = {m: '', name:''},
            this.half = 1;
            this.bothHalfSelected = false;
            this.$emit('closeConstructorDialog');
            // this.$forceUpdate();
        },
        selectSide(selectedHalf){
            selectedHalf.isSelected = true;
            if(this.half == 1){
                this.selectedHalf1 = selectedHalf;
                this.half++;
            } else if(this.half == 2){
                this.selectedHalf2 = selectedHalf;
                this.confirmHalfDialog = true;
                // this.bothHalfSelected = true;
            }
        },

        confirmHalfs(){
            this.bothHalfSelected = true;
            this.confirmHalfDialog = false;
        },
        declineHalfs(){
            this.bothHalfSelected = false;
            this.confirmHalfDialog = false;
        },
        
    },
    mounted() {

    },
    watch: {
        activeConstructor(val){
            this.openDialog = val;
        },
    },

}

</script>
<style>
.modal-header {
    position: relative;
    top: 0;
}
</style>
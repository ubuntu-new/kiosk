<template>
    <v-app>
        <v-dialog 
            v-model="dineModal"
            fullscreen
            transition="dialog-bottom-transition"
            overlay-color="black"
            overlay-opacity="1"
            
        >
        
            <v-card class="background-color d-flex align-items-center justify-content-center vh-100">
                <div class="container">
                <div class="row">
                    <div class="col-6 offset-8 mt-5">
                        <strong>ქართული</strong>
                    </div>
                    <div class="col-6 offset-3">
                        <h1 class="text-color"> Select where you'd like to eat today?</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6 ">
                        <div class="dine-btn d-flex align-items-center justify-content-center" @click="selectDineOption('take_out')">
                            <div class="dine-icon" justify="center" align="center">
                                <img class="icon-size" src = "../assets/img/takeaway.svg" alt="take_away"/>
                            </div>
                            <div class="dine-text">
                                <strong>
                                    Take away
                                </strong>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 ">
                        <div class="dine-btn" @click="selectDineOption('walk_in')">
                            <div class="dine-icon" justify="center" align="center">
                                <img class="icon-size" src = "../assets/img/dinein.svg" alt="dine_in"/>
                            </div>
                            <div class="dine-text">
                                <strong>
                                    Eat in
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <strong>
                            We only accept card payments here. Pay in cache? Please order at counter
                        </strong>
                    </div> 
                </div>
            </div>
            
                
                    
                
            
        </v-card>
       
        </v-dialog>
    </v-app>
</template>

<script>
export default {
    data () {
        return {
            dineModal: true,
        }
    },

    methods: {
        selectDineOption(option){
            this.dineModal = false;
            this.$emit('onDineOption', option);
        }
    }
}
</script>
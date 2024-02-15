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
                        <div class="col-2 offset-10 text-right">
                            <div class="language border-white">
                                ქართული
                            </div>
                        </div>  
                    </div>                
                <div class="row">   
                    <div class="col-12 mb-5">
                        <h2 class="text-color">Select where you'd like to eat:</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="dine-btn" @click="selectDineOption('take_out')">
                            <div class="dine-icon bd-brand-item p-5 mb-3 rounded-3" justify="center" align="center">
                                <img class="icon-size d-block img-fluid mx-auto" src = "../assets/img/takeaway.svg" alt="take_away"/>
                            </div>
                            <div class="dine-text">
                                <h4 class="pt-3">
                                    Take away
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 ">
                        <div class="dine-btn" @click="selectDineOption('walk_in')">
                            <div class="dine-icon bd-brand-item p-5 mb-3 rounded-3" justify="center" align="center">
                                <img class="icon-size d-block img-fluid mx-auto" src = "../assets/img/dinein.png" alt="take_away"/>
                            </div>
                            <div class="dine-text">
                                <h4 class="pt-3">
                                    Eat in
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row border-white yellow-background">
                    <div class="col-12 text-center ">
                        <div class="">
                            <span class="material-symbols-outlined">
                                payments
                            </span>
                        </div>
                        <div class="col-12">
                            <strong>We only accept cart payment here.</strong>
                            <br>
                            <span style="font-weight: 500;">Pay in cash? Please order at counter</span>
                        </div>
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
<template>
    <v-app>
        <v-dialog 
            v-model="dineModal"
            fullscreen
            transition="dialog-bottom-transition"
            overlay-color="black"
            overlay-opacity="1"
            
        >
        
            <div class="card background-color">
                <v-row>
                <v-col cols="6" offset="8" style="margin-top: auto;"><strong>ქართული</strong></v-col>
            </v-row>
                <v-row>
                    <v-col cols="6" offset="3" style="margin-top: auto">
                    <h1 class="text-color"> Select where you'd like to eat today?</h1>
                    </v-col>
                </v-row>
                <v-row >
                    <v-col cols="3" offset="3">
                        <div class="dine-btn" @click="selectDineOption('take_out')">
                            <div class="dine-icon" justify="center" align="center">
                                <img class="icon-size" src = "../assets/img/takeaway.svg" alt="take_away"/>
                            </div>
                            <div class="dine-text">
                                <strong>
                                    Take away
                                </strong>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="3">
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
                    </v-col>
                    <div class="col-4 offset-3">
                        <strong>
                            We only accept card payments here. Pay in cache? Please order at counter
                        </strong>
                    </div> 
                </v-row>
                
                    
                
            
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
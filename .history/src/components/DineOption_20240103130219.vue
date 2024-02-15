<template>
    <v-app>
        <v-dialog 
            v-model="dineModal"
            fullscreen
            transition="dialog-bottom-transition"
            overlay-color="black"
            overlay-opacity="1"
            
        >
        
            <v-card class="background-color">
                <v-row>
                <v-col cols="12" style="margin-top: auto;">wwww</v-col>
            </v-row>
                <v-row>
                    <v-col cols="6" offset="3" style="margin-top: auto">
                    <h1 class="text-color"> სად მიირთმევთ დღეს?</h1>
                    </v-col>
                </v-row>
                <v-row >
                    <v-col cols="3" offset="3">
                        <div class="dine-btn" @click="selectDineOption('take_out')">
                            <div class="dine-icon" justify="center" align="center">
                                <img class="icon-size" src = "../assets/img/takeaway.svg" alt="take_away"/>
                            </div>
                            <div class="dine-text">
                                წავიღებ
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <div class="dine-btn" @click="selectDineOption('walk_in')">
                            <div class="dine-icon" justify="center" align="center">
                                <img class="icon-size" src = "../assets/img/dinein.svg" alt="dine_in"/>
                            </div>
                            <div class="dine-text">
                                ადგილზე მივირთმევ
                            </div>
                        </div>
                    </v-col>
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
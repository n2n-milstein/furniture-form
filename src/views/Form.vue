<template>
  <v-container grid-list-xl align-center>
    <v-layout wrap fluid>
      <v-flex xs10 offset-xs1>
      <v-card>
        <v-card-title class="headline" primary-title>
          N2N Furniture Donation Form
        </v-card-title>
    <v-flex xs12>
    <v-card-text>
      <!-- <v-container> -->
          <v-form ref="edit-form" v-model="valid" lazy-validation>
            <!-- Donor Info -->
            <p class="title">Donor Information</p>
              <v-flex xs12 row>
                <v-flex xs5>
                <v-text-field
                        v-model="donorName"
                        label="Donor Name"
                        :rules="required"
                        required
                ></v-text-field>
                </v-flex>

                <v-flex xs5 offset-xs1>
                <v-text-field
                        v-model="phone"
                        label="Phone Number"
                        :rules="required"
                        required
                ></v-text-field>
                </v-flex>
              </v-flex>

            <v-flex xs12 row>
              <v-flex xs5>
              <v-text-field
                      v-model="email"
                      label="Email"
                      :rules="emailRules"
                      required
              ></v-text-field>
              </v-flex>

                <v-flex xs5 offset-xs1>
                  <v-select
                          v-model="zone"
                          label="Tompkins County Zone"
                          :rules="required"
                          :items="zones"
                          required
                  ></v-select>
                </v-flex>
              </v-flex>

            <v-flex xs11>
              <v-text-field
                      v-model="address"
                      label="Pickup Address"
                      :rules="required"
                      required
              ></v-text-field>
            </v-flex>

            <v-divider />
              <br>
            <!-- Physical Attributes -->
            <p class="title">Furniture Information</p>
            <v-flex xs12 class="furnitureItem">
            <v-select
                    v-model="fclass"
                    :items="classOptions"
                    :rules="[v => !!v || 'Item is required']"
                    label="Furniture Class"
                    required
            ></v-select>

                <!--<v-btn-->
                        <!--flat-->
                        <!--color="primary"-->
                        <!--@click=addItem()-->
                        <!--&gt; ADD ITEM-->
                <!--</v-btn>-->
                <v-flex xs12>
                    <div v-if="fclass !== -1">
                        <physical-attr :fclass="fclass"></physical-attr>
                    </div>
                </v-flex>


            </v-flex>

          </v-form>



      <!-- </v-container> -->
    </v-card-text>
    </v-flex>
  </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from "vue-property-decorator";
import { FClass } from "@/data/Furniture";
import PhysicalAttr from "@/components/PhysicalAttr.vue";
import * as firebase from "firebase/app";
import "firebase/firestore";


@Component({
    components: {
        PhysicalAttr
    }
})
export default class Form extends Vue {
    donorName="";
    phone="";
    email="";
    zone="";
    address="";

    zones = ["Ithaca", "Groton", "Dryden", "Lansing", "Caroline", "Danby", "Newfield", "Enfield", "Ulysses"];
    classOptions = Object.keys(FClass);
    fclass = -1;

    db = firebase.firestore();

    addItem() {
        this.db.collection('formTest').add({
            name : this.donorName,
            phone : this.phone,
            email: this.email,
            zone: this.zone,
            address: this.address,

            class: this.fclass,

        })
            .then(() => {
                console.log("test successful");
            })
            .catch(error => {
                console.log("error");
            });
    }
}

</script>

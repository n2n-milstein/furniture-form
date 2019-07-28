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
                    v-model="selectedItem"
                    :items="classOptions"
                    :rules="[v => !!v || 'Item is required']"
                    label="Furniture Class"
                    required
            ></v-select>

            <!--<physical-attr :fclass="fclass"></physical-attr>-->

            </v-flex>

          </v-form>

          <div v-if="selectedItem === 'Bed'">
            <v-flex xs12>
            Bed Selected
            <Bed/>
            </v-flex>

          </div>
          <div v-else-if="selectedItem === 'Chair'">
              <v-flex xs12>
                  Chair Selected
                  <Chair/>
              </v-flex>
          </div>
          <div v-else-if="selectedItem === 'Table'">
              <v-flex xs12>
                  Table Selected
                  <Table/>
              </v-flex>
          </div>
          <div v-else-if="selectedItem === 'Dresser'">
              <v-flex xs12>
                  Dresser Selected
                  <Dresser/>
              </v-flex>
          </div>
          <div v-else-if="selectedItem === 'Other'">
              <v-flex xs12>
                  Other Selected
                  <Other />
              </v-flex>
          </div>
          <div v-else>
          </div>

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
import Bed from "@/components/Bed.vue";
import Chair from "@/components/Chair.vue";
import Table from "@/components/Table.vue";
import Dresser from "@/components/Dresser.vue";
import Other from "@/components/Other.vue";

@Component({
    components: {
        Bed
    }
})
export default class Form extends Vue {
    @Prop({
        default: true,
    })
    zones = ["Ithaca", "Groton", "Dryden", "Lansing", "Caroline", "Danby", "Newfield", "Enfield", "Ulysses"];
    classOptions = ["Bed", "Chair", "Table", "Dresser", "Other"]
    selectedItem = -1;
}

</script>

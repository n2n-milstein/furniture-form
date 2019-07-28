<template>
  <v-card>
    <v-card-title class="headline" primary-title>
      N2N Furniture Donation Form
    </v-card-title>

    <v-card-text>
      <!-- <v-container> -->
      <v-layout wrap>
        <v-flex xs12>
          <v-form ref="edit-form" v-model="valid" lazy-validation>
            <!-- Donor Info -->
            <div>Donor Info</div>

            <v-text-field
                    v-model="donorName"
                    label="Donor Name"
                    :rules="required"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="phone"
                    label="Phone Number"
                    :rules="required"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="email"
                    label="Email"
                    :rules="emailRules"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="address"
                    label="Address"
                    :rules="required"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="zone"
                    label="Zone"
                    :rules="required"
                    required
            ></v-text-field>

            <v-divider />
            <!-- Physical Attributes -->
            <div>Physical Attributes</div>
            <v-select
                    v-model="fclass"
                    :items="classOptions"
                    :rules="[v => !!v || 'Item is required']"
                    label="Furniture Class"
                    required
            ></v-select>

            <physical-attr :fclass="fclass"></physical-attr>
          </v-form>
        </v-flex>
      </v-layout>
      <!-- </v-container> -->
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component";

@Component({})
export default class Form extends Vue {}

</script>

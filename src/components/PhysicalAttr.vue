<template>
    <v-container grid-list-xl>
        <v-layout wrap fluid>
            <v-flex xs12 row>
                <v-flex xs5>
                <div>Select a size</div>
                <v-radio-group v-model="size" mandatory>
                    <v-radio
                            v-for="(size, i) in getSizes()"
                            :key="size"
                            :label="size"
                            :value="i + 1"
                    ></v-radio>
                </v-radio-group>
                </v-flex>
            <v-flex xs4 v-if="fclass === 'Bed'">
                <div>Bed Features</div>
                <v-checkbox v-model="hasFrame" label="Comes with bed frame?"></v-checkbox>
                <v-checkbox v-model="hasBoxSpring" label="Comes with box spring?"></v-checkbox>
            </v-flex>
            </v-flex>

        <v-flex xs12 row>
            <v-flex xs5>
            <div>Select a material</div>
            <v-radio-group v-model="material" mandatory>
            <v-radio
                    v-for="mat in materials"
                    :key="mat"
                    :label="mat"
                    :value="mat"
            ></v-radio>
        </v-radio-group>
            </v-flex>

            <v-flex xs3>
                <v-btn
                        flat
                        rounded
                        large
                        color="primary"
                        @click="
                {
                  (showAltMaterial = !showAltMaterial), (altMaterial = '');
                }
              "
                >
                    {{ showAltMaterial ? "-" : " + " }} SECOND MATERIAL
                </v-btn>
            </v-flex>
        </v-flex>

        <v-flex xs4 v-if="showAltMaterial">
            <div>Select another material</div>
            <v-radio-group v-model="altMaterial">
                <v-radio
                        v-for="mat in materials"
                        :key="mat"
                        :label="mat"
                        :value="mat"
                ></v-radio>
            </v-radio-group>
        </v-flex>

        <div v-if="fclass === 'Bed'">

        </div>
        <v-flex xs12>
            <div>Other Physical Attributes</div>
            <v-checkbox v-model="heavy" label="Heavy furniture"></v-checkbox>
        </v-flex>
            <v-flex xs12>
            <div>Item Quality Attributes</div>
            <v-radio-group>
                <v-checkbox
                        v-for="(attr, index) in attributes"
                        :key="attr"
                        :label=attributesDict[attr]
                        :value="attr"
                        @change="updateAttributesDict(attr)"
                ></v-checkbox>
            </v-radio-group>
        </v-flex>

            <v-flex xs8>
                <div>Additional Notes</div>
                <v-textarea
                        outlined
                        v-model="comments"
                        label="Enter any additional notes here."
                ></v-textarea>

            </v-flex>

            <v-flex v-if="fclass === 'Bed'" xs5>
                <v-btn
                    flat
                    color="primary"
                    @click=addItem()
                    > ADD ITEM
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Prop, Component } from "vue-property-decorator";
    import { FClass, Size, Material, AttributesDict } from "@/data/Furniture";
    import * as firebase from "firebase/app";
    import "firebase/firestore";

    type AttrDictModel = { [key: string]: boolean };

    @Component
    export default class PhysicalAttr extends Vue {
        @Prop()
        fclass!: FClass;

        @Prop()
        donorName!: string;

        @Prop()
        phone!: string;

        @Prop()
        email!: string;

        @Prop()
        zone!: string;

        @Prop()
        address!: string;

        materials = Object.keys(Material);

        attributesDict = AttributesDict;
        attributes = Object.keys(AttributesDict);
        attrValuesDict: AttrDictModel = {
            partsIntact: false,
            finishIntact: false,
            smokeFree: false,
            petFree: false,
            bedbugFree: false,
            mildewFree: false,
            donateToFriend: false
        };


        size = -1;
        material = "";
        showAltMaterial = false;
        altMaterial = "";
        hasFrame = false;
        hasBoxSpring = false;
        heavy = false;
        comments = "";

        // These will be set programmatically based on user input
        set = false;
        numChairs = 0;

        getSizes() {
            return Size[this.fclass];
        }

        updateAttributesDict(item: string) {
            item = item.toString();
            this.attrValuesDict[item] = !(this.attrValuesDict[item]);
        }

        db = firebase.firestore();

        addItem() {
            this.db.collection('formTest').add({
                donor: {
                    name: this.donorName,
                    phone: this.phone,
                    email: this.email,
                    zone: this.zone,
                    address: this.address,
                },
                physical: {
                    class: this.fclass,
                    size: this.size,
                    material: this.material,
                    altMaterial: this.altMaterial,
                    hasFrame: this.hasFrame,
                    hasBoxSpring: this.hasBoxSpring,
                    heavy: this.heavy,
                },
                attributes: {
                    partsIntact: this.attrValuesDict['partsIntact'],
                    finishIntact: this.attrValuesDict['finishIntact'],
                    smokeFree: this.attrValuesDict['smokeFree'],
                    petFree: this.attrValuesDict['petFree'],
                    bedbugFree: this.attrValuesDict['bedbugFree'],
                    mildewFree: this.attrValuesDict['mildewFree'],
                    donateToFriend: this.attrValuesDict['donateToFriend']
                },
                staffNotes: "",
                status:0,
                comments:this.comments,
            })
                .then(() => {
                    console.log("successfully added bed to formTest collection");
                })
                .catch(error => {
                    console.log("error");
                });
        }
    }
</script>

<template>
    <v-container>
        <v-layout>
            <p>HELLO I AM HERE AND BED!</p>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component
export default class Bed extends Vue {}
</script>
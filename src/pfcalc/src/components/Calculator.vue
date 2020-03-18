<template>
  <v-container class="grey lighten-5">
    <v-text-field v-model="income" autofocus clearable label="Income" />
    <v-text-field v-model="profit" readonly label="Profit" />
    <v-text-field v-model="ownersPay" readonly label="Owners Pay" />
    <v-text-field v-model="opex" readonly label="OPEX (Operating Expenses)" />
    <v-text-field v-model="tax" readonly label="Tax" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Calculator extends Vue {
  income = 0;

  ownerPayPercentage = 0.25;
  profitPerentage = 0.5;
  opexPercentage = 0.55;
  taxPercentage = 0.15;

  formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });

  get ownersPay(): string {
    return this.formatter.format(
      this.income - this.income * this.ownerPayPercentage
    );
  }

  get profit(): string {
    return this.formatter.format(
      this.income - this.income * this.profitPerentage
    );
  }

  get opex(): string {
    return this.formatter.format(
      this.income - this.income * this.opexPercentage
    );
  }

  get tax(): string {
    return this.formatter.format(
      this.income - this.income * this.taxPercentage
    );
  }
}
</script>

<style>
</style>
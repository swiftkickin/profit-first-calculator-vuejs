<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row>
        <v-col>
          <v-text-field v-model="income" autofocus clearable label="Income" />
        </v-col>
        <v-col>
          <v-btn icon @click="editCategoriesDialog = true">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
          <v-text-field v-for="c in categoriesList" :key="c.index" readonly :label="c.name"></v-text-field>
          <!-- <v-text-field v-model="profit" readonly label="Profit" />
          <v-text-field v-model="ownersPay" readonly label="Owners Pay" />
          <v-text-field v-model="opex" readonly label="OPEX (Operating Expenses)" />
          <v-text-field v-model="tax" readonly label="Tax" />-->
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>What is Profit First?</v-card-title>
            <v-card-text>Insert something about PF here</v-card-text>
          </v-card>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="editCategoriesDialog" persistent>
      <v-card>
        <v-card-title class="headline">Update Categories and Percentages</v-card-title>
        <v-card-text>
          <v-data-table :headers="editCategoriesHeaders" :items="categoriesList">
            <template v-slot:item.name="props">
              <v-edit-dialog :return-value.sync="props.item.name">
                {{ props.item.name }}
                <template v-slot:input>
                  <v-text-field v-model="props.item.name" label="Edit" single-line counter></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
            <template v-slot:item.percentage="props">
              <v-edit-dialog :return-value.sync="props.item.percentage">
                {{ props.item.percentage }}
                <template v-slot:input>
                  <v-text-field v-model="props.item.percentage" label="Edit" single-line counter></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="addCategory">Add Category</v-btn>
          <v-btn color="green darken-1" text @click="editCategoriesDialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="editCategoriesDialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Category, GetDefaultCategories } from "../Category";

@Component
export default class Calculator extends Vue {
  income = 0;

  ownerPayPercentage = 0.25;
  profitPerentage = 0.05;
  opexPercentage = 0.55;
  taxPercentage = 0.15;

  editCategoriesDialog = false;
  editCategoriesHeaders = [
    { text: "Category Name", value: "name" },
    { text: "Percentage", value: "percentage" }
  ];

  categoriesList: Category[] = [];

  formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });

  addCategory(){
    this.categoriesList.push({
      name: "New Category",
      percentage: 0
    })
  }

  created() {
    this.categoriesList = GetDefaultCategories();
  }
}
</script>

<style>
</style>
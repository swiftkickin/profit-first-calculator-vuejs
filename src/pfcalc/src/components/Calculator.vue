<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row>
        <v-col>
          <v-text-field
            v-model="income"
            autofocus
            clearable
            label="Income"
            @change="updateCategories"
            :error="isInvalidIncome"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-for="c in categoriesList"
            :key="c.index"
            readonly
            :label="c.name"
            v-model="c.value"
          ></v-text-field>
          <v-btn icon @click="openEditCategories()">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
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
          <v-data-table :headers="editCategoriesHeaders" :items="editCategoriesList">
            <template v-slot:item.name="props">
              <v-edit-dialog :return-value.sync="props.item.name">
                {{ props.item.name }}
                <template v-slot:input>
                  <v-text-field v-model="props.item.name" label="Edit" single-line></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
            <template v-slot:item.percentage="props">
              <v-edit-dialog :return-value.sync="props.item.percentage">
                {{ props.item.percentage }}
                <template v-slot:input>
                  <v-text-field v-model="props.item.percentage" label="Edit" single-line></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <p>Percentages: {{categoryPercentageTotal}}</p>
          <v-spacer></v-spacer>
          <v-btn text @click="addCategory">Add Category</v-btn>
          <v-btn color="green darken-1" text @click="editCategoriesDialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="saveCategories()" :disabled="disableSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { Category, GetDefaultCategories } from "../Category";
import { saveToLocalStorage, loadFromLocalStorage } from "../Storage";

@Component
export default class Calculator extends Vue {
  income = 0;

  enableSaveToLocalStorage = true;

  editCategoriesDialog = false;
  editCategoriesHeaders = [
    { text: "Category Name", value: "name" },
    { text: "Percentage", value: "percentage" }
  ];

  categoriesList: Category[] = [];
  editCategoriesList: Category[] = [];

  formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });

  openEditCategories() {
    this.editCategoriesList = [...this.categoriesList];
    this.editCategoriesDialog = true;
  }

  addCategory() {
    this.editCategoriesList.push({
      name: "New Category",
      percentage: 0,
      value: 0
    });
  }

  saveCategories() {
    this.categoriesList = [...this.editCategoriesList];
    this.editCategoriesDialog = false;

    if (this.enableSaveToLocalStorage) {
      saveToLocalStorage(this.categoriesList);
    }

    this.updateCategories();
  }

  updateCategories() {
    if (this.income === null) this.income = 0;
    
    const convertedIncome = parseFloat(this.income.toString());
    if (isNaN(convertedIncome)) this.income = 0;
    else this.income = parseFloat(convertedIncome.toFixed(2));

    this.categoriesList.forEach(category => {
      category.value = parseFloat(
        (this.income * category.percentage).toFixed(2)
      );
    });
  }

  // @Watch("categoriesList", {
  //   deep: true
  // })
  // onCategoriesUpdated() {
  // }

  get isInvalidIncome() {
    const convertedIncome = parseFloat(this.income.toString());
    return isNaN(convertedIncome);
  }

  get categoryPercentageTotal() {
    const percentageTotal = this.editCategoriesList.reduce(
      (a, { percentage }) => a + parseFloat(percentage.toString()),
      0
    );

    return (percentageTotal * 100).toFixed(0);
  }

  get disableSave() {
    return this.categoryPercentageTotal !== "100";
  }

  created() {
    if (this.enableSaveToLocalStorage) {
      this.categoriesList = loadFromLocalStorage();
    }

    if (this.categoriesList == null || this.categoriesList.length === 0) {
      this.categoriesList = GetDefaultCategories();
    }
  }
}
</script>

<style>
</style>
import { Category } from './Category';

const LOCAL_STORAGE_KEY = "pfcalc_categories";

export function saveToLocalStorage(categoryList: Category[]) {
    // clean out values
    categoryList.forEach(element => {
        element.value = 0;
    });

    const json = JSON.stringify(categoryList);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, json);
}

export function loadFromLocalStorage(): Category[] {

    const json = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (json) {
        const categoryList: Category[] = JSON.parse(json);
        categoryList.forEach(element => {
            element.value = 0;
        });
        return categoryList;
    }

    return [];
}
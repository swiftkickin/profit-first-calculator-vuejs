export interface Category {
    name: string;
    percentage: number;
    value: number;
}

export function GetDefaultCategories(): Category[] {
    return [
        { name: "Profit", percentage: .05, value: 0 },
        { name: "Owners Pay", percentage: .25, value: 0 },
        { name: "OPEX (Operating Expenses)", percentage: .55, value: 0 },
        { name: "Tax", percentage: .15, value: 0 }
    ];
}
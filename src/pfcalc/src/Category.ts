export interface Category {
    name: string;
    percentage: number;
}

export function GetDefaultCategories(): Category[] {
    return [
        { name: "Profit", percentage: .05 },
        { name: "Owners Pay", percentage: .25 },
        { name: "OPEX (Operating Expenses)", percentage: .55 },
        { name: "Tax", percentage: .15 }
    ];
}
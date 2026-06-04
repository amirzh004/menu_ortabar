export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    weight: string;
    image?: string;
    discountPrice?: number; // цена со скидкой
    calories?: number;      // ккал
    proteins?: number;      // белки, г
    fats?: number;          // жиры, г
    carbs?: number;         // углеводы, г
}

export interface SubCategory {
    id: string;
    name: string;
    items: MenuItem[];
}

export interface MenuCategory {
    id: string;
    name: string;
    subcategories: SubCategory[];
}
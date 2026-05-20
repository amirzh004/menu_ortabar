export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    weight: string;
    image?: string;
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
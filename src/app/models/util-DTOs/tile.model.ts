import { ProfileCategory } from "./enumerations/profile-category.enum";

export interface Tile {
    text: string;
    focus: boolean;
    category: ProfileCategory;
    bgImage: string;
    color: string;
}

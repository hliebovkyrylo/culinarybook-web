import { IUser } from "./user";

export interface IRecipe {
  id             : string;
  ownerId        : string;
  title          : string;
  image          : string;
  coockingTime   : string;
  complexity     : string;
  typeOfFood     : string;
  ingradients    : string;
  isPublic       : boolean;
  applyBackground: boolean;
};

export interface IRecipePreview {
  id          : string;
  owner       : IUser;
  title       : string;
  image       : string;
  coockingTime: string;
  complexity  : string;
  typeOfFood  : string;
}

export interface IStep {
  id             : string;
  recipeId       : string;
  stepNumber     : number;
  stepDescription: string;
}
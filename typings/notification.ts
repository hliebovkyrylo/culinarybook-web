import { IRecipe } from "./recipe";
import { IUser }   from "./user";

export interface INotification {
  id                   : string;
  type                 : string;
  notificationData     : string;
  isRead               : boolean;
  userId               : string;
  notificationCreatorId: string;
  recipeId             : string;
  createdAt            : Date;
  notificationCreator  : IUser;
  recipe               : IRecipe;
};
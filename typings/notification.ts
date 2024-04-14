export interface INotification {
  id                   : string;
  type                 : string;
  notificationData     : string;
  isRead               : boolean;
  userId               : string;
  notificationCreatorId: string;
  recipeId             : string;
  createdAt            : Date;
};
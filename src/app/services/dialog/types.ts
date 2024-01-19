export interface DialogData {
  title: string;
  message: string;
  type: DialogType;
}

export enum DialogType {
  Information,
  Confirm,
  DeleteConfirm,
  UserRoleSelect,
}

export enum DialogActionType {
  Dismiss,
  Confirm,
}

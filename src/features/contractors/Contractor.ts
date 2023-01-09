import { IPersona } from "@fluentui/react";

export interface Contractor extends IPersona {
  key: string;
  imageUrl?: string;
  imageInitials: string;
  text: string;
}

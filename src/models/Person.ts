import { IPersona } from "@fluentui/react";

export interface Person extends IPersona {
  key: string;
  imageUrl?: string;
  imageInitials: string;
  text: string;
}

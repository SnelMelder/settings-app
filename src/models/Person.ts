import { IPersonaProps } from "@fluentui/react";

export class Person implements IPersonaProps {
  public key: string;
  public imageUrl?: string;
  public imageInitials: string;
  public text: string;

  constructor(
    key: string,
    imageInitials: string,
    text: string,
    imageUrl?: string
  ) {
    this.key = key;
    this.imageUrl = imageUrl;
    this.imageInitials = imageInitials;
    this.text = text;
  }
}

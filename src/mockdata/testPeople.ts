import { Person } from "../models/Person";
import { TestImages } from "@fluentui/example-data";

export const testPeople: Person[] = [
  new Person("A", "J", "Jard van Roest", TestImages.personaMale),
  new Person("B", "M", "Maaike van den Einden", TestImages.personaFemale),
  new Person("C", "M", "Marijn van Dijk"),
  new Person("D", "P", "Peter Janssen"),
  new Person("E", "H", "Hans Bos"),
];

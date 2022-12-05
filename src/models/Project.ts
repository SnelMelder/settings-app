import { Person } from "./Person";

export class Project {
  public readonly key: string;
  public name: string;
  public contractors: Person[];

  constructor(key: string, name: string, contractors: Person[]) {
    this.key = key;
    this.name = name;
    this.contractors = contractors;
  }
}

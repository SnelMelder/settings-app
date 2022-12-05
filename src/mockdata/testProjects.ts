import { Project } from "../models/Project";
import { testPeople } from "./testPeople";

export const testProjects: Project[] = [
  new Project("a", "Strijp-TQ", [testPeople[0], testPeople[1]]),
  new Project("b", "R10", [testPeople[2]]),
  new Project("c", "R5", [testPeople[4]]),
];

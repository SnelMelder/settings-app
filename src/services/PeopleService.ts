import axios from "axios";
import { testPeople } from "../mockdata/testPeople";
import { Person } from "../models/Person";

interface PersonReadDto {
  id: string;
  imageInitials: string;
  name: string;
}

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export async function getAllContractors(
  accessToken: string
): Promise<Person[]> {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(`${baseUrl}/users/contractors`, options)
    .then((res) => res.json())
    .then((data) => {
      const personData: PersonReadDto[] = data;

      return personData.map(
        (item) => new Person(item.id, item.imageInitials, item.name)
      );
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

import { ShimmerCircle, Facepile } from "@fluentui/react";
import { Project } from "../projects/Project";
import { useGetContractorsQuery } from "./contractorsSlice";

interface Props {
  project: Project;
}

const ContractorsFacepile = ({ project }: Props) => {
  const { data, isLoading, isSuccess } = useGetContractorsQuery();

  if (isLoading) {
    return <ShimmerCircle />;
  }

  if (isSuccess) {
    const contractors = data.filter((contractor) =>
      project.contractorIDs.includes(contractor.key)
    );

    return <Facepile personas={contractors} />;
  }

  return <p>Unknown error...</p>;
};

export default ContractorsFacepile;

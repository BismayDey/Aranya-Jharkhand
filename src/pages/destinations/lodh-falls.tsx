import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function LodhFallsPage() {
  const dest = destinationsData.find((d) => d.id === "lodh-falls");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}

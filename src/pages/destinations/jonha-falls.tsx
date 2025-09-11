import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function JonhaFallsPage() {
  const dest = destinationsData.find((d) => d.id === "jonha-falls");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}

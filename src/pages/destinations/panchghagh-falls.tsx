import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function PanchghaghFallsPage() {
  const dest = destinationsData.find((d) => d.id === "panchghagh-falls");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}

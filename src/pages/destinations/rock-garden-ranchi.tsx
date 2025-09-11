import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function RockGardenRanchiPage() {
  const dest = destinationsData.find((d) => d.id === "rock-garden-ranchi");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}

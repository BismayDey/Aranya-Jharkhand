import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function CanaryHillHazaribaghPage() {
  const dest = destinationsData.find((d) => d.id === "canary-hill-hazaribagh");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}

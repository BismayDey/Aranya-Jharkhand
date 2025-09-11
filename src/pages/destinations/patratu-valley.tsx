import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function PatratuValleyPage() {
  const dest = destinationsData.find((d) => d.id === "patratu-valley");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}

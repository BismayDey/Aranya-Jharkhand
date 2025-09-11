import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function RajrappaPage() {
  const dest = destinationsData.find((d) => d.id === "rajrappa");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}

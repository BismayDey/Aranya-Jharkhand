import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function KiriburuPage() {
  const dest = destinationsData.find((d) => d.id === "kiriburu");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}

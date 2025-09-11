import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function MaithonDamPage() {
  const dest = destinationsData.find((d) => d.id === "maithon-dam");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}

import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function DalmaWildlifeSanctuaryPage() {
  const dest = destinationsData.find(
    (d) => d.id === "dalma-wildlife-sanctuary"
  );
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}

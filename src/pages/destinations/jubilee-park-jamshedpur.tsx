import DestinationFull from "../../components/DestinationFull";
import destinationsData from "../../data/destinationsData";

export default function JubileeParkPage() {
  const dest = destinationsData.find((d) => d.id === "jubilee-park-jamshedpur");
  if (!dest) return null;
  return <DestinationFull dest={dest} />;
}

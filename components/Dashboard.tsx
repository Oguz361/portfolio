import ThemeCustomizer from "./ThemeCustomizer";
import ConnectCard from "./ConnectCard";
import LocationWidget from "./LocationWidget";
import ClickCounter from "./ClickCounter";

export default function Dashboard() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-ctp-text">Dashboard</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <ThemeCustomizer />
        <div className="flex flex-col gap-4">
          <ConnectCard />
          <LocationWidget />
          <ClickCounter />
        </div>
      </div>
    </section>
  );
}

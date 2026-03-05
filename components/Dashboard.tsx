import ThemeCustomizer from "./ThemeCustomizer";
import ConnectCard from "./ConnectCard";
import LocationWidget from "./LocationWidget";
import CTFWidget from "./CTFWidget";
import GitHubActivity from "./GitHubActivity";
import TypingTest from "./TypingTest";

export default function Dashboard() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        <div className="flex flex-col [&>*]:flex-1">
          <ThemeCustomizer />
        </div>
        <div className="flex flex-col [&>*]:flex-1">
          <ConnectCard />
        </div>
        <div className="flex flex-col [&>*]:flex-1">
          <CTFWidget />
        </div>
        <div className="flex flex-col [&>*]:flex-1">
          <GitHubActivity />
        </div>

        <div className="sm:col-span-2 lg:col-span-1 flex flex-col [&>*]:flex-1">
          <LocationWidget />
        </div>
        <div className="sm:col-span-2 lg:col-span-3 self-start">
          <TypingTest />
        </div>
      </div>
    </section>
  );
}

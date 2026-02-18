import Navigation from "@/components/Navigation";
import CommandPalette from "@/components/CommandPalette";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <header className="flex items-center justify-between pb-12">
        <CommandPalette />
        <Navigation />
      </header>
      <main className="space-y-16">
        <Hero />
        <FeaturedProjects />
        <Dashboard />
      </main>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}

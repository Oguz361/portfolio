import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <div className="space-y-16 pt-20 pb-8">
      <Hero />
      <FeaturedProjects />
      <Dashboard />
    </div>
  );
}

import AppLayout from "../components/AppLayout";
import FeaturedMovie from "../components/FeaturedMovie";
import FeaturedSeries from "../components/FeaturedSeries";
import Header from "../components/Header";
import Hero from "../components/Hero";

function Homepage() {
  return (
    <AppLayout>
      <Header />
      <Hero />
      <FeaturedMovie />
      <FeaturedSeries />
    </AppLayout>
  );
}

export default Homepage;

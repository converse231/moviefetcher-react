import AppLayout from "../components/AppLayout";
import FeaturedMovie from "../components/FeaturedMovie";
import Footer from "../components/Footer";
import GenreMovie from "../components/GenreMovie";
import Header from "../components/Header";
import Hero from "../components/Hero";

function Homepage() {
  return (
    <>
      <Header />
      <Hero />
      <AppLayout>
        <FeaturedMovie />
        <GenreMovie genre={28} genreName="Action" />
        <GenreMovie genre={12} genreName="Adventure" />
        <GenreMovie genre={10749} genreName="Romance" />
        <GenreMovie genre={878} genreName="Sci-Fi" />
        <GenreMovie genre={99} genreName="Documentary" />
        <GenreMovie genre={16} genreName="Animation" />
        <GenreMovie genre={35} genreName="Comedy" />
      </AppLayout>
      <Footer />
    </>
  );
}

export default Homepage;

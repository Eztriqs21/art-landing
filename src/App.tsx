import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Timeline from "./components/Timeline";
import Concept3DSection from "./components/concept/Concept3DSection";
import BWToColorGallery from "./components/BWToColorGallery";
import ModernStrip from "./components/ModernStrip";
import StudioNote from "./components/StudioNote";
import ScrollProgressBar from "./components/layout/ScrollProgressBar";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <main className="bg-bg text-text min-h-screen w-full">
      <ScrollProgressBar />
      <CustomCursor />
      <Hero />
      <Gallery />
      <Timeline />
      <Concept3DSection />
      <BWToColorGallery />
      <ModernStrip />
      <StudioNote />
    </main>
  );
}

export default App;

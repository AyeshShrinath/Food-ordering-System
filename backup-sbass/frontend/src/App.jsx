import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold  mb-8">Welcome!</h1>
      <div className="w-full md:w-2/3 lg:w-1/2">
        <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
          <div>
            <img
              src="https://via.placeholder.com/800x400?text=Slide+1"
              alt="Slide 1"
            />
            <p className="legend">Slide 1</p>
          </div>
          <div>
            <img
              src="https://via.placeholder.com/800x400?text=Slide+2"
              alt="Slide 2"
            />
            <p className="legend">Slide 2</p>
          </div>
          <div>
            <img
              src="https://via.placeholder.com/800x400?text=Slide+3"
              alt="Slide 3"
            />
            <p className="legend">Slide 3</p>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default App;

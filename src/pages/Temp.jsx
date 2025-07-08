import CardSwap, { Card } from "../components/Reactbits/CardSwap";
import Slider from "../components/Slider";

export const Temp = () => {
  return (
    <div className="text-center mt-32 px-4">
      <h1 className="text-2xl font-bold mb-6">This is a temp page.</h1>

      <div
        className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] text-white"
      >
        <CardSwap
          cardDistance={60}
          verticalDistance={70}
          delay={5000}
          pauseOnHover={false}
        >
          <Card>
            <h3 className="text-xl font-semibold mb-2">Card 1</h3>
            <p>Your content here</p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold mb-2">Card 2</h3>
            <p>Your content here</p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold mb-2">Card 3</h3>
            <p>Your content here</p>
          </Card>
        </CardSwap>
      </div>
    </div>
  );
};

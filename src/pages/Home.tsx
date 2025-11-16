import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Apple, Camera, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        {/* Logo/Icon */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <Apple className="w-14 h-14 text-primary" />
          </div>
          <Leaf className="w-8 h-8 text-primary absolute -top-2 -right-2" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground mb-3 text-center">
          PhalFresh
        </h1>
        
        {/* Subtitle */}
        <p className="text-muted-foreground text-center mb-8 text-lg">
          AI Fruit Freshness & Shelf-Life Detection
        </p>

        {/* Main CTA */}
        <Button
          size="lg"
          onClick={() => navigate("/scan")}
          className="w-full max-w-xs h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <Camera className="mr-2 h-5 w-5" />
          Scan Fruit
        </Button>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-4 mt-12 w-full max-w-sm">
          <Card className="p-4 flex flex-col items-center text-center border-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Instant Scan</span>
          </Card>
          
          <Card className="p-4 flex flex-col items-center text-center border-2">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-2">
              <Leaf className="w-6 h-6 text-success" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Freshness Check</span>
          </Card>
          
          <Card className="p-4 flex flex-col items-center text-center border-2">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
              <Apple className="w-6 h-6 text-accent" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Shelf Life</span>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center text-sm text-muted-foreground">
        <p>Powered by AI Technology</p>
      </div>
    </div>
  );
};

export default Home;

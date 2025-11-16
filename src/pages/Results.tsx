import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Apple, Calendar, Info, Scan } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

interface ResultData {
  Fruit: string;
  Freshness: string;
  "Estimated Shelf Life (days)": number;
  "Method Used": string;
}

interface LocationState {
  image: string;
  result: ResultData;
}

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  useEffect(() => {
    // Redirect to home if no data
    if (!state?.result) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state?.result) {
    return null;
  }

  const { image, result } = state;
  const isFresh = result.Freshness.toLowerCase() === "fresh";
  const isRotten = result.Freshness.toLowerCase() === "rotten";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto pb-6">
        {/* Image Header */}
        <div className="relative w-full aspect-square overflow-hidden">
          <img
            src={image}
            alt={result.Fruit}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="px-6 -mt-20 relative z-10 space-y-4">
          {/* Fruit Name Card */}
          <Card className="p-6 border-2 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Apple className="w-6 h-6 text-primary" />
                  <h1 className="text-3xl font-bold text-foreground">
                    {result.Fruit}
                  </h1>
                </div>
              </div>
              {isFresh && (
                <Badge className="bg-success text-success-foreground text-sm px-3 py-1">
                  Fresh
                </Badge>
              )}
              {isRotten && (
                <Badge className="bg-destructive text-destructive-foreground text-sm px-3 py-1">
                  Rotten
                </Badge>
              )}
            </div>

            {/* Shelf Life */}
            <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
              <div className={`p-2 rounded-full ${isRotten ? 'bg-destructive/10' : 'bg-success/10'}`}>
                <Calendar className={`w-5 h-5 ${isRotten ? 'text-destructive' : 'text-success'}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated Shelf Life</p>
                <p className={`text-2xl font-bold ${isRotten ? 'text-destructive' : 'text-foreground'}`}>
                  {result["Estimated Shelf Life (days)"]} {result["Estimated Shelf Life (days)"] === 1 ? 'day' : 'days'}
                </p>
              </div>
            </div>
          </Card>

          {/* Method Info */}
          <Card className="p-4 border-2">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-muted rounded-full">
                <Info className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Analysis Method</p>
                <p className="text-xs text-muted-foreground">{result["Method Used"]}</p>
              </div>
            </div>
          </Card>

          {/* Action Button */}
          <Button
            size="lg"
            onClick={() => navigate("/scan")}
            className="w-full h-14 text-lg font-semibold mt-6"
          >
            <Scan className="mr-2 h-5 w-5" />
            Scan Another Fruit
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/")}
            className="w-full h-14 text-lg font-semibold"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Analysis Error</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        {/* Error Icon */}
        <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-14 h-14 text-destructive" />
        </div>

        {/* Error Message Card */}
        <Card className="p-6 mb-6 w-full border-2 border-destructive/20">
          <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
            Unable to analyze this fruit
          </h2>
          <p className="text-muted-foreground text-center">
            Please try again with a clearer image. Make sure the fruit is well-lit and in focus.
          </p>
        </Card>

        {/* Tips Card */}
        <Card className="p-4 mb-6 w-full bg-muted/50">
          <h3 className="font-semibold text-sm mb-2 text-foreground">Tips for better results:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Ensure good lighting</li>
            <li>• Center the fruit in frame</li>
            <li>• Keep the image focused</li>
            <li>• Avoid shadows and glare</li>
          </ul>
        </Card>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <Button
            size="lg"
            onClick={() => navigate("/scan")}
            className="w-full h-14 text-lg font-semibold"
          >
            <Camera className="mr-2 h-5 w-5" />
            Try Again
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

export default Error;

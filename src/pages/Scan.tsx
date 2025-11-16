import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Scan = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertToBase64 = (dataUrl: string): string => {
    // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
    return dataUrl.split(',')[1];
  };

  const analyzeFruit = async () => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    setIsLoading(true);

    try {
      const base64Image = convertToBase64(selectedImage);
      
      const response = await fetch(
        "https://ishitamonua-phalfresh.hf.space/api/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: [
              {
                path: null,
                url: selectedImage, // Send the full data URL with base64
                size: null,
                orig_name: "fruit.jpg",
                mime_type: "image/jpeg",
                is_stream: false,
                meta: { _type: "gradio.FileData" }
              }
            ]
          }),
        }
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const result = await response.json();
      
      // Navigate to results with the data
      navigate("/results", {
        state: {
          image: selectedImage,
          result: result.data[0],
        },
      });
    } catch (error) {
      console.error("Error analyzing fruit:", error);
      navigate("/error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          disabled={isLoading}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Scan Fruit</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        {/* Image Preview or Upload Area */}
        {selectedImage ? (
          <Card className="w-full aspect-square mb-6 overflow-hidden border-2">
            <img
              src={selectedImage}
              alt="Selected fruit"
              className="w-full h-full object-cover"
            />
          </Card>
        ) : (
          <Card
            className="w-full aspect-square mb-6 flex flex-col items-center justify-center border-2 border-dashed cursor-pointer hover:bg-secondary/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center px-4">
              Tap to upload a photo of your fruit
            </p>
          </Card>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageSelect}
          className="hidden"
        />

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          {selectedImage ? (
            <>
              <Button
                size="lg"
                onClick={analyzeFruit}
                disabled={isLoading}
                className="w-full h-14 text-lg font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing your fruit...
                  </>
                ) : (
                  "Analyze Fruit"
                )}
              </Button>
              
              {!isLoading && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    setSelectedImage(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="w-full h-14 text-lg font-semibold"
                >
                  Choose Different Photo
                </Button>
              )}
            </>
          ) : (
            <Button
              size="lg"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-14 text-lg font-semibold"
            >
              <Camera className="mr-2 h-5 w-5" />
              Take Photo
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scan;

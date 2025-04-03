import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CopyIcon } from "@radix-ui/react-icons";
import { Mosaic } from "react-loading-indicators";
import { Link } from "react-router";
import { DialogDemo } from "~/shortLink/dialog";

const baseUrl = import.meta.env.VITE_BASE_URL;

const urlSchema = z.object({
  originalUrl: z
    .string()
    .url("Please enter a valid URL")
    .startsWith("http", "URL must start with http or https"),
});
export interface PreviewData {
  title: string;
  description: string;
  image: string | null;
}

export function ShortLink() {
  type FormData = z.infer<typeof urlSchema>;
  const [shortUrl, setShortUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [totalClick, setTotalClick] = useState<number>(0);
  const [errorData, setErrorData] = useState("");
  const [preview, setPreview] = useState<PreviewData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(urlSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setTotalClick(0);
    setErrorData("");
    setPreview(null);

    try {
      await axios.post(`${baseUrl}/api/check`, {
        originalUrl: data.originalUrl,
      });
      const preview = await fetchPreview(data.originalUrl);
      setPreview(preview);
      const response = await axios.post(`${baseUrl}/api/shorten`, {
        originalUrl: data.originalUrl,
      });

      // console.log(response.data);

      setShortUrl(response.data.shortUrl);
      setQrCode(response.data.qrCode);
      if (response.data.totalClick !== undefined) {
        setTotalClick(response.data.totalClick);
      } else {
        console.error("clicks not found in response", response.data.totalClick);
      }
    } catch (error: any) {
      // console.error("Error:", error);
      setErrorData("URL not available. Please try another URL");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (shortUrl) {
      try {
        await navigator.clipboard.writeText(shortUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    }
  };
  const fetchPreview = async (url: string): Promise<PreviewData> => {
    try {
      const response = await axios.get(`https://api.microlink.io`, {
        params: { url },
      });
      const data = response.data;
      if (data.status === "success") {
        return {
          title: data.data.title || "No title available",
          description: data.data.description || "No description available",
          image: data.data.image?.url || null,
        };
      }
      throw new Error("Failed to fetch preview");
    } catch (error) {
      return {
        title: "Unable to load preview",
        description: "Could not fetch metadata for this URL.",
        image: null,
      };
    }
  };

  return (
    // <main className="flex items-center justify-center pt-16 pb-4">
    <div className="container mx-auto p-2">
      {/* <div className="flex justify-center items-center text-5xl p-2">
        Short URL
      </div> */}
      <Card className="md:w-[650px] mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl text-center">ShortUrl</CardTitle>
          <CardDescription className="text-center">Paste the URL to be shortened</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex space-x-1.5">
                <div className="flex-1">
                  <Input
                    id="originalUrl"
                    placeholder="Enter the link here.."
                    {...register("originalUrl")}
                  />
                  {errors.originalUrl && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.originalUrl.message}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Shortening..." : "Shorten"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="grid w-full items-center gap-4">
          {preview ? (
            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex gap-4">
                {preview.image && (
                  <img
                    src={preview.image}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                )}
                <div>
                  <p className="text-gray-800 font-medium">{preview.title}</p>
                  <p className="text-gray-500 text-sm">{preview.description}</p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Mosaic
                color="#c5c6d7"
                size="large"
                text="loading..."
                textColor="#253256"
              />
            </div>
          ) : errorData ? (
            <p className="text-red-500 text-sm mt-1">{errorData}</p>
          ) : (
            shortUrl && (
              <div>
                <div className="flex justify-center items-center text-2xl p-2">
                  Your shortened URL
                </div>
                <div className="grid items-center justify-center gap-5">
                  <div className="flex w-sm gap-0.5">
                    <Input
                      id="shortURL"
                      readOnly
                      className="bg-gray-100 cursor-not-allowed"
                      value={shortUrl}
                    />
                    <Button
                      type="button"
                      onClick={handleCopy}
                      variant={isCopied ? "secondary" : "default"}
                    >
                      {isCopied ? (
                        <>
                          <CopyIcon className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="flex gap-2 justify-center text-center border-2 text">
                    <div className="grid">
                      <p>Total URL Click</p>
                      <div className="flex text-7xl justify-center items-start">
                        {totalClick}
                      </div>
                    </div>
                    <div className="grid">
                      <p>OR SCAN HERE</p>
                      {qrCode && <img src={qrCode} alt="QR Code" />}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
          <div className="flex justify-center space-x-2">
            <Link to="/stats">
              <Button>Track clicks from another short URL</Button>
            </Link>
            <DialogDemo />
          </div>
        </CardFooter>
      </Card>
    </div>
    // </main>
  );
}

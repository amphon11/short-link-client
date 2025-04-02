import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import Box from "@mui/material/Box";
import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CopyIcon } from "@radix-ui/react-icons";
import { LinearProgressWithLabel } from "../components/linearProgressWithLabel";

const baseUrl = import.meta.env.VITE_BASE_URL;
const urlSchema = z.object({
  originalUrl: z
    .string()
    .url("Please enter a valid URL")
    .startsWith("http", "URL must start with http or https"),
});

export function ShortLink() {
  type FormData = z.infer<typeof urlSchema>;
  const [shortUrl, setShortUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(10);
  const [isCopied, setIsCopied] = useState(false);
  const [totalClick, setTotalClick] = useState<number>(0);
  const [errorData,setErrorData] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(urlSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setProgress(0); // รีเซ็ต progress
    setTotalClick(0);

    // จำลอง progress
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev)); // เพิ่มทีละ 10 จนถึง 90
    }, 100); // ทุ
    try {
      try {
        const isUrlAvailable = await axios.post(`${baseUrl}/api/check`,{
          originalUrl: data.originalUrl,
        });
        if (isUrlAvailable.data.reachable) {
          // console.log(isUrlAvailable.data.reachable);
        } else {
          console.log(isUrlAvailable.data.error);
        }
        
      } catch (error) {
        setErrorData("URL not available Please try another URL")
      }
     
      const response = await axios.post(`${baseUrl}/api/shorten`, {
        originalUrl: data.originalUrl,
      });
      clearInterval(interval); // หยุดการจำลอง
      if (response.data.totalClick !== undefined) {
        setTotalClick(response.data.totalClick);
      } else {
        console.error("clicks not found in response", response.data.totalClick);
      }
      setProgress(100); // เสร็จสมบูรณ์
      setShortUrl(response.data.shortUrl);
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error("Error:", error);
      clearInterval(interval);
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


  return (
    // <main className="flex items-center justify-center pt-16 pb-4">
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center text-5xl p-5">
        Short URL
      </div>
      <Card className="md:w-[650px] mx-auto">
        <CardHeader>
          <CardTitle>Paste the URL to be shortened</CardTitle>
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
          {isLoading ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgressWithLabel value={progress} />
            </Box>
          ) : (

            errorData ? (
              <p className="text-red-500 text-sm mt-1">{errorData}</p>
            )
            :
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
          {/* <div className="flex justify-center">
            <Button onClick={handleOpen}>Track clicks from another short URL</Button>
            <TrackClicksModal open={open} handleClose={handleClose} />
          </div> */}
        </CardFooter>
      </Card>
    </div>
    // </main>
  );
}

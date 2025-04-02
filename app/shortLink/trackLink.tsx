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
import { LinearProgressWithLabel } from "../components/linearProgressWithLabel";
import Box from "@mui/material/Box";

import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CopyIcon } from "@radix-ui/react-icons";
const baseUrl = import.meta.env.VITE_BASE_URL;

const urlSchema = z.object({
  shortURL: z
    .string()
    .url("Please enter a valid URL") // กำหนดให้ต้องเป็น URL ที่ถูกต้อง
    .refine((val) => val.startsWith("http"), {
      message: "URL must start with http or https",
    }),
});

export function TrackLink() {
  type FormData = z.infer<typeof urlSchema>;
  const [originalUrl, setOriginalUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(10);
  const [totalClick, setTotalClick] = useState<number>(0);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState("");

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
    setError("");
    const urlParts = data.shortURL.trim().split("/");
    const slug = urlParts[urlParts.length - 1]; // เอาส่วนท้ายสุดของ URL (slug)

    // จำลอง progress
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev)); // เพิ่มทีละ 10 จนถึง 90
    }, 100); // ทุ
    try {
      const response = await axios.get(
        `${baseUrl}/api/clicks/${slug}`
      );
      // console.log("response track", response.data);

      clearInterval(interval); // หยุดการจำลอง
      // ตรวจสอบว่า response มีข้อมูล clicks และ originalUrl หรือไม่
      if (
        response.data.clicks === undefined ||
        response.data.originalUrl === undefined
      ) {
        setError("Original URL not found"); // เมื่อไม่พบข้อมูลที่ต้องการ
      } else {
        setTotalClick(response.data.clicks);
        setOriginalUrl(response.data.originalUrl);
      }
      setProgress(100); // เสร็จสมบูรณ์
    } catch (error) {
      // console.error("Error:", error);
      clearInterval(interval);
        setError("Not found originalUrl ,Please try another Url");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (originalUrl) {
      try {
        await navigator.clipboard.writeText(originalUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center text-5xl p-5">
        Track Cliks
      </div>
      <Card className="md:w-[450px] mx-auto">
        <CardHeader>
          <CardTitle>Paste the short URL to be track</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center justify-center gap-4">
              <div className="flex space-x-1.5">
                <div className="flex-1">
                  <Input
                    id="shortURL"
                    placeholder="Enter the link here.."
                    {...register("shortURL")}
                  />
                  {errors.shortURL && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.shortURL.message}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Tracking..." : "Track"}
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
          ) : error ? (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          ) : (
            originalUrl && (
              <div>
                <div className="flex justify-center items-center text-2xl p-2">
                  Your originalUrl URL
                </div>
                <div className="flex flex-col items-center justify-center gap-5 w-full">
                  <div className="flex gap-0.5 w-full">
                    <Input
                      id="shortURL"
                      readOnly
                      className="bg-gray-100 cursor-not-allowed"
                      value={originalUrl}
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
                  </div>
                </div>
              </div>
            )
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

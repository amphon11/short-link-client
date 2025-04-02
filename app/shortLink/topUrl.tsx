import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Card } from "../components/ui/card";

const baseUrl = import.meta.env.VITE_BASE_URL;

type UrlData = {
  id: number;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
  clicks: number;
};

export function TopUrl() {
  const [listUrl, setListUrl] = useState<UrlData[]>([]);

  useEffect(() => {
    const fetchListUrl = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/listUrl");
        setListUrl(response.data.slice(0, 5)); // Limit to top 5
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };
    fetchListUrl();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
            Top 5 Most Clicked Shortened URLs
          </h1>

          {listUrl.length > 0 ? (
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-100 transition-colors">
                  <TableHead className="w-[80px] font-semibold text-gray-700">#</TableHead>
                  <TableHead className="font-semibold text-gray-700">Original URL</TableHead>
                  <TableHead className="font-semibold text-gray-700">Short URL</TableHead>
                  <TableHead className="w-[100px] text-center font-semibold text-gray-700">Clicks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listUrl.map((data, index) => (
                  <TableRow 
                    key={data.id}
                    className="hover:bg-gray-50 transition-colors border-b"
                  >
                    <TableCell className="font-medium text-gray-600">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700">
                        {index + 1}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600 truncate max-w-[300px]" title={data.originalUrl}>
                      <a 
                        href={data.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 hover:underline"
                      >
                        {data.originalUrl}
                      </a>
                    </TableCell>
                    <TableCell className="font-mono text-gray-600">
                      <a 
                        href={`${baseUrl}/${data.shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 hover:underline"
                      >
                        {baseUrl}/{data.shortCode}
                      </a>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center px-2 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                        {data.clicks}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="text-sm text-gray-500 py-3">
                    Showing top {listUrl.length} URLs by click count
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 font-medium">No shortened URL history available</p>
              <p className="text-gray-400 mt-2">Start creating shortened URLs to see them here!</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
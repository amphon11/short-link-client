import axios from "axios";
import { useEffect, useState } from "react";
import {
  ColumnDef,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

// Define the type for your URL data
type UrlData = {
  id: number;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
  clicks: number;
};

// Define the columns for the table
const columns: ColumnDef<UrlData>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
  },
  {
    accessorKey: "originalUrl",
    header: "Original URL",
    cell: ({ row }) => (
      <a href={row.original.originalUrl} target="_blank" rel="noopener noreferrer">
        {row.original.originalUrl}
      </a>
    ),
  },
  {
    accessorKey: "shortCode",
    header: "Short Code",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
    enableSorting: true,
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
    enableSorting: true,
  },
];

export function TopUrl() {
  const [listUrl, setListUrl] = useState<UrlData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    const fetchListUrl = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/listUrl");
        console.log("Urls", response.data);
        setListUrl(response.data); // Assuming the API returns an array of UrlData
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };
    fetchListUrl();
  }, []);

  // Initialize the table
  const table = useReactTable({
    data: listUrl,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // Enable sorting
  });

  return (
    <div className="container">
      <h1>Top URLs</h1>
      <table className="min-w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 text-left border-b cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : header.renderHeader()}
                  {header.column.getIsSorted() === "asc"
                    ? " ↑"
                    : header.column.getIsSorted() === "desc"
                    ? " ↓"
                    : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border-b">
                  {cell.renderCell()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
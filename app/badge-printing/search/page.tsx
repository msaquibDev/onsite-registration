"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Search, Printer, Pencil } from "lucide-react";

interface Attendee {
  id: string;
  name: string;
  category: string;
  city: string;
  mobile: string;
  email: string;
  printed: boolean;
  printedAt?: string;
}

export default function BadgePrintingPage() {
  const { toast } = useToast();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Attendee[]>([]);

  // 🔥 Mock Data
  const mockData: Attendee[] = [
    {
      id: "REG001",
      name: "Sapna Prajapat",
      category: "Speaker",
      city: "Bangalore",
      mobile: "1234567891",
      email: "xyz@gmail.com",
      printed: false,
    },
    {
      id: "REG002",
      name: "Sapna Prajapat",
      category: "Delegate",
      city: "Bangalore",
      mobile: "1234567891",
      email: "xyz@gmail.com",
      printed: true,
      printedAt: "Aug 2, 2025 at 18:47",
    },
  ];

  const handleSearch = () => {
    if (!query.trim()) {
      toast({
        title: "Enter search value",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 700);
  };

  const handlePrint = (id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              printed: true,
              printedAt: new Date().toLocaleString(),
            }
          : item,
      ),
    );

    toast({
      title: "Badge Printed",
    });
  };

  return (
    <PageLayout title="Badge Printing">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 🔍 Search */}
        <div className="flex gap-3">
          <Input
            placeholder="Search registered attendees"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 rounded-full px-5 border-gray-200 focus:border-[#D96F28] focus:ring-[#D96F28] bg-white"
          />
          <Button
            onClick={handleSearch}
            className="bg-[#D96F28] hover:bg-[#C15D20] text-white rounded-full px-6"
          >
            <Search className="w-4 h-4 mr-2" />
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>

        {/* 📊 Table */}
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-[#EBD5C3]">
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>UID / Reg#</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>City / 2nd Line</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date/Time</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    {/* ACTION */}
                    <TableCell className="flex gap-2">
                      {item.printed ? (
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Printer className="w-4 h-4 mr-1" />
                          Printed
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handlePrint(item.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Printer className="w-4 h-4 mr-1" />
                          Print
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </TableCell>

                    {/* DATA */}
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.mobile}</TableCell>
                    <TableCell>{item.email}</TableCell>

                    {/* DATE */}
                    <TableCell>{item.printed ? item.printedAt : "-"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </PageLayout>
  );
}

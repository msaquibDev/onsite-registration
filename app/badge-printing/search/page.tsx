"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 🔍 SEARCH (MATCHED WITH CERTIFICATE PAGE) */}
        <Card className="mb-6">
          <CardContent className="p-4 flex gap-4">
            <Input
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="border-gray-200 focus:border-[#D96F28] focus:ring-[#D96F28] bg-white rounded-lg"
            />

            <Button
              onClick={handleSearch}
              className="bg-[#D96F28] hover:bg-[#C15D20] text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              {loading ? "Searching..." : "Search"}
            </Button>
          </CardContent>
        </Card>

        {/* 📊 TABLE (MATCHED STYLE) */}
        {data.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Results ({data.length})</CardTitle>
            </CardHeader>

            <CardContent>
              <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Action</th>
                    <th className="p-2 border">UID / Reg#</th>
                    <th className="p-2 border">Full Name</th>
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">City</th>
                    <th className="p-2 border">Mobile</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Date/Time</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td className="p-2 border space-x-2">
                        {item.printed ? (
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            <Printer className="w-4 h-4 mr-1" />
                            Printed
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handlePrint(item.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Printer className="w-4 h-4 mr-1" />
                            Print
                          </Button>
                        )}

                        <Button size="sm" variant="outline">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </td>

                      <td className="p-2 border">{item.id}</td>
                      <td className="p-2 border">{item.name}</td>
                      <td className="p-2 border">{item.category}</td>
                      <td className="p-2 border">{item.city}</td>
                      <td className="p-2 border">{item.mobile}</td>
                      <td className="p-2 border">{item.email}</td>

                      <td className="p-2 border">
                        {item.printed ? item.printedAt : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
}

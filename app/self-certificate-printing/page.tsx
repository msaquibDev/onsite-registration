"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Scan, QrCode, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Attendee {
  id: string;
  regNo: string;
  name: string;
  category: string;
  city: string;
  printed: boolean;
  printedAt?: string;
}

export default function SelfCertificatePrintingPage() {
  const { toast } = useToast();

  const [tab, setTab] = useState("scan");
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Attendee[]>([]);

  // ✅ DUMMY DATA
  const dummyData: Attendee[] = [
    {
      id: "1",
      regNo: "REG001",
      name: "Dr. Sharma",
      category: "Delegate",
      city: "Delhi",
      printed: false,
    },
    {
      id: "2",
      regNo: "REG002",
      name: "Dr. Rao",
      category: "Faculty",
      city: "Hyderabad",
      printed: true,
      printedAt: new Date().toISOString(),
    },
  ];

  const handleSearch = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter value",
        variant: "destructive",
      });
      return;
    }

    const filtered = dummyData.filter(
      (d) =>
        d.regNo.toLowerCase().includes(input.toLowerCase()) ||
        d.name.toLowerCase().includes(input.toLowerCase()),
    );

    setResults(filtered);

    if (filtered.length === 0) {
      toast({
        title: "No Result",
        description: "No attendee found",
      });
    }
  };

  const handleScan = () => {
    // simulate scan
    const random = Math.random();
    if (random > 0.5) {
      setResults([dummyData[0]]);
      toast({ title: "Scan Success" });
    } else {
      setResults([]);
      toast({
        title: "Invalid QR",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("en-IN");
  };

  return (
    <PageLayout title="Self Certificate Printing" showSignOut>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ✅ Certificate Preview */}
        <div className="text-center">
          <img
            src="/preview-badge.png"
            alt="Certificate Preview"
            className="mx-auto w-72 border rounded-lg shadow"
          />
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-2 bg-[#FFEADA] p-1 rounded-lg">
            <TabsTrigger
              value="scan"
              className="
        rounded-md
        text-gray-700
        data-[state=active]:bg-[#D96F28]
        data-[state=active]:text-white
        data-[state=active]:shadow-none
        hover:text-[#D96F28]
      "
            >
              Scan your QR Code
            </TabsTrigger>

            <TabsTrigger
              value="search"
              className="
        rounded-md
        text-gray-700
        data-[state=active]:bg-[#D96F28]
        data-[state=active]:text-white
        data-[state=active]:shadow-none
        hover:text-[#D96F28]
      "
            >
              Search Name / Reg No
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* ✅ Scan Tab */}
        {tab === "scan" && (
          <div className="text-center space-y-4 border rounded-lg p-6">
            <QrCode className="mx-auto w-16 h-16" />
            <p className="text-gray-600">Scan your QR Code</p>

            <Button
              onClick={handleScan}
              className="bg-[#D96F28] hover:bg-[#C15D20] text-white"
            >
              <Scan className="w-4 h-4 mr-2" />
              Start Scan
            </Button>
          </div>
        )}

        {/* ✅ Search Tab */}
        {tab === "search" && (
          <div className="flex gap-3">
            <Input
              placeholder="Enter Name or Registration Number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="border-gray-200 focus:border-[#D96F28] focus:ring-[#D96F28] bg-white rounded-lg"
            />
            <Button
              onClick={handleSearch}
              className="bg-[#D96F28] hover:bg-[#C15D20] text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        )}

        {/* ✅ Table */}
        {results.length > 0 && (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-[#EBD5C3]">
                <TableRow>
                  <TableHead>Reg No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Printed At</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {results.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.regNo}</TableCell>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.category}</TableCell>
                    <TableCell>{r.city}</TableCell>

                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          r.printed
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {r.printed ? "Printed" : "Print"}
                      </span>
                    </TableCell>

                    <TableCell>{formatDate(r.printedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

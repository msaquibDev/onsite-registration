//app/scan/single-entry/[type]/ScanClientPage.tsx
"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Scan, QrCode } from "lucide-react";

export default function ScanClientPage({ type }: { type: string }) {
  const { toast } = useToast();

  const [tab, setTab] = useState("hardware");
  const [input, setInput] = useState("");

  const title = type
    .replaceAll("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const handleScan = () => {
    const rand = Math.random();

    if (rand > 0.6) {
      toast({ title: "Scan Successful" });
    } else if (rand > 0.3) {
      toast({
        title: "Already Scanned",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Not Allowed",
        variant: "destructive",
      });
    }

    setInput("");
  };

  return (
    <PageLayout
      title={`Single Scan : ${title} : ${
        tab === "hardware"
          ? "Scan QR via Hardware"
          : tab === "website"
            ? "Scan QR via Website"
            : "Manual Search"
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="hardware">QR via Hardware</TabsTrigger>
            <TabsTrigger value="website">QR via Website</TabsTrigger>
            <TabsTrigger value="manual">Manual Scan</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Hardware */}
        {tab === "hardware" && (
          <Input
            placeholder="Scan registered attendees"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleScan()}
            className=" border-gray-200 focus:border-[#D96F28] focus:ring-[#D96F28] bg-white rounded-lg"
          />
        )}

        {/* Website */}
        {tab === "website" && (
          <div className="text-center p-10 border rounded-lg">
            <QrCode className="mx-auto w-16 h-16 mb-4" />
            <p>Camera scanner here</p>
          </div>
        )}

        {/* Manual */}
        {tab === "manual" && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder="Search attendees"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border-gray-200 focus:border-[#D96F28] focus:ring-[#D96F28] bg-white rounded-lg"
              />
              <Button
                onClick={handleScan}
                className="bg-[#D96F28] hover:bg-[#C15D20] text-white"
              >
                <Scan className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-[#EBD5C3]">
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Unique ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Place</TableHead>
                    <TableHead>Date/Time</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Manual Scan
                      </Button>
                    </TableCell>
                    <TableCell>REG001</TableCell>
                    <TableCell>Sapna</TableCell>
                    <TableCell>Speaker</TableCell>
                    <TableCell>xyz@gmail.com</TableCell>
                    <TableCell>Bangalore</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

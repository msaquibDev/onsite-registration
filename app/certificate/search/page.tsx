"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Award, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";

interface Attendee {
  id: string;
  registration_number: string;
  name: string;
  email: string;
  organization: string;
  designation: string;
  category: string;
  city?: string;
  mobile?: string;
  certificate_printed: boolean;
  printed_at?: string;
  event_id: string;
}

export default function CertificateSearchPage({ type }: { type?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [searching, setSearching] = useState(false);
  const { toast } = useToast();

  const formattedType = (type || "certificate")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // 🔥 DUMMY DATA
  const dummyData: Attendee[] = [
    {
      id: "1",
      registration_number: "DEL001",
      name: "Dr. Sharma",
      email: "sharma@gmail.com",
      organization: "AIIMS",
      designation: "Doctor",
      category: "Delegate",
      city: "Delhi",
      mobile: "9876543210",
      certificate_printed: false,
      printed_at: "",
      event_id: "1",
    },
    {
      id: "2",
      registration_number: "FAC002",
      name: "Dr. Rao",
      email: "rao@gmail.com",
      organization: "Apollo",
      designation: "Faculty",
      category: "Faculty",
      city: "Hyderabad",
      mobile: "9123456780",
      certificate_printed: true,
      printed_at: new Date().toISOString(),
      event_id: "1",
    },
  ];

  // 🔍 SEARCH (Dummy)
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setSearching(true);

    setTimeout(() => {
      const filtered = dummyData.filter(
        (item) =>
          item.registration_number
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.email.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      setAttendees(filtered);

      if (filtered.length === 0) {
        toast({
          title: "No Results",
          description: "No attendees found",
        });
      }

      setSearching(false);
    }, 500); // simulate API delay
  };

  // 🖨 PRINT (Dummy)
  const handlePrintCertificate = (attendee: Attendee) => {
    const now = new Date().toISOString();

    setAttendees((prev) =>
      prev.map((att) =>
        att.id === attendee.id
          ? { ...att, certificate_printed: true, printed_at: now }
          : att,
      ),
    );

    toast({
      title: "Success",
      description: "Certificate printed (dummy)",
    });
  };

  const formatDateTime = (date?: string) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageLayout
        title={`Certificate Printing : ${formattedType}`}
        showBackButton={true}
        backButtonHref="/certificate"
        showSignOut={true}
      >
        <main className="p-6 max-w-7xl mx-auto">
          {/* 🔍 SEARCH */}
          <Card className="mb-6">
            <CardContent className="p-4 flex gap-4">
              <Input
                placeholder="Scan / Enter Reg No / Name / Email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button
                onClick={handleSearch}
                disabled={searching}
                className="bg-[#D96F28] hover:bg-[#C15D20] text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                {searching ? "Searching..." : "Search"}
              </Button>
            </CardContent>
          </Card>

          {/* 📊 TABLE */}
          {attendees.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Results ({attendees.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border">
                    <thead className="bg-gray-100 text-left">
                      <tr>
                        <th className="p-2 border">UID / Reg No</th>
                        <th className="p-2 border">Full Name</th>
                        <th className="p-2 border">Category</th>
                        <th className="p-2 border">City / Org</th>
                        <th className="p-2 border">Mobile</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Printed At</th>
                        <th className="p-2 border text-center">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {attendees.map((att) => (
                        <tr key={att.id} className="hover:bg-gray-50">
                          <td className="p-2 border">
                            {att.registration_number}
                          </td>
                          <td className="p-2 border font-medium">{att.name}</td>
                          <td className="p-2 border">{att.category}</td>
                          <td className="p-2 border">
                            {att.city || "-"} <br />
                            <span className="text-xs text-gray-500">
                              {att.organization}
                            </span>
                          </td>
                          <td className="p-2 border">{att.mobile || "-"}</td>
                          <td className="p-2 border">{att.email}</td>
                          <td className="p-2 border">
                            {formatDateTime(att.printed_at)}
                          </td>

                          <td className="p-2 border text-center space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handlePrintCertificate(att)}
                              className={
                                att.certificate_printed
                                  ? "bg-red-500 hover:bg-red-600"
                                  : "bg-green-600 hover:bg-green-700"
                              }
                            >
                              <Award className="w-4 h-4 mr-1" />
                              {att.certificate_printed ? "Printed" : "Print"}
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                alert("Edit feature implement here")
                              }
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </PageLayout>
    </div>
  );
}

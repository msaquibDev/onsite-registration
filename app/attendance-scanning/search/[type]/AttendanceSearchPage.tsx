"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Award, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

export default function AttendanceSearchPage({ type }: { type: string }) {
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [searching, setSearching] = useState(false);

  const formattedType = (type || "attendance")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // 🔥 Dummy Data
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

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Enter search value",
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
      setSearching(false);
    }, 400);
  };

  const handlePrint = (att: Attendee) => {
    const now = new Date().toISOString();

    setAttendees((prev) =>
      prev.map((x) =>
        x.id === att.id
          ? { ...x, certificate_printed: true, printed_at: now }
          : x,
      ),
    );

    toast({ title: "Printed (Dummy)" });
  };

  const formatDate = (d?: string) => {
    if (!d) return "-";
    return new Date(d).toLocaleString("en-IN");
  };

  return (
    <PageLayout
      title={`Attendance Scanning Kiosk : ${formattedType}`}
      showBackButton
      backButtonHref="/attendance-scanning"
      showSignOut
    >
      <main className="p-6 max-w-7xl mx-auto">
        {/* SEARCH */}
        <Card className="mb-6">
          <CardContent className="p-4 flex gap-4">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} className="bg-[#D96F28] text-white">
              <Search className="w-4 h-4 mr-2" />
              {searching ? "Searching..." : "Search"}
            </Button>
          </CardContent>
        </Card>

        {/* TABLE */}
        {attendees.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Results ({attendees.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">UID</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Printed At</th>
                    <th className="p-2 border">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {attendees.map((att) => (
                    <tr key={att.id}>
                      <td className="p-2 border">{att.registration_number}</td>
                      <td className="p-2 border">{att.name}</td>
                      <td className="p-2 border">{att.category}</td>
                      <td className="p-2 border">
                        {formatDate(att.printed_at)}
                      </td>
                      <td className="p-2 border">
                        <Button
                          size="sm"
                          onClick={() => handlePrint(att)}
                          className={
                            att.certificate_printed
                              ? "bg-red-500"
                              : "bg-green-600"
                          }
                        >
                          <Award className="w-4 h-4 mr-1" />
                          {att.certificate_printed ? "Printed" : "Print"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </main>
    </PageLayout>
  );
}

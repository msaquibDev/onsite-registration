"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Search, Award } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface Attendee {
  id: string;
  registration_number: string;
  name: string;
  email: string;
  organization: string;
  designation: string;
  category: string;
  certificate_printed: boolean;
  event_id: string;
}

export default function CertificateSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const { toast } = useToast();

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
    try {
      const { data, error } = await supabase
        .from("attendees")
        .select("*")
        .or(
          `registration_number.ilike.%${searchQuery}%,name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`
        )
        .order("name");

      if (error) throw error;

      setAttendees(data || []);

      if (data?.length === 0) {
        toast({
          title: "No Results",
          description: "No attendees found matching your search",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to search attendees",
        variant: "destructive",
      });
    } finally {
      setSearching(false);
    }
  };

  const handlePrintCertificate = async (attendee: Attendee) => {
    setLoading(true);
    try {
      const { error: certError } = await supabase.from("certificates").insert({
        attendee_id: attendee.id,
        event_id: attendee.event_id,
        certificate_type: "participation",
        printed: true,
      });

      if (certError) throw certError;

      const { error: updateError } = await supabase
        .from("attendees")
        .update({
          certificate_printed: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", attendee.id);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Certificate printed successfully",
      });

      setAttendees((prev) =>
        prev.map((att) =>
          att.id === attendee.id ? { ...att, certificate_printed: true } : att
        )
      );
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to print certificate",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-blue-950 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5 text-white hover:text-blue-950" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-primary text-white">
              Certificate Printing - Search
            </h1>
            <p className="text-sm text-muted-foreground">
              Search and print certificates
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Attendees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search">
                  Search by Registration Number, Name, or Email
                </Label>
                <Input
                  id="search"
                  placeholder="Enter registration number, name, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="mt-2"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  disabled={searching}
                  className="gap-2"
                >
                  <Search className="w-4 h-4" />
                  {searching ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {attendees.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Search Results ({attendees.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendees.map((attendee) => (
                  <div
                    key={attendee.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">
                          {attendee.name}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                          {attendee.registration_number}
                        </span>
                        {attendee.certificate_printed && (
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            Certificate Printed
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{attendee.email}</p>
                        <p>
                          {attendee.organization} • {attendee.designation}
                        </p>
                        <p>Category: {attendee.category}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handlePrintCertificate(attendee)}
                      disabled={loading || attendee.certificate_printed}
                      className="gap-2"
                    >
                      <Award className="w-4 h-4" />
                      {attendee.certificate_printed
                        ? "Printed"
                        : "Print Certificate"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

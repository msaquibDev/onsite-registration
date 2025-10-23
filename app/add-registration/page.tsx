"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, UserPlus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function AddRegistrationPage() {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    name: "",
    email: "",
    phone: "",
    organization: "",
    designation: "",
    category: "delegate",
  });
  const [loading, setLoading] = useState(false);
  const [eventId, setEventId] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    loadOrCreateEvent();
  }, []);

  const loadOrCreateEvent = async () => {
    try {
      const { data: events, error: fetchError } = await supabase
        .from("events")
        .select("id")
        .eq("status", "active")
        .limit(1)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (events) {
        setEventId(events.id);
      } else {
        const { data: newEvent, error: createError } = await supabase
          .from("events")
          .insert({
            name: "Default Event",
            start_date: new Date().toISOString(),
            end_date: new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            ).toISOString(),
          })
          .select()
          .single();

        if (createError) throw createError;
        setEventId(newEvent.id);
      }
    } catch (error: any) {
      console.error("Error loading event:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.registrationNumber || !formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!eventId) {
      toast({
        title: "Error",
        description: "No active event found",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("attendees").insert({
        event_id: eventId,
        registration_number: formData.registrationNumber,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        designation: formData.designation,
        category: formData.category,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Registration added successfully",
      });

      setFormData({
        registrationNumber: "",
        name: "",
        email: "",
        phone: "",
        organization: "",
        designation: "",
        category: "delegate",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add registration",
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
              Add Registration
            </h1>
            <p className="text-sm text-muted-foreground">
              Register a new attendee
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-6 h-6" />
              New Registration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="regNumber">Registration Number *</Label>
                  <Input
                    id="regNumber"
                    value={formData.registrationNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationNumber: e.target.value,
                      })
                    }
                    placeholder="e.g., REG2024001"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delegate">Delegate</SelectItem>
                      <SelectItem value="speaker">Speaker</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                      <SelectItem value="sponsor">Sponsor</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) =>
                    setFormData({ ...formData, organization: e.target.value })
                  }
                  placeholder="Enter organization name"
                />
              </div>

              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                  placeholder="e.g., Manager, Director, Professor"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 text-base"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                {loading ? "Adding Registration..." : "Add Registration"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

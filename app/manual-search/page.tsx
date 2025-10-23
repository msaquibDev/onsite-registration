"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Search, User, Mail, Building, Briefcase, Tag } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

interface Attendee {
  id: string;
  registration_number: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  category: string;
  badge_printed: boolean;
  certificate_printed: boolean;
  checked_in: boolean;
}

export default function ManualSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [attendees, setAttendees] = useState<Attendee[]>([]);
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
        .from('attendees')
        .select('*')
        .or(
          `registration_number.ilike.%${searchQuery}%,name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%,organization.ilike.%${searchQuery}%`
        )
        .order('name');

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
            <h1 className="text-2xl font-bold text-primary text-white">Manual Search</h1>
            <p className="text-sm text-muted-foreground">Search attendees by any criteria</p>
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
                  Search by Registration Number, Name, Email, Phone, or Organization
                </Label>
                <Input
                  id="search"
                  placeholder="Enter search term..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="mt-2 h-11"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} disabled={searching} className="gap-2 h-11">
                  <Search className="w-4 h-4" />
                  {searching ? 'Searching...' : 'Search'}
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
                    className="p-5 border rounded-lg bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-1">{attendee.name}</h3>
                        <div className="flex gap-2 flex-wrap">
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            {attendee.registration_number}
                          </span>
                          {attendee.checked_in && (
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                              Checked In
                            </span>
                          )}
                          {attendee.badge_printed && (
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                              Badge Printed
                            </span>
                          )}
                          {attendee.certificate_printed && (
                            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                              Certificate Printed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>{attendee.email || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{attendee.phone || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building className="w-4 h-4" />
                        <span>{attendee.organization || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="w-4 h-4" />
                        <span>{attendee.designation || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Tag className="w-4 h-4" />
                        <span>Category: {attendee.category}</span>
                      </div>
                    </div>
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

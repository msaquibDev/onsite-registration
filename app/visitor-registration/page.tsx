"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, UserPlus, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

interface Visitor {
  id: string;
  name: string;
  organization: string;
  purpose: string;
  host_name: string;
  entry_time: string;
  exit_time: string | null;
}

export default function VisitorRegistrationPage() {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [purpose, setPurpose] = useState('');
  const [hostName, setHostName] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentVisitors, setRecentVisitors] = useState<Visitor[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadRecentVisitors();
  }, []);

  const loadRecentVisitors = async () => {
    try {
      const { data, error } = await supabase
        .from('visitors')
        .select('*')
        .order('entry_time', { ascending: false })
        .limit(10);

      if (error) throw error;
      setRecentVisitors(data || []);
    } catch (error: any) {
      console.error('Error loading recent visitors:', error);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !organization || !purpose || !hostName) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('visitors')
        .insert({
          name,
          organization,
          purpose,
          host_name: hostName,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Visitor registered successfully",
      });

      setName('');
      setOrganization('');
      setPurpose('');
      setHostName('');
      loadRecentVisitors();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to register visitor",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async (visitorId: string) => {
    try {
      const { error } = await supabase
        .from('visitors')
        .update({ exit_time: new Date().toISOString() })
        .eq('id', visitorId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Visitor checked out successfully",
      });

      loadRecentVisitors();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to check out visitor",
        variant: "destructive",
      });
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
            <h1 className="text-2xl font-bold text-primary text-white">Visitor Registration & Scanning</h1>
            <p className="text-sm text-muted-foreground">Register and track visitors</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Register Visitor</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter visitor name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="organization">Organization *</Label>
                  <Input
                    id="organization"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Enter organization"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="purpose">Purpose of Visit *</Label>
                  <Textarea
                    id="purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="Enter purpose of visit"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="hostName">Host Name *</Label>
                  <Input
                    id="hostName"
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    placeholder="Enter host name"
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full gap-2">
                  <UserPlus className="w-4 h-4" />
                  {loading ? 'Registering...' : 'Register Visitor'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {recentVisitors.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No visitors yet</p>
                ) : (
                  recentVisitors.map((visitor) => (
                    <div
                      key={visitor.id}
                      className="p-4 border rounded-lg bg-white hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold">{visitor.name}</h3>
                          <p className="text-sm text-muted-foreground">{visitor.organization}</p>
                        </div>
                        {visitor.exit_time ? (
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                            Checked Out
                          </span>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCheckOut(visitor.id)}
                            className="gap-1"
                          >
                            <CheckCircle className="w-3 h-3" />
                            Check Out
                          </Button>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p><strong>Purpose:</strong> {visitor.purpose}</p>
                        <p><strong>Host:</strong> {visitor.host_name}</p>
                        <p><strong>Entry:</strong> {new Date(visitor.entry_time).toLocaleString()}</p>
                        {visitor.exit_time && (
                          <p><strong>Exit:</strong> {new Date(visitor.exit_time).toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

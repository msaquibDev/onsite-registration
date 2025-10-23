"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Scan as ScanIcon, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

interface ScanRecord {
  id: string;
  attendee_id: string;
  scan_type: string;
  scanned_at: string;
  attendee: {
    name: string;
    registration_number: string;
    organization: string;
  };
}

export default function SingleEntryScanPage() {
  const [scanInput, setScanInput] = useState('');
  const [recentScans, setRecentScans] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastScanStatus, setLastScanStatus] = useState<'success' | 'error' | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    loadRecentScans();
  }, []);

  const loadRecentScans = async () => {
    try {
      const { data, error } = await supabase
        .from('scans')
        .select(`
          *,
          attendees (
            name,
            registration_number,
            organization
          )
        `)
        .eq('scan_type', 'single_entry')
        .order('scanned_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      const formattedData = data?.map(scan => ({
        id: scan.id,
        attendee_id: scan.attendee_id,
        scan_type: scan.scan_type,
        scanned_at: scan.scanned_at,
        attendee: {
          name: (scan.attendees as any)?.name || 'Unknown',
          registration_number: (scan.attendees as any)?.registration_number || 'N/A',
          organization: (scan.attendees as any)?.organization || 'N/A',
        }
      })) || [];

      setRecentScans(formattedData);
    } catch (error: any) {
      console.error('Error loading recent scans:', error);
    }
  };

  const handleScan = async () => {
    if (!scanInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter a registration number or scan a badge",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: attendee, error: attendeeError } = await supabase
        .from('attendees')
        .select('id, name, registration_number, organization, event_id, checked_in')
        .eq('registration_number', scanInput.trim())
        .maybeSingle();

      if (attendeeError) throw attendeeError;

      if (!attendee) {
        setLastScanStatus('error');
        toast({
          title: "Not Found",
          description: "No attendee found with this registration number",
          variant: "destructive",
        });
        setScanInput('');
        return;
      }

      if (attendee.checked_in) {
        setLastScanStatus('error');
        toast({
          title: "Already Checked In",
          description: `${attendee.name} has already been checked in`,
          variant: "destructive",
        });
        setScanInput('');
        return;
      }

      const { error: scanError } = await supabase
        .from('scans')
        .insert({
          attendee_id: attendee.id,
          event_id: attendee.event_id,
          scan_type: 'single_entry',
          scanned_by: user?.id || null,
        });

      if (scanError) throw scanError;

      const { error: updateError } = await supabase
        .from('attendees')
        .update({ checked_in: true })
        .eq('id', attendee.id);

      if (updateError) throw updateError;

      setLastScanStatus('success');
      toast({
        title: "Success",
        description: `${attendee.name} checked in successfully`,
      });

      setScanInput('');
      loadRecentScans();
    } catch (error: any) {
      setLastScanStatus('error');
      toast({
        title: "Error",
        description: error.message || "Failed to process scan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setLastScanStatus(null), 3000);
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
            <h1 className="text-2xl font-bold text-primary text-white">Single Entry Scan</h1>
            <p className="text-sm text-muted-foreground">Scan attendee badges for entry</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Scan Badge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="scan">Registration Number</Label>
                <Input
                  id="scan"
                  placeholder="Scan badge or enter registration number..."
                  value={scanInput}
                  onChange={(e) => setScanInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                  className="mt-2 text-lg h-12"
                  autoFocus
                />
              </div>
              <Button
                onClick={handleScan}
                disabled={loading}
                className="w-full gap-2 h-12"
                size="lg"
              >
                <ScanIcon className="w-5 h-5" />
                {loading ? 'Processing...' : 'Check In'}
              </Button>

              {lastScanStatus && (
                <div
                  className={`flex items-center gap-3 p-4 rounded-lg ${
                    lastScanStatus === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {lastScanStatus === 'success' ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <XCircle className="w-6 h-6" />
                  )}
                  <span className="font-semibold">
                    {lastScanStatus === 'success' ? 'Check-in Successful' : 'Check-in Failed'}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentScans.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No recent scans</p>
                ) : (
                  recentScans.map((scan) => (
                    <div
                      key={scan.id}
                      className="p-3 border rounded-lg bg-white hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{scan.attendee.name}</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>{scan.attendee.registration_number}</p>
                        <p>{scan.attendee.organization}</p>
                        <p className="text-xs mt-1">
                          {new Date(scan.scanned_at).toLocaleString()}
                        </p>
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

"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Award } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function SelfCertificatePrintingPage() {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePrint = async () => {
    if (!registrationNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter your registration number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('attendees')
        .select('*')
        .eq('registration_number', registrationNumber.trim())
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        toast({
          title: "Not Found",
          description: "No registration found with this number",
          variant: "destructive",
        });
        return;
      }

      await supabase.from('certificates').insert({
        attendee_id: data.id,
        event_id: data.event_id,
        certificate_type: 'participation',
        printed: true,
      });

      await supabase
        .from('attendees')
        .update({ certificate_printed: true })
        .eq('id', data.id);

      toast({
        title: "Success",
        description: `Certificate for ${data.name} is being printed`,
      });

      setRegistrationNumber('');
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
            <h1 className="text-2xl font-bold text-primary text-white">Self Certificate Printing</h1>
            <p className="text-sm text-muted-foreground">Print your certificate</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6" />
              Print Your Certificate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="regNumber">Registration Number</Label>
              <Input
                id="regNumber"
                placeholder="Enter your registration number"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePrint()}
                className="mt-2 h-12 text-lg"
              />
            </div>
            <Button
              onClick={handlePrint}
              disabled={loading}
              className="w-full h-12 text-base"
            >
              {loading ? 'Printing...' : 'Print Certificate'}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

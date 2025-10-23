"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, IdCard } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function SelfBadgePrintingPage() {
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

      await supabase
        .from('attendees')
        .update({ badge_printed: true })
        .eq('id', data.id);

      toast({
        title: "Success",
        description: `Badge for ${data.name} is being printed`,
      });

      setRegistrationNumber('');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to print badge",
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
            <h1 className="text-2xl font-bold text-primary text-white">Self Badge Printing</h1>
            <p className="text-sm text-muted-foreground">Print your badge</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IdCard className="w-6 h-6" />
              Print Your Badge
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
              {loading ? 'Printing...' : 'Print Badge'}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

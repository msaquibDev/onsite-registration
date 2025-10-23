"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe, Camera } from 'lucide-react';
import Link from 'next/link';

export default function ScanByWebsitePage() {
  const [scanning, setScanning] = useState(false);

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
            <h1 className="text-2xl font-bold text-primary text-white">Scan by Website</h1>
            <p className="text-sm text-muted-foreground">Web-based QR code scanning</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Globe className="w-10 h-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Web-Based Badge Scanning</CardTitle>
            <CardDescription className="text-base">
              Use your device camera to scan attendee badges directly from the browser
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              {scanning ? (
                <div className="text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2 animate-pulse" />
                  <p className="text-gray-600">Camera active - Position QR code in frame</p>
                </div>
              ) : (
                <div className="text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Camera preview will appear here</p>
                </div>
              )}
            </div>

            <Button
              onClick={() => setScanning(!scanning)}
              className="w-full h-12 text-base"
              size="lg"
            >
              {scanning ? 'Stop Scanning' : 'Start Camera Scan'}
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-primary mb-2">Instructions:</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Click the button above to activate your camera</li>
                <li>Position the QR code within the camera frame</li>
                <li>The system will automatically detect and process the badge</li>
                <li>Wait for confirmation before scanning the next badge</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

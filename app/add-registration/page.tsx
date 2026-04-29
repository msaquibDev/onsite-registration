"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export default function AddRegistrationPage() {
  const { toast } = useToast();

  // ✅ TRUE = Allowed (Green) | FALSE = Not Allowed (Red)
  const [scanAllowed, setScanAllowed] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    place: "",
    category: "",
    mobile: "",
    email: "",
    reference: "",
    permissions: [] as string[],
  });

  const options = [
    "Kit Bag",
    "Day 3 Lunch",
    "Day 1 Dinner",
    "Day 1 Lunch",
    "Day 2 Hall",
    "Day 2 Lunch",
    "Day 2 Breakfast",
    "Day 2 Entry Scanning",
    "Day 3 Breakfast",
    "Day 2 Dinner",
    "Day 1 Breakfast",
    "T-Shirt",
  ];

  // 🔥 Toggle Permissions
  const togglePermission = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(item)
        ? prev.permissions.filter((i) => i !== item)
        : [...prev.permissions, item],
    }));
  };

  const handleSubmit = (type: "save" | "print") => {
    if (!formData.name || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description:
        type === "print" ? "Saved & Printing (dummy)" : "Saved successfully",
    });
  };

  return (
    <PageLayout
      title="Add Registration"
      showBackButton
      backButtonHref="/dashboard"
      showSignOut
    >
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* 🔹 FORM */}
        <Card>
          <CardContent className="p-6 space-y-5">
            <div>
              <Label>Full Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border-gray-200 focus:border-[#D96F28] focus:ring-[#D96F28] bg-white rounded-lg"
              />
            </div>

            <div>
              <Label>Place / 2nd Line on Badge</Label>
              <Input
                value={formData.place}
                onChange={(e) =>
                  setFormData({ ...formData, place: e.target.value })
                }
                className="border-gray-200 focus:border-[#D96F28] focus:ring-[#D96F28] bg-white rounded-lg"
              />
            </div>

            <div>
              <Label>Registration / Badge Category *</Label>

              <Select
                value={formData.category}
                onValueChange={(val) =>
                  setFormData({ ...formData, category: val })
                }
              >
                <SelectTrigger className="border-gray-200 focus:border-[#D96F28] focus:ring-0 focus:outline-none bg-white rounded-lg">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="delegate">Delegate</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                  <SelectItem value="speaker">Speaker</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Mobile Number</Label>
                <Input
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  className="border-gray-200 focus:border-[#D96F28] focus:ring-[#D96F28] bg-white rounded-lg"
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border-gray-200 focus:border-[#D96F28] focus:ring-[#D96F28] bg-white rounded-lg"
                />
              </div>
            </div>

            <div>
              <Label>Reference / Note *</Label>
              <Input
                value={formData.reference}
                onChange={(e) =>
                  setFormData({ ...formData, reference: e.target.value })
                }
                className="border-gray-200 focus:border-[#D96F28] focus:ring-[#D96F28] bg-white rounded-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* 🔥 ALLOW / NOT ALLOW (FIXED LOGIC) */}
        <div className="rounded-md p-5 bg-[#FFEADA] border space-y-4">
          <p className="text-sm font-medium">Not Allowed in Single Scanning</p>

          <div className="flex items-center gap-6">
            {/* ❌ NOT ALLOWED */}
            <div
              onClick={() => setScanAllowed(false)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={!scanAllowed}
                className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
              />
              <span className="text-red-600 font-medium">Not Allowed</span>
            </div>

            {/* ✅ ALLOWED */}
            <div
              onClick={() => setScanAllowed(true)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={scanAllowed}
                className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              <span className="text-green-600 font-medium">Allowed</span>
            </div>
          </div>
        </div>

        {/* 🔥 PERMISSIONS WITH DYNAMIC COLOR */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {options.map((item) => {
            const isChecked = formData.permissions.includes(item);

            return (
              <div
                key={item}
                className={`flex items-center gap-2 border rounded-md p-2 cursor-pointer transition ${
                  isChecked
                    ? scanAllowed
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-gray-200"
                }`}
                onClick={() => togglePermission(item)}
              >
                <Checkbox
                  checked={isChecked}
                  className={
                    isChecked
                      ? scanAllowed
                        ? "data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                        : "data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                      : ""
                  }
                />

                <span
                  className={`text-sm ${
                    isChecked
                      ? scanAllowed
                        ? "text-green-700"
                        : "text-red-600"
                      : "text-gray-700"
                  }`}
                >
                  {item}
                </span>
              </div>
            );
          })}
        </div>

        {/* 🔥 BUTTONS */}
        <div className="flex gap-4">
          <Button
            onClick={() => handleSubmit("save")}
            className="flex-1 bg-[#D96F28] hover:bg-[#C15D20]"
          >
            Save & Submit
          </Button>

          <Button
            onClick={() => handleSubmit("print")}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Submit & Print
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}

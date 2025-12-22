"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  onSelectDate?: (date: Date) => void;
}

export function DatePicker({ onSelectDate }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center">
        <Label htmlFor="date" className="px-1 text-center">انتقل إلى يوم</Label>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal text-gray-800"
          >
            {date ? date.toLocaleDateString() : "اختر التاريخ"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            fromYear={1900}                 // الحد الأدنى: سنة 1900
            toYear={currentYear + 10}       // الحد الأعلى: 10 سنوات قادمة
            onSelect={(selectedDate) => {
              setDate(selectedDate ?? undefined);
              if (onSelectDate && selectedDate) onSelectDate(selectedDate);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

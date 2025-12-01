/**
 * Business Hours Configuration
 * 
 * This file contains all settings related to business hours, working days,
 * and availability for the mechanic booking system.
 * 
 * IMPORTANT: All times are in Pacific/Auckland timezone
 * The system automatically handles DST transitions between NZDT (+13:00) and NZST (+12:00)
 */

export const businessConfig = {
    // Timezone (IANA timezone identifier)
    timezone: "Pacific/Auckland",
    // Note: We don't hardcode the offset because it changes with DST
    // NZDT (Daylight): UTC+13:00 (late Sept to early April)
    // NZST (Standard): UTC+12:00 (early April to late Sept)

    // Working Hours (24-hour format)
    workingHours: {
        start: 9,  // 9 AM
        end: 19,   // 7 PM (19:00)
    },

    // Working Days (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    workingDays: [1, 2, 3, 4, 5, 6], // Monday to Saturday

    // Blocked Time Slots
    // Format: { date: "YYYY-MM-DD" | "all", startHour: number, endHour: number, reason: string }
    blockedSlots: [] as Array<{
        date: string; // "YYYY-MM-DD" or "all"
        startHour: number;
        endHour: number;
        reason: string;
    }>,
    // Example blocked slots (uncomment to use):
    // blockedSlots: [
    //   { date: "all", startHour: 12, endHour: 13, reason: "Lunch break" },
    //   { date: "2025-12-25", startHour: 0, endHour: 24, reason: "Christmas Day" },
    // ],

    // Service Durations (in seconds)
    serviceDurations: {
        consultation: 1800,  // 30 minutes
        maintenance: 2700,   // 45 minutes
        repair: 3600,        // 1 hour
    },

    // Default service duration if not specified
    defaultServiceDuration: 3600, // 1 hour

    // Travel time buffer (in seconds) when location data is missing
    defaultTravelBuffer: 900, // 15 minutes

    // Availability settings
    availability: {
        daysAhead: 7,        // Show availability for next 7 days
        slotInterval: 60,    // Check availability every 60 minutes
    },
};

// Helper function to check if a day is a working day
export function isWorkingDay(date: Date): boolean {
    const dayOfWeek = date.getDay();
    return businessConfig.workingDays.includes(dayOfWeek);
}

// Helper function to check if a time slot is blocked
export function isTimeSlotBlocked(date: Date, hour: number): boolean {
    const dateString = date.toISOString().split('T')[0];

    return businessConfig.blockedSlots.some(slot => {
        // Check if slot applies to all days or specific date
        const dateMatches = slot.date === "all" || slot.date === dateString;
        const hourMatches = hour >= slot.startHour && hour < slot.endHour;
        return dateMatches && hourMatches;
    });
}

// Helper function to get service duration
export function getServiceDuration(serviceType: string): number {
    const type = serviceType.toLowerCase() as keyof typeof businessConfig.serviceDurations;
    return businessConfig.serviceDurations[type] || businessConfig.defaultServiceDuration;
}

// Helper function to get current timezone offset (handles DST automatically)
export function getTimezoneOffset(date: Date = new Date()): string {
    // Simple approach: Use Intl to format the date in NZ timezone and extract the offset
    // This works regardless of the server's local timezone
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Create a date at noon to avoid edge cases
    const testDateStr = `${year}-${month}-${day}T12:00:00`;
    const testDate = new Date(testDateStr);

    // Get the date in NZ timezone
    const nzDateStr = testDate.toLocaleString('en-US', {
        timeZone: businessConfig.timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    // Get the same date in UTC
    const utcDateStr = testDate.toLocaleString('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    // Parse both and calculate difference
    const nzTime = new Date(nzDateStr).getTime();
    const utcTime = new Date(utcDateStr).getTime();
    const diffMs = nzTime - utcTime;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    const sign = diffHours >= 0 ? '+' : '-';
    const hours = Math.abs(diffHours).toString().padStart(2, '0');
    const minutes = Math.abs(diffMinutes).toString().padStart(2, '0');

    return `${sign}${hours}:${minutes}`;
}

// Helper function to create a timezone-aware datetime string
// This automatically uses the correct offset for the given date (handles DST)
export function createNZDateTimeString(dateString: string, timeString: string): string {
    // Create a date object for the given date to determine DST
    const [year, month, day] = dateString.split('-').map(Number);
    const [hour, minute] = timeString.split(':').map(Number);

    // Create a Date object in UTC first
    const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));

    // Get what this time would be in NZ timezone
    const nzTimeStr = utcDate.toLocaleString('en-US', {
        timeZone: businessConfig.timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    // Calculate the offset for this specific date
    const offset = getTimezoneOffset(utcDate);

    // Return the datetime string in ISO format with NZ offset
    return `${dateString}T${timeString}:00${offset}`;
}

export default businessConfig;

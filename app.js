// Marathon events data
const marathonEvents = [
    {
        id: 1,
        title: "Mumbai Marathon",
        date: new Date(2025, 0, 19), // January 19, 2025
        time: "5:30 AM",
        location: "Mumbai, Maharashtra",
        distance: "42.2 KM",
        category: "Full Marathon"
    },
    {
        id: 2,
        title: "Delhi Half Marathon",
        date: new Date(2024, 11, 29), // December 29, 2024
        time: "6:00 AM",
        location: "New Delhi",
        distance: "21.1 KM",
        category: "Half Marathon"
    },
    {
        id: 3,
        title: "Bengaluru Marathon",
        date: new Date(2024, 11, 15), // December 15, 2024
        time: "5:00 AM",
        location: "Bengaluru, Karnataka",
        distance: "42.2 KM",
        category: "Full Marathon"
    },
    {
        id: 4,
        title: "Chennai Marathon",
        date: new Date(2025, 1, 16), // February 16, 2025
        time: "5:30 AM",
        location: "Chennai, Tamil Nadu",
        distance: "42.2 KM",
        category: "Full Marathon"
    },
    {
        id: 5,
        title: "Kolkata Marathon",
        date: new Date(2025, 1, 2), // February 2, 2025
        time: "6:00 AM",
        location: "Kolkata, West Bengal",
        distance: "42.2 KM",
        category: "Full Marathon"
    },
    {
        id: 6,
        title: "Hyderabad Marathon",
        date: new Date(2025, 1, 9), // February 9, 2025
        time: "5:00 AM",
        location: "Hyderabad, Telangana",
        distance: "42.2 KM",
        category: "Full Marathon"
    },
    {
        id: 7,
        title: "Pune International Marathon",
        date: new Date(2025, 0, 26), // January 26, 2025
        time: "5:30 AM",
        location: "Pune, Maharashtra",
        distance: "42.2 KM",
        category: "Full Marathon"
    },
    {
        id: 8,
        title: "Ahmedabad Marathon",
        date: new Date(2025, 1, 23), // February 23, 2025
        time: "6:00 AM",
        location: "Ahmedabad, Gujarat",
        distance: "42.2 KM",
        category: "Full Marathon"
    }
];

class MarathonCalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = new Date();
        this.currentMonth = new Date();
        this.dateFns = window.dateFns;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderCalendar();
        this.updateMonthDisplay();
        this.renderSelectedDateEvents();
        this.renderUpcomingEvents();
        this.initializeIcons();
    }

    setupEventListeners() {
        document.getElementById('prev-month').addEventListener('click', () => {
            this.navigateMonth(-1);
        });

        document.getElementById('next-month').addEventListener('click', () => {
            this.navigateMonth(1);
        });
    }

    initializeIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    navigateMonth(direction) {
        this.currentMonth.setMonth(this.currentMonth.getMonth() + direction);
        this.renderCalendar();
        this.updateMonthDisplay();
    }

    updateMonthDisplay() {
        const monthYearElement = document.getElementById('current-month-year');
        if (monthYearElement) {
            monthYearElement.textContent = this.dateFns.format(this.currentMonth, 'MMMM yyyy');
        }
    }

    renderCalendar() {
        const calendarGrid = document.getElementById('calendar-grid');
        if (!calendarGrid) return;

        // Clear existing calendar
        calendarGrid.innerHTML = '';

        // Add day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'text-center py-2 font-semibold text-gray-600 text-sm';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });

        // Get calendar dates
        const startOfMonth = this.dateFns.startOfMonth(this.currentMonth);
        const endOfMonth = this.dateFns.endOfMonth(this.currentMonth);
        const startDate = this.dateFns.startOfWeek(startOfMonth);
        const endDate = this.dateFns.endOfWeek(endOfMonth);

        const days = this.dateFns.eachDayOfInterval({ start: startDate, end: endDate });

        days.forEach(date => {
            const dayElement = this.createDayElement(date);
            calendarGrid.appendChild(dayElement);
        });
    }

    createDayElement(date) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day text-center py-2 cursor-pointer rounded-lg';

        const isCurrentMonth = date.getMonth() === this.currentMonth.getMonth();
        const isToday = this.dateFns.isSameDay(date, this.currentDate);
        const isSelected = this.dateFns.isSameDay(date, this.selectedDate);
        const hasEvents = this.getEventsForDate(date).length > 0;

        let classes = 'w-full h-10 flex items-center justify-center rounded-lg transition-all duration-200';

        if (isSelected) {
            classes += ' bg-blue-500 text-white font-semibold';
        } else if (isToday) {
            classes += ' bg-blue-100 text-blue-800 font-semibold';
        } else if (!isCurrentMonth) {
            classes += ' text-gray-300';
        } else {
            classes += ' text-gray-700 hover:bg-gray-100';
        }

        if (hasEvents && !isSelected) {
            classes += ' ring-2 ring-blue-200';
        }

        dayElement.innerHTML = `
            <div class="${classes}">
                <span>${this.dateFns.format(date, 'd')}</span>
                ${hasEvents ? '<div class="w-1 h-1 bg-blue-500 rounded-full mt-1"></div>' : ''}
            </div>
        `;

        dayElement.addEventListener('click', () => {
            this.selectDate(date);
        });

        return dayElement;
    }

    selectDate(date) {
        this.selectedDate = date;
        this.renderCalendar(); // Re-render to update selection
        this.renderSelectedDateEvents();
    }

    getEventsForDate(date) {
        return marathonEvents.filter(event => 
            this.dateFns.isSameDay(event.date, date)
        );
    }

    getUpcomingEvents() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return marathonEvents
            .filter(event => {
                const eventDate = new Date(event.date);
                eventDate.setHours(0, 0, 0, 0);
                return eventDate >= today;
            })
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .slice(0, 5);
    }

    renderSelectedDateEvents() {
        const container = document.getElementById('selected-date-events');
        if (!container) return;

        const events = this.getEventsForDate(this.selectedDate);
        const dateString = this.dateFns.format(this.selectedDate, 'EEEE, MMMM d, yyyy');

        if (events.length === 0) {
            container.innerHTML = `
                <div class="text-center py-4">
                    <p class="text-gray-500 mb-2">${dateString}</p>
                    <p class="text-gray-400 text-sm">No events scheduled</p>
                </div>
            `;
            return;
        }

        const eventsHTML = events.map(event => `
            <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div class="flex items-start justify-between mb-2">
                    <h4 class="font-semibold text-blue-900">${event.title}</h4>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        ${event.distance}
                    </span>
                </div>
                <div class="space-y-1 text-sm text-gray-600">
                    <div class="flex items-center">
                        <i data-lucide="map-pin" class="w-4 h-4 mr-2"></i>
                        <span>${event.location}</span>
                    </div>
                    <div class="flex items-center">
                        <i data-lucide="clock" class="w-4 h-4 mr-2"></i>
                        <span>${event.time}</span>
                    </div>
                    <div class="flex items-center">
                        <i data-lucide="calendar" class="w-4 h-4 mr-2"></i>
                        <span>${this.dateFns.format(event.date, 'MMM d, yyyy')}</span>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="mb-3">
                <p class="text-gray-600 text-sm">${dateString}</p>
            </div>
            ${eventsHTML}
        `;

        // Re-initialize icons for new elements
        this.initializeIcons();
    }

    renderUpcomingEvents() {
        const container = document.getElementById('upcoming-events');
        if (!container) return;

        const upcomingEvents = this.getUpcomingEvents();

        if (upcomingEvents.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center">No upcoming events</p>';
            return;
        }

        const eventsHTML = upcomingEvents.map(event => `
            <div class="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                 onclick="calendar.selectDate(new Date('${event.date.toISOString()}'))">
                <div class="flex items-start justify-between mb-1">
                    <h4 class="font-medium text-gray-800 text-sm">${event.title}</h4>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        ${event.distance}
                    </span>
                </div>
                <div class="text-xs text-gray-600 space-y-1">
                    <div class="flex items-center">
                        <i data-lucide="map-pin" class="w-3 h-3 mr-1"></i>
                        <span>${event.location}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span>${this.dateFns.format(event.date, 'MMM d, yyyy')}</span>
                        <span>${event.time}</span>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = eventsHTML;

        // Re-initialize icons for new elements
        this.initializeIcons();
    }
}

// Initialize the calendar when the page loads
let calendar;
document.addEventListener('DOMContentLoaded', () => {
    calendar = new MarathonCalendar();
}); 
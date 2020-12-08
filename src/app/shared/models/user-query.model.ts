export interface UserQuery {
    user: User;
}

interface User {
    contributionsCollection: ContributionsCollection;
    login: string;
}

interface ContributionsCollection {
    contributionCalendar: ContributionCalendar;
}

interface ContributionCalendar {
    totalContributions: number;
    weeks: ContributionCalendarWeek[];
}

interface ContributionCalendarWeek {
    contributionDays: ContributionCalendarDay[];
}

interface ContributionCalendarDay {
    contributionCount: number;
    date: string;
}

export interface StudentQuery {
    data: UserQuery;
}

interface UserQuery {
    user: ContributionsCollectionQuery;
    login: string;
}

interface ContributionsCollectionQuery {
    totalContributions: number;
    weeks: WeeksQuery[];
}

interface WeeksQuery {
    contributionDays: contributionDaysQuery[];
}

interface contributionDaysQuery {
    contributionCount: number;
    date: string;
}

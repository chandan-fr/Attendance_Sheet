export type DayDate = {
    day: string;
    date: number | null;
    month: number;
    time: string;
    status: string;
    empty?: boolean;
    isDisabled: boolean;
    isAbsent: string;
    isHoliday?: boolean,
    isLeave?: boolean,
}

export const getMonthToDatesArray = (): DayDate[] => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const startIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const dayDateArray: DayDate[] = [];

    for (let date = new Date(firstDayOfMonth); date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
        const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
        const dayOfMonth = date.getDate();

        dayDateArray.push({ day, date: dayOfMonth, month: month, time: "", status: "", empty: false, isDisabled: false, isAbsent: "", isLeave: false });
    }

    const emptyDayCell = Array.from({ length: startIndex },
        () => { return { day: "", date: null, month: month, time: "", status: "", empty: true, isDisabled: false, isAbsent: "", isLeave: false } }
    );
    const newDayDateArray = [...emptyDayCell, ...dayDateArray]


    return newDayDateArray;
};
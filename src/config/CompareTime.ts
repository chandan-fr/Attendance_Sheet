export const compareTimeWithCurrent = (entryTime: string, idleTime: string): string => {
    if (entryTime >= idleTime) {
        return 'false';
    } else {
        return 'true';
    }
};


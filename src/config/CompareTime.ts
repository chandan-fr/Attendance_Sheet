export const compareTimeWithCurrent = (entryTime: string, idleTime: string): string => {
    if (entryTime <= idleTime) {
        return 'true';
    } else {
        return 'false';
    }
};


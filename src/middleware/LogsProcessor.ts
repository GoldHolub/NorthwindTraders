const environment: string = 'v3-prod';

export const generateLogEntry = (startTime: number) => {
    const timestamp = new Date().toISOString();
    const executionTime = (Date.now() - startTime);
    return `${timestamp}, ${environment}, ${executionTime}ms`;
};
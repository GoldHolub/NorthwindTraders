const environment = 'v3-prod';
export const generateLogEntry = (startTime) => {
    const timestamp = new Date().toISOString();
    const executionTime = (Date.now() - startTime);
    return `${timestamp}, ${environment}, ${executionTime}ms`;
};
//# sourceMappingURL=LogsProcessor.js.map
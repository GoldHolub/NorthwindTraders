import { DefaultLogger } from 'drizzle-orm/logger';
const attachLogger = (req, res, next) => {
    req.logger = new DefaultLogger({
        logQuery: (query, params) => {
            if (!req.sqlLogs) {
                req.sqlLogs = [];
            }
            req.sqlLogs.push({ query, params });
        },
    });
    next();
};
export default attachLogger;
//# sourceMappingURL=customeLoger.js.map
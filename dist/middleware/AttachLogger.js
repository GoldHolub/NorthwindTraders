import { DefaultLogger } from 'drizzle-orm/logger';
const attachLogger = (req, res, next) => {
    req.logger = new DefaultLogger({
        writer: {
            write: (message) => {
                const [query, params] = message.split(' with params: ');
                if (!req.session.sqlLogs) {
                    req.session.sqlLogs = [];
                }
                req.session.sqlLogs.push({
                    query: query,
                    params: params,
                    timestamp: new Date()
                });
            }
        }
    });
    next();
};
export default attachLogger;
//# sourceMappingURL=AttachLogger.js.map
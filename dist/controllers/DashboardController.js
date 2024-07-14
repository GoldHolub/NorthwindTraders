import { IpLocationService } from "../services/LocationService.js";
export class DashboardController {
    async getLocation(req, res) {
        try {
            //const ipAddress: string = req.query.ip;
            const ipAddressList = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const ipAddress = Array.isArray(ipAddressList) ? ipAddressList[0] : ipAddressList.split(',')[0].trim();
            console.log(ipAddress);
            const ipLocationService = new IpLocationService();
            const country = await ipLocationService.findLocationByIp(ipAddress);
            res.status(200).send({
                location: country
            });
        }
        catch (error) {
            let statusCode = 500;
            if (`${error}`.includes('Invalid IP address')) {
                statusCode = 400;
            }
            res.status(statusCode).json({ error: `${error}` });
        }
    }
    async saveIpLocationsToDb(req, res) {
        try {
            if (!req.file) {
                return res.status(400).send({ error: 'No file uploaded' });
            }
            const ipType = req.query.ipType;
            const filePath = req.file.path;
            const ipLocationService = new IpLocationService();
            const result = await ipLocationService.loadLocationDataToDb(filePath, ipType);
            res.status(200).send({ message: result });
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    }
    async deleteIpLocationsTable(req, res) {
        try {
            const ipLocationService = new IpLocationService();
            const result = await ipLocationService.deleteIpLocationsTable();
            res.status(200).send({ message: result });
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    }
    async getLogs(req, res) {
        res.status(200).send({
            sqlLogs: req.session.sqlLogs
        });
    }
}
;
//# sourceMappingURL=DashboardController.js.map
import { IpLocationService } from "../services/LocationService.js";
export class DashboardController {
    async getLocation(req: any, res: any) {
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
        } catch (error: any) {
            let statusCode = 500;

            if (`${error}`.includes('Invalid IP address')) {
                statusCode = 400;
            }

            res.status(statusCode).json({ error: `${error}` });
        }
    }

    async saveIpLocationsToDb(req: any, res: any) {
        try {
            if (!req.file) {
                return res.status(400).send({ error: 'No file uploaded' });
            }
            const ipType = req.query.ipType;
            const filePath = req.file.path;
            const ipLocationService = new IpLocationService();
            const result = await ipLocationService.loadLocationDataToDb(filePath, ipType);
            res.status(200).send({ message: result });
        } catch (error: any) {
            res.status(500).json({ error: error });
        }
    }

    async deleteIpLocationsTable(req: any, res: any) {
        try {
            const ipLocationService = new IpLocationService();
            const result = await ipLocationService.deleteIpLocationsTable();
            res.status(200).send({ message: result });
        } catch (error: any) {
            res.status(500).json({ error: error });
        }
    }

    async getLogs(req: any, res: any) {
        res.status(200).send({
            sqlLogs: req.session.sqlLogs
        });
    }
};

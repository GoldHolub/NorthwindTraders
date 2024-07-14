import { CsvIpParser } from "../middleware/CsvIpParser.js";
import { IpRepository } from "../repositories/IpRepository.js";
import fs from 'fs';
import csv from 'csv-parser';
import { IPv4Table, IPv6Table } from "../drizzle/schema.js";
import { db } from "../drizzle/db.js";
import { sql } from "drizzle-orm";

const BATCH_SIZE = 10000;
const FROM_IP_INDEX = 0;
const TO_IP_INDEX = 1;
const COUNTRY_CODE_INDEX = 2;
const COUNTRY_INDEX = 3;

class IpLocationService {
    private ipData: string[] | null = null;
    public csvIpParser = new CsvIpParser();
    public ipRepository = new IpRepository();
    async findLocationByIp(ipAddress: string) {
        if (!this.validateIpAddress(ipAddress)) {
            throw new Error(`Invalid IP address: ${ipAddress}`);
        }
        try {
            const isIPv4 = ipAddress.length < 16;
            const digitIpAddress = this.csvIpParser.ipToDecimal(ipAddress).toString();
            const country = await this.ipRepository.findLocationByIp(digitIpAddress, isIPv4);

            return country ? country : `Can't find country by IP: ${ipAddress}`;
        } catch (error) {
            throw new Error(`Error fetching data from database`);
        }
    }

    async loadLocationDataToDb(filePath: string, ipType: string) {
        const results: any[] = [];
        const ipTable = ipType === 'IPv4' ? IPv4Table : IPv6Table;
        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv({ headers: false }))
                .on('data', (row) => results.push({
                    fromIp: row[FROM_IP_INDEX],
                    toIp: row[TO_IP_INDEX],
                    countryCode: row[COUNTRY_CODE_INDEX],
                    countryName: row[COUNTRY_INDEX]
                }))
                .on('end', async () => {
                    console.log(`File: ${filePath} successfully processed!`);

                    await this.batchInsert(db, ipTable, results);

                    fs.unlinkSync(filePath);
                    resolve(`Data loaded into ${ipType} table`);
                })
                .on('error', (error) => {
                    fs.unlinkSync(filePath);
                    console.error(error);
                    reject(error);
                });
        });
    }

    async deleteIpLocationsTable() {
        try {
            await db.execute(sql`DELETE FROM public.ipv4_data`);
            await db.execute(sql`DELETE FROM public.ipv6_data`);
        } catch (err) {

        }
    }

    private validateIpAddress(ipAddress: string): boolean {
        const ipv4Regex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
        const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)$/;
        return ipv4Regex.test(ipAddress) || ipv6Regex.test(ipAddress);
    };

    private async batchInsert(db: any, table: any, data: any) {
        for (let i = 0; i < data.length; i += BATCH_SIZE) {
            const batch = data.slice(i, i + BATCH_SIZE);
            await db.insert(table).values(batch).execute();
        }
    };
}
export { IpLocationService };

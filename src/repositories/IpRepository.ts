import { IPv4Table, IPv6Table } from "../drizzle/schema.js";
import { sql } from "drizzle-orm/sql";
import { db } from "../drizzle/db.js";

export class IpRepository {
    async findLocationByIp(digitIpAddress: string, isIPv4: boolean): Promise<string | null> {
        try {
            const ipTable = isIPv4 ? IPv4Table : IPv6Table;
            const queryResult = isIPv4
                ? await db.select({ country_code: ipTable.countryCode })
                    .from(ipTable)
                    .where(sql`CAST(from_ip AS bigint) <= ${digitIpAddress} AND CAST(to_ip AS bigint) >= ${digitIpAddress}`).limit(1)
                : await db.select({ country_code: ipTable.countryCode })
                    .from(ipTable)
                    .where(sql`from_ip <= ${digitIpAddress} AND to_ip >= ${digitIpAddress}`).limit(1);

            return queryResult.length > 0 ? queryResult[0].country_code : null;
        } catch (error) {
            throw new Error(`Invalid IP address: ${digitIpAddress}`)
        }
    }

    async batchInsert(table: any, data: any[]): Promise<void> {
        const BATCH_SIZE = 1000;
        for (let i = 0; i < data.length; i += BATCH_SIZE) {
            const batch = data.slice(i, i + BATCH_SIZE);
            await db.insert(table).values(batch).execute();
        }
    }
}
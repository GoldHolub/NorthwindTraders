import fs from 'fs';
import csv from 'csv-parser';
const BINARY_INDEX = 2;
const NUM_OF_BITS = 8;
class CsvIpParser {
    async parseIpInfoFromCsv(fileAddress) {
        let ipData = [];
        try {
            await new Promise((resolve, rejects) => {
                fs.createReadStream(fileAddress)
                    .pipe(csv({ headers: false }))
                    .on('data', (row) => {
                    ipData.push(row);
                })
                    .on('end', () => {
                    console.log(`File: ${fileAddress} successfully processed!`);
                    resolve(ipData);
                })
                    .on('error', (error) => {
                    console.error(error);
                    rejects(error);
                });
            });
        }
        catch (error) {
            console.error(`Can't read file: ${fileAddress}`, error);
            throw error;
        }
        return ipData;
    }
    ipToDecimal(ipAddress) {
        if (this.isIPv6(ipAddress)) {
            return BigInt('0x' + ipAddress.split(':').map(this.padIPv6Block).join(''));
        }
        const ipOctets = ipAddress.split('.');
        return ipOctets.reduce((acc, octet) => {
            const parsedOctet = parseInt(octet, 10);
            if (isNaN(parsedOctet) || parsedOctet < 0 || parsedOctet > 255) {
                throw new Error('Invalid IPv4 address octet');
            }
            return (acc << 8n) + BigInt(parsedOctet);
        }, 0n);
    }
    decimalToIp(decimalIp) {
        const decimalValue = BigInt(decimalIp);
        if (decimalValue > 0xffffffffn) {
            const hexString = decimalValue.toString(16).padStart(32, '0');
            return Array.from({ length: 8 }, (_, i) => hexString.slice(i * 4, i * 4 + 4)).join(':');
        }
        return Array.from({ length: 4 }, (_, i) => (decimalValue >> BigInt(24 - 8 * i) & 0xffn).toString()).join('.');
    }
    isIPv6(ipAddress) {
        return ipAddress.includes(':');
    }
    padIPv6Block(block) {
        return block.padStart(4, '0');
    }
}
export { CsvIpParser };
//# sourceMappingURL=CsvIpParser.js.map
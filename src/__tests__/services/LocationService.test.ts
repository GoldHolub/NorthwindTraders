import { IpLocationService } from '../../services/LocationService.js';
import { CsvIpParser } from '../../middleware/CsvIpParser.js';
import { IpRepository } from '../../repositories/IpRepository.js';

describe('IpLocationService', () => {
  let ipLocationService: IpLocationService;
  let ipRepository: IpRepository;
  let csvIpParser: CsvIpParser;

  beforeEach(() => {
    ipRepository = new IpRepository();
    csvIpParser = new CsvIpParser();
    ipLocationService = new IpLocationService();
    ipLocationService.ipRepository = ipRepository;
    ipLocationService.csvIpParser = csvIpParser;
  });

  describe('findLocationByIp', () => {
    test('should return country name for valid IPv4 address', async () => {
      const ipAddress = '8.8.8.8';
      const expectedCountry = 'US';
      jest.spyOn(ipRepository, 'findLocationByIp').mockResolvedValue(expectedCountry);

      const result = await ipLocationService.findLocationByIp(ipAddress);

      expect(result).toBe(expectedCountry);
    });

    test('should return country name for valid IPv6 address', async () => {
      const ipAddress = '2001:0db8:85a3:0000:0000:8a2e:0370:7334';
      const expectedCountry = 'US';
      jest.spyOn(ipRepository, 'findLocationByIp').mockResolvedValue(expectedCountry);

      const result = await ipLocationService.findLocationByIp(ipAddress);

      expect(result).toBe(expectedCountry);
    });

    test('should return error message for invalid IP address', async () => {
      const ipAddress = 'invalid_ip';
      await expect(ipLocationService.findLocationByIp(ipAddress))
        .rejects.toThrow(new Error(`Invalid IP address: ${ipAddress}`));
    });

    test('should return error message when country is not found', async () => {
      const ipAddress = '192.168.0.1';
      jest.spyOn(ipRepository, 'findLocationByIp').mockResolvedValue(null);

      const result = await ipLocationService.findLocationByIp(ipAddress);

      expect(result).toContain('Can\'t find country by IP');
    });

    test('should return error message when ipRepository throws an error', async () => {
      const ipAddress = '192.168.288.1';
      const errorMessage = 'Error fetching data from database';
      await expect(ipLocationService.findLocationByIp(ipAddress)).rejects.toThrow(
        new Error('Error fetching data from database')
      );

    });
  });
});

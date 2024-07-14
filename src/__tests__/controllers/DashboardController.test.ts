import request from 'supertest';
import express from 'express';
import { DashboardController } from '../../controllers/DashboardController.js';
import { IpLocationService } from '../../services/LocationService.js';
import { sqlLogs } from '../../models/SqlLogs.js';
jest.mock('../../services/LocationService.js');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    req.session = {
        id: 'mock-session-id',
        cookie: {
            originalMaxAge: 200,
            maxAge: 200,
            expires: new Date(Date.now() + 200),
            secure: false,
            httpOnly: true,
            domain: undefined,
            path: '/',
            sameSite: 'lax',
            // @ts-ignore
            resetMaxAge: jest.fn(),
            resetExpires: jest.fn(),
        },
        regenerate: jest.fn(),
        destroy: jest.fn(),
        reload: jest.fn(),
        save: jest.fn(),
        touch: jest.fn(),
        sqlLogs: [],
    };
    next();
});

const dashboardController = new DashboardController();

app.get('/location', (req, res) => dashboardController.getLocation(req, res));
app.get('/logs', (req, res) => dashboardController.getLogs(req, res));

describe('DashboardController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getLocation', () => {
        it('should return location when IP address is valid', async () => {
            const mockLocation = 'United States';
            (IpLocationService.prototype.findLocationByIp as jest.Mock).mockResolvedValue(mockLocation);

            const response = await request(app).get('/location').set('x-forwarded-for', '8.8.8.8');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ location: mockLocation });
            expect(IpLocationService.prototype.findLocationByIp).toHaveBeenCalledWith('8.8.8.8');
        });

        it('should return 400 when IP address is invalid', async () => {
            (IpLocationService.prototype.findLocationByIp as jest.Mock)
                .mockRejectedValue(new Error(`Invalid IP address: 999.999.999.999`));

            const response = await request(app).get('/location').set('x-forwarded-for', '999.999.999.999');

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Error: Invalid IP address: 999.999.999.999' });
        });

        it('should return 500 when there is an error', async () => {
            (IpLocationService.prototype.findLocationByIp as jest.Mock)
                .mockRejectedValue(new Error(`Error fetching data from database`));

            const response = await request(app).get('/location').set('x-forwarded-for', '8.8.8.8');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error: Error fetching data from database' });
        });
    });
});

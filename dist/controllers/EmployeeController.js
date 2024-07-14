import { EmployeeService } from "../services/EmployeeService.js";
export class EmployeeController {
    async getEmployeeById(req, res) {
        const employeeId = req.params.id;
        try {
            const employeeService = new EmployeeService();
            const employee = await employeeService.getEmployeeById(employeeId, req.session);
            res.status(200).send(employee);
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ error: `${error}` });
        }
    }
    async searchEmployees(req, res) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 20;
        try {
            const employeeService = new EmployeeService();
            const { employeeDTOs, total } = await employeeService.searchEmployees(page, pageSize, req.session);
            res.status(200).send({
                data: employeeDTOs,
                total: total[0].count,
                page,
                pageSize,
                pageCount: Math.ceil(total[0].count / pageSize),
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ error: `${error}` });
        }
    }
    async createEmployees(req, res) {
        if (!req.file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }
        try {
            const employeeService = new EmployeeService();
            const filePath = req.file.path;
            const response = await employeeService.createEmployees(filePath);
            res.status(200).send(response);
        }
        catch (error) {
            res.status(500).send({ error: 'Error while creating employees' });
        }
    }
}
//# sourceMappingURL=EmployeeController.js.map
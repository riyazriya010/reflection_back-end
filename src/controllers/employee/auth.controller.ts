import { Request, Response } from "express";
import EmployeeAuthServices, { employeeAuthServices } from "../../services/employee/auth.services";

export default class EmployeeAuthController {
    private employeeAuthServices: EmployeeAuthServices;

    constructor(employeeAuthServices: EmployeeAuthServices) {
        this.employeeAuthServices = employeeAuthServices
    }

    async employeeSignUp(req: Request, res: Response): Promise<any> {
        try {
            const data = req.body
            const savedEmployee = await this.employeeAuthServices.employeeSignup(data)
            return res.status(201).send({ message: "Employee Saved to DB", success: true, result: savedEmployee })
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === 'EmployeeAlreadyExist') {
                    res.status(409).send({ message: "Employee Already Exist", success: false })
                    return
                }
            }
        }
    }

    async employeeLogin(req: Request, res: Response): Promise<any> {
        try {
            const data = req.body
            const login = await this.employeeAuthServices.employeeLogin(data)
            return res.status(200).send({ message: "Employee Found", success: true, result: login })
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === "InvalidCredentials") {
                    return res.status(401).send({ message: "Invalid Credentials", success: false })
                }
            }
        }
    }
}

export const employeeAuthController = new EmployeeAuthController(employeeAuthServices)


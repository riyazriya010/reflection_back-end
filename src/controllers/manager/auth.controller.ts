import { Request, Response } from "express";
import ManagerAuthServices, { managerAuthServices } from "../../services/manager/auth.services";

export default class ManagerAuthController {
    private managerAuthServices: ManagerAuthServices;

    constructor(managerAuthServices: ManagerAuthServices) {
        this.managerAuthServices = managerAuthServices
    }

    async managerSignUp(req: Request, res: Response): Promise<any> {
        try {
            const data = req.body
            const savedEmployee = await this.managerAuthServices.managerSignup(data)
            return res.status(201).send({ message: "Manager Saved to DB", success: true, result: savedEmployee })
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === 'MaangerAlreadyExist') {
                    res.status(409).send({ message: "Manager Already Exist", success: false })
                    return
                }
            }
        }
    }

    async managerLogin(req: Request, res: Response): Promise<any> {
        try {
            const data = req.body
            const login = await this.managerAuthServices.managerLogin(data)
            return res.status(200).send({ message: "Manager Found", success: true, result: login })
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === "InvalidCredentials") {
                    return res.status(401).send({ message: "Invalid Credentials", success: false })
                }
            }
        }
    }
}

export const managerAuthController = new ManagerAuthController(managerAuthServices)


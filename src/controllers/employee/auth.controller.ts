import { Request, Response } from "express";
import EmployeeAuthServices, { employeeAuthServices } from "../../services/employee/auth.services";
import { JwtService } from "../../integrations/jwt";
import getId from "../../integrations/getId";

export default class EmployeeAuthController {
    private employeeAuthServices: EmployeeAuthServices;
    private jwtService: JwtService

    constructor(employeeAuthServices: EmployeeAuthServices) {
        this.employeeAuthServices = employeeAuthServices
        this.jwtService = new JwtService()
    }

    async employeeSignUp(req: Request, res: Response): Promise<any> {
        try {
            const data = req.body
            const savedEmployee = await this.employeeAuthServices.employeeSignup(data)

            const accessToken = await this.jwtService.createToken(savedEmployee?._id, String(savedEmployee?.role))
            const refreshToken = await this.jwtService.createRefreshToken(savedEmployee?._id, String(savedEmployee?.role))

            return res
                .status(200)
                .cookie('accessToken', accessToken, {
                    httpOnly: false,
                    secure: true,
                    sameSite: "none",
                }).cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                })
                .send({
                    success: true,
                    message: 'Employee Added to DB Successfully',
                    result: savedEmployee
                })

            // return res.status(201).send({ message: "Employee Saved to DB", success: true, result: savedEmployee })
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

            const accessToken = await this.jwtService.createToken(login?._id, String(login?.role))
            const refreshToken = await this.jwtService.createRefreshToken(login?._id, String(login?.role))

            return res
                .status(200)
                .cookie('accessToken', accessToken, {
                    httpOnly: false,
                    secure: true,
                    sameSite: "none",
                }).cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                })
                .send({
                    success: true,
                    message: 'Employee Logged Successfully',
                    result: login
                })

        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === "InvalidCredentials") {
                    return res.status(401).send({ message: "Invalid Credentials", success: false })
                }
            }
        }
    }

    async getEmployee(req: Request, res: Response): Promise<any> {
        try {
            //Current Logged Employee Id that Dont we need to get
            const employeeId = await getId('accessToken', req) as string
            const getEmployees = await this.employeeAuthServices.getEmployees(employeeId)
            return res.status(200).send({ message: "All Employees Got", success: true, result: getEmployees })
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === "NotEmployeesFound") {
                    return res.status(404).send({ message: "Not Employees Found", success: false })
                }
            }
        }
    }

    async employeeLogout(req: Request, res: Response): Promise<any> {
        try {

            return res
                .status(200)
                .clearCookie("accessToken", {
                    httpOnly: false,
                    secure: true,
                    sameSite: "none",
                })
                .clearCookie("refreshToken", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                })
                .send({ success: true, message: "Logged out successfully" });

        } catch (error: unknown) {
            console.log('logout error: ', error)
            return
        }
    }


}

export const employeeAuthController = new EmployeeAuthController(employeeAuthServices)


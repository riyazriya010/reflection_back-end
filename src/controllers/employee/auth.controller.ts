import { Request, Response } from "express";
import EmployeeAuthServices, { employeeAuthServices } from "../../services/employee/auth.services";
import { JwtService } from "../../integrations/jwt";
import getId from "../../integrations/getId";
import { sendAuthResponse, sendDataResponse, sendErrorResponse } from "../../utils/responseHelpers";
import { HttptatusCode } from "../../utils/httpStatusCodes";

export default class EmployeeAuthController {
    private employeeAuthServices: EmployeeAuthServices;
    private jwtService: JwtService

    constructor(employeeAuthServices: EmployeeAuthServices) {
        this.employeeAuthServices = employeeAuthServices
        this.jwtService = new JwtService()
    }

    async employeeSignUp(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const savedEmployee = await this.employeeAuthServices.employeeSignup(data)

            const accessToken = await this.jwtService.createToken(savedEmployee?._id, String(savedEmployee?.role))
            const refreshToken = await this.jwtService.createRefreshToken(savedEmployee?._id, String(savedEmployee?.role))

            sendAuthResponse(
                res,
                String(accessToken),
                String(refreshToken),
                "Employee Added to DB Successfully",
                HttptatusCode.CREATED,
                savedEmployee
            )
            return

        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === 'EmployeeAlreadyExist') {
                    sendErrorResponse(res, HttptatusCode.CONFLICT, "Employee Already Exist")
                    return
                }
            }
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return
        }
    }

    async employeeLogin(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const login = await this.employeeAuthServices.employeeLogin(data)

            const accessToken = await this.jwtService.createToken(login?._id, String(login?.role))
            const refreshToken = await this.jwtService.createRefreshToken(login?._id, String(login?.role))

            sendAuthResponse(
                res,
                String(accessToken),
                String(refreshToken),
                "Employee Logged Successfully",
                HttptatusCode.OK,
                login
            )
            return

        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === "InvalidCredentials") {
                    sendErrorResponse(res, HttptatusCode.UNAUTHORIZED, "Invalid Credentials")
                    return
                }
            }
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return
        }
    }

    async getEmployee(req: Request, res: Response): Promise<any> {
        try {
            const employeeId = await getId('accessToken', req) as string
            const getEmployees = await this.employeeAuthServices.getEmployees(employeeId)
            sendDataResponse(res, 'All Employees Got', getEmployees, HttptatusCode.OK)
            return
        } catch (error: unknown) {
            // if (error instanceof Error) {
            //     if (error.name === "NotEmployeesFound") {
            //         sendErrorResponse(res, HttptatusCode.NOT_FOUND, "Not Employees Found")
            //         return
            //     }
            // }
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return
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


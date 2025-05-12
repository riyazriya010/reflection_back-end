import { Request, Response } from "express";
import ManagerAuthServices, { managerAuthServices } from "../../services/manager/auth.services";
import { sendAuthResponse, sendDataResponse, sendErrorResponse } from "../../utils/responseHelpers";
import { HttptatusCode } from "../../utils/httpStatusCodes";
import { JwtService } from "../../integrations/jwt";

export default class ManagerAuthController {
    private managerAuthServices: ManagerAuthServices;
    private jwtService: JwtService

    constructor(managerAuthServices: ManagerAuthServices) {
        this.managerAuthServices = managerAuthServices
        this.jwtService = new JwtService()
    }

    async managerSignUp(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const savedManager = await this.managerAuthServices.managerSignup(data)

            const accessToken = await this.jwtService.createToken(savedManager?._id, String(savedManager?.role))
            const refreshToken = await this.jwtService.createRefreshToken(savedManager?._id, String(savedManager?.role))

            sendAuthResponse(
                res,
                String(accessToken),
                String(refreshToken),
                "Manager Added to DB Successfully",
                HttptatusCode.CREATED,
                savedManager
            )
            return
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === 'MaangerAlreadyExist') {
                    sendErrorResponse(res, HttptatusCode.CONFLICT, "Manager Already Exist")
                    return
                }
            }
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return
        }
    }

    async managerLogin(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const loginManager = await this.managerAuthServices.managerLogin(data)

            const accessToken = await this.jwtService.createToken(loginManager?._id, String(loginManager?.role))
            const refreshToken = await this.jwtService.createRefreshToken(loginManager?._id, String(loginManager?.role))

            sendAuthResponse(
                res,
                String(accessToken),
                String(refreshToken),
                "Manager Logged Successfully",
                HttptatusCode.CREATED,
                loginManager
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

    async managerLogout(req: Request, res: Response): Promise<any> {
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
                .send({ success: true, message: "Manager Logged out successfully" });

        } catch (error: unknown) {
            console.log('logout error: ', error)
            return
        }
    }

}

export const managerAuthController = new ManagerAuthController(managerAuthServices)


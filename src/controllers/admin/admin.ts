import { Request, Response } from "express";
import { JwtService } from "../../integrations/jwt";
import AdminServices, { adminServices } from "../../services/admin/admin";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../../utils/contants";
import { sendAuthResponse, sendDataResponse, sendErrorResponse } from "../../utils/responseHelpers";
import { HttptatusCode } from "../../utils/httpStatusCodes";

export default class AdminController {
    private adminServices: AdminServices;
    private jwtService: JwtService

    constructor(adminServices: AdminServices) {
        this.adminServices = adminServices
        this.jwtService = new JwtService()
    }


    async login(req: Request, res: Response): Promise<void> {
        try {
            console.log('req ', req.body)
            const { email, password } = req.body
            if (String(ADMIN_EMAIL) !== email) {
                const error = new Error('Invalid Credentials')
                error.name = 'InvalidCredential'
                throw error
            }

            if (String(ADMIN_PASSWORD) !== password) {
                const error = new Error('Invalid Credentials')
                error.name = 'InvalidCredential'
                throw error
            }

            const accessToken = await this.jwtService.createToken(email, 'admin')
            const refreshToken = await this.jwtService.createRefreshToken(email, 'admin')

            sendAuthResponse(
                res,
                String(accessToken),
                String(refreshToken),
                'Admin Logged Successfully',
                HttptatusCode.OK
            )
            return

        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === 'InvalidCredential') {
                    sendErrorResponse(res, HttptatusCode.UNAUTHORIZED, "InvalidCredential")
                    return
                }
            }
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return
        }
    }


    async createForm(req: Request, res: Response): Promise<void> {
        try {
            const { title, description, fields } = req.body;

            if (!title || !fields || !Array.isArray(fields)) {
                const error = new Error('Title and fields are required')
                error.name = 'Titleandfieldsarerequired'
                throw error
            }

            const formData = {
                title,
                description: description || '',
                fields
            };

            const createdForm = await this.adminServices.createForm(formData);

            sendDataResponse(res, 'Form created successfully', createdForm, HttptatusCode.CREATED)
            return
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === 'Titleandfieldsarerequired') {
                    sendErrorResponse(res, HttptatusCode.NOT_FOUND, "Title and fields are required")
                    return
                }
            }
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return
        }
    }

    async adminLogout(req: Request, res: Response): Promise<any> {
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
                .send({ success: true, message: "Admin Logged out successfully" });

        } catch (error: unknown) {
            console.log('logout error: ', error)
            return
        }
    }

}

export const adminController = new AdminController(adminServices)

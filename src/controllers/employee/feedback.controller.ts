import { Request, Response } from "express";
import getId from "../../integrations/getId";
import EmployeeFeedbackServices, { employeeFeedbackServices } from "../../services/employee/feedback.services";
import { sendDataResponse, sendErrorResponse } from "../../utils/responseHelpers";
import { HttptatusCode } from "../../utils/httpStatusCodes";

export default class EmployeeFeedbackController {
    private employeeFeedbackServices: EmployeeFeedbackServices;

    constructor(employeeFeedbackServices: EmployeeFeedbackServices) {
        this.employeeFeedbackServices = employeeFeedbackServices
    }



    async requestFeedback(req: Request, res: Response): Promise<void> {
        try {
            const { peerId, message, deadline } = req.body
            const senderId = await getId('accessToken', req) as string
            const response = await this.employeeFeedbackServices.requestFeedback({ senderId, peerId, message, deadline })
            sendDataResponse(res, "Request created", response, HttptatusCode.CREATED)
            return
        } catch (error: unknown) {
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return
        }
    }

    async requestedFeedback(req: Request, res: Response): Promise<void> {
        try {
            const senderId = await getId('accessToken', req) as string
            const response = await this.employeeFeedbackServices.requestedFeedback(senderId)
            sendDataResponse(res, "Requested Feedbacks", response, HttptatusCode.OK)
            return
        } catch (error: unknown) {
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return
        }
    }

    async getOthersRequested(req: Request, res: Response): Promise<void> {
        try {
            const { status } = req.query
            const receiverId = await getId('accessToken', req) as string
            const response = await this.employeeFeedbackServices.getOthersRequested(receiverId, String(status))
            sendDataResponse(res, "Others Requested Feedbacks", response, HttptatusCode.OK)
            return
        } catch (error: unknown) {
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return
        }
    }

    async getAllForm(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.employeeFeedbackServices.getAllForm()
            sendDataResponse(res, "All Forms Got It", response, HttptatusCode.OK)
            return
        } catch (error: unknown) {
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return
        }
    }

    async submitFeedback(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const response = await this.employeeFeedbackServices.submitFeedback(data)
            sendDataResponse(res, "From Submitted", response, HttptatusCode.CREATED)
            return
        } catch (error: unknown) {
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return
        }
    }

    async getAllRequestedToMe(req: Request, res: Response): Promise<void> {
        try {
            const receiverId = await getId('accessToken', req) as string
            const response = await this.employeeFeedbackServices.getAllRequestedToMe(receiverId)
            sendDataResponse(res, "All Request Got IT", response, HttptatusCode.OK)
            return
        } catch (error: unknown) {
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return
        }
    }

    async rejectRequest(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.query
            const response = await this.employeeFeedbackServices.rejectRequest(String(id))
            sendDataResponse(res, "Request Rejected", response, HttptatusCode.OK)
            return
        } catch (error: unknown) {
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return
        }
    }

    async getMyRequestes(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.query
            const response = await this.employeeFeedbackServices.getMyRequestes(String(id))
            sendDataResponse(res, "All MY Requestes Got IT", response, HttptatusCode.OK)
            return
        } catch (error: unknown) {
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return
        }
    }

    async getFeedbackMessages(req: Request, res: Response): Promise<void> {
        try{
            const receiverId = await getId('accessToken',req) as string
            const response = await this.employeeFeedbackServices.getFeedbackMessages(receiverId)
            sendDataResponse(res, "All MY Feedback Messages Got IT", response, HttptatusCode.OK)
            return
        }catch(error: unknown){
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return
        }
    }


}

export const employeeFeedbackController = new EmployeeFeedbackController(employeeFeedbackServices)
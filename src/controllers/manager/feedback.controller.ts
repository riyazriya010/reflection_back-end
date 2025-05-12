import { Request, Response } from "express";
import { HttptatusCode } from "../../utils/httpStatusCodes";
import ManagerFeedbackServices, { managerFeedbackServices } from "../../services/manager/feedback.services";
import { sendDataResponse, sendErrorResponse } from "../../utils/responseHelpers";

export default class ManagerFeedbackController {
    private managerFeedbackServices: ManagerFeedbackServices;

    constructor(managerFeedbackServices: ManagerFeedbackServices) {
        this.managerFeedbackServices = managerFeedbackServices
    }

    async getEmployeesFeedback(req: Request, res: Response): Promise<void> {
        try {
            const {department} = req.query
            const getEmployeesFeedback = await this.managerFeedbackServices.getEmployeesFeedback(String(department))
            sendDataResponse(res, 'Employees Feedbacks Got IT', getEmployeesFeedback, HttptatusCode.OK)
            return;
        } catch (error: unknown) {
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return
        }
    }

}

export const managerFeedbackController = new ManagerFeedbackController(managerFeedbackServices)


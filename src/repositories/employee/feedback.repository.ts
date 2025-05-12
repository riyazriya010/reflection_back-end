import {  IFeedBackMethods } from "../../interface/employee/employee.interface";
import { EmployeeRequest } from "../../interface/employee/employee.types";
import EmployeeModel, { IEmployee } from "../../models/employee.model";
import FeedbackModel, { IFeedback } from "../../models/feedback.model";
import FormModel, { IForm } from "../../models/form.model";
import FeedbackRequestModel, { IFeedbackRequest } from "../../models/request.model";
import CommonBaseRepository from "../base/baseRepository";

export default class EmployeeFeedbackRepository extends CommonBaseRepository<{
    EmployeeModel: IEmployee,
    FeedbackRequestModel: IFeedbackRequest,
    FormModel: IForm,
    FeedbackModel: IFeedback
}> implements IFeedBackMethods {
    constructor() {
        super({
            EmployeeModel: EmployeeModel,
            FeedbackRequestModel: FeedbackRequestModel,
            FormModel: FormModel,
            FeedbackModel: FeedbackModel
        })
    }

    async requestFeedback(data: EmployeeRequest): Promise<IFeedbackRequest | null> {
        return this.createData('FeedbackRequestModel', data)
    }

    async requestedFeedback(senderId: string): Promise<IFeedbackRequest[] | null> {
        return this.findAll('FeedbackRequestModel', { senderId: { $eq: senderId } });
    }

    async getOthersRequested(receiverId: string, status?: string): Promise<IFeedbackRequest[] | null> {
        return this.findAll('FeedbackRequestModel', 
            { receiverId: receiverId, status: { $regex: new RegExp(`^${status}$`, 'i') } });
    }

    async getAllForm(): Promise<IForm[] | null> {
        return this.findAll('FormModel')
    }

    async submitFeedback(data: Partial<IFeedback>): Promise<any> {
        return this.createData('FeedbackModel', data)
    }

    
    async findByIds(id: string): Promise<any> {
        return this.findById('EmployeeModel', id)
    }

    async FindRequestedFeedbackById(id: string): Promise<any> {
        return this.findById('FeedbackRequestModel', id)
    }

    async updateRequestedFeedback(id: string): Promise<any> {
        return this.updateById('FeedbackRequestModel', id, {
            status: 'responded',
            updatedAt: new Date()
        });
    }

    async getAllRequestedToMe(receiverId: string): Promise<any> {
        return this.findAll('FeedbackRequestModel', {receiverId: receiverId})
    }

    async rejectRequest(id: string): Promise<any> {
        return this.updateById('FeedbackRequestModel', id, { status: 'rejected', updatedAt: new Date() });
    }

    
    async getMyRequestes(id: string): Promise<any> {
         return this.findAll('FeedbackModel', {requestedId: id})
    }

    async getAllFeedbackForReceiver(receiverId: string): Promise<any> {
        return this.findAll('FeedbackModel',{receiverId})
    }

}
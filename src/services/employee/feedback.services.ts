import { IFeedbackServiceMethods } from "../../interface/employee/employee.interface";
import { EmployeerequestFeedback } from "../../interface/employee/employee.types";
import { IFeedbackRequest } from "../../models/request.model";
import mongoose from "mongoose";
import { IForm } from "../../models/form.model";
import EmployeeFeedbackRepository from "../../repositories/employee/feedback.repository";
import Mail from "../../integrations/nodemailer";
import { FEEDBACK_GET_LINK, FEEDBACK_LINK } from "../../utils/contants";


export default class EmployeeFeedbackServices implements IFeedbackServiceMethods {
    private employeeFeedbackRepository: EmployeeFeedbackRepository

    constructor(employeeFeedbackRepository: EmployeeFeedbackRepository) {
        this.employeeFeedbackRepository = employeeFeedbackRepository
    }



    async requestFeedback(data: EmployeerequestFeedback): Promise<IFeedbackRequest | null> {
        try {
            const findPeer = await this.employeeFeedbackRepository.findByIds(String(data.peerId))
            const findSender = await this.employeeFeedbackRepository.findByIds(String(data.senderId))
            let newObj = {
                senderId: new mongoose.Types.ObjectId(data.senderId),
                receiverId: new mongoose.Types.ObjectId(data.peerId),
                receiverName: findPeer?.username,
                senderName: findSender?.username,
                message: data.message,
                deadline: data.deadline,
                status: 'pending'
            }

            const mail = new Mail()
            mail.sendFeedbackRequestMail(String(findPeer?.email), String(FEEDBACK_LINK), newObj.receiverName, newObj.senderName, newObj.deadline)
                .then(info => {
                    console.log('Feedback Request email sent successfully: ');
                })
                .catch(error => {
                    console.error('Failed to send Feedback Request email:', error);
                });

            const response = await this.employeeFeedbackRepository.requestFeedback(newObj)
            return response
        } catch (error: unknown) {
            throw error
        }
    }

    async requestedFeedback(senderId: string): Promise<IFeedbackRequest[] | null> {
        try {
            const response = await this.employeeFeedbackRepository.requestedFeedback(senderId)
            return response
        } catch (error: unknown) {
            throw error
        }
    }

    async getOthersRequested(receiverId: string, status?: string): Promise<IFeedbackRequest[] | null> {
        try {
            const response = await this.employeeFeedbackRepository.getOthersRequested(receiverId, status)
            return response
        } catch (error: unknown) {
            throw error
        }
    }

    async getAllForm(): Promise<IForm[] | null> {
        try {
            const response = await this.employeeFeedbackRepository.getAllForm()
            return response
        } catch (error: unknown) {
            throw error
        }
    }

    async submitFeedback(data: any): Promise<any> {
        try {
            const { formId, requestedId, rating, message } = data
            const requested = await this.employeeFeedbackRepository.FindRequestedFeedbackById(requestedId)
            const requestedPerson = await this.employeeFeedbackRepository.findByIds(requested?.senderId)

            const feedbackData = {
                senderId: requested?.receiverId,
                receiverId: requested?.senderId,
                requestedId,
                formId,
                senderName: requested.receiverName,
                receiverName: requested.senderName,
                rating,
                message
            }

            const mail = new Mail()
            console.log(requested?.email)
            console.log(FEEDBACK_GET_LINK)
            console.log(feedbackData.receiverName)
            console.log(feedbackData.senderName)
            mail.sendRemainderMail(String(requestedPerson?.email), String(FEEDBACK_GET_LINK), feedbackData.receiverName, feedbackData.senderName)
                .then(info => {
                    console.log('Feedback Request email sent successfully: ');
                })
                .catch(error => {
                    console.error('Failed to send Feedback Request email:', error);
                });

            const response = await this.employeeFeedbackRepository.submitFeedback(feedbackData)
            if (response) {
                await this.employeeFeedbackRepository.updateRequestedFeedback(requestedId)
            }
            return response
        } catch (error: unknown) {
            throw error
        }
    }


    async getAllRequestedToMe(receiverId: string): Promise<any> {
        try {
            const response = await this.employeeFeedbackRepository.getAllRequestedToMe(receiverId)
            return response
        } catch (error: unknown) {
            throw error
        }
    }

    async rejectRequest(id: string): Promise<any> {
        try {
            const response = await this.employeeFeedbackRepository.rejectRequest(id)
            return response
        } catch (error: unknown) {
            throw error
        }
    }

    async getMyRequestes(id: string): Promise<any> {
        try {
            const replyResponse = await this.employeeFeedbackRepository.getMyRequestes(id)
            console.log('replyRes: ', replyResponse)
            const requestResponse = await this.employeeFeedbackRepository.FindRequestedFeedbackById(id)
            console.log('reQeRes: ', requestResponse)

            // Create combined response with only required fields
            const combinedResponse = {
                senderName: replyResponse[0]?.senderName || 'Unknown',
                requestedMessage: requestResponse?.message || '',
                status: requestResponse?.status || 'pending',
                repliedMessage: replyResponse[0]?.message || null,
                rating: replyResponse[0]?.rating || null,
                deadLine: requestResponse?.deadline,
                requestCreatedAt: requestResponse?.createdAt || new Date().toISOString(),
                replyCreatedAt: replyResponse[0]?.createdAt || null
            };

            return combinedResponse
        } catch (error: unknown) {
            throw error
        }
    }

    async getFeedbackMessages(receiverId: string): Promise<any> {
        try {
            const feedbacks = await this.employeeFeedbackRepository.getAllFeedbackForReceiver(receiverId)

            const messages: string[] = feedbacks.map((fb: any) => fb.message);
            return messages;
            
        } catch (error: unknown) {
            throw error
        }
    }

}


const employeeFeedbackRepository = new EmployeeFeedbackRepository()
export const employeeFeedbackServices = new EmployeeFeedbackServices(employeeFeedbackRepository)

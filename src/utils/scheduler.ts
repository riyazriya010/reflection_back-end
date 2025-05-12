import cron from 'node-cron';
import FeedbackRequestModel from '../models/request.model';
import EmployeeModel from '../models/employee.model';
import Mail from '../integrations/nodemailer';
import { FEEDBACK_LINK } from './contants';


//this runs at midnight
// this is for expire the request
cron.schedule('0 0 * * *', async () => {
  const now = new Date();
  await FeedbackRequestModel.updateMany(
    {
      deadline: { $lt: now },
      status: 'pending'
    },
    { $set: { status: 'expired' } }
  );
  console.log('Expired old feedback requests');
});



//this is for send remainder mail about request deadline
const mailer = new Mail();

//this runs at midnight
cron.schedule('0 0 * * *', async () => {
  const now = new Date();

  const tomorrowStart = new Date(now);
  tomorrowStart.setDate(now.getDate() + 1);
  tomorrowStart.setHours(0, 0, 0, 0);

  const tomorrowEnd = new Date(tomorrowStart);
  tomorrowEnd.setHours(23, 59, 59, 999);

  const reminders = await FeedbackRequestModel.find({
    deadline: { $gte: tomorrowStart, $lte: tomorrowEnd },
    status: 'pending',
  });

  for (const request of reminders) {
    const receiver = await EmployeeModel.findById(request.receiverId);
    const sender = await EmployeeModel.findById(request.senderId);

    if (receiver?.email && sender?.username) {
      const feedbackLink = `${FEEDBACK_LINK}`;
      const expireDate = request.deadline.toLocaleString();

      await mailer.sendDeadlineRemainderMail(
        receiver.email,
        receiver.username,
        sender.username,
        feedbackLink,
        expireDate
      );
    }
  }

  console.log(`Sent ${reminders.length} feedback deadline reminder email's`);
});
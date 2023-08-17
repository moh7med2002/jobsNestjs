import { Sequelize } from 'sequelize-typescript';
import { Admin } from 'src/modules/admin/admin.entity';
import { Category } from 'src/modules/category/category.entity';
import { Conversation } from 'src/modules/conversation/conversation.entity';
import { Feedback } from 'src/modules/feedback/feedback.entity';
import { Job } from 'src/modules/job/job.entity';
import { JobImplement } from 'src/modules/jobImplement/jobImplement.entity';
import { Message } from 'src/modules/message/message.entity';
import { Notification } from 'src/modules/notification/notification.entity';
import { PersonalProject } from 'src/modules/personalProject/personalProject.entity';
import { Photo } from 'src/modules/photo/photo.entity';
import { Price } from 'src/modules/price/price.entity';
import { User } from 'src/modules/user/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '059283805928388',
        database: 'jobs',
      });
      sequelize.addModels([
        Admin,
        Category,
        User,
        Job,
        Price,
        PersonalProject,
        Photo,
        JobImplement,
        Feedback,
        Notification,
        Conversation,
        Message,
      ]);
      await sequelize.sync({ alter: false });
      return sequelize;
    },
  },
];

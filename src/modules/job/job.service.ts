import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { jobRepositry, jobPriceRepositry } from 'src/constants/entityRepositry';
import { Job } from './job.entity';
import { JobDto } from './dto';
import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';
import { Price } from '../price/price.entity';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';
import { JobLevel, JobStatus, ProposalStatus } from 'src/constants/enums';
import { Proposal } from '../proposal/proposal.entity';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class JobService {
  constructor(
    @Inject(jobRepositry)
    private jobRepositry: typeof Job,
    @Inject(jobPriceRepositry)
    private jobPriceRepositry: typeof Price,
    private categoryService: CategoryService,
    private userService: UserService,
  ) {}

  async createjob(dto: JobDto, userId: number) {
    const userPromise = this.userService.userById(userId);
    const categoryPromise = this.categoryService.categoryById(dto.categoryId);
    const [user, category] = await Promise.all([userPromise, categoryPromise]);
    const savedJob = await this.jobRepositry.create({
      title: dto.title,
      description: dto.description,
      duration: dto.duration,
      creatorId: userId,
      categoryId: dto.categoryId,
    });
    await this.jobPriceRepositry.create({
      min: dto.minPrice,
      max: dto.maxPrice,
      jobId: savedJob.id,
    });
    return { message: 'Job has been created success' };
  }

  async getSellerJobs(userId: string) {
    const jobs = await this.jobRepositry.findAll({
      where: { creatorId: userId },
      order: [['createdAT', 'DESC']],
      include: [
        {
          model: this.jobPriceRepositry,
          attributes: ['id', 'min', 'max'],
        },
        {
          model: Category,
          attributes: ['id', 'title'],
        },
      ],
    });
    return { jobs };
  }

  async singleJob(jobId: string) {
    const job = await this.jobRepositry.findOne({
      where: { id: jobId },
      include: [
        {
          model: this.jobPriceRepositry,
          attributes: ['id', 'min', 'max'],
        },
        {
          model: Category,
          attributes: ['id', 'title'],
        },
        {
          model: User,
          as: 'creatorUser',
          attributes: ['id', 'name', 'image', 'country'],
        },
        {
          model: Proposal,
          order: [['createdAt', 'DESC']],
          separate: true,
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'image', 'job'],
            },
          ],
          duplicating: false,
          required: false,
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(
              '(SELECT COUNT(*) FROM `proposals` WHERE `proposals`.`jobId` = `Job`.`id`)',
            ),
            'proposalCount',
          ],
          [
            Sequelize.literal(
              `(SELECT COALESCE(AVG(price), 0) FROM proposals WHERE proposals.jobId = Job.id)`,
            ),
            'averagePrice',
          ],
        ],
      },
    });
    if (!job) {
      throw new BadRequestException('Job not found');
    }
    return { job };
  }

  async jobDetails(jobId: string, userId: number) {
    const job = await this.jobRepositry.findOne({
      where: { id: jobId },
      include: [
        {
          model: this.jobPriceRepositry,
          attributes: ['id', 'min', 'max'],
        },
        {
          model: Category,
          attributes: ['id', 'title'],
        },
        {
          model: User,
          as: 'creatorUser',
          attributes: ['id', 'name', 'image', 'country'],
        },
        {
          model: Proposal,
          separate: true,
          where: { status: ProposalStatus.ACCEPT },
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'image', 'job'],
            },
          ],
          duplicating: false,
          required: false,
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(
              '(SELECT COUNT(*) FROM `proposals` WHERE `proposals`.`jobId` = `Job`.`id`)',
            ),
            'proposalCount',
          ],
          [
            Sequelize.literal(
              `(SELECT COALESCE(AVG(price), 0) FROM proposals WHERE proposals.jobId = Job.id)`,
            ),
            'averagePrice',
          ],
        ],
      },
    });
    if (!job || job.creatorId !== userId) {
      throw new BadRequestException('Invalid Process');
    }
    return { job };
  }

  async jobsTimiline(
    page: string,
    name: string,
    price: string,
    categories: string,
  ) {
    const currentPage = parseInt(page) || 1;
    const perPage = 10;
    const offset = (currentPage - 1) * perPage;
    let whereCondition = {};
    if (name) {
      whereCondition = { title: { [Op.like]: `%${name}%` } };
    }
    let priceConditon = {};
    if (price && parseInt(price) !== 0) {
      priceConditon = {
        min: { [Op.lte]: parseInt(price) },
        max: { [Op.gte]: parseInt(price) },
      };
    }
    let caids = [];
    if (categories) {
      caids = JSON.parse(categories);
    }
    const count = await this.jobRepositry.count({
      where: {
        ...whereCondition,
      },
      include: [
        {
          model: this.jobPriceRepositry,
          attributes: ['id', 'min', 'max'],
          where: priceConditon,
          required: true,
        },
        {
          model: Category,
          attributes: [],
          where: { id: { [Op.in]: caids } },
          required: caids.length > 0,
        },
      ],
    });
    const jobs = await this.jobRepositry.findAll({
      where: {
        ...whereCondition,
      },
      order: [['createdAt', 'DESC']],
      offset: offset,
      limit: perPage,
      include: [
        {
          model: this.jobPriceRepositry,
          attributes: ['id', 'min', 'max'],
          where: priceConditon,
          required: true,
        },
        {
          model: Category,
          attributes: [],
          where: { id: { [Op.in]: caids } },
          required: caids.length > 0,
        },
        {
          model: User,
          as: 'creatorUser',
          attributes: ['id', 'name', 'image', 'country'],
        },
        {
          model: Proposal,
          attributes: [],
          required: false, // We set this to false since we're only interested in counting
          duplicating: false, // Set this to false to avoid duplicating rows
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.fn('COUNT', Sequelize.col('proposals.jobId')),
            'proposalCount',
          ],
          [
            Sequelize.fn(
              'COALESCE',
              Sequelize.fn('AVG', Sequelize.col('proposals.price')),
              0,
            ),
            'averagePrice',
          ],
        ],
      },
      group: ['Job.id'],
    });
    const totalPages = Math.ceil(count / perPage);
    const hasMore = currentPage < totalPages;
    return { jobs: jobs, hasMore, totalPages };
  }

  async closeJob(jobId: string, sellerId: number) {
    const job = await this.jobRepositry.findByPk(jobId);
    if (!job) {
      throw new BadRequestException('Job not found');
    }
    if (job.creatorId !== sellerId) {
      throw new ForbiddenException('Not allow to close this job');
    }
    job.status = JobStatus.CLOSE;
    await job.save();
    return { message: `Job ${job.title} has been closed` };
  }

  async deliveryJob(jobId: string, sellerId: number) {
    const job = await this.jobRepositry.findByPk(jobId);
    if (!job) {
      throw new BadRequestException('Job not found');
    }
    if (job.creatorId !== sellerId) {
      throw new ForbiddenException('Not allow to delivery this job');
    }
    job.status = JobStatus.CLOSE;
    job.level = JobLevel.DELIVERED;
    await job.save();
    return { message: `Job ${job.title} has been delivred` };
  }

  async jobById(jobId) {
    const job = await this.jobRepositry.findByPk(jobId);
    if (!job) {
      throw new BadRequestException('Job not found');
    }
    return job;
  }
}

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { proposalRepositry } from 'src/constants/entityRepositry';
import { Proposal } from './proposal.entity';
import { UserService } from '../user/user.service';
import { JobService } from '../job/job.service';
import { ProposalDto } from './dto';
import { JobLevel, JobStatus, ProposalStatus } from 'src/constants/enums';
import { Job } from '../job/job.entity';
import { User } from '../user/user.entity';
import { Op } from 'sequelize';

@Injectable()
export class ProposalService {
  constructor(
    @Inject(proposalRepositry)
    private proposalRepositry: typeof Proposal,
    private userService: UserService,
    private jobService: JobService,
  ) {}

  async createProposal(dto: ProposalDto, jobId: string, userId: number) {
    const userPromise = this.userService.userById(userId);
    const jobPromise = this.jobService.jobById(jobId);
    const [user, job] = await Promise.all([userPromise, jobPromise]);
    if (job.status === JobStatus.CLOSE) {
      throw new BadRequestException('This Job has been closed');
    }
    const proposalFound = await this.proposalRepositry.findOne({
      where: { buyerId: userId, jobId: jobId },
    });
    if (proposalFound) {
      proposalFound.duration = dto.duration;
      proposalFound.price = dto.price;
      proposalFound.description = dto.description;
      await proposalFound.save();
      return { message: 'Your Proposal has been updated' };
    }
    await this.proposalRepositry.create({
      duration: dto.duration,
      description: dto.description,
      price: dto.price,
      jobId: jobId,
      buyerId: userId,
    });
    return { message: 'Your Proposal has been created' };
  }

  async myProposals(userId: number) {
    const proposals = await this.proposalRepositry.findAll({
      where: { buyerId: userId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Job,
          include: [
            {
              model: User,
              as: 'creatorUser',
              attributes: ['id', 'name', 'image', 'country'],
            },
          ],
        },
      ],
    });
    return { proposals };
  }

  async cancelProposal(pid: string, userId: number) {
    const proposal = await this.proposalRepositry.findByPk(pid);
    if (!proposal) {
      throw new BadRequestException('Proposal not found');
    }
    const job = await this.jobService.jobById(proposal.jobId);
    if (job.creatorId !== userId || job.status === JobStatus.CLOSE) {
      throw new BadRequestException('Invalid Process');
    }
    proposal.status = ProposalStatus.REJECT;
    await proposal.save();
    return { message: 'Proposal has been rejected success' };
  }

  async acceptProposal(pid: string, userId: number) {
    const proposal = await this.proposalRepositry.findByPk(pid);
    if (!proposal) {
      throw new BadRequestException('Proposal not found');
    }
    const job = await this.jobService.jobById(proposal.jobId);
    const isFountAcceptProposal = await this.proposalRepositry.findOne({
      where: { jobId: job.id, status: ProposalStatus.ACCEPT },
    });
    if (isFountAcceptProposal) {
      throw new BadRequestException('Invalid Process');
    }
    if (job.creatorId !== userId || job.status === JobStatus.CLOSE) {
      throw new BadRequestException('Invalid Process');
    }
    proposal.status = ProposalStatus.ACCEPT;
    job.status = JobStatus.CLOSE;
    job.level = JobLevel.IMPLEMENTATION;
    const updatePromise = this.proposalRepositry.update(
      { status: ProposalStatus.REJECT }, // New status value you want to set
      {
        where: {
          jobId: job.id,
          id: { [Op.ne]: pid },
        },
      },
    );
    await Promise.all([proposal.save(), job.save(), updatePromise]);
    return { message: 'Proposal has been accepted success' };
  }
}

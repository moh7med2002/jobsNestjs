import { Module } from '@nestjs/common';
import { proposalRepositry } from 'src/constants/entityRepositry';
import { Proposal } from './proposal.entity';
import { ProposalController } from './proposal.controller';
import { ProposalService } from './proposal.service';
import { UserModule } from '../user/user.module';
import { JobModule } from '../job/job.module';

@Module({
  controllers: [ProposalController],
  providers: [
    {
      provide: proposalRepositry,
      useValue: Proposal,
    },
    ProposalService,
  ],
  imports: [UserModule, JobModule],
})
export class ProposalModule {}

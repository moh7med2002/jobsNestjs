import {
  Body,
  Controller,
  Post,
  UseGuards,
  Put,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { TokenGuard } from 'src/common/util/token.guards';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/types/role.enum';
import { ProposalService } from './proposal.service';
import { ProposalDto } from './dto';
import { SaveUser } from 'src/common/decorator/SaveUser';
import { tokenPayload } from 'src/common/types/payload.token';

@Controller('proposal')
export class ProposalController {
  constructor(private proposalService: ProposalService) {}

  @Post('create/:jobId')
  @UseGuards(TokenGuard)
  @Roles(Role.Buyer)
  create(
    @Body() dto: ProposalDto,
    @SaveUser() user: tokenPayload,
    @Param('jobId') jobId: string,
  ) {
    return this.proposalService.createProposal(dto, jobId, user.userId);
  }

  @Get('my')
  @UseGuards(TokenGuard)
  @Roles(Role.Buyer)
  getMyProposals(@SaveUser() user: tokenPayload) {
    return this.proposalService.myProposals(user.userId);
  }

  @Delete(':proposalId')
  @UseGuards(TokenGuard)
  @Roles(Role.Seller)
  rejectProposal(
    @SaveUser() user: tokenPayload,
    @Param('proposalId') proposalId: string,
  ) {
    return this.proposalService.cancelProposal(proposalId, user.userId);
  }

  @Put(':proposalId')
  @UseGuards(TokenGuard)
  @Roles(Role.Seller)
  acceptProposal(
    @SaveUser() user: tokenPayload,
    @Param('proposalId') proposalId: string,
  ) {
    return this.proposalService.acceptProposal(proposalId, user.userId);
  }
}

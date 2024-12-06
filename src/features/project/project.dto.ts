import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

import { IsFile } from '@/lib/decorators/file.decorators';
import { ProjectStates } from './project.types';
import { Project } from './project.entity';

/**
 * Represents the data transfer object for creating a project.
 * This class is responsible for handling the input data when a new project is created.
 * It includes validations to ensure that the data received is in the correct format.
 */
export class CreateProjectDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsFile({ mimeTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'] })
  @Type(() => File)
  photo: File;

  @IsFile({ mimeTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'] })
  @Type(() => File)
  banner: File;

  @IsFile({ mimeTypes: ['application/pdf'] })
  @Type(() => File)
  whitepaper: File;

  @IsFile({ mimeTypes: ['application/pdf'] })
  @Type(() => File)
  litepaper: File;

  @IsFile({ mimeTypes: ['application/pdf'] })
  @Type(() => File)
  tokenomics: File;

  @IsNumber()
  tokensCreated: number;

  @IsNumber()
  tokenPrice: number;

  @IsNumber()
  amountToRise: number;

  @IsUrl()
  instagramUrl: string;

  @IsUrl()
  xUrl: string;

  @IsUrl()
  telegramUrl: string;

  @IsUrl()
  mediumUrl: string;
}

/**
 * Data Transfer Object for editing a project.
 */
export class EditProjectDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}

export class CreateProjectInvestmentDTO {
  @IsNumber()
  amount: number;
}

export class ProjectResponseDTO {
  id: number;
  state: ProjectStates;
  name: string;
  slug: string;
  description: string;
  photoUrl: string;
  bannerUrl: string;
  whitepaperUrl: string;
  litepaperUrl: string;
  tokenomicsUrl: string;
  comments: string;
  amountToRaise: number;
  threshold: number;
  startDate: Date;
  tokensSupply: number;
  tokensForSale: number;
  tokenName: number;
  tokenDecimals: number;
  TGEDate: Date;
  unlockTokensTGE: number;
  cliff: number;
  vestingDays: number;
  createdAt: Date;
  owner: {
    wallet: string;
    tier: string;
  };
  social: {
    instagramUrl: string;
    xUrl: string;
    discordUrl: string;
    telegramUrl: string;
    mediumUrl: string;
  };
  currency: {
    id: number;
    name: string;
    chainId: number;
    chain: string;
    address: string;
  };

  constructor(project: Project) {
    this.id = project.id;
    this.state = project.state;
    this.name = project.name;
    this.slug = project.slug;
    this.description = project.description;
    this.photoUrl = project.photoUrl;
    this.bannerUrl = project.bannerUrl;
    this.whitepaperUrl = project.whitepaperUrl;
    this.litepaperUrl = project.litepaperUrl;
    this.tokenomicsUrl = project.tokenomicsUrl;
    this.comments = project.comments;
    this.amountToRaise = project.amountToRaise;
    this.threshold = project.threshold;
    this.startDate = project.startDate;
    this.tokensSupply = project.tokensSupply;
    this.tokensForSale = project.tokensForSale;
    this.tokenName = project.tokenName;
    this.tokenDecimals = project.tokenDecimals;
    this.TGEDate = project.TGEDate;
    this.unlockTokensTGE = project.unlockTokensTGE;
    this.cliff = project.cliff;
    this.vestingDays = project.vestingDays;
    this.createdAt = project.createdAt;
    this.owner = {
      wallet: project.owner.wallet,
      tier: project.owner.tier.name,
    };
    this.social = {
      instagramUrl: project.instagramUrl,
      xUrl: project.xUrl,
      discordUrl: project.discordUrl,
      telegramUrl: project.telegramUrl,
      mediumUrl: project.mediumUrl,
    };
    this.currency = {
      id: project.currency.id,
      name: project.currency.name,
      chainId: project.currency.chainId,
      chain: project.currency.chain,
      address: project.currency.address,
    };
  }
}

export class ProjectsResponseDTO {
  rows: ProjectResponseDTO[];
  count: number;

  constructor(projects: {
    rows: Project[];
    count: number;
  }) {
    this.rows = projects.rows.map((project) => new ProjectResponseDTO(project));
    this.count = projects.count;
  }
}
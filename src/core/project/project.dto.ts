import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

import { IsFile } from '@/lib/decorators/file.decorators';

import { Project } from './project.entity';
import { ProjectStates } from './project.types';

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
  owner: OwnerDTO;
  social: SocialDTO;
  currency: CurrencyDTO;

  constructor(project: Project) {
    Object.assign(this, {
      id: project.id,
      state: project.state,
      name: project.name,
      slug: project.slug,
      description: project.description,
      photoUrl: project.photoUrl,
      bannerUrl: project.bannerUrl,
      whitepaperUrl: project.whitepaperUrl,
      litepaperUrl: project.litepaperUrl,
      tokenomicsUrl: project.tokenomicsUrl,
      comments: project.comments,
      amountToRaise: project.amountToRaise,
      threshold: project.threshold,
      startDate: project.startDate,
      tokensSupply: project.tokensSupply,
      tokensForSale: project.tokensForSale,
      tokenName: project.tokenName,
      tokenDecimals: project.tokenDecimals,
      TGEDate: project.TGEDate,
      unlockTokensTGE: project.unlockTokensTGE,
      cliff: project.cliff,
      vestingDays: project.vestingDays,
      createdAt: project.createdAt
    });
  }
}

class OwnerDTO {
  wallet: string;
  tier: string;

  constructor(owner: { wallet: string; tier: { name: string } }) {
    this.wallet = owner.wallet;
    this.tier = owner.tier.name;
  }
}

class SocialDTO {
  instagramUrl: string;
  xUrl: string;
  discordUrl: string;
  telegramUrl: string;
  mediumUrl: string;

  constructor(project: Project) {
    this.instagramUrl = project.instagramUrl;
    this.xUrl = project.xUrl;
    this.discordUrl = project.discordUrl;
    this.telegramUrl = project.telegramUrl;
    this.mediumUrl = project.mediumUrl;
  }
}

class CurrencyDTO {
  id: number;
  name: string;
  chainId: number;
  chain: string;
  address: string;

  constructor(currency: { id: number; name: string; chainId: number; chain: string; address: string }) {
    this.id = currency.id;
    this.name = currency.name;
    this.chainId = currency.chainId;
    this.chain = currency.chain;
    this.address = currency.address;
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
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

import { CurrencyDTO } from '@/core/currency/currency.dto';
import { UserDTO } from '@/core/user/user.dto';
import { IsFile } from '@/lib/decorators/file.decorators';

import { Project } from './project.entity';
import { ProjectStates } from './project.types';

/**
 * Data Transfer Object for creating or editing a project.
 */
export class CreateOrEditProjectDTO {
  /**
   * The name of the project.
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * The slug of the project.
   */
  @IsString()
  @IsNotEmpty()
  slug: string;

  /**
   * The description of the project.
   */
  @IsString()
  description: string;

  /**
   * The photo file of the project.
   */
  @IsFile({ mimeTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'] })
  @Type(() => File)
  photo: File;

  /**
   * The banner file of the project.
   */
  @IsFile({ mimeTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'] })
  @Type(() => File)
  banner: File;

  /**
   * The whitepaper file of the project.
   */
  @IsFile({ mimeTypes: ['application/pdf'] })
  @Type(() => File)
  whitepaper: File;

  /**
   * The litepaper file of the project.
   */
  @IsFile({ mimeTypes: ['application/pdf'] })
  @Type(() => File)
  litepaper: File;

  /**
   * The tokenomics file of the project.
   */
  @IsFile({ mimeTypes: ['application/pdf'] })
  @Type(() => File)
  tokenomics: File;

  /**
   * The name of the token.
   */
  @IsString()
  tokenName: string;

  /**
   * The image file of the token.
   */
  @IsFile({ mimeTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'] })
  @Type(() => File)
  tokenImage: File;

  /**
   * The price of the token.
   */
  @IsNumber()
  tokenPrice: number;

  /**
   * The total supply of tokens.
   */
  @IsNumber()
  tokensSupply: number;

  /**
   * The number of decimals for the token.
   */
  @IsNumber()
  tokenDecimals: number;

  /**
   * The amount to raise for the project.
   */
  @IsNumber()
  amountToRaise: number;

  /**
   * The number of tokens available for sale.
   */
  @IsNumber()
  tokensForSale: number;

  /**
   * The number of tokens to unlock at TGE.
   */
  @IsNumber()
  unlockTokensTGE: number;

  /**
   * The Instagram URL of the project.
   */
  @IsUrl()
  instagramUrl: string;

  /**
   * The Discord URL of the project.
   */
  @IsUrl()
  discordUrl: string;

  /**
   * The X (formerly Twitter) URL of the project.
   */
  @IsUrl()
  xUrl: string;

  /**
   * The Medium URL of the project.
   */
  @IsUrl()
  mediumUrl: string;

  /**
   * The Telegram URL of the project.
   */
  @IsUrl()
  telegramUrl: string;

  /**
   * The Token Generation Event (TGE) date.
   */
  @Type(() => Date)
  TGEDate: Date;

  /**
   * The cliff period in days.
   */
  @IsNumber()
  cliff: number;

  /**
   * The vesting period in days.
   */
  @IsNumber()
  vestingDays: number;

  /**
   * The start date of the project.
   */
  @Type(() => Date)
  startDate: Date;

  /**
   * The wallet address of the project owner.
   */
  @IsString()
  walletAddress: string;

  /**
   * The threshold of the project.
   */
  @IsNumber()
  threshold: number;
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
  tokenImageUrl: string;
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
  owner: UserDTO;
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
      tokenImageUrl: project.tokenImageUrl,
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
      tokenPrice: project.amountToRaise / project.tokensForSale,
      TGEDate: project.TGEDate,
      unlockTokensTGE: project.unlockTokensTGE,
      cliff: project.cliff,
      vestingDays: project.vestingDays,
      createdAt: project.createdAt,
      currency: project.currency,

      social: {
        instagramUrl: project.instagramUrl,
        xUrl: project.xUrl,
        discordUrl: project.discordUrl,
        telegramUrl: project.telegramUrl,
        mediumUrl: project.mediumUrl,
      }
    });
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

export class ReviewProjectRequestDTO {
  response: number;
  comments: string;
}
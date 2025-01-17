import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

import { CurrencyDTO } from '@/core/currency/currency.dto';
import { UserDTO } from '@/core/user/user.dto';
import { IsFile } from '@/lib/decorators/file.decorators';

import { Project } from './project.entity';
import { ProjectStates } from './project.types';

/**
 * Data Transfer Object for initializing a project.
 * This class is responsible for handling the output data when a project is initialized.
 */
export class InitializeProjectResponseDTO {
  /**
   * The ID of the project.
   */
  @IsNumber()
  id: Project['id'];

  /**
   * Constructor to create an instance of InitializeProjectDTO.
   * @param project - The project entity to initialize the DTO with.
   */
  constructor(project: Project) {
    this.id = project.id;
  }
}

/**
 * Data Transfer Object for initializing a project request.
 * This class is responsible for handling the input data when a project is initialized.
 */
export class InitializeProjectRequestDTO {
  /**
   * The wallet address associated with the project.
   */
  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}

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
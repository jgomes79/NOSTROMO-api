/**
 * Enum representing the various states a project can be in.
 */
export enum ProjectStates {
  /**
   * The project is in draft state.
   */
  DRAFT = 0,

  /**
   * Sent to review
   */
  SENT_TO_REVIEW = 1,

  /**
   * The project requires more information.
   */
  REQUEST_MORE_INFO = 2,

  /**
   * The project is ready to be voted on.
   */
  READY_TO_VOTE = 3,

  /**
   * The project has been rejected.
   */
  REJECTED = 4,

  /**
   * The project is upcoming.
   */
  UPCOMING = 5,

  /**
   * The project is in the first phase of funding.
   */
  FUNDING_PHASE_1 = 6,

  /**
   * The project is in the second phase of funding.
   */
  FUNDING_PHASE_2 = 7,

  /**
   * The project is in the third phase of funding.
   */
  FUNDING_PHASE_3 = 8,

  /**
   * The project is closed.
   */
  CLOSED = 9,

  /**
   * The project has failed.
   */
  FAILED = 10
}

/**
 * Represents the files associated with a project.
 */
export type ProjectFiles = {
  /**
   * The photo file associated with the project.
   */
  photo: Express.Multer.File[];

  /**
   * The banner file associated with the project.
   */
  banner: Express.Multer.File[];

  /**
   * The token image file associated with the project.
   */
  tokenImage: Express.Multer.File[];

  /**
   * The litepaper file associated with the project.
   */
  litepaper: Express.Multer.File[];

  /**
   * The tokenomics file associated with the project.
   */
  tokenomics: Express.Multer.File[];

  /**
   * The whitepaper file associated with the project.
   */
  whitepaper: Express.Multer.File[];
};

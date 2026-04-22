export type Language = 'en';
export type ConditionLinkMode = 'AND' | 'OR';
export type EarsType = 'ubiquitous' | 'event-driven' | 'state-driven' | 'optional-feature' | 'unwanted-behavior';
export type ProjectType = 'SYS' | 'SW';

export interface Project {
  id: string;
  name: string;
  description: string;
  type: ProjectType;
  color: string;
}

export interface StructuredCondition {
  id: string;
  subject: string;
  comparator: string;
  value: string;
}

export interface RequirementRecord {
  id: string;
  projectId: string;
  earsType: EarsType;
  linkMode: ConditionLinkMode;
  title: string;
  system: string;
  response: string;
  conditions: StructuredCondition[];
  notes: string;
  updatedAt: string;
}

export interface ValidationItem {
  severity: 'error' | 'warning' | 'info';
  text: string;
}

export interface TranslationBundle {
  appTitle: string;
  home: string;
  dashboard: string;
  createRequirement: string;
  management: string;
  export: string;
  heroTitle: string;
  heroSubtitle: string;
  learnTitle: string;
  learnSubtitle: string;
  whatIsRequirement: string;
  whatIsRequirementText: string;
  softwareRequirement: string;
  softwareRequirementText: string;
  systemRequirement: string;
  systemRequirementText: string;
  earsGuideTitle: string;
  earsGuideText: string;
  earsPatternTitle: string;
  earsPatternText: string;
  earsTypesTitle: string;
  earsTypeUbiquitous: string;
  earsTypeUbiquitousText: string;
  earsTypeEvent: string;
  earsTypeEventText: string;
  earsTypeState: string;
  earsTypeStateText: string;
  earsTypeOptional: string;
  earsTypeOptionalText: string;
  earsTypeUnwanted: string;
  earsTypeUnwantedText: string;
  qualityRulesTitle: string;
  qualityRulesText: string;
  qualityRuleOne: string;
  qualityRuleTwo: string;
  qualityRuleThree: string;
  qualityRuleFour: string;
  qualityRuleFive: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  projectsTotal: string;
  requirementsTotal: string;
  readyRequirements: string;
  openProjects: string;
  recentRequirements: string;
  noRequirements: string;
  managementTitle: string;
  managementSubtitle: string;
  managementHint: string;
  createProject: string;
  projectName: string;
  projectDescription: string;
  projectType: string;
  saveProject: string;
  projectFolders: string;
  openProject: string;
  detailTitle: string;
  detailSubtitle: string;
  backToManagement: string;
  exportTitle: string;
  exportSubtitle: string;
  exportProject: string;
  exportFormat: string;
  exportButton: string;
  exportHelper: string;
  exportEmpty: string;
  createTitle: string;
  createSubtitle: string;
  createStepOneTitle: string;
  createStepOneText: string;
  createStepTwoTitle: string;
  createStepTwoText: string;
  createStepThreeTitle: string;
  createStepThreeText: string;
  createStepFourTitle: string;
  createStepFourText: string;
  createStepFiveTitle: string;
  createStepFiveText: string;
  nextStep: string;
  previousStep: string;
  title: string;
  project: string;
  earsType: string;
  conditionMode: string;
  system: string;
  response: string;
  notes: string;
  conditions: string;
  addCondition: string;
  noConditions: string;
  preview: string;
  validation: string;
  saveRequirement: string;
  updateRequirement: string;
  reset: string;
  fieldSubject: string;
  fieldComparator: string;
  fieldValue: string;
  statusReady: string;
  statusNeedsWork: string;
  updatedAt: string;
  requirementTable: string;
  actions: string;
  examples: string;
  linkedProject: string;
}

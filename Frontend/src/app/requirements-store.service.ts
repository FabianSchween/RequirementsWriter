import { Injectable } from '@angular/core';
import {
  EarsType,
  Language,
  Project,
  ProjectType,
  RequirementRecord,
  StructuredCondition,
  TranslationBundle,
  ValidationItem
} from './app.models';

const STORAGE_KEY = 'requirements-writer-state-v3';

@Injectable({ providedIn: 'root' })
export class RequirementsStoreService {
  readonly text: TranslationBundle = {
    appTitle: 'Requirements Writer',
    home: 'Home',
    dashboard: 'Dashboard',
    createRequirement: 'Create Requirements',
    management: 'Project Manager',
    export: 'Export',
    heroTitle: 'Write clearer requirements and teach teams what good requirements look like.',
    heroSubtitle:
      'This homepage works as a practical guide to requirement quality, EARS, and the difference between software and system requirements before users move into authoring and management.',
    learnTitle: 'Guide to Better Requirements',
    learnSubtitle: 'The product should help people learn what good requirements are, not only store them.',
    whatIsRequirement: 'What is a requirement?',
    whatIsRequirementText:
      'A requirement states what a system or software must do under specific conditions. It should be verifiable, observable, and free of ambiguity.',
    softwareRequirement: 'Software requirement',
    softwareRequirementText:
      'A software requirement focuses on logic, data handling, user interaction, APIs, workflows, or state changes inside the software.',
    systemRequirement: 'System requirement',
    systemRequirementText:
      'A system requirement describes the behaviour of the full system, including hardware, interfaces, sensors, actuators, and operating conditions.',
    earsGuideTitle: 'Why EARS?',
    earsGuideText:
      'EARS provides a consistent structure for writing requirements so that triggers, states, and responses become clearer and easier to test.',
    earsPatternTitle: 'Recommended pattern',
    earsPatternText: 'When <trigger>, the system shall <response>.',
    earsTypesTitle: 'EARS types',
    earsTypeUbiquitous: 'Ubiquitous',
    earsTypeUbiquitousText: 'Use this for general truths without a special trigger. Example: The system shall log the current mode.',
    earsTypeEvent: 'Event-driven',
    earsTypeEventText:
      'Use this when something happens and the system must react. Example: When the user presses Start, the system shall begin initialization.',
    earsTypeState: 'State-driven',
    earsTypeStateText:
      'Use this while a state remains true. Example: While battery mode is active, the system shall limit background processing.',
    earsTypeOptional: 'Optional feature',
    earsTypeOptionalText:
      'Use this when behaviour only applies if a feature exists. Example: Where voice control is enabled, the system shall accept spoken commands.',
    earsTypeUnwanted: 'Unwanted behaviour',
    earsTypeUnwantedText:
      'Use this for faults or undesired situations. Example: If sensor data is invalid, the system shall raise a diagnostic alert.',
    qualityRulesTitle: 'Quality rules',
    qualityRulesText: 'These rules should stay visible across every SYS and SW project.',
    qualityRuleOne: 'Use one clear and testable output per requirement.',
    qualityRuleTwo: 'Choose exactly one EARS type for each requirement.',
    qualityRuleThree: 'Keep conditions structured and connect them only with AND or only with OR.',
    qualityRuleFour: 'Avoid vague language such as fast, appropriate, or as well as.',
    qualityRuleFive: 'Write for verification, not for interpretation.',
    dashboardTitle: 'Dashboard',
    dashboardSubtitle: 'Overview of projects, requirement status, and recent changes.',
    projectsTotal: 'Projects',
    requirementsTotal: 'Requirements',
    readyRequirements: 'Ready',
    openProjects: 'Open folders',
    recentRequirements: 'Recent requirements',
    noRequirements: 'No requirements available yet.',
    managementTitle: 'Project Manager',
    managementSubtitle: 'Projects are shown as clickable folders leading to a detail view with tabular requirements.',
    managementHint: 'Create new projects here and mark them explicitly as SYS or SW.',
    createProject: 'Create project',
    projectName: 'Project name',
    projectDescription: 'Short description',
    projectType: 'Project type',
    saveProject: 'Save project',
    projectFolders: 'Project folders',
    openProject: 'Open project',
    detailTitle: 'Project detail',
    detailSubtitle: 'All project requirements in a tabular view.',
    backToManagement: 'Back to management',
    exportTitle: 'Export',
    exportSubtitle: 'Choose a project and export its requirements in a spreadsheet-friendly format.',
    exportProject: 'Select project',
    exportFormat: 'Format',
    exportButton: 'Start export',
    exportHelper: 'For the MVP this generates a CSV file that opens directly in Excel.',
    exportEmpty: 'This project has no requirements to export yet.',
    createTitle: 'Create requirement',
    createSubtitle: 'Requirements are captured separately from management so the authoring flow stays focused.',
    createStepOneTitle: '1. Choose the project',
    createStepOneText: 'Start by selecting the SYS or SW project this requirement belongs to.',
    createStepTwoTitle: '2. Choose the EARS type',
    createStepTwoText:
      'Decide whether the requirement describes a general rule, an event, a state, an optional feature, or an unwanted situation.',
    createStepThreeTitle: '3. Describe the condition',
    createStepThreeText:
      'If the chosen EARS type needs conditions, add them in a structured way and connect them using only AND or only OR.',
    createStepFourTitle: '4. Describe what the system must do',
    createStepFourText: 'Define one clear, observable, and testable system response.',
    createStepFiveTitle: '5. Review the final sentence',
    createStepFiveText: 'Check the generated preview and the validation notes before saving.',
    nextStep: 'Next step',
    previousStep: 'Previous step',
    title: 'Title',
    project: 'Project',
    earsType: 'EARS type',
    conditionMode: 'Condition connector',
    system: 'System/subject',
    response: 'System response',
    notes: 'Notes',
    conditions: 'Conditions',
    addCondition: 'Add condition',
    noConditions: 'This EARS type currently does not need conditions.',
    preview: 'Preview',
    validation: 'Validation',
    saveRequirement: 'Save requirement',
    updateRequirement: 'Update requirement',
    reset: 'Reset',
    fieldSubject: 'Subject',
    fieldComparator: 'Comparator',
    fieldValue: 'Value/state',
    statusReady: 'Ready',
    statusNeedsWork: 'Needs work',
    updatedAt: 'Updated',
    requirementTable: 'Requirement table',
    actions: 'Actions',
    examples: 'Example: Brake Controller, Sensor Fusion, Door ECU',
    linkedProject: 'Linked project'
  };

  readonly uiLanguage: Language = 'en';

  readonly earsTypeOptions: { value: EarsType; label: string }[] = [
    { value: 'ubiquitous', label: 'Ubiquitous' },
    { value: 'event-driven', label: 'Event-driven' },
    { value: 'state-driven', label: 'State-driven' },
    { value: 'optional-feature', label: 'Optional feature' },
    { value: 'unwanted-behavior', label: 'Unwanted behavior' }
  ];

  readonly comparatorOptions = [
    { value: 'is', label: 'is' },
    { value: 'becomes', label: 'becomes' },
    { value: 'equals', label: 'equals' },
    { value: 'exceeds', label: 'exceeds' },
    { value: 'includes', label: 'includes' }
  ];

  projects: Project[] = [
    {
      id: this.createId(),
      name: 'Brake Controller',
      description: 'Braking functions and status indicators',
      type: 'SYS',
      color: '#d97757'
    },
    {
      id: this.createId(),
      name: 'Infotainment UI',
      description: 'Menus, touch interactions, and views',
      type: 'SW',
      color: '#4b7bec'
    }
  ];

  requirements: RequirementRecord[] = [
    {
      id: this.createId(),
      projectId: '',
      earsType: 'event-driven',
      linkMode: 'AND',
      title: 'Display standby state',
      system: 'The system',
      response: 'display the standby status on the dashboard',
      notes: 'Example of a clearly measurable output.',
      conditions: [
        {
          id: this.createId(),
          subject: 'cruise control',
          comparator: 'is',
          value: 'on standby'
        }
      ],
      updatedAt: new Date().toISOString()
    }
  ];

  constructor() {
    this.requirements = this.requirements.map((requirement) => ({
      ...requirement,
      projectId: requirement.projectId || this.projects[0].id
    }));
    this.restoreState();
  }

  createEmptyRequirement(): RequirementRecord {
    return {
      id: this.createId(),
      projectId: this.projects[0]?.id ?? '',
      earsType: 'event-driven',
      linkMode: 'AND',
      title: '',
      system: 'The system',
      response: '',
      notes: '',
      conditions: [this.createEmptyCondition()],
      updatedAt: new Date().toISOString()
    };
  }

  createEmptyCondition(): StructuredCondition {
    return {
      id: this.createId(),
      subject: '',
      comparator: 'is',
      value: ''
    };
  }

  addProject(input: { name: string; description: string; type: ProjectType }): Project | null {
    const name = input.name.trim();
    if (!name) {
      return null;
    }

    const project: Project = {
      id: this.createId(),
      name,
      description: input.description.trim(),
      type: input.type,
      color: this.pickProjectColor()
    };

    this.projects = [project, ...this.projects];
    this.persistState();
    return project;
  }

  updateProject(projectId: string, updates: { name: string; description: string; type: ProjectType }): boolean {
    const index = this.projects.findIndex((project) => project.id === projectId);
    if (index < 0) {
      return false;
    }

    this.projects[index] = {
      ...this.projects[index],
      name: updates.name.trim(),
      description: updates.description.trim(),
      type: updates.type
    };
    this.projects = [...this.projects];
    this.persistState();
    return true;
  }

  deleteProject(projectId: string): boolean {
    const exists = this.projects.some((project) => project.id === projectId);
    if (!exists) {
      return false;
    }

    this.projects = this.projects.filter((project) => project.id !== projectId);
    this.requirements = this.requirements.filter((requirement) => requirement.projectId !== projectId);
    this.persistState();
    return true;
  }

  saveRequirement(requirement: RequirementRecord): boolean {
    if (this.buildValidation(requirement).some((item) => item.severity === 'error')) {
      return false;
    }

    const payload = this.cloneRequirement(requirement);
    payload.updatedAt = new Date().toISOString();
    const existingIndex = this.requirements.findIndex((item) => item.id === payload.id);

    if (existingIndex >= 0) {
      this.requirements[existingIndex] = payload;
      this.requirements = [...this.requirements];
    } else {
      this.requirements = [payload, ...this.requirements];
    }

    this.persistState();
    return true;
  }

  deleteRequirement(requirementId: string): boolean {
    const exists = this.requirements.some((requirement) => requirement.id === requirementId);
    if (!exists) {
      return false;
    }

    this.requirements = this.requirements.filter((requirement) => requirement.id !== requirementId);
    this.persistState();
    return true;
  }

  getRequirementsByProject(projectId: string): RequirementRecord[] {
    return this.requirements.filter((requirement) => requirement.projectId === projectId);
  }

  getProjectById(projectId: string): Project | undefined {
    return this.projects.find((project) => project.id === projectId);
  }

  earsTypeLabel(earsType: EarsType): string {
    return this.earsTypeOptions.find((option) => option.value === earsType)?.label ?? earsType;
  }

  comparatorLabel(comparator: string): string {
    return this.comparatorOptions.find((option) => option.value === comparator)?.label ?? comparator;
  }

  requiresConditions(earsType: EarsType): boolean {
    return earsType !== 'ubiquitous';
  }

  previewText(requirement: RequirementRecord): string {
    const system = requirement.system.trim();
    const response = requirement.response.trim();
    const conditions = requirement.conditions
      .map((condition) => this.conditionText(condition))
      .filter(Boolean)
      .join(requirement.linkMode === 'AND' ? ' and ' : ' or ');

    switch (requirement.earsType) {
      case 'ubiquitous':
        return this.finishSentence([this.normalizeSentenceStart(system), 'shall', response]);
      case 'event-driven':
        return this.composeSentence('When', conditions, system, 'shall', response);
      case 'state-driven':
        return this.composeSentence('While', conditions, system, 'shall', response);
      case 'optional-feature':
        return this.composeSentence('Where', conditions, system, 'shall', response);
      case 'unwanted-behavior':
        return this.composeSentence('If', conditions, system, 'shall', response);
      default:
        return '';
    }
  }

  buildValidation(requirement: RequirementRecord): ValidationItem[] {
    const items: ValidationItem[] = [];

    if (!requirement.projectId) {
      items.push({ severity: 'error', text: 'A project must be selected.' });
    }

    if (!requirement.title.trim()) {
      items.push({ severity: 'error', text: 'A title is required.' });
    }

    if (!requirement.system.trim() || !requirement.response.trim()) {
      items.push({ severity: 'error', text: 'System and response must be complete.' });
    }

    if (this.requiresConditions(requirement.earsType) && requirement.conditions.length === 0) {
      items.push({ severity: 'error', text: 'At least one condition is required for this EARS type.' });
    }

    requirement.conditions.forEach((condition, index) => {
      if (!condition.subject.trim() || !condition.value.trim()) {
        items.push({ severity: 'error', text: `Condition ${index + 1} is empty.` });
      }
    });

    if (/\b(and|or)\b/.test(requirement.response.toLowerCase())) {
      items.push({
        severity: 'warning',
        text: 'The response looks multi-part. A testable requirement should describe exactly one clear output.'
      });
    }

    if (items.length === 0) {
      items.push({
        severity: 'info',
        text: 'The structure is consistent and suitable for MVP-level validation.'
      });
    }

    return items;
  }

  validationState(requirement: RequirementRecord): string {
    return this.buildValidation(requirement).every((item) => item.severity !== 'error')
      ? this.text.statusReady
      : this.text.statusNeedsWork;
  }

  exportRequirementsAsCsv(projectId: string): boolean {
    const project = this.getProjectById(projectId);
    const requirements = this.getRequirementsByProject(projectId);
    if (!project || requirements.length === 0) {
      return false;
    }

    const headers = ['Project', 'Project Type', 'Requirement ID', 'Title', 'EARS Type', 'Condition Mode', 'System', 'Response', 'Notes', 'Updated At'];

    const rows = requirements.map((requirement) => [
      project.name,
      project.type,
      requirement.id,
      requirement.title,
      this.earsTypeLabel(requirement.earsType),
      requirement.linkMode,
      requirement.system,
      requirement.response,
      requirement.notes,
      requirement.updatedAt
    ]);

    const separator = ';';
    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`).join(separator))
      .join('\n');

    const csvWithBom = '\uFEFF' + csv;
    const blob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.type}-${project.name.replace(/\s+/g, '-').toLowerCase()}-requirements.csv`;
    link.click();
    URL.revokeObjectURL(url);
    return true;
  }

  cloneRequirement(requirement: RequirementRecord): RequirementRecord {
    return {
      ...requirement,
      conditions: requirement.conditions.map((condition) => ({ ...condition }))
    };
  }

  private restoreState(): void {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const state = JSON.parse(raw) as { projects?: Project[]; requirements?: RequirementRecord[] };
      if (state.projects?.length) {
        this.projects = state.projects;
      }
      if (state.requirements?.length) {
        this.requirements = state.requirements.map((requirement) => this.normalizeRequirement(requirement));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  private normalizeRequirement(requirement: any): RequirementRecord {
    return {
      id: requirement.id ?? this.createId(),
      projectId: requirement.projectId ?? this.projects[0]?.id ?? '',
      earsType: requirement.earsType ?? 'event-driven',
      linkMode: requirement.linkMode ?? 'AND',
      title: typeof requirement.title === 'string' ? requirement.title : requirement.title?.en ?? '',
      system: typeof requirement.system === 'string' ? requirement.system : requirement.system?.en ?? 'The system',
      response: typeof requirement.response === 'string' ? requirement.response : requirement.response?.en ?? '',
      notes: typeof requirement.notes === 'string' ? requirement.notes : requirement.notes?.en ?? '',
      conditions: Array.isArray(requirement.conditions)
        ? requirement.conditions.map((condition: any) => ({
            id: condition.id ?? this.createId(),
            comparator: condition.comparator ?? 'is',
            subject: typeof condition.subject === 'string' ? condition.subject : condition.subject?.en ?? '',
            value: typeof condition.value === 'string' ? condition.value : condition.value?.en ?? ''
          }))
        : [],
      updatedAt: requirement.updatedAt ?? new Date().toISOString()
    };
  }

  private persistState(): void {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        projects: this.projects,
        requirements: this.requirements
      })
    );
  }

  private composeSentence(prefix: string, conditionText: string, system: string, imperative: string, response: string): string {
    if (!conditionText) {
      return this.finishSentence([this.normalizeSentenceStart(system), imperative, response]);
    }
    return this.finishSentence([`${prefix} ${conditionText},`, this.normalizeInlinePhrase(system), imperative, response]);
  }

  private conditionText(condition: StructuredCondition): string {
    return [condition.subject.trim(), this.comparatorLabel(condition.comparator), condition.value.trim()].filter(Boolean).join(' ').trim();
  }

  private normalizeSentenceStart(text: string): string {
    const trimmed = text.trim();
    if (!trimmed) {
      return trimmed;
    }
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  }

  private normalizeInlinePhrase(text: string): string {
    const trimmed = text.trim();
    if (!trimmed) {
      return trimmed;
    }
    return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
  }

  private finishSentence(parts: string[]): string {
    const sentence = parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
    if (!sentence) {
      return '';
    }
    const normalized = this.normalizeSentenceStart(sentence);
    return normalized.endsWith('.') ? normalized : `${normalized}.`;
  }

  private pickProjectColor(): string {
    const palette = ['#d97757', '#4b7bec', '#1f9d8b', '#b084f5', '#d96c75', '#f0b429'];
    return palette[this.projects.length % palette.length];
  }

  private createId(): string {
    return Math.random().toString(36).slice(2, 10);
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EarsType, Language, RequirementRecord } from '../app.models';
import { RequirementsStoreService } from '../requirements-store.service';

@Component({
  selector: 'app-requirements-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    .wizard-shell {
      max-width: 1080px;
      margin: 0 auto;
      display: grid;
      gap: 20px;
    }

    .intro-card,
    .step-card,
    .preview-card {
      background: rgba(255, 255, 255, 0.88);
      border: 1px solid rgba(17, 91, 166, 0.1);
      border-radius: 24px;
      padding: 24px;
      box-shadow: 0 20px 40px rgba(14, 52, 94, 0.08);
    }

    .header-row,
    .stepper,
    .wizard-footer,
    .wizard-actions,
    .preview-header {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .header-row,
    .wizard-footer,
    .preview-header {
      justify-content: space-between;
    }

    .step-chip,
    .ears-card,
    .nav-button {
      border: 1px solid rgba(17, 91, 166, 0.12);
      border-radius: 18px;
    }

    .nav-button {
      padding: 10px 14px;
      background: rgba(11, 31, 51, 0.04);
      cursor: pointer;
    }

    .nav-button.primary {
      background: linear-gradient(135deg, #0a78ff, #11b5ff);
      color: #fff;
      border-color: transparent;
    }

    .stepper {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 12px;
    }

    .step-chip {
      padding: 14px 16px;
      background: rgba(11, 31, 51, 0.03);
      text-align: left;
      height: 170px;
      display: flex;
      flex-direction: column;
      justify-content: start;
      transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease, background 160ms ease;
    }

    .step-chip.active {
      background: linear-gradient(135deg, rgba(10, 120, 255, 0.12), rgba(17, 181, 255, 0.12));
      border-color: rgba(10, 120, 255, 0.28);
      transform: scale(1.04);
      box-shadow: 0 16px 28px rgba(10, 120, 255, 0.14);
      z-index: 1;
    }

    .step-chip strong,
    .ears-card strong {
      display: block;
      margin-bottom: 4px;
    }

    .step-chip-index {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 999px;
      margin-bottom: 10px;
      background: rgba(17, 67, 126, 0.08);
      color: #11437e;
      font-size: 0.88rem;
      font-weight: 700;
    }

    .step-chip.active .step-chip-index {
      background: rgba(255, 255, 255, 0.78);
      color: #0a78ff;
    }

    .step-chip span,
    .ears-card span,
    .helper,
    .result-text,
    .field-hint {
      color: #52627a;
      line-height: 1.55;
    }

    .step-card {
      display: grid;
      gap: 18px;
    }

    .simple-grid,
    .conditions-grid,
    .preview-grid,
    .ears-grid {
      display: grid;
      gap: 16px;
    }

    .ears-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .ears-card {
      text-align: left;
      padding: 18px;
      background: rgba(255, 255, 255, 0.92);
      cursor: pointer;
    }

    .ears-card.selected {
      background: linear-gradient(135deg, rgba(10, 120, 255, 0.1), rgba(17, 181, 255, 0.12));
      border-color: rgba(10, 120, 255, 0.34);
    }

    label {
      display: grid;
      gap: 8px;
    }

    input,
    textarea,
    select {
      width: 100%;
      border-radius: 14px;
      border: 1px solid rgba(17, 67, 126, 0.14);
      background: rgba(255, 255, 255, 0.95);
      padding: 12px 14px;
      color: #14213d;
      font: inherit;
    }

    textarea {
      min-height: 110px;
      resize: vertical;
    }

    .conditions-grid {
      grid-template-columns: 1.2fr 0.85fr 1.1fr auto;
      padding: 16px;
      border-radius: 18px;
      background: linear-gradient(180deg, rgba(17, 91, 166, 0.05), rgba(47, 192, 255, 0.05));
    }

    .remove-button {
      align-self: end;
      min-width: 44px;
      height: 44px;
      border: 0;
      border-radius: 14px;
      cursor: pointer;
      background: rgba(168, 61, 75, 0.08);
      color: #a83d4b;
    }

    .preview-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .preview-card {
      display: grid;
      gap: 16px;
    }

    .result-box,
    .validation-box {
      border-radius: 18px;
      padding: 16px;
      background: rgba(17, 67, 126, 0.05);
    }

    .validation-item {
      border-radius: 14px;
      padding: 12px 14px;
    }

    .validation-item + .validation-item {
      margin-top: 10px;
    }

    .validation-item.error {
      background: rgba(168, 61, 75, 0.1);
      color: #8d2635;
    }

    .validation-item.warning {
      background: rgba(240, 180, 41, 0.15);
      color: #8a6117;
    }

    .validation-item.info {
      background: rgba(31, 157, 139, 0.13);
      color: #136d61;
    }

    .status-pill {
      display: inline-flex;
      align-items: center;
      border-radius: 999px;
      padding: 6px 10px;
      font-size: 0.88rem;
      background: rgba(168, 61, 75, 0.1);
      color: #8d2635;
    }

    .status-pill.ready {
      background: rgba(31, 157, 139, 0.12);
      color: #136d61;
    }

    @media (max-width: 900px) {
      .stepper,
      .ears-grid,
      .preview-grid {
        grid-template-columns: 1fr;
      }

      .conditions-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  template: `
    <div class="wizard-shell">
      <section class="intro-card">
        <div class="header-row">
          <div>
            <p class="eyebrow">{{ store.text.createRequirement }}</p>
            <h1>{{ store.text.createTitle }}</h1>
            <p class="section-copy">{{ store.text.createSubtitle }}</p>
          </div>

        </div>
      </section>

      <section class="step-card">
        <div class="stepper">
          @for (item of steps; track item.id) {
            <button type="button" class="step-chip" [class.active]="step === item.id" (click)="goToStep(item.id)">
              <span class="step-chip-index">{{ item.id }}</span>
              <strong>{{ item.title }}</strong>
              <span>{{ item.text }}</span>
            </button>
          }
        </div>

        @if (step === 1) {
          <div class="simple-grid">
            <div>
              <h2>{{ store.text.createStepOneTitle }}</h2>
              <p class="helper">{{ store.text.createStepOneText }}</p>
            </div>

            <label>
              <span>{{ store.text.linkedProject }}</span>
              <select [(ngModel)]="draft.projectId">
                @for (project of store.projects; track project.id) {
                  <option [value]="project.id">{{ project.type }} | {{ project.name }}</option>
                }
              </select>
            </label>
          </div>
        }

        @if (step === 2) {
          <div class="simple-grid">
            <div>
              <h2>{{ store.text.createStepTwoTitle }}</h2>
              <p class="helper">{{ store.text.createStepTwoText }}</p>
            </div>

            <div class="ears-grid">
                @for (option of store.earsTypeOptions; track option.value) {
                <button type="button" class="ears-card" [class.selected]="draft.earsType === option.value" (click)="selectEarsType(option.value)">
                  <strong>{{ option.label }}</strong>
                  <span>{{ explainEarsType(option.value) }}</span>
                </button>
              }
            </div>
          </div>
        }

        @if (step === 3) {
          <div class="simple-grid">
            <div>
              <h2>{{ store.text.createStepThreeTitle }}</h2>
              <p class="helper">{{ store.text.createStepThreeText }}</p>
            </div>

            @if (!store.requiresConditions(draft.earsType)) {
              <div class="result-box">
                <strong>{{ store.earsTypeLabel(draft.earsType) }}</strong>
                <p class="result-text">{{ store.text.noConditions }}</p>
              </div>
            } @else {
              <label>
                <span>{{ store.text.conditionMode }}</span>
                <select [(ngModel)]="draft.linkMode">
                  <option value="AND">AND</option>
                  <option value="OR">OR</option>
                </select>
              </label>

              @for (condition of draft.conditions; track condition.id) {
                <div class="conditions-grid">
                  <label>
                    <span>{{ store.text.fieldSubject }}</span>
                    <input [(ngModel)]="condition.subject" [placeholder]="conditionSubjectPlaceholder()" />
                    <small class="field-hint">What starts or defines the condition?</small>
                  </label>

                  <label>
                    <span>{{ store.text.fieldComparator }}</span>
                    <select [(ngModel)]="condition.comparator">
                      @for (option of store.comparatorOptions; track option.value) {
                        <option [value]="option.value">{{ option.label }}</option>
                      }
                    </select>
                  </label>

                  <label>
                    <span>{{ store.text.fieldValue }}</span>
                    <input [(ngModel)]="condition.value" [placeholder]="conditionValuePlaceholder()" />
                    <small class="field-hint">What state, value, or event must be true?</small>
                  </label>

                  <button type="button" class="remove-button" (click)="removeCondition(condition.id)">x</button>
                </div>
              }

              <button type="button" class="nav-button" (click)="addCondition()">{{ store.text.addCondition }}</button>
            }
          </div>
        }

        @if (step === 4) {
          <div class="simple-grid">
            <div>
              <h2>{{ store.text.createStepFourTitle }}</h2>
              <p class="helper">{{ store.text.createStepFourText }}</p>
            </div>

            <label>
              <span>{{ store.text.title }}</span>
              <input [(ngModel)]="draft.title" [placeholder]="titlePlaceholder()" />
            </label>

            <label>
              <span>{{ store.text.system }}</span>
              <input [(ngModel)]="draft.system" [placeholder]="systemPlaceholder()" />
              <small class="field-hint">Who performs the action? Usually "The system".</small>
            </label>

            <label>
              <span>{{ store.text.response }}</span>
              <textarea [(ngModel)]="draft.response" [placeholder]="responsePlaceholder()"></textarea>
              <small class="field-hint">Write exactly one clear thing the system shall do.</small>
            </label>

            <label>
              <span>{{ store.text.notes }}</span>
              <textarea rows="3" [(ngModel)]="draft.notes" placeholder="Optional notes"></textarea>
            </label>
          </div>
        }

        @if (step === 5) {
          <div class="simple-grid">
            <div>
              <h2>{{ store.text.createStepFiveTitle }}</h2>
              <p class="helper">{{ store.text.createStepFiveText }}</p>
            </div>

            <div class="preview-grid">
              <section class="preview-card">
                <div class="preview-header">
                  <strong>Result</strong>
                  <span class="status-pill" [class.ready]="draftIsValid">
                    {{ draftIsValid ? store.text.statusReady : store.text.statusNeedsWork }}
                  </span>
                </div>

                <div class="result-box">
                  <strong>English</strong>
                  <p class="result-text">{{ previewInSelectedLanguage }}</p>
                </div>
              </section>

              <section class="preview-card">
                <div class="preview-header">
                  <strong>{{ store.text.validation }}</strong>
                </div>

                <div class="validation-box">
                  <p class="field-hint">
                    {{ validationHelperText }}
                  </p>
                  @for (item of validation; track item.text) {
                    <div class="validation-item" [class]="item.severity">{{ item.text }}</div>
                  }
                </div>
              </section>
            </div>
          </div>
        }

        <div class="wizard-footer">
          <button type="button" class="nav-button" [disabled]="step === 1" (click)="previousStep()">{{ store.text.previousStep }}</button>

          <div class="wizard-actions">
            <button type="button" class="nav-button" (click)="reset()">{{ store.text.reset }}</button>
            @if (step < 5) {
              <button type="button" class="nav-button primary" [disabled]="!canMoveNext" (click)="nextStep()">{{ store.text.nextStep }}</button>
            } @else {
              <button type="button" class="nav-button primary" [disabled]="!draftIsValid" (click)="save()">{{ store.text.saveRequirement }}</button>
            }
          </div>
        </div>
      </section>
    </div>
  `
})
export class RequirementsPageComponent {
  readonly entryLanguage: Language = 'en';
  draft: RequirementRecord;
  step = 1;

  constructor(public store: RequirementsStoreService) {
    this.draft = this.store.createEmptyRequirement();
  }

  get steps() {
    return [
      { id: 1, title: this.store.text.createStepOneTitle, text: this.store.text.createStepOneText },
      { id: 2, title: this.store.text.createStepTwoTitle, text: this.store.text.createStepTwoText },
      { id: 3, title: this.store.text.createStepThreeTitle, text: this.store.text.createStepThreeText },
      { id: 4, title: this.store.text.createStepFourTitle, text: this.store.text.createStepFourText },
      { id: 5, title: this.store.text.createStepFiveTitle, text: this.store.text.createStepFiveText }
    ];
  }

  get validation() {
    return this.store.buildValidation(this.draft);
  }

  get draftIsValid(): boolean {
    return this.validation.every((item) => item.severity !== 'error');
  }

  get previewInSelectedLanguage(): string {
    return this.store.previewText(this.draft);
  }

  get validationHelperText(): string {
    return 'Validation comes from the built-in requirement rules in this app. It checks project selection, missing fields, required conditions, and whether the response looks like one clear testable output.';
  }

  get canMoveNext(): boolean {
    switch (this.step) {
      case 1:
        return !!this.draft.projectId;
      case 2:
        return !!this.draft.earsType;
      case 3:
        return !this.store.requiresConditions(this.draft.earsType) || this.draft.conditions.some((condition) =>
          !!condition.subject.trim() && !!condition.value.trim()
        );
      case 4:
        return !!this.draft.title.trim() && !!this.draft.response.trim();
      default:
        return true;
    }
  }

  goToStep(step: number): void {
    this.step = step;
  }

  explainEarsType(value: EarsType): string {
    switch (value) {
      case 'ubiquitous':
        return this.store.text.earsTypeUbiquitousText;
      case 'event-driven':
        return this.store.text.earsTypeEventText;
      case 'state-driven':
        return this.store.text.earsTypeStateText;
      case 'optional-feature':
        return this.store.text.earsTypeOptionalText;
      case 'unwanted-behavior':
        return this.store.text.earsTypeUnwantedText;
      default:
        return '';
    }
  }

  selectEarsType(type: EarsType): void {
    this.draft.earsType = type;
    if (!this.store.requiresConditions(type)) {
      this.draft.conditions = [];
      return;
    }
    if (this.draft.conditions.length === 0) {
      this.draft.conditions = [this.store.createEmptyCondition()];
    }
  }

  addCondition(): void {
    this.draft.conditions = [...this.draft.conditions, this.store.createEmptyCondition()];
  }

  removeCondition(conditionId: string): void {
    this.draft.conditions = this.draft.conditions.filter((item) => item.id !== conditionId);
    if (this.draft.conditions.length === 0 && this.store.requiresConditions(this.draft.earsType)) {
      this.draft.conditions = [this.store.createEmptyCondition()];
    }
  }

  nextStep(): void {
    if (this.step < 5 && this.canMoveNext) {
      this.step += 1;
    }
  }

  previousStep(): void {
    if (this.step > 1) {
      this.step -= 1;
    }
  }

  titlePlaceholder(): string {
    return 'Example: Show standby status';
  }

  systemPlaceholder(): string {
    return 'The system';
  }

  responsePlaceholder(): string {
    return 'Example: display the standby status on the dashboard';
  }

  conditionSubjectPlaceholder(): string {
    return 'Example: cruise control';
  }

  conditionValuePlaceholder(): string {
    return 'Example: on standby';
  }

  save(): void {
    if (this.store.saveRequirement(this.draft)) {
      this.reset();
    }
  }

  reset(): void {
    this.draft = this.store.createEmptyRequirement();
    this.step = 1;
  }
}

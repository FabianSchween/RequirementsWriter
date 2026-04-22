import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectType } from '../app.models';
import { RequirementsStoreService } from '../requirements-store.service';

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  styles: [`
    .detail-layout,
    .detail-header-actions,
    .project-form-grid {
      display: grid;
      gap: 16px;
    }

    .detail-layout {
      gap: 20px;
    }

    .detail-header-actions {
      grid-template-columns: 1fr auto;
      align-items: start;
    }

    .project-form-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .project-form-grid .full {
      grid-column: 1 / -1;
    }

    .action-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: end;
    }

    .inline-button {
      border: 0;
      border-radius: 14px;
      padding: 10px 14px;
      cursor: pointer;
      background: rgba(11, 31, 51, 0.06);
      color: #11437e;
    }

    .inline-button.primary {
      background: linear-gradient(135deg, #0a78ff, #11b5ff);
      color: #fff;
    }

    .inline-button.danger {
      background: rgba(168, 61, 75, 0.1);
      color: #8d2635;
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
      min-height: 96px;
      resize: vertical;
    }

    .title-cell,
    .generated-cell,
    .response-cell {
      display: grid;
      gap: 6px;
    }

    .title-cell strong,
    .generated-cell strong,
    .response-cell strong {
      font-size: 1rem;
      color: #0b1f33;
    }

    .generated-text,
    .response-text {
      color: #52627a;
      line-height: 1.55;
    }

    .table-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    @media (max-width: 900px) {
      .detail-header-actions,
      .project-form-grid {
        grid-template-columns: 1fr;
      }

      .action-row {
        justify-content: start;
      }
    }
  `],
  template: `
    @if (project) {
      <section class="detail-layout">
        <section class="page-header">
          <div>
            <p class="eyebrow">{{ store.text.detailTitle }}</p>
            <h1>{{ project.type }} | {{ project.name }}</h1>
            <p class="section-copy">{{ project.description || store.text.detailSubtitle }}</p>
          </div>
          <a routerLink="/management" class="ghost-link">{{ store.text.backToManagement }}</a>
        </section>

        <section class="panel">
          <div class="detail-header-actions">
            <div>
              <p class="eyebrow">Project settings</p>
              <h2>Edit project</h2>
              <p class="section-copy">Rename the project folder, update its description, or delete the full project with all linked requirements.</p>
            </div>
            <div class="action-row">
              <button type="button" class="inline-button" (click)="resetEdit()">Reset</button>
              <button type="button" class="inline-button primary" (click)="saveProjectChanges()">Save changes</button>
              <button type="button" class="inline-button danger" (click)="deleteProject()">Delete project</button>
            </div>
          </div>

          <div class="project-form-grid">
            <label>
              <span>Project name</span>
              <input [(ngModel)]="editProject.name" />
            </label>

            <label>
              <span>Project type</span>
              <select [(ngModel)]="editProject.type">
                <option value="SYS">SYS</option>
                <option value="SW">SW</option>
              </select>
            </label>

            <label class="full">
              <span>Description</span>
              <textarea rows="3" [(ngModel)]="editProject.description"></textarea>
            </label>
          </div>
        </section>

        <section class="panel">
          <div class="panel-header">
            <div>
              <p class="eyebrow">{{ store.text.requirementTable }}</p>
              <h2>{{ store.text.requirementTable }}</h2>
            </div>
          </div>

          @if (requirements.length === 0) {
            <div class="empty-state">{{ store.text.noRequirements }}</div>
          } @else {
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{{ store.text.title }}</th>
                    <th>Generated requirement</th>
                    <th>{{ store.text.earsType }}</th>
                    <th>{{ store.text.response }}</th>
                    <th>{{ store.text.updatedAt }}</th>
                    <th>{{ store.text.validation }}</th>
                    <th>{{ store.text.actions }}</th>
                  </tr>
                </thead>
                <tbody>
                  @for (requirement of requirements; track requirement.id) {
                    <tr>
                      <td>
                        <div class="title-cell">
                          <strong>{{ requirement.title }}</strong>
                        </div>
                      </td>
                      <td>
                        <div class="generated-cell">
                          <strong>Preview</strong>
                          <span class="generated-text">{{ store.previewText(requirement) }}</span>
                        </div>
                      </td>
                      <td>{{ store.earsTypeLabel(requirement.earsType) }}</td>
                      <td>
                        <div class="response-cell">
                          <strong>Response</strong>
                          <span class="response-text">{{ requirement.response }}</span>
                        </div>
                      </td>
                      <td>{{ requirement.updatedAt | date: 'short' }}</td>
                      <td>
                        <span class="status-pill" [class.ready]="store.validationState(requirement) === store.text.statusReady">
                          {{ store.validationState(requirement) }}
                        </span>
                      </td>
                      <td>
                        <div class="table-actions">
                          <button type="button" class="inline-button danger" (click)="deleteRequirement(requirement.id)">Delete</button>
                        </div>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </section>
      </section>
    } @else {
      <section class="panel">
        <div class="empty-state">Project not found.</div>
      </section>
    }
  `
})
export class ProjectDetailPageComponent {
  editProject: { name: string; description: string; type: ProjectType } = {
    name: '',
    description: '',
    type: 'SYS'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public store: RequirementsStoreService
  ) {
    this.resetEdit();
  }

  get project() {
    return this.store.getProjectById(this.projectId);
  }

  get requirements() {
    return this.store.getRequirementsByProject(this.projectId);
  }

  get projectId(): string {
    return this.route.snapshot.paramMap.get('projectId') ?? '';
  }

  resetEdit(): void {
    const project = this.store.getProjectById(this.projectId);
    if (!project) {
      return;
    }
    this.editProject = {
      name: project.name,
      description: project.description,
      type: project.type
    };
  }

  saveProjectChanges(): void {
    this.store.updateProject(this.projectId, this.editProject);
  }

  deleteRequirement(requirementId: string): void {
    this.store.deleteRequirement(requirementId);
  }

  deleteProject(): void {
    const confirmed = window.confirm('Delete this project and all linked requirements?');
    if (!confirmed) {
      return;
    }

    this.store.deleteProject(this.projectId);
    this.router.navigateByUrl('/management');
  }
}

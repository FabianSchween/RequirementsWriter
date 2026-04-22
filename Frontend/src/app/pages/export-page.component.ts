import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RequirementsStoreService } from '../requirements-store.service';

@Component({
  selector: 'app-export-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="page-header">
      <div>
        <p class="eyebrow">{{ store.text.export }}</p>
        <h1>{{ store.text.exportTitle }}</h1>
        <p class="section-copy">{{ store.text.exportSubtitle }}</p>
      </div>
    </section>

    <section class="export-layout">
      <article class="panel">
        <div class="project-form">
          <label>
            <span>{{ store.text.exportProject }}</span>
            <select [(ngModel)]="selectedProjectId">
              @for (project of store.projects; track project.id) {
                <option [value]="project.id">{{ project.type }} | {{ project.name }}</option>
              }
            </select>
          </label>

          <label>
            <span>{{ store.text.exportFormat }}</span>
            <input value="CSV for Excel" disabled />
          </label>

          <p class="section-copy">{{ store.text.exportHelper }}</p>

          <button type="button" class="primary" [disabled]="!hasRequirements" (click)="exportCsv()">
            {{ store.text.exportButton }}
          </button>
        </div>
      </article>

      <article class="panel">
        <div class="panel-header">
          <div>
            <p class="eyebrow">{{ store.text.requirementTable }}</p>
            <h2>{{ selectedProject?.name || store.text.exportProject }}</h2>
          </div>
          @if (selectedProject) {
            <span class="type-pill">{{ selectedProject.type }}</span>
          }
        </div>

        @if (!hasRequirements) {
          <div class="empty-state">{{ store.text.exportEmpty }}</div>
        } @else {
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{{ store.text.title }}</th>
                  <th>{{ store.text.earsType }}</th>
                  <th>{{ store.text.response }}</th>
                  <th>{{ store.text.updatedAt }}</th>
                </tr>
              </thead>
              <tbody>
                @for (requirement of requirements; track requirement.id) {
                  <tr>
                    <td>{{ requirement.title }}</td>
                    <td>{{ store.earsTypeLabel(requirement.earsType) }}</td>
                    <td>{{ requirement.response }}</td>
                    <td>{{ requirement.updatedAt | date: 'short' }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </article>
    </section>
  `
})
export class ExportPageComponent {
  selectedProjectId = '';

  constructor(public store: RequirementsStoreService) {
    this.selectedProjectId = this.store.projects[0]?.id ?? '';
  }

  get selectedProject() {
    return this.store.getProjectById(this.selectedProjectId);
  }

  get requirements() {
    return this.store.getRequirementsByProject(this.selectedProjectId);
  }

  get hasRequirements(): boolean {
    return this.requirements.length > 0;
  }

  exportCsv(): void {
    this.store.exportRequirementsAsCsv(this.selectedProjectId);
  }
}

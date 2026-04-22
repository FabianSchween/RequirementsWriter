import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProjectType } from '../app.models';
import { RequirementsStoreService } from '../requirements-store.service';

@Component({
  selector: 'app-management-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="page-header">
      <div>
        <p class="eyebrow">{{ store.text.management }}</p>
        <h1>{{ store.text.managementTitle }}</h1>
        <p class="section-copy">{{ store.text.managementSubtitle }}</p>
      </div>
    </section>

    <section class="management-layout">
      <article class="panel">
        <div class="panel-header">
          <div>
            <p class="eyebrow">{{ store.text.createProject }}</p>
            <h2>{{ store.text.createProject }}</h2>
          </div>
        </div>
        <p class="section-copy">{{ store.text.managementHint }}</p>

        <div class="project-form">
          <label>
            <span>{{ store.text.projectName }}</span>
            <input [(ngModel)]="newProject.name" [placeholder]="store.text.examples" />
          </label>
          <label>
            <span>{{ store.text.projectDescription }}</span>
            <textarea rows="3" [(ngModel)]="newProject.description"></textarea>
          </label>
          <label>
            <span>{{ store.text.projectType }}</span>
            <select [(ngModel)]="newProject.type">
              <option value="SYS">SYS</option>
              <option value="SW">SW</option>
            </select>
          </label>
          <button type="button" class="primary" (click)="createProject()">{{ store.text.saveProject }}</button>
        </div>
      </article>

      <article class="panel">
        <div class="panel-header">
          <div>
            <p class="eyebrow">{{ store.text.projectFolders }}</p>
            <h2>{{ store.text.projectFolders }}</h2>
          </div>
        </div>

        <div class="folder-grid">
          @for (project of store.projects; track project.id) {
            <a class="folder-card" [routerLink]="['/management', project.id]">
              <div class="folder-top">
                <span class="folder-icon"></span>
                <span class="type-pill">{{ project.type }}</span>
              </div>
              <strong>{{ project.name }}</strong>
              <p>{{ project.description }}</p>
              <div class="folder-footer">
                <small>{{ store.getRequirementsByProject(project.id).length }} Requirements</small>
                <span>{{ store.text.openProject }}</span>
              </div>
            </a>
          }
        </div>
      </article>
    </section>
  `
})
export class ManagementPageComponent {
  newProject: { name: string; description: string; type: ProjectType } = {
    name: '',
    description: '',
    type: 'SYS'
  };

  constructor(public store: RequirementsStoreService) {}

  createProject(): void {
    const created = this.store.addProject(this.newProject);
    if (created) {
      this.newProject = { name: '', description: '', type: 'SYS' };
    }
  }
}

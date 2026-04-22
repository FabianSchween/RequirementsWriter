import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RequirementsStoreService } from '../requirements-store.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="page-header hero-surface">
      <div class="hero-copy">
        <p class="eyebrow">{{ store.text.dashboard }}</p>
        <h1>{{ store.text.dashboardTitle }}</h1>
        <p class="section-copy">{{ store.text.dashboardSubtitle }}</p>
        <div class="hero-points">
          <span>Structured EARS authoring</span>
          <span>Clear SYS / SW project folders</span>
          <span>Testable output validation</span>
        </div>
      </div>
      <div class="hero-actions">
        <a routerLink="/requirements" class="primary-link">{{ store.text.createRequirement }}</a>
        <a routerLink="/management" class="ghost-link">{{ store.text.management }}</a>
      </div>
    </section>

    <section class="stats-grid">
      <article class="stat-card">
        <span>{{ store.text.projectsTotal }}</span>
        <strong>{{ store.projects.length }}</strong>
      </article>
      <article class="stat-card">
        <span>{{ store.text.requirementsTotal }}</span>
        <strong>{{ store.requirements.length }}</strong>
      </article>
      <article class="stat-card">
        <span>{{ store.text.readyRequirements }}</span>
        <strong>{{ readyRequirements }}</strong>
      </article>
      <article class="stat-card">
        <span>{{ store.text.openProjects }}</span>
        <strong>{{ store.projects.length }}</strong>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">{{ store.text.recentRequirements }}</p>
          <h2>{{ store.text.recentRequirements }}</h2>
        </div>
      </div>

      @if (recentRequirements.length === 0) {
        <div class="empty-state">{{ store.text.noRequirements }}</div>
      } @else {
        <div class="recent-list">
              @for (requirement of recentRequirements; track requirement.id) {
            <article class="recent-card">
              <div>
                <strong>{{ requirement.title }}</strong>
                <p>{{ store.previewText(requirement) }}</p>
              </div>
              <div class="recent-meta">
                <span class="type-pill">{{ store.getProjectById(requirement.projectId)?.type }}</span>
                <span>{{ store.getProjectById(requirement.projectId)?.name }}</span>
              </div>
            </article>
          }
        </div>
      }
    </section>
  `
})
export class DashboardPageComponent {
  constructor(public store: RequirementsStoreService) {}

  get readyRequirements(): number {
    return this.store.requirements.filter((item) => this.store.validationState(item) === this.store.text.statusReady).length;
  }

  get recentRequirements() {
    return [...this.store.requirements].slice(0, 5);
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RequirementsStoreService } from '../requirements-store.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="page-header hero-surface home-hero">
      <div class="hero-copy">
        <p class="eyebrow">{{ store.text.home }}</p>
        <h1>{{ store.text.heroTitle }}</h1>
        <p class="section-copy">{{ store.text.heroSubtitle }}</p>
        <div class="hero-points">
          <span>EARS-guided writing</span>
          <span>SYS and SW project folders</span>
          <span>Spreadsheet-ready export</span>
        </div>
      </div>
    </section>

    <section class="panel intro-grid">
      <div>
        <p class="eyebrow">{{ store.text.learnTitle }}</p>
        <h2>{{ store.text.learnTitle }}</h2>
        <p class="section-copy">{{ store.text.learnSubtitle }}</p>
      </div>
      <div class="intro-callout">
        <strong>{{ store.text.earsPatternTitle }}</strong>
        <p>{{ store.text.earsPatternText }}</p>
      </div>
    </section>

    <section class="knowledge-flow">
      <article class="panel knowledge-card">
        <p class="eyebrow">{{ store.text.whatIsRequirement }}</p>
        <h3>{{ store.text.whatIsRequirement }}</h3>
        <p class="section-copy">{{ store.text.whatIsRequirementText }}</p>
      </article>

      <article class="panel knowledge-card">
        <p class="eyebrow">{{ store.text.softwareRequirement }}</p>
        <h3>{{ store.text.softwareRequirement }}</h3>
        <p class="section-copy">{{ store.text.softwareRequirementText }}</p>
      </article>

      <article class="panel knowledge-card">
        <p class="eyebrow">{{ store.text.systemRequirement }}</p>
        <h3>{{ store.text.systemRequirement }}</h3>
        <p class="section-copy">{{ store.text.systemRequirementText }}</p>
      </article>
      <article class="panel guidance-card">
        <p class="eyebrow">{{ store.text.earsGuideTitle }}</p>
        <h3>{{ store.text.earsGuideTitle }}</h3>
        <p class="section-copy">{{ store.text.earsGuideText }}</p>

        <div class="pattern-block">
          <strong>{{ store.text.earsPatternText }}</strong>
        </div>
      </article>

      <article class="panel guidance-card">
        <p class="eyebrow">{{ store.text.earsTypesTitle }}</p>
        <h3>{{ store.text.earsTypesTitle }}</h3>
        <div class="rules-list">
          <div>
            <strong>{{ store.text.earsTypeUbiquitous }}</strong>
            <p>{{ store.text.earsTypeUbiquitousText }}</p>
          </div>
          <div>
            <strong>{{ store.text.earsTypeEvent }}</strong>
            <p>{{ store.text.earsTypeEventText }}</p>
          </div>
          <div>
            <strong>{{ store.text.earsTypeState }}</strong>
            <p>{{ store.text.earsTypeStateText }}</p>
          </div>
          <div>
            <strong>{{ store.text.earsTypeOptional }}</strong>
            <p>{{ store.text.earsTypeOptionalText }}</p>
          </div>
          <div>
            <strong>{{ store.text.earsTypeUnwanted }}</strong>
            <p>{{ store.text.earsTypeUnwantedText }}</p>
          </div>
        </div>
      </article>

      <article class="panel guidance-card">
        <p class="eyebrow">{{ store.text.qualityRulesTitle }}</p>
        <h3>{{ store.text.qualityRulesTitle }}</h3>
        <p class="section-copy">{{ store.text.qualityRulesText }}</p>

        <div class="rules-list">
          <div>{{ store.text.qualityRuleOne }}</div>
          <div>{{ store.text.qualityRuleTwo }}</div>
          <div>{{ store.text.qualityRuleThree }}</div>
          <div>{{ store.text.qualityRuleFour }}</div>
          <div>{{ store.text.qualityRuleFive }}</div>
        </div>
      </article>
    </section>
  `
})
export class HomePageComponent {
  constructor(public store: RequirementsStoreService) {}
}

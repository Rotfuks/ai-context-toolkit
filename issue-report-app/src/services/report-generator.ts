import { GitHubAPIService } from './github-api';

interface ReportIssue {
  number: number;
  title: string;
  url: string;
  repository: string;
  kind?: string;
  state: string;
  parentIssue?: {
    number: number;
    title: string;
    url: string;
  };
}

interface ReportData {
  roadmap: ReportIssue[];
  customerWork: ReportIssue[];
  operationalWork: ReportIssue[];
  otherIssues: ReportIssue[];
}

export class IssueReportGenerator {
  private githubService: GitHubAPIService;

  constructor() {
    this.githubService = new GitHubAPIService();
  }

  /**
   * Generate an issue report for the specified month
   */
  async generateReport(year: number, month: number): Promise<string> {
    console.log(`📊 Generating issue report for ${month}/${year}...\n`);

    try {
      // Fetch all issues with Team "Atlas 🗺️" and Status "Validation ☑️"
      const allIssues = await this.githubService.searchRoadmapIssues(
        "Atlas 🗺️",   // Team filter
        "Validation ☑️",  // Status filter
        undefined    // No Kind filter
      );

      console.log(`📋 Found ${allIssues.length} issues with Team "Atlas 🗺️" and Status "Validation ☑️"`);

      // Group issues by Kind
      const reportData = this.groupIssuesByKind(allIssues);

      // Generate the report markdown
      const report = this.createReportMarkdown(reportData, year, month);

      return report;

    } catch (error) {
      console.error('❌ Error generating report:', error);
      throw error;
    }
  }

  /**
   * Group issues by their Kind field from the Roadmap project
   */
  private groupIssuesByKind(issues: any[]): ReportData {
    const roadmap: ReportIssue[] = [];
    const customerWork: ReportIssue[] = [];
    const operationalWork: ReportIssue[] = [];
    const otherIssues: ReportIssue[] = [];

    // First pass: collect all parent issue numbers that have children in the report
    const parentIssueNumbers = new Set<number>();
    for (const issue of issues) {
      if (issue.parentIssue) {
        parentIssueNumbers.add(issue.parentIssue.number);
      }
    }

    for (const issue of issues) {
      // Skip Epic issues completely - they will only appear as parents
      if (issue.kind === 'Epic 🎯') {
        continue;
      }

      const reportIssue: ReportIssue = {
        number: issue.issue.number,
        title: issue.issue.title,
        url: issue.issue.url,
        repository: this.extractRepoNameFromUrl(issue.issue.url),
        kind: issue.kind,
        state: issue.issue.state,
        parentIssue: issue.parentIssue
      };

      // Group by Kind field
      switch (issue.kind) {
        case 'Story 📑':
          roadmap.push(reportIssue);
          break;
        case 'Request 🛎️':
          customerWork.push(reportIssue);
          break;
        case 'Postmortem 🚧':
          operationalWork.push(reportIssue);
          break;
        default:
          otherIssues.push(reportIssue);
          break;
      }
    }

    return { roadmap, customerWork, operationalWork, otherIssues };
  }

  /**
   * Extract repository name from GitHub URL (returns only the repo, not owner/repo)
   */
  private extractRepoNameFromUrl(url: string): string {
    const match = url.match(/github\.com\/[^\/]+\/([^\/]+)\/issues/);
    return match ? match[1] || 'unknown' : 'unknown';
  }

  /**
   * Create the issue report markdown content
   */
  private createReportMarkdown(data: ReportData, year: number, month: number): string {
    const monthName = new Date(year, month - 1).toLocaleString('en-US', { month: 'long' });
    
    let report = `# Team Atlas Issue Report - ${monthName} ${year}\n\n`;

    // TL;DR Section
    report += this.createTLDR(data);

    report += '\n--------------------------------------------------------\n\n';

    // Only include sections that have issues
    if (data.roadmap.length > 0) {
      report += this.createSection('Roadmap', data.roadmap);
    }

    if (data.customerWork.length > 0) {
      report += this.createSection('Customer Work', data.customerWork);
    }

    if (data.operationalWork.length > 0) {
      report += this.createSection('Operational Work', data.operationalWork);
    }

    if (data.otherIssues.length > 0) {
      report += this.createSection('Other Issues', data.otherIssues);
    }

    return report;
  }

  /**
   * Create the TL;DR summary section
   */
  private createTLDR(data: ReportData): string {
    let tldr = '**TL;DR**\n';

    // Roadmap summary with actual parent issue titles
    if (data.roadmap.length > 0) {
      const parentGroups = this.groupByParent(data.roadmap);
      const completedParents: ReportIssue[] = [];
      const inProgressParents: ReportIssue[] = [];

      // Separate completed and in-progress parents
      for (const [parentTitle, childIssues] of Object.entries(parentGroups)) {
        if (parentTitle !== 'No Parent') {
          const parentIssue = childIssues[0]?.parentIssue;
          if (parentIssue) {
            if (this.isParentCompleted(childIssues)) {
              completedParents.push({ ...parentIssue, repository: this.extractRepoNameFromUrl(parentIssue.url) } as ReportIssue);
            } else {
              inProgressParents.push({ ...parentIssue, repository: this.extractRepoNameFromUrl(parentIssue.url) } as ReportIssue);
            }
          }
        }
      }

      // Add completed initiatives
      if (completedParents.length > 0) {
        tldr += `- We finished with `;
        const completedLinks = completedParents.map(issue => 
          `${issue.title} ([${issue.repository}#${issue.number}](${issue.url}))`
        );
        if (completedLinks.length === 1) {
          tldr += completedLinks[0] + '.\n';
        } else {
          const lastLink = completedLinks.pop();
          tldr += completedLinks.join(', ') + ' and ' + lastLink + '.\n';
        }
      }

      // Add in-progress initiatives
      if (inProgressParents.length > 0) {
        tldr += `- We made progress on `;
        const inProgressLinks = inProgressParents.map(issue => 
          `${issue.title} ([${issue.repository}#${issue.number}](${issue.url}))`
        );
        if (inProgressLinks.length === 1) {
          tldr += inProgressLinks[0] + '.\n';
        } else {
          const lastLink = inProgressLinks.pop();
          tldr += inProgressLinks.join(', ') + ' and ' + lastLink + '.\n';
        }
      }
    }

    // Customer Work summary
    if (data.customerWork.length > 0) {
      tldr += `- We delivered ${data.customerWork.length} customer requests, providing direct value to our customers and improving their platform experience`;
      
      // Add 1-2 random examples
      const examples = this.getRandomExamples(data.customerWork, 2);
      if (examples.length > 0) {
        tldr += `, including ${examples.map(issue => 
          `${issue.title} ([${issue.repository}#${issue.number}](${issue.url}))`
        ).join(' and ')}`;
      }
      tldr += '.\n';
    }

    // Operational Work summary
    if (data.operationalWork.length > 0) {
      tldr += `- We resolved ${data.operationalWork.length} operational issues, improving platform stability, maintainability, and user experience`;
      
      // Add 1-2 random examples
      const examples = this.getRandomExamples(data.operationalWork, 2);
      if (examples.length > 0) {
        tldr += `, including ${examples.map(issue => 
          `${issue.title} ([${issue.repository}#${issue.number}](${issue.url}))`
        ).join(' and ')}`;
      }
      tldr += '.\n';
    }

    // Other Issues summary
    if (data.otherIssues.length > 0) {
      tldr += `- We completed ${data.otherIssues.length} other issues, covering various tasks and improvements`;
      
      // Add 1-2 random examples
      const examples = this.getRandomExamples(data.otherIssues, 2);
      if (examples.length > 0) {
        tldr += `, including ${examples.map(issue => 
          `${issue.title} ([${issue.repository}#${issue.number}](${issue.url}))`
        ).join(' and ')}`;
      }
      tldr += '.\n';
    }

    return tldr;
  }

  /**
   * Create a section with grouped issues
   */
  private createSection(sectionName: string, issues: ReportIssue[]): string {
    let section = `**${sectionName}**\n`;

    // Group issues by parent
    const parentGroups = this.groupByParent(issues);

    for (const [parentTitle, childIssues] of Object.entries(parentGroups)) {
      if (parentTitle === 'No Parent') {
        // Issues without parents
        for (const issue of childIssues) {
          const repo = this.extractRepoNameFromUrl(issue.url);
          section += `- ${issue.title} - [${repo}#${issue.number}](${issue.url})\n`;
        }
      } else {
        // Issues with parents - show parent first, then children
        const parentIssue = childIssues[0]?.parentIssue;
        if (parentIssue) {
          const parentRepo = this.extractRepoNameFromUrl(parentIssue.url);
          const isCompleted = this.isParentCompleted(childIssues);
          const statusText = isCompleted ? 'We finished with' : 'We made progress on';
          
          section += `- ${statusText} ${parentIssue.title} ([${parentRepo}#${parentIssue.number}](${parentIssue.url})) by\n`;
          
          for (const issue of childIssues) {
            const repo = this.extractRepoNameFromUrl(issue.url);
            section += `  - ${issue.title} - [${repo}#${issue.number}](${issue.url})\n`;
          }
        }
      }
    }

    section += '\n';
    return section;
  }

  /**
   * Group issues by their parent issue
   */
  private groupByParent(issues: ReportIssue[]): { [parentTitle: string]: ReportIssue[] } {
    const groups: { [parentTitle: string]: ReportIssue[] } = {};

    for (const issue of issues) {
      const parentTitle = issue.parentIssue?.title || 'No Parent';
      
      if (!groups[parentTitle]) {
        groups[parentTitle] = [];
      }
      
      groups[parentTitle].push(issue);
    }

    return groups;
  }

  /**
   * Check if a parent issue is completed (all children are closed)
   */
  private isParentCompleted(childIssues: ReportIssue[]): boolean {
    return childIssues.every(issue => issue.state === 'closed');
  }

  /**
   * Count completed parent issues
   */
  private countCompletedParents(issues: ReportIssue[]): number {
    const parentGroups = this.groupByParent(issues);
    let completedCount = 0;

    for (const [parentTitle, childIssues] of Object.entries(parentGroups)) {
      if (parentTitle !== 'No Parent' && this.isParentCompleted(childIssues)) {
        completedCount++;
      }
    }

    return completedCount;
  }

  /**
   * Get random examples from a list of issues
   */
  private getRandomExamples(issues: ReportIssue[], maxCount: number): ReportIssue[] {
    const shuffled = [...issues].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(maxCount, issues.length));
  }

  /**
   * Generate an issue report for a given team and status
   */
  async generateReportForTeamStatus(team: string, status: string): Promise<string> {
    console.log(`📊 Generating issue report for Team "${team}" and Status "${status}"...`);
    try {
      const allIssues = await this.githubService.searchRoadmapIssues(team, status, undefined);
      console.log(`📋 Found ${allIssues.length} issues with Team "${team}" and Status "${status}"`);
      const reportData = this.groupIssuesByKind(allIssues);
      const report = this.createReportMarkdownForTeamStatus(reportData, team, status);
      return report;
    } catch (error) {
      console.error('❌ Error generating report:', error);
      throw error;
    }
  }

  private getTenseInfo(status: string) {
    // Normalize status for comparison
    const normalized = status.trim().toLowerCase();
    
    // Check for validation/done statuses (past tense)
    if (normalized.includes('validation') || normalized.includes('done')) {
      return {
        tldrCompleted: 'We completed',
        tldrProgress: 'We made progress on',
        tldrPlanned: 'We completed',
        sectionCompleted: 'completed',
        sectionProgress: 'made progress on',
        sectionPlanned: 'completed',
      };
    } 
    // Check for in progress statuses (present tense)
    else if (normalized.includes('in progress') || normalized.includes('progress')) {
      return {
        tldrCompleted: 'We are working on',
        tldrProgress: 'We are working on',
        tldrPlanned: 'We are working on',
        sectionCompleted: 'are working on',
        sectionProgress: 'are working on',
        sectionPlanned: 'are working on',
      };
    } 
    // All other statuses (future/planned tense)
    else {
      return {
        tldrCompleted: 'We plan to work on',
        tldrProgress: 'We plan to work on',
        tldrPlanned: 'We plan to work on',
        sectionCompleted: 'is planned',
        sectionProgress: 'is planned',
        sectionPlanned: 'is planned',
      };
    }
  }

  private getCustomerWorkVerb(status: string): string {
    // Normalize status for comparison
    const normalized = status.trim().toLowerCase();
    
    // Check for validation/done statuses (past tense)
    if (normalized.includes('validation') || normalized.includes('done')) {
      return 'delivered';
    } 
    // Check for in progress statuses (present tense)
    else if (normalized.includes('in progress') || normalized.includes('progress')) {
      return 'are delivering';
    } 
    // All other statuses (future/planned tense)
    else {
      return 'plan to deliver';
    }
  }

  private getOperationalWorkVerb(status: string): string {
    // Normalize status for comparison
    const normalized = status.trim().toLowerCase();
    
    // Check for validation/done statuses (past tense)
    if (normalized.includes('validation') || normalized.includes('done')) {
      return 'resolved';
    } 
    // Check for in progress statuses (present tense)
    else if (normalized.includes('in progress') || normalized.includes('progress')) {
      return 'are resolving';
    } 
    // All other statuses (future/planned tense)
    else {
      return 'plan to resolve';
    }
  }

  private getOtherIssuesVerb(status: string): string {
    // Normalize status for comparison
    const normalized = status.trim().toLowerCase();
    
    // Check for validation/done statuses (past tense)
    if (normalized.includes('validation') || normalized.includes('done')) {
      return 'completed';
    } 
    // Check for in progress statuses (present tense)
    else if (normalized.includes('in progress') || normalized.includes('progress')) {
      return 'are working on';
    } 
    // All other statuses (future/planned tense)
    else {
      return 'plan to work on';
    }
  }

  private createReportMarkdownForTeamStatus(data: ReportData, team: string, status: string): string {
    let report = `# Team ${team} - Status: ${status}\n\n`;
    report += this.createTLDRWithTense(data, status);
    report += '\n--------------------------------------------------------\n\n';
    
    // Only include sections that have issues
    if (data.roadmap.length > 0) {
      report += this.createSectionWithTense('Roadmap', data.roadmap, status);
    }

    if (data.customerWork.length > 0) {
      report += this.createSectionWithTense('Customer Work', data.customerWork, status);
    }

    if (data.operationalWork.length > 0) {
      report += this.createSectionWithTense('Operational Work', data.operationalWork, status);
    }

    if (data.otherIssues.length > 0) {
      report += this.createSectionWithTense('Other Issues', data.otherIssues, status);
    }
    
    return report;
  }

  private createTLDRWithTense(data: ReportData, status: string): string {
    const tense = this.getTenseInfo(status);
    let tldr = '**TL;DR**\n';
    // Roadmap summary with actual parent issue titles
    if (data.roadmap.length > 0) {
      const parentGroups = this.groupByParent(data.roadmap);
      const completedParents: ReportIssue[] = [];
      const inProgressParents: ReportIssue[] = [];
      for (const [parentTitle, childIssues] of Object.entries(parentGroups)) {
        if (parentTitle !== 'No Parent') {
          const parentIssue = childIssues[0]?.parentIssue;
          if (parentIssue) {
            if (this.isParentCompleted(childIssues)) {
              completedParents.push({ ...parentIssue, repository: this.extractRepoNameFromUrl(parentIssue.url) } as ReportIssue);
            } else {
              inProgressParents.push({ ...parentIssue, repository: this.extractRepoNameFromUrl(parentIssue.url) } as ReportIssue);
            }
          }
        }
      }
      // Add completed initiatives
      if (completedParents.length > 0) {
        tldr += `- ${tense.tldrCompleted} `;
        const completedLinks = completedParents.map(issue => 
          `${issue.title} ([${issue.repository}#${issue.number}](${issue.url}))`
        );
        if (completedLinks.length === 1) {
          tldr += completedLinks[0] + '.\n';
        } else {
          const lastLink = completedLinks.pop();
          tldr += completedLinks.join(', ') + ' and ' + lastLink + '.\n';
        }
      }
      // Add in-progress initiatives
      if (inProgressParents.length > 0) {
        tldr += `- ${tense.tldrProgress} `;
        const inProgressLinks = inProgressParents.map(issue => 
          `${issue.title} ([${issue.repository}#${issue.number}](${issue.url}))`
        );
        if (inProgressLinks.length === 1) {
          tldr += inProgressLinks[0] + '.\n';
        } else {
          const lastLink = inProgressLinks.pop();
          tldr += inProgressLinks.join(', ') + ' and ' + lastLink + '.\n';
        }
      }
    }
    // Customer Work summary
    if (data.customerWork.length > 0) {
      const customerVerb = this.getCustomerWorkVerb(status);
      tldr += `- We ${customerVerb} ${data.customerWork.length} customer requests, providing direct value to our customers and improving their platform experience`;
      const examples = this.getRandomExamples(data.customerWork, 2);
      if (examples.length > 0) {
        tldr += `, including ${examples.map(issue => 
          `${issue.title} ([${issue.repository}#${issue.number}](${issue.url}))`
        ).join(' and ')}`;
      }
      tldr += '.\n';
    }
    // Operational Work summary
    if (data.operationalWork.length > 0) {
      const operationalVerb = this.getOperationalWorkVerb(status);
      tldr += `- We ${operationalVerb} ${data.operationalWork.length} operational issues, improving platform stability, maintainability, and user experience`;
      const examples = this.getRandomExamples(data.operationalWork, 2);
      if (examples.length > 0) {
        tldr += `, including ${examples.map(issue => 
          `${issue.title} ([${issue.repository}#${issue.number}](${issue.url}))`
        ).join(' and ')}`;
      }
      tldr += '.\n';
    }
    // Other Issues summary
    if (data.otherIssues.length > 0) {
      const otherVerb = this.getOtherIssuesVerb(status);
      tldr += `- We ${otherVerb} ${data.otherIssues.length} other issues, covering various tasks and improvements`;
      const examples = this.getRandomExamples(data.otherIssues, 2);
      if (examples.length > 0) {
        tldr += `, including ${examples.map(issue => 
          `${issue.title} ([${issue.repository}#${issue.number}](${issue.url}))`
        ).join(' and ')}`;
      }
      tldr += '.\n';
    }
    return tldr;
  }

  private createSectionWithTense(sectionName: string, issues: ReportIssue[], status: string): string {
    const tense = this.getTenseInfo(status);
    let section = `**${sectionName}**\n`;
    const parentGroups = this.groupByParent(issues);
    for (const [parentTitle, childIssues] of Object.entries(parentGroups)) {
      if (parentTitle === 'No Parent') {
        for (const issue of childIssues) {
          const repo = this.extractRepoNameFromUrl(issue.url);
          section += `- ${issue.title} - [${repo}#${issue.number}](${issue.url})\n`;
        }
      } else {
        const parentIssue = childIssues[0]?.parentIssue;
        if (parentIssue) {
          const parentRepo = this.extractRepoNameFromUrl(parentIssue.url);
          let statusText = tense.sectionCompleted;
          if (!this.isParentCompleted(childIssues)) {
            statusText = tense.sectionProgress;
          }
          section += `- ${parentIssue.title} ([${parentRepo}#${parentIssue.number}](${parentIssue.url})) ${statusText} by\n`;
          for (const issue of childIssues) {
            const repo = this.extractRepoNameFromUrl(issue.url);
            section += `  - ${issue.title} - [${repo}#${issue.number}](${issue.url})\n`;
          }
        }
      }
    }
    section += '\n';
    return section;
  }
} 
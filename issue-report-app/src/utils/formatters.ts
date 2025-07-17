import { GitHubIssue, GitHubComment, GitHubRepository, GitHubProject } from '../types/github';

export class IssueFormatter {
  /**
   * Format an issue for console output
   */
  static formatIssue(issue: GitHubIssue, linkedProjects: Array<GitHubProject & { status?: string; team?: string; kind?: string }> = []): string {
    const labels = issue.labels.map(label => `[${label.name}]`).join(' ');
    const assignees = issue.assignees.map(assignee => assignee.login).join(', ');
    const milestone = issue.milestone ? `Milestone: ${issue.milestone.title}` : 'No milestone';
    let projects = 'No linked projects';
    if (linkedProjects.length > 0) {
      projects = linkedProjects.map(p => {
        let details = `[${p.name}](${p.url})`;
        const fields = [];
        if (p.status) fields.push(`Status: ${p.status}`);
        if (p.team) fields.push(`Team: ${p.team}`);
        if (p.kind) fields.push(`Kind: ${p.kind}`);
        if (fields.length > 0) details += ` { ${fields.join(', ')} }`;
        return details;
      }).join(', ');
    }
    return `
Issue #${issue.number}: ${issue.title}
${'='.repeat(50)}
State: ${issue.state}
Created: ${new Date(issue.created_at).toLocaleString()}
Updated: ${new Date(issue.updated_at).toLocaleString()}
Author: ${issue.user.login}
${assignees ? `Assignees: ${assignees}` : 'No assignees'}
${milestone}
Labels: ${labels || 'No labels'}
Linked Projects: ${projects}
Comments: ${issue.comments}
${issue.body ? `\nDescription:\n${issue.body}` : 'No description'}
URL: ${issue.html_url}
`.trim();
  }

  /**
   * Format comments for console output
   */
  static formatComments(comments: GitHubComment[]): string {
    if (comments.length === 0) {
      return 'No comments';
    }

    return comments.map((comment, index) => {
      const date = new Date(comment.created_at).toLocaleString();
      return `
Comment #${index + 1} (ID: ${comment.id})
${'-'.repeat(30)}
Author: ${comment.user.login}
Date: ${date}
${comment.body}
`.trim();
    }).join('\n\n');
  }

  /**
   * Format repository information
   */
  static formatRepository(repo: GitHubRepository): string {
    return `
Repository: ${repo.full_name}
${'='.repeat(50)}
Description: ${repo.description || 'No description'}
Language: ${repo.language || 'Not specified'}
Stars: ${repo.stargazers_count}
Forks: ${repo.forks_count}
Open Issues: ${repo.open_issues_count}
Created: ${new Date(repo.created_at).toLocaleString()}
Updated: ${new Date(repo.updated_at).toLocaleString()}
URL: ${repo.html_url}
`.trim();
  }

  /**
   * Format detailed issue information including comments, repo data, and linked projects
   */
  static formatDetailedIssue(data: {
    issue: GitHubIssue;
    comments: GitHubComment[];
    repository: GitHubRepository;
    linkedProjects: Array<GitHubProject & { status?: string; team?: string; kind?: string }>;
  }): string {
    return `
${this.formatRepository(data.repository)}

${this.formatIssue(data.issue, data.linkedProjects)}

${this.formatComments(data.comments)}
`.trim();
  }

  /**
   * Create a JSON summary of an issue
   */
  static createIssueSummary(issue: GitHubIssue, linkedProjects: GitHubProject[] = []): Record<string, any> {
    return {
      number: issue.number,
      title: issue.title,
      state: issue.state,
      author: issue.user.login,
      assignees: issue.assignees.map(a => a.login),
      labels: issue.labels.map(l => l.name),
      milestone: issue.milestone?.title || null,
      linkedProjects: linkedProjects.map(p => ({ id: p.id, name: p.name, url: p.url })),
      comments: issue.comments,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
      closed_at: issue.closed_at,
      url: issue.html_url,
    };
  }

  /**
   * Create a markdown report of an issue
   */
  static createMarkdownReport(data: {
    issue: GitHubIssue;
    comments: GitHubComment[];
    repository: GitHubRepository;
    linkedProjects: GitHubProject[];
  }): string {
    const { issue, comments, repository, linkedProjects } = data;
    
    return `# Issue #${issue.number}: ${issue.title}

## Repository Information
- **Repository**: [${repository.full_name}](${repository.html_url})
- **Language**: ${repository.language || 'Not specified'}
- **Stars**: ${repository.stargazers_count}
- **Forks**: ${repository.forks_count}

## Issue Details
- **State**: ${issue.state}
- **Author**: [${issue.user.login}](${issue.user.html_url})
- **Created**: ${new Date(issue.created_at).toLocaleString()}
- **Updated**: ${new Date(issue.updated_at).toLocaleString()}
${issue.closed_at ? `- **Closed**: ${new Date(issue.closed_at).toLocaleString()}` : ''}
- **Comments**: ${issue.comments}

${issue.assignees.length > 0 ? `**Assignees**: ${issue.assignees.map(a => `[${a.login}](${a.html_url})`).join(', ')}` : '**Assignees**: None'}

${issue.labels.length > 0 ? `**Labels**: ${issue.labels.map(l => `\`${l.name}\``).join(', ')}` : '**Labels**: None'}

${issue.milestone ? `**Milestone**: ${issue.milestone.title}` : '**Milestone**: None'}

${linkedProjects.length > 0 ? `**Linked Projects**: ${linkedProjects.map(p => `[${p.name}](${p.url})`).join(', ')}` : '**Linked Projects**: None'}

## Description
${issue.body || '*No description provided*'}

## Comments (${comments.length})
${comments.length === 0 ? '*No comments*' : comments.map((comment, index) => `
### Comment ${index + 1}
**By**: [${comment.user.login}](${comment.user.html_url})  
**Date**: ${new Date(comment.created_at).toLocaleString()}

${comment.body}
`).join('\n')}

---
*[View on GitHub](${issue.html_url})*
`;
  }
} 
#!/usr/bin/env node

import { GitHubAPIService, GitHubAPIError } from './services/github-api';
import { IssueFormatter } from './utils/formatters';

async function main() {
  // Get command line arguments
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.log(`
GitHub Issue Fetcher

Usage: npm run dev <owner> <repo> <issue-number> [format]

Examples:
  npm run dev facebook react 123
  npm run dev microsoft vscode 456 json
  npm run dev octocat Hello-World 1 markdown

Formats:
  - console (default): Human-readable console output
  - json: JSON format
  - markdown: Markdown report
  - summary: Brief JSON summary

Environment Variables:
  GITHUB_TOKEN: Your GitHub personal access token (required)
  GITHUB_API_BASE_URL: GitHub API base URL (optional, defaults to https://api.github.com)
`);
    process.exit(1);
  }

  const [owner, repo, issueNumberStr, format = 'console'] = args;
  
  if (!owner || !repo || !issueNumberStr) {
    console.error('Error: Missing required arguments');
    process.exit(1);
  }
  
  const issueNumber = parseInt(issueNumberStr, 10);

  if (isNaN(issueNumber)) {
    console.error('Error: Issue number must be a valid integer');
    process.exit(1);
  }

  try {
    console.log(`Fetching issue #${issueNumber} from ${owner}/${repo}...\n`);
    
    const githubAPI = new GitHubAPIService();
    
    // Check rate limit before making requests
    const rateLimit = githubAPI.getRateLimitInfo();
    console.log(`Rate limit: ${rateLimit.remaining} requests remaining`);
    console.log(`Reset time: ${rateLimit.resetTime.toLocaleString()}\n`);

    // Fetch detailed issue information
    const data = await githubAPI.getDetailedIssue(owner, repo, issueNumber);
    
    // Format and display the results
    switch (format.toLowerCase()) {
      case 'json':
        console.log(JSON.stringify(data, null, 2));
        break;
        
      case 'markdown':
        console.log(IssueFormatter.createMarkdownReport(data));
        break;
        
      case 'summary':
        console.log(JSON.stringify(IssueFormatter.createIssueSummary(data.issue, data.linkedProjects), null, 2));
        break;
        
      case 'console':
      default:
        console.log(IssueFormatter.formatDetailedIssue(data));
        break;
    }

    // Show final rate limit status
    const finalRateLimit = githubAPI.getRateLimitInfo();
    console.log(`\nRate limit remaining: ${finalRateLimit.remaining} requests`);

  } catch (error) {
    if (error instanceof GitHubAPIError) {
      console.error(`GitHub API Error: ${error.message}`);
      if (error.statusCode) {
        console.error(`Status Code: ${error.statusCode}`);
      }
      if (error.response?.documentation_url) {
        console.error(`Documentation: ${error.response.documentation_url}`);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Run the main function
if (require.main === module) {
  main();
} 
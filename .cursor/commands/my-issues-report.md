# My Assigned Issues Report

Generate a report of open GitHub issues that are assigned to me, with a short summary of what needs to be done for each.

**Important:** Use exclusively the GitHub MCP server tools for all GitHub interactions. Do NOT use shell commands, `gh` CLI, or any other method to access GitHub data.

## Instructions

1. **Get my GitHub identity** — call the **GitHub MCP tool `get_me`** to determine the authenticated user's login.

2. **Search for issues assigned to me** — call the **GitHub MCP tool `search_issues`**:
   - Query: `assignee:{login} state:open`
   - This returns all open issues currently assigned to me.
   - If the search returns many results, paginate through all pages using the `page` and `perPage` parameters.

3. **Filter results** by applying these rules:
   - **Exclude personal repos:** Exclude issues from my personal repositories (e.g. `Rotfuks/*`). Issues from any organisation (e.g. `giantswarm/*`, `cncf/*`) are fine.
   - **Skip archived repos:** Exclude issues from archived repositories.

4. **For each issue, generate a short actionable summary:**
   - Use the **GitHub MCP tool `issue_read`** with method `get` to read the issue body and details.
   - **Always** use the **GitHub MCP tool `issue_read`** with method `get_comments` to read the comments. Fetch at least the last page of comments to understand the current state of the discussion.
   - Use the **GitHub MCP tool `issue_read`** with method `get_labels` to fetch labels for the issue.
   - Summarise in 1-2 sentences what **I** need to do next. Focus on the action required, not the issue history.
   - If there is a clear next step or someone is waiting on me, call that out.

5. **Generate the report** using the template below.

---

## Report Template

### My Assigned Issues

#### Summary
- **Total open issues assigned to me:** [count]
- **Repos affected:** [list of unique owner/repo]

#### Issues

Group issues by repository (`owner/repo`). Within each group, order by most recently updated first.

**[owner/repo]**

- [ISSUE_TITLE](html_url) — [1-2 sentence actionable summary] (`label1`, `label2`)

(Repeat list for each repo group)

#### Top 5 Most Urgent
List the 5 most urgent issues to work on, based on:
- Whether someone is explicitly blocked waiting on me
- Whether there's a deadline or milestone mentioned
- How recently the issue was updated (recent activity = likely needs attention)
- Priority labels (if any)

For each, give a one-line reason why it's urgent.

---

## Tools

All GitHub data **must** be retrieved via the GitHub MCP server. The relevant tools are:

| Tool | Purpose |
|------|---------|
| `get_me` | Get the authenticated user's login |
| `search_issues` | Search for issues assigned to me |
| `issue_read` (method: `get`) | Read issue body and details |
| `issue_read` (method: `get_comments`) | Read issue comments |
| `issue_read` (method: `get_labels`) | Get labels on an issue |

Do **not** use shell commands (`gh`, `curl`, etc.) or any non-MCP method for GitHub access.

## Processing Rules

- Process issues in batches when fetching details (up to 4 concurrent MCP tool calls) to stay efficient.
- For issues with very many comments, focus on the issue body and the last few comments to determine what action is needed — don't read the entire comment history.
- When summarising, be specific and actionable. Bad: "Work on this issue." Good: "Review and merge the upstream PR, then update the Helm chart to v3.2.0."
- If the issue body is empty or unclear, note that in the summary (e.g. "Needs triage — issue description is empty").
- Include label names in the report as they often carry priority or area context.

## Notes
- This report focuses on **issues assigned to me only**, not mentions/pings. For pings, use the issue-pings-report command.
- Include issues from any organisation repo (e.g. `giantswarm/*`, `cncf/*`), but never from personal repos (repos owned by my own GitHub username).
- Exclude `cncf/tag-app-delivery` as the repo is archived.
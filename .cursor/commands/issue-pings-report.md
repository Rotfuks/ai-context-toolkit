# Unanswered GitHub Pings Report

Generate a report of open GitHub issues where I was pinged (mentioned) but haven't replied yet.

## Instructions

1. **Get the time period** from the user input. If not specified, include all open issues with no date filter.
   - Examples: "last 2 weeks", "last month", "since 2026-01-01", "January 2026", or leave empty for all

2. **Get my GitHub identity** using the `get_me` GitHub MCP tool to determine the authenticated user's login.

3. **Search for issues where I'm mentioned** using the `search_issues` GitHub MCP tool:
   - Query: `mentions:{login} state:open`
   - This returns open issues where I was @-mentioned in the issue body or comments.

4. **Filter results** by applying these rules:
   - **Exclude personal repos:** Exclude issues from my personal repositories (e.g. `Rotfuks/*`). Issues from any organisation (e.g. `giantswarm/*`, `cncf/*`) are fine.

   - **Open issues only:** Already filtered by the search query.
   - **Exclude issues assigned to me:** If the issue is assigned to me, skip it — those are tracked separately as my own work items.
   - **Date range (if specified):** Only include issues where the @-mention of my username happened within the requested time period. Check comment dates to determine when the ping occurred. If no time period was given, include all matching issues regardless of date.

5. **Check if I already replied or reacted after the most recent ping** for each remaining issue:
   - Fetch comments using the `issue_read` tool with method `get_comments`.
   - Walk through the comments **in chronological order** and find the **most recent** comment that mentions my username (`@{my_login}`).
   - Then check **both** of the following:
     1. **Reply check:** Is there any comment authored by me (`user.login` matches my login) that was created **after** that most recent ping?
     2. **Reaction check:** Does the ping comment have any emoji reactions at all? Check `reactions.total_count` on the comment — if it is greater than 0, treat the ping as acknowledged.
   - If I replied **after** the latest ping OR the ping comment has any reactions: **exclude the issue**.
   - If I have NOT replied after the latest ping AND the ping comment has zero reactions: **include the issue** in the report.
   - **Important:** An earlier reply does not count — I may have been pinged again after my last comment. Only a reply or reaction that comes *after* the most recent ping counts as answered.

6. **Identify who pinged me and why** for each included issue:
   - Find the comment(s) that mention my username.
   - Note the author and date of the ping.
   - Extract a brief summary of what was asked or why I was tagged.

7. **Generate the report** using the template below.

---

## Report Template

### Unanswered GitHub Pings: [TIME PERIOD]

#### Summary
- **Total unanswered pings:** [count]
- **Repos affected:** [list of unique owner/repo]

#### Issues Awaiting Your Response

For each issue, ordered by most recent ping first:

**[ISSUE_TITLE] ([owner/repo#number](html_url))**
- **Pinged by:** [username] on [date]
- **What they need:** [1-2 sentence summary of why you were pinged]

(Repeat for each issue)

#### Top 3 Most Urgent
List the 3 most urgent issues to respond to, based on:
- How recently the ping occurred
- Whether someone is explicitly blocked waiting for your input
- Whether there's a deadline mentioned in the issue

For each, give a one-line reason why it's urgent.

---

## Processing Rules

- Process issues in batches when fetching comments (up to 4 concurrent API calls) to stay efficient.
- For issues with very many comments, look for my username in the comment bodies to find the actual ping, rather than reading every comment in detail.
- If a search returns many results, paginate through all of them before filtering.
- When determining "who pinged me," look for `@{my_login}` in comment bodies. Also check the issue body itself — sometimes the mention is in the original issue description rather than a comment.
- If I was pinged multiple times in the same issue without replying, report the most recent ping.

## Notes
- This report focuses on **mentions/pings only**, not issues assigned to me. For assigned issues, use a separate workflow.
- Include issues from any organisation repo (e.g. `giantswarm/*`, `cncf/*`), but never from personal repos (repos owned by my own GitHub username). Skip archived repos.
- Exclude `*/isms` issues.
- Exclude `cncf/tag-app-delivery` as the repo is archived.

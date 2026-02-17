# Platform Area Sync Report Generator

Generate a summary report of topics discussed in the Area Platform Sync meetings, based on the Gemini meeting notes stored in Google Drive.

## Instructions

1. **Get parameters** from the user input:
   - **Topic** (optional): A specific topic to focus on (e.g. "ARM support", "AI architecture", "ingress migration"). If not specified, provide a general overview of all topics discussed.
   - **Timeframe** (required): The period to cover (e.g. "last 3 months", "January 2026", "2025-10-01 to 2026-01-31"). If not specified, ask for clarification.

2. **Find the Gemini meeting notes** via the Google Drive MCP:
   - Search: `name contains 'Platform Sync' and name contains 'Gemini'`
   - This returns documents named like: `Platform Sync  - 2026/01/29 15:26 CET - Notes by Gemini`
   - Filter the results to only those whose date falls within the requested timeframe.
   - If there are many results, use pagination (`pageToken`) to fetch all matching notes.

3. **Read each matching document** using the `read_file` tool with the document ID.
   - Each document contains a `Summary` section, a `Details` section, and `Suggested next steps`.
   - Focus primarily on the **Summary** and **Details** sections for content extraction.

4. **Generate the report** using the template below.

---

## Report Template

### Area Platform Sync Report: [TOPIC or "General Overview"] — [TIMEFRAME]

#### Meetings Covered
- **Total meetings:** [count]
- **Date range:** [earliest date] to [latest date]
- **Meetings:** [comma-separated list of dates]

#### Executive Summary
A 3-5 sentence high-level summary of the most important developments and decisions during this period, focused on the requested topic (or across all topics if general).

#### Key Topics & Decisions

For each major topic discussed (or just the requested topic):

**[Topic Name]**
- **Status:** [Active / Decided / Blocked / Completed]
- **Summary:** [2-4 sentences describing what was discussed and decided]
- **Key decisions:**
  - [Decision 1]
  - [Decision 2]
- **Open questions / blockers:**
  - [Any unresolved items]
- **Meetings where discussed:** [list of dates]

(Repeat for each topic. If user requested a specific topic, go deeper into that one topic with more detail from each meeting.)

#### Action Items & Next Steps
Compile all suggested next steps and action items from the meetings, grouped by owner:

- **[Person Name]:**
  - [Action item 1] (from [date])
  - [Action item 2] (from [date])

#### Timeline of Developments
A chronological list showing how the topic(s) evolved over the timeframe:

- **[Date]:** [What happened / was decided]
- **[Date]:** [What happened / was decided]
- ...

#### Cross-Cutting Themes
Identify any patterns or recurring themes across meetings:
- [Theme 1: e.g. "Consistent push toward MCP-first architecture"]
- [Theme 2: e.g. "Customer migration timelines driving urgency"]

---

## Notes
- The Platform Sync meetings are held weekly (Thursdays) with the Platform Area teams.
- Gemini notes are auto-generated transcription summaries — they may contain minor inaccuracies.
- If a specific topic was only mentioned briefly in a meeting, still include it but note it was a minor discussion point.
- When the user asks about a topic, also surface related/adjacent topics that came up in the same discussions.
- If no meetings are found for the given timeframe, inform the user and suggest adjusting the date range.

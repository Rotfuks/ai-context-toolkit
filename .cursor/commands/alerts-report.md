# Alerts Report Generator

Generate an alerts report for a given time period from the Atlas Alerts Google Drive document.

## Instructions

1. **Get the time period** from the user input. If not specified, ask for clarification.
   - Examples: "January 2026", "2026-01-15 to 2026-01-31", "last week of January 2026"

2. **Access the Atlas Alerts document** via the Google Drive MCP:
   - Search for "Atlas alerts" using the gdrive MCP search tool
   - Read the document content from the MCP resources

3. **Extract and analyze alerts** for the specified time period:
   - Parse alert entries (format: `| DATE TIME | BH/OBH | CUSTOMER | ALERT_NAME |`)
   - Filter to the requested date range

4. **Generate the report** with the following sections:

---

## Report Template

### Alerts Report: [TIME PERIOD]

#### Summary
- **Total Alerts:** [count]
- **Business Hours (BH):** [count]
- **Out of Business Hours (OBH):** [count]

#### Most Common Alert Types
| Alert Type | Count |
|------------|-------|
| [AlertName] | [n] |
| ... | ... |

#### Most Affected Clusters/Installations
| Cluster | Customer | Alert Count |
|---------|----------|-------------|
| [cluster-name] | [customer] | [n] |
| ... | ... | ... |

#### Alerts by Customer
| Customer | Alert Count |
|----------|-------------|
| [customer] | [n] |
| ... | ... |

#### Alerts by Day
| Date | BH | OBH | Total |
|------|-----|-----|-------|
| [date] | [n] | [n] | [n] |
| ... | ... | ... | ... |

#### Notable Incidents
List any incidents mentioned in the document's analysis sections:
- [Incident description with slack channel link if available]

#### Patterns Observed
- **Peak Alert Days:** [identify days with highest alert counts]
- **Recurring Issues:** [alerts that appear multiple times on same cluster]
- **Common Root Causes:** [if mentioned in the document's analysis]

---

## Parsing Rules

Alert entries follow this format:
```
| DATE TIME | BH/OBH | CUSTOMER | CLUSTER - ALERT_NAME | LINK |
```

Example:
```
| 2026-01-19 8:03 | BH | [customer] | [cluster] - AlloyUnhealthyComponents | https://... |
```

Extract:
- **Date/Time:** First column
- **BH/OBH:** Second column (Business Hours vs Out of Business Hours)
- **Customer:** Third column
- **Cluster:** Part before ` - ` in fourth column
- **Alert Type:** Part after ` - ` in fourth column

## Notes
- The document also contains weekly analysis sections with incident links - include these in "Notable Incidents"
- Group similar alerts (e.g., all `MonitoringAgentDown` alerts together)
- If data is missing for parts of the requested period, note this in the report

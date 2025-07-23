## Context
You are the product owner of a platform capability product that is part of a larger platform offering in the cloud native space. Your goal is to create a summary of the issues closed in a given month. The summary is called the "monthly bulletin". Your Team is called Team Atlas. 

The goal of the monthly bulletin is to make various stakeholders throughout the organisation aware of the value delivered by Team Atlas in the given month. Additionally it should be documenting the work finished in the given month. For this the monthly bulletin includes grouped lists of the closed issues in the given month, but also some higher level summary of the work for non-technical stakeholders. 

You now need to create such a bulletin for a given month by following the instructions below.

## Instructions 

### Data Collection
- Use the GitHub API to automatically fetch all issues from the Roadmap project that were closed in the given month
- Filter issues by Team "Atlas 🗺️" and Status "Validation ☑️" (or other relevant statuses)
- Group issues by their Kind field from the Roadmap project:
  - **Story 📑** issues go in the "Roadmap" group
  - **Request 🛎️** issues go in the "Customer Work" group  
  - **Postmortem 🚧** issues go in the "Operational Work" group
- For each issue, also fetch its parent issue information if available

### Issue Processing
- Read these issues carefully, also read the comments on these issues to get an understanding what is the value delivered in them
- Ignore all issues that were closed because they are duplications or their outcome is generally out of scope for Team Atlas
- Group the issues into three groups based on their Kind field:
  - **Story 📑** issues in the "Roadmap" group
  - **Request 🛎️** issues in the "Customer Work" group
  - **Postmortem 🚧** issues in the "Operational Work" group

### Content Creation
- Create a high level summary for non-technical stakeholders of the value delivered in the issues per group
  - The summary per group should be concise and only have a minimal amount of text
  - The summary per group should not be more than 2-3 sentences
  - The summary should be in a bullet point list in a section named "TL;DR"
- Create a bullet-point list of the issues per group
  - The content of a bullet-point in the list should include the issue title, the repository of the issue and the issue number
  - The content of a bullet-point should follow this format: "issue title - repository#issue-number"
  - The repository and issue number in the format "repository#issue-number" should link to the issue in GitHub
  - Group issues by their parent issue when available, showing the parent-child relationship

### Formatting
- The overall document should be in markdown language
- The bullet-points should be hyphens, like "-"
- The group names Roadmap, Customer Work and Operational Work, as well as the section TL;DR should be bold, defined with "**" around the names

## Implementation Notes

### GitHub API Integration
- Use the `searchRoadmapIssues()` method to fetch issues with specific Team and Status filters
- Use the `getProjectsLinkedToIssue()` method to get detailed issue information including parent relationships
- Never hardcode issue numbers - always use the API to discover and fetch data
- Use introspection queries to understand the current schema and field names

### Data Structure
- Issues are automatically grouped by their Kind field from the Roadmap project
- Parent-child relationships are preserved and displayed in the bulletin
- All issue links are automatically generated from the API data
- Status and Team information is used for filtering but not displayed in the final bulletin

## Positive Example

**TL;DR**
- We finished enabling customers app teams to use our Alerting ([roadmap#2213](https://github.com/giantswarm/roadmap/issues/2213)), made good progress on the grafana persistence ([roadmap#3786](https://github.com/giantswarm/roadmap/issues/3786)) allowing our customers to use the observability platform with clickops and further improved the silence management [roadmap](https://github.com/giantswarm/roadmap/issues/2077).
- We onboarded a new customer to setup podlogs for their productive workload apps for the first time actually having customers productive app data in our platform! Big milestone here! 
- We closed 22 operational issues improving the observability platforms maintainability and user experience. Some notable mentions here are that we fixed the issue that users could not switch Grafana Organizations when authenticated via Teleport, we now backup Grafana Cloud Dashboards and we reviewed and reduced the amount of our OOBH Alerts. 

--------------------------------------------------------

**Roadmap**
- We finished enabling customers app teams to use our Alerting ([roadmap#2213](https://github.com/giantswarm/roadmap/issues/2213)) by
  - Investigate Grafana Alerting Tab - [roadmap#3955](https://github.com/giantswarm/roadmap/issues/3955)
  - Extend Alert Docs: Alerting on System Data in shared tenant - [roadmap#3999](https://github.com/giantswarm/roadmap/issues/3999)
  - Investigate and migrate past alert-forwarding setups - [giantswarm#32938](https://github.com/giantswarm/giantswarm/issues/32938)
- We made good progress on the grafana persistence ([roadmap#3786](https://github.com/giantswarm/roadmap/issues/3786)) allowing our customers to use the observability platform with clickops, by
  - fixing issues of grafana-postgresql on some clusters - [giantswarm#33379](https://github.com/giantswarm/giantswarm/issues/33379)
  - adding postgresql alert(s) - [giantswarm#33169](https://github.com/giantswarm/giantswarm/issues/33169)
  - adding Public Documentation for persisted Grafana - [roadmap#3927](https://github.com/giantswarm/roadmap/issues/3927)
  - adding Backup Management for Grafana Postgresql - [roadmap#3928](https://github.com/giantswarm/roadmap/issues/3928)
- We worked on improving the silence management [roadmap](https://github.com/giantswarm/roadmap/issues/2077) by
  - Removing operatorkit dependency from silence-operator - [giantswarm#3729](https://github.com/giantswarm/roadmap/issues/3729)
  - Open silence removal PRs before they expire - [giantswarm#27553](https://github.com/giantswarm/giantswarm/issues/27553)
  - Add a check in CI to inform if Silence expiration date will happen during week-end - [giantswarm#29685](https://github.com/giantswarm/giantswarm/issues/29685)

**Customer Work**
- violet - wrong data in usage dashboard - [giantswarm#33350](https://github.com/giantswarm/giantswarm/issues/33350)
- Kyverno RBAC for observability-policies-app and kyverno-policies-observabilit - [giantswarm#33416](https://github.com/giantswarm/giantswarm/issues/33416)
- Publish silence-operator Helm Chart - [silence-operator#280](https://github.com/giantswarm/silence-operator/issues/280)

**Operational Work**
- Failing silences kustomization - [giantswarm#33361](https://github.com/giantswarm/giantswarm/issues/33361)
- alloyUnhealthyComponent alerts - [giantswarm#33333](https://github.com/giantswarm/giantswarm/issues/33333)
- postgresql: tune disk usage - [giantswarm#33182](https://github.com/giantswarm/giantswarm/issues/33182)
- Loki on finch is having trouble with some queries - [giantswarm#33298](https://github.com/giantswarm/giantswarm/issues/33298)
- grafana home dashboard not found - [giantswarm#33307](https://github.com/giantswarm/giantswarm/issues/33307)
- alloy-logs is triggering a lot of alerts - [giantswamr#33309](https://github.com/giantswarm/giantswarm/issues/33309)
- Upgrade grafana db to postgresql 17 - [giantswarm#33345](https://github.com/giantswarm/giantswarm/issues/33345)
- Backup Grafana Cloud dashboards - [roadmap#3993](https://github.com/giantswarm/roadmap/issues/3993)
- Improve script removing expires silences - [giantswarmä33397](https://github.com/giantswarm/giantswarm/issues/33397)
- DeploymentNotSatisfied alerts are too sensitive - [giantswarm#33400](https://github.com/giantswarm/giantswarm/issues/33400)
- Broken Grafana organization when authenticating via teleport - [giantswarm#32760](https://github.com/giantswarm/giantswarm/issues/32760)
- Review OOBH Alerting - [giantswarm#33402](https://github.com/giantswarm/giantswarm/issues/33402)
- wallaby: Mimir distributor pod pending - [giantswarm#33129](https://github.com/giantswarm/giantswarm/issues/33129)
- observability-operator fails on new MC - [giantswarm#32664](https://github.com/giantswarm/giantswarm/issues/32664)
- Grafana Mimir datasource - performance tuning - [giantswarm#33470](https://github.com/giantswarm/giantswarm/issues/33470)
- Alloy errors on tamarin / testing - [giantswarm#33477](https://github.com/giantswarm/giantswarm/issues/33477)
- Mimir Resource Allocation Summary - [giantswarm#33485](https://github.com/giantswarm/giantswarm/issues/33485)
- glasgow alerts - [giantswarm#33489](https://github.com/giantswarm/giantswarm/issues/33489)
- Force recent alloy image - [giantswarm#33512](https://github.com/giantswarm/giantswarm/issues/33512)
- MimirIngesterNeedsToBeScaledUp - increase notification delay - [giantswarm#33513](https://github.com/giantswarm/giantswarm/issues/33513)
- We fixed some golangci-lint v2 problems in 
  - silence-operator - [giantswarm#33113](https://github.com/giantswarm/giantswarm/issues/33113)
  - versionbundle - [giantswarm#33127](https://github.com/giantswarm/giantswarm/issues/33127)
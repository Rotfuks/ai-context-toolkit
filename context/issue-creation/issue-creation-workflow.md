# Issue Creation Workflow

## Context
You are creating issues for a platform capability product in the cloud native space. Focus on delivering clear customer value and business outcomes.

**📋 For all rules and guidelines:** Reference [Issue Creation Rules](./issue-creation-rules.md)

## Step-by-Step Workflow

### 1. Determine Team Assignment
**CRITICAL FIRST STEP**: Before creating any issues, identify the appropriate team.

**If no team is specified, ask:**
- "Which team should this issue be assigned to? Please specify the team label (e.g., team/atlas, team/phoenix, team/rocket, etc.)"
- "Common team labels include: team/atlas, team/cabbage, team/honey-badger, team/nifflers, team/phoenix, team/planeteers, team/rocket, team/shield, team/up, team/turtles, team/tenet. Which team should handle this issue?"

### 2. Craft the Issue Title
Follow the title format and requirements defined in [Issue Creation Rules](./issue-creation-rules.md).

Use the template: `[Action] [What] to [Outcome/Benefit]`

### 3. Structure the Issue Description
Create the required sections following the content guidelines in [Issue Creation Rules](./issue-creation-rules.md):

1. **Motivation** (required)
2. **Todo** (required)
3. **Outcome** (required)
4. **Acceptance Criteria** (required)
5. **Technical Hints** (optional)

### 4. Apply Quality Checklist
Run through the quality checklist provided in [Issue Creation Rules](./issue-creation-rules.md) to ensure all requirements are met.

### 5. Add Required Labels
Add the team label as specified in [Issue Creation Rules](./issue-creation-rules.md).

## Issue Template

```markdown
### Motivation
[Why is this needed? What customer pain point does it address?]

### Todo
- [ ] [High-level step 1]
- [ ] [High-level step 2]
- [ ] [High-level step 3]

### Technical Hints (Optional)
[Brief technical suggestions if helpful]

### Outcome
[Positive impact for customers with measurable benefits]

### Acceptance Criteria
- [ ] [Immediately testable deliverable 1]
- [ ] [Immediately testable deliverable 2]
- [ ] [Validation step]
- [ ] [Documentation requirement]
```

## Example Issue Structure

**Title**: "Improve LogQL tutorial to reduce support tickets by 25%"

**Labels**: `team/atlas`

**Description**:
### Motivation
Customers have reported difficulty finding documentation for advanced features, leading to increased support requests and longer resolution times.

### Todo
- [ ] Review current documentation structure and identify pain points
- [ ] Identify gaps for advanced features based on support ticket analysis
- [ ] Propose and implement a new section for advanced features
- [ ] Add practical examples and troubleshooting guides

### Technical Hints
Consider using the existing documentation template for consistency. Focus on practical examples over theoretical explanations.

### Outcome
Customers can easily find and understand documentation for advanced features, reducing support requests by 25% and improving customer satisfaction scores.

### Acceptance Criteria
- [ ] New documentation section for advanced features is published and accessible
- [ ] At least three advanced features are documented with practical examples
- [ ] Documentation is reviewed and approved by the team
- [ ] Links to new documentation are added to main navigation

## Quick References

- **All rules and guidelines**: [Issue Creation Rules](./issue-creation-rules.md)
- **Common mistakes to avoid**: See [Issue Creation Rules](./issue-creation-rules.md)
- **Quality checklist**: See [Issue Creation Rules](./issue-creation-rules.md)
- **Title format requirements**: See [Issue Creation Rules](./issue-creation-rules.md) 
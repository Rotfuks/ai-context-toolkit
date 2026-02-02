Create an issue using the workflow and rules down below.

# Issue Creation Workflow

## Context
You are creating issues for a platform capability product in the cloud native space. Focus on delivering clear customer value and business outcomes.

Use the github mcp to create the issue. But first get feedback on the draft. 
I will give you context on what this issue is about. Do not invent any information, but ask me if you need any additional context. If I haven't defined the repository, use the default of giantswarm/giantswarm. If I haven't defined the team label use the default of team/atlas.  
Keep the text to a minimal and be concise. 

**📋 For all rules and guidelines:** Reference chapter **Issue Creation Rules** down below

## Step-by-Step Workflow

### 1. Determine Team Assignment
**CRITICAL FIRST STEP**: Before creating any issues, identify the appropriate team.

**If no team is specified, ask:**
- "Which team should this issue be assigned to? Please specify the team label (e.g., team/atlas, team/phoenix, team/rocket, etc.)"
- "Common team labels include: team/atlas, team/cabbage, team/honey-badger, team/nifflers, team/phoenix, team/planeteers, team/rocket, team/shield, team/up, team/turtles, team/tenet. Which team should handle this issue?"

### 2. Craft the Issue Title
Follow the title format and requirements defined in chapter **Issue Creation Rules**:

Use the template: `[Action] [What] to [Outcome/Benefit]`

### 3. Structure the Issue Description
Create the required sections following the content guidelines in chapter **Issue Creation Rules**:

1. **Motivation** (required)
2. **Todo** (required)
3. **Outcome** (required)
4. **Acceptance Criteria** (required)
5. **Technical Hints** (optional)

### 4. Apply Quality Checklist
Run through the quality checklist provided in chapter **Issue Creation Rules** to ensure all requirements are met.

### 5. Add Required Labels
Add the team label as specified in chapter **Issue Creation Rules**.

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


---


# Issue Creation Rules

## Issue Title Guidelines

### Title Format Template
```
[Action] [What] to [Outcome/Benefit]
```

### Action Verbs to Use
- **Improve** - for enhancements and quality improvements
- **Enable** - for new capabilities and features
- **Reduce** - for efficiency gains and cost savings
- **Eliminate** - for problem removal and risk mitigation
- **Accelerate** - for speed improvements and time savings
- **Enhance** - for quality and capability improvements
- **Streamline** - for process improvements and simplification

### Title Requirements
1. **Outcome-Oriented**: Focus on the end result, not the implementation
2. **Customer-Centric**: Emphasize value to customers/users
3. **Immediate Impact**: Focus on direct, achievable outcomes rather than long-term metrics
4. **Business Value**: Connect to business goals and customer pain points
5. **Clear Action**: Use strong action verbs that indicate progress
6. **Concise**: Keep under 80 characters when possible

### Title Examples

**❌ Poor Titles (Technical Focus):**
- "Refactor advanced LogQL tutorial"
- "Add Keda CRDs to ATS"
- "cleanup PMO finalizer on clusters"

**❌ Poor Titles (Absolute Metrics):**
- "Improve LogQL tutorial to reduce support tickets by 25%"
- "Reduce onboarding time by 50% with improved documentation"
- "Increase feature adoption by 30%"

**✅ Excellent Titles (Immediate Outcome Focus):**
- "Improve LogQL tutorial to reduce support burden"
- "Enable KEDA autoscaling to improve cluster resource utilization"
- "Eliminate PMO finalizer issues to prevent cluster deletion failures"
- "Streamline onboarding process with comprehensive documentation"
- "Enhance API documentation to improve developer experience"

## Core Issue Creation Principles

- **Customer Perspective:** Frame each issue from the perspective of the end user or customer
- **Business Impact:** Always connect to measurable business outcomes
- **Outcome-First:** Start with the desired outcome, then work backward to implementation
- **Motivation:** State why functionality is needed, referencing customer pain points
- **Scope:** Each issue should be achievable and appropriately sized
- **Language:** Use clear, professional language; avoid internal jargon
- **Formatting:** Use markdown with h3 (###) for sections and checkboxes for lists
- **Conciseness:** Keep issues brief and scannable - engineers should understand scope in under 2 minutes of reading

## Issue Section Content Guidelines

### Required Sections

**Motivation** (2-4 sentences max)
- Why is this needed?
- What customer pain point does it address?
- Connect to business goals
- **Keep brief** - one short paragraph

**Todo** (3-5 items max)
- High-level implementation steps
- Use checkboxes (`- [ ]`)
- Keep general, avoid deep technical details
- **Single line per item**

**Outcome** (2-3 sentences max)
- Positive impact for customers
- Measurable business benefits
- **Be specific and concise**

**Acceptance Criteria** (3-5 items max)
- Immediately testable deliverables
- Use checkboxes (`- [ ]`)
- Focus on implementation completion
- **Single line per item**

### Optional Sections

**Technical Hints** (bullet points, 3-5 items max)
- Brief technical pointers only
- Use bullet points for scannability
- **Only include if truly necessary**
- Keep each point to one line
- Link to docs rather than explaining

## Team Label Requirements

### Format
Use: `team/[team-name]` (e.g., `team/atlas`, `team/phoenix`, `team/rocket`)

### Rule
- All issues MUST have a team label
- Only use labels that are provided - do not invent additional labels
- If no team specified, ask for clarification before creating issues

## Acceptance Criteria Guidelines

### ✅ Good Acceptance Criteria (Immediately Testable)
- **Deliverables**: "Documentation is published and accessible"
- **Implementation**: "Feature is deployed and functional"
- **Integration**: "API endpoints are working and tested"
- **Validation**: "Code review is complete and approved"

### ❌ Poor Acceptance Criteria (Long-term Outcomes)
- **Business Metrics**: "Reduce support tickets by 25%"
- **Customer Satisfaction**: "Improve customer satisfaction scores"
- **Usage Metrics**: "Increase feature adoption by 30%"

### Best Practices
1. Focus on implementation deliverables
2. Be specific and testable
3. Include validation steps
4. Keep within issue scope
5. Separate long-term outcomes (put in "Outcome" section)

## Quality Checklist

Before finalizing any issue, verify:
- [ ] Title follows outcome-oriented format with immediate, achievable impact
- [ ] Title focuses on customer value, not technical implementation
- [ ] Title avoids absolute numbers/percentages (use qualitative outcomes instead)
- [ ] Motivation is 2-4 sentences max (one short paragraph)
- [ ] Todo items are 3-5 items, single line each
- [ ] Outcome is 2-3 sentences max
- [ ] Acceptance criteria are 3-5 items, single line each
- [ ] Technical hints are bullet points (if included), max 5 items
- [ ] Team label is specified and appropriate
- [ ] Language is clear and professional
- [ ] No internal jargon without explanation
- [ ] **Overall issue is scannable in under 2 minutes**

## Common Mistakes to Avoid

1. **Technical titles**: "Refactor X" → "Improve X to reduce Y"
2. **Absolute metrics in titles**: "Reduce support tickets by 25%" → "Reduce support burden"
3. **Vague outcomes**: "Better performance" → "Improve response times"
4. **Implementation in acceptance criteria**: "Reduce support tickets" → "Documentation is published and accessible"
5. **Missing team labels**: Always ask if not provided
6. **Internal jargon**: Explain acronyms and technical terms
7. **Wall of text**: Keep sections concise - if Motivation is more than 4 sentences, it's too long
8. **Too many items**: More than 5 Todo or Acceptance Criteria items indicates scope is too large
9. **Explanatory text**: Link to docs instead of explaining concepts in the issue

## What NOT to Include
- Deep technical implementation details
- Internal-only terminology without explanation
- Technical-focused titles that don't communicate business value
- Long-term business metrics in acceptance criteria 


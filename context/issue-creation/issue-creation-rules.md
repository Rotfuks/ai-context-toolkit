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

## Issue Section Content Guidelines

### Required Sections

**Motivation**
- Why is this needed?
- What customer pain point does it address?
- Connect to business goals

**Todo**
- High-level implementation steps
- Use checkboxes (`- [ ]`)
- Keep general, avoid deep technical details

**Outcome**
- Positive impact for customers
- Measurable business benefits
- Long-term value proposition

**Acceptance Criteria**
- Immediately testable deliverables
- Use checkboxes (`- [ ]`)
- Focus on implementation completion
- Include validation steps

### Optional Sections

**Technical Hints**
- Brief technical suggestions
- Keep minimal and non-prescriptive
- Only include if helpful for implementation

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
- [ ] Motivation clearly states the business problem
- [ ] Todo items are actionable but not overly detailed
- [ ] Outcome describes measurable customer benefits (specific metrics can be mentioned here)
- [ ] Acceptance criteria are immediately testable deliverables
- [ ] Team label is specified and appropriate
- [ ] Language is clear and professional
- [ ] No internal jargon without explanation

## Common Mistakes to Avoid

1. **Technical titles**: "Refactor X" → "Improve X to reduce Y"
2. **Absolute metrics in titles**: "Reduce support tickets by 25%" → "Reduce support burden"
3. **Vague outcomes**: "Better performance" → "Improve response times"
4. **Implementation in acceptance criteria**: "Reduce support tickets" → "Documentation is published and accessible"
5. **Missing team labels**: Always ask if not provided
6. **Internal jargon**: Explain acronyms and technical terms

## What NOT to Include
- Deep technical implementation details
- Internal-only terminology without explanation
- Technical-focused titles that don't communicate business value
- Long-term business metrics in acceptance criteria 
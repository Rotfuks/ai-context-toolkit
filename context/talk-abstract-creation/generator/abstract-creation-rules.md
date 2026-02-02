# Talk Abstract Creation Rules - Dominik Schmidle Style Guide

## ⚠️ CRITICAL PRINCIPLE: Authenticity Above All

**NEVER INVENT INFORMATION**
- All numbers, metrics, and specifics must be real and provided
- If information is missing, ASK for it - don't make it up
- Fake specifics destroy credibility and violate trust
- Better to have fewer concrete details than fabricated ones

**When Information is Missing:**
1. Note what's missing: "[Need: team size to show scale achievement]"
2. Ask specific questions: "How many people on the team? How many clusters?"
3. Explain why it matters: "Team size would make the scale ratio more impressive"
4. Provide alternatives: "Can use 'small team' if exact number unavailable"

---

## Core Profile Information
- **Name:** Dominik Schmidle
- **Role:** Platform Product Manager at Giant Swarm
- **Expertise:** Platform Engineering, Observability, Product Management, Cloud Native
- **Speaking Topics:** Product thinking for platforms, observability transformation, platform maturity, organizational change
- **Speaking Style:** Story-driven, honest about failures, metrics-heavy, practical and actionable

---

## Voice & Tone Characteristics for Talk Abstracts

### Overall Personality in Abstracts
- **Honest & Authentic:** Admits starting challenges, doesn't hide failures (e.g., "universally avoided", "four POs failed before me")
- **Confident but Humble:** Shows real achievements without bragging; focuses on lessons learned
- **Story-Driven:** Every abstract tells a transformation journey with clear before/after states
- **Metrics-Focused:** Always includes concrete numbers to prove credibility
- **Practical:** Emphasizes actionable takeaways over theoretical concepts

### Communication Style in Abstracts
- **Conversational Yet Professional:** Accessible language while maintaining conference standards
- **Problem-Solution Framing:** Always starts with relatable problem, shows journey to solution
- **Transformation Narrative:** Clear arc from chaos/challenge to improved state
- **Differentiation-Conscious:** Explicitly states what makes this talk different from others
- **Value-Explicit:** Crystal clear about who should attend and what they'll get

- **⚠️ Critical:** Do not use typical AI language patterns like "it's not about...it's about", "delve into", or others. 

---

## Technical Content Guidelines

### Key Topics & Domains
**Platform Engineering:**
- Developer platforms, internal platforms becoming products
- Platform maturity models (CNCF Platform Engineering Maturity Model)
- Platform-as-a-Product concept
- Multi-tenancy architecture, RBAC, self-service patterns

**Observability:**
- Monitoring vs observability distinction
- Scaling observability across many clusters/customers
- LGTM stack (Loki, Grafana, Tempo, Mimir)
- Grafana Alloy (OpenTelemetry collection)
- Organizational challenges in observability

**Product Management:**
- Product thinking for technical audiences
- Product thinking applied to internal tools
- Product Journey Value Mapping framework
- Stakeholder management and trust-building
- From cost center to revenue stream

**Organizational Transformation:**
- Build vs buy vs platform decisions
- Breaking firefighting cycles
- Cross-team adoption patterns
- Small teams at massive scale

### Technical Language Rules for Abstracts
- **Be Specific:** Use exact technology names (LGTM stack, not "observability tools")
- **Show Scale:** Include cluster counts, team sizes, customer numbers, geographic reach
- **Balance Depth:** Enough technical detail to show credibility, not so much it becomes a deep-dive
- **Avoid Buzzwords:** Never use "leverage", "synergy", "best-in-class", "game-changing", "cutting-edge"
- **Use Industry Terms Correctly:** Kubernetes (not K8s in formal abstracts), multi-tenancy, RBAC, observability vs monitoring

---

## Structure & Format Patterns

### Opening Patterns (Paragraph 1)

**Pattern A: Dramatic Contrast**
```
[Timeframe] ago, [specific bad state]. [Sensory details]. Today, [specific good state with numbers].

Example: "Two years ago, Giant Swarm's internal monitoring was universally avoided by 
engineering teams. Fragmented, difficult to use, and noisy. Today, that platform monitors 
150+ Kubernetes clusters across 10+ customers on multiple continents and is sold as a 
standalone product generating revenue."
```

**Pattern B: Relatable Problem Escalation**
```
[How it started - innocent/small]. [How it escalated - overwhelmed]. [The breaking point].

Example: "Your platform team started small. You automated Kubernetes cluster provisioning 
with some Terraform scripts, added useful services, teams adopted your platform. Success! 
Then reality hit: drowning in tickets, firefighting, endless upgrades."
```

**Pattern C: Provocative Statement**
```
[Common belief]. But [contradictory reality]. [Specific example proving the contradiction].

Example: "In modern software engineering, monitoring your own systems is already a 
standardised and interchangeable commodity best purchased cheaply from experts. However, 
everyone has probably heard a joke at some point about how expensive these monitoring 
services can become once a system reaches a certain size."
```

### Middle Patterns (Paragraphs 2-3)

**Paragraph 2: The Insight/Unique Angle**
- State the core realization or perspective
- Differentiate from common approaches
- Signal what makes this talk unique

Example: "This talk shares the organizational transformation from a Product Manager's 
perspective. The core insight: scaling observability is primarily an organizational 
challenge, not just technical."

**Paragraph 3: The Content/What You'll Learn**
- Specific patterns, frameworks, or decisions to be shared
- Include technical specifics for credibility
- Balance technical and organizational/product elements
- Use active language: "You'll learn how...", "Discover...", "Drawing from..."

Example: "You'll learn how platform engineering patterns shaped both technical decisions 
(multi-tenancy, RBAC, OSS LGTM stack) and organizational transformation (building 
stakeholder trust, enabling team adoption)."

### Closing Patterns (Final Paragraph)

**Pattern A: Audience + Value Statement**
```
[Scope clarification]. [Ideal for specific roles] [facing specific situation].

Example: "This isn't a technical deep-dive but focuses on organizational and product 
strategy. Ideal for PMs, platform engineers, SREs, and engineering leaders navigating 
'build, buy, or platform?' decisions."
```

**Pattern B: Call to Engagement**
```
[Invitation]. [What they'll discover]. [Who will benefit].

Example: "Join us to discover our early findings and see how they can help you develop 
more effective, user-focused platforms in your organization."
```

---

## Concrete Specificity Standards

### Always Include These Types of Numbers

**Scale Metrics:**
- Cluster counts: "150+ Kubernetes clusters"
- Customer counts: "10+ customers"
- Team size: "5-person team", "3-person platform team"
- User scale: "hundreds of developers", "50 developers"
- Geographic reach: "multiple continents", "cloud and on-premises"

**Transformation Metrics:**
- Timeframes: "two years ago", "over the past three years", "18-month journey"
- Scale changes: "from 50 to 150+ clusters", "now serves hundreds of developers"
- Business outcomes: "revenue stream", "from cost center to paid product", "became external offering"

**⚠️ Avoid Percentage Improvements Without Context:**
- ❌ "90% reduction in alerts" - Hard to verify, sounds like bragging
- ❌ "10x faster" - Unclear baseline, unsubstantiated claim
- ❌ "50% cost savings" - Can't easily prove, might be questioned
- ✅ Instead: Use provable facts like scale changes, business model shifts, or concrete before/after states

**⚠️ NEVER Invent Numbers:**
- ❌ Making up "150+ clusters" when you don't know the actual count
- ❌ Guessing "5-person team" without confirmation
- ❌ Fabricating any metrics to make abstract sound better
- ✅ If numbers missing: Ask "How many clusters? What's the team size?"
- ✅ Explain impact: "These numbers would strengthen the scale narrative"
- ✅ Use qualitative alternatives if unavailable: "small team managing large-scale deployment"

**Technology Specifics:**
- Exact stack names: "LGTM stack (Loki, Grafana, Tempo, Mimir)"
- Tool names: "Grafana Alloy", "Terraform scripts"
- Architecture terms: "multi-tenancy", "RBAC", "self-service"

### Specificity Levels

**Excellent Specificity (Aim for this):**
> "Today, that platform monitors 150+ Kubernetes clusters across 10+ customers on multiple 
> continents and is sold as a standalone product generating revenue."

*Why excellent: All numbers are provable (cluster count, customer count, geography, business model)*

**Good Specificity:**
> "These patterns let a 5-person team support massive scale while improving user experience."

*Why good: Team size is provable, though "massive scale" could be more specific*

**Poor Specificity (Avoid):**
> "We significantly improved our monitoring system and saw much better results."

*Why poor: Nothing provable, sounds like empty bragging without specifics*

---

## Title Patterns & Best Practices

### Successful Title Characteristics
- **Length:** 8-15 words ideal
- **Concrete Numbers:** Include if impressive (150+ clusters, 10+ years)
- **Transformation Signal:** "From X to Y", "Before → After"
- **Provocative Element:** Something unexpected or controversial
- **Avoid:** Generic phrases, pure buzzwords, vague promises

### Title Formula Library

**1. Transformation + Scale:**
"From [Problem] to [Solution]: [Specific Achievement with Numbers]"
- Example: "From Alert Fatigue to Platform Product: Scaling Observability Across 150+ Kubernetes Clusters"

**2. Provocative + Resolution:**
"[Controversial/Surprising Statement]—[How It Changed]"
- Example: "Nobody Wanted Our Monitoring Tool—Until Platform Thinking Made It a Revenue Stream"

**3. Problem + Solution Method:**
"[Emotional Problem State]: [How Solution Approach Fixes It]"
- Example: "Overwhelmed by Scale: How Product Thinking Fixes Platform Teams"

**4. Question + Preview:**
"[Provocative Question]? - [Answer Direction]"
- Example: "What the heck is Platform-as-a-Product? - How product thinking drives platform maturity"

**5. Contrasting States:**
"[Old/Wrong Approach] was yesterday - [New/Better Approach]!"
- Example: "Think Big: Monitoring Stack was yesterday - Observability Platform at scale!"

---

## Language & Vocabulary Guidelines

### Characteristic Phrases (Use These)
- "journey", "transformation", "patterns", "lessons learned"
- "before/after", "from X to Y", "started small", "reality hit"
- "organizational challenge", "product thinking", "platform approach"
- "practical patterns", "real-world", "drawing from", "in practice"
- "navigating decisions", "breaking the cycle", "strategic ownership"
- "universally avoided", "drowning in", "firefighting mode"
- "cost center to strategic asset", "internal tool to product"

### Words to Avoid (Never Use These)
- ❌ "leverage" (say "use" instead)
- ❌ "synergy" (say "working together" or be specific)
- ❌ "game-changing" / "game-changer" (show the change with numbers instead)
- ❌ "best-in-class" (demonstrate quality, don't claim it)
- ❌ "cutting-edge" (say "modern" or name the specific tech)
- ❌ "robust" (be specific about what makes it reliable)
- ❌ "seamless" (nothing is seamless, be honest)
- ❌ "revolutionary" (show the impact, don't claim revolution)
- ❌ "innovative" (describe what's different instead)
- ❌ "empower" (say "enable" or "make it possible")

### Sentence Structure Preferences
- **Vary Length:** Mix short punchy sentences with longer explanatory ones
- **Active Voice:** "You'll learn how..." not "Lessons will be shared about..."
- **Concrete Subjects:** "Platform teams" not "Organizations" 
- **Specific Actions:** "monitoring 150+ clusters" not "providing monitoring services"

---

## Professional Standards for Conference Abstracts

### Conference-Appropriate Tone
- **Professional but Accessible:** Not corporate-speak, not casual chat
- **Honest but Positive:** Admit challenges, focus on solutions and learnings
- **Confident but Humble:** Show achievements, acknowledge it's one approach among many
- **Story-Driven but Structured:** Clear narrative arc within organized paragraphs

### Technical Depth Balance
- **Enough to Show Credibility:** Name specific technologies, architectures, scale
- **Not Too Deep:** This is abstract, not technical documentation
- **Organizational Balance:** Technical AND organizational/product elements
- **Practitioner Perspective:** "Here's what we did and learned" not "Here's the theory"

### Perspective & Voice
- **Third Person for Formal Conferences:** "This talk shares..." not "I will share..."
- **First Person OK for Casual Conferences:** Some events prefer personal voice
- **"You" for Audience:** "You'll learn..." is almost always appropriate
- **"We" for Team:** "We transformed..." shows collective effort, not solo hero

---

## Differentiation Strategies

### How to Make Talks Stand Out

**1. Unique Perspective:**
- PM perspective at technical conference
- Technical perspective at product conference
- Organizational focus when others focus on technical
- Scale story when others focus on implementation

**2. Positive Perspective Framing:**
Highlight your unique lens without criticizing others.

✅ Good Examples:
- "From a Product Manager's perspective..."
- "Drawing from workshops with dozens of organizations..."
- "This isn't a technical deep-dive but focuses on organizational and product strategy"
- "Shares the organizational transformation journey..."

❌ Avoid (sounds dismissive):
- "Most talks fail to address..."
- "Other talks are missing..."
- "Unlike typical talks that only..."
- "What other talks don't tell you..."

**3. Unexpected Outcomes:**
- Internal tool became revenue product
- Organizational challenge, not technical
- Small team, massive scale
- What failed before what worked

**4. Cross-Domain Insights:**
- Technical + Organizational
- Engineering + Product Management
- Theory (maturity model) + Practice (real implementation)
- Multiple organizations' patterns, not just one story

---

## Audience Targeting Best Practices

### Be Specific About Roles
**Good:** "Ideal for PMs, platform engineers, SREs, and engineering leaders"
**Poor:** "Great for anyone interested in platforms"

### Identify Specific Problems
**Good:** "Platform teams overwhelmed by scale, drowning in tickets, unable to do strategic work"
**Poor:** "Teams facing platform challenges"

### State Actionable Outcomes
**Good:** "You'll learn to move from firefighting to strategic ownership through vision-driven roadmaps"
**Poor:** "You'll learn about platform management"

### Include Exclusions (Sometimes)
**Good:** "This isn't a technical deep-dive but focuses on organizational and product strategy"
**Clarifies:** Not for people wanting implementation details

---

## Quality Checkpoints

### Before Considering Draft Complete

**Voice Check:**
- [ ] Read it out loud - does it sound like someone talking, or like corporate documentation?
- [ ] Compare to 2-3 examples in talk-examples.md - similar rhythm and vocabulary?
- [ ] Remove any phrases that sound "AI-generated" or template-like
- [ ] Ensure personality comes through (honesty, humor, enthusiasm)

**Content Check:**
- [ ] Clear before/after transformation story
- [ ] At least 3 concrete metrics/numbers included
- [ ] Specific technologies/tools named correctly
- [ ] Unique angle explicitly stated
- [ ] Target audience clearly identified
- [ ] Actionable outcomes promised

**Professional Check:**
- [ ] No buzzwords or marketing language
- [ ] Appropriate length for conference guidelines
- [ ] Third person if required
- [ ] Grammar and spelling perfect
- [ ] Technical terms accurate
- [ ] No sales pitch for Giant Swarm (educational value only)

### Red Flags (If Present, Revise Immediately)
- ❌ Could describe multiple different talks (too generic)
- ❌ No concrete numbers or examples
- ❌ Sounds like it came from a corporate blog
- ❌ No clear story or transformation
- ❌ Unclear who should attend or why
- ❌ Uses buzzwords like "leverage", "best-in-class", etc.
- ❌ Technical inaccuracies or imprecise terms
- ❌ Overpromises or hypes

---

## Context-Specific Adaptations

### For Technical Conferences (KubeCon, OSMC, ContainerDays)
- **Emphasize:** Technical specifics, scale, architecture decisions
- **Balance:** Still include organizational/product perspective for differentiation
- **Audience:** Engineers, SREs, platform builders
- **Tone:** Professional, concrete, credible
- **Differentiation:** Organizational angle or product perspective

### For Product Conferences (ProductOwnerDays, Product Conferences)
- **Emphasize:** Product strategy, organizational transformation, stakeholder management
- **Balance:** Include enough technical to show it's real, not theoretical
- **Audience:** PMs, product leaders, product-focused engineers
- **Tone:** Story-driven, learning-focused, practical
- **Differentiation:** Technical credibility, specific metrics

### For Mixed Conferences (WeAreDevelopers, Developer Conferences)
- **Emphasize:** Balanced technical and organizational narrative
- **Balance:** Both domains equally represented
- **Audience:** Broad technical audience, various roles
- **Tone:** Accessible, engaging, practical
- **Differentiation:** Cross-domain insights

---

## Common Patterns from Dominik's Successful Abstracts

### Pattern 1: The Dramatic Transformation
**Structure:** Terrible before state → Insight → Amazing after state → What you'll learn
**Example:** "From Alert Fatigue to Platform Product" abstract
**Use When:** You have a compelling transformation story with strong contrast

### Pattern 2: The Relatable Spiral
**Structure:** Started small → Growth → Overwhelmed → The trap → The solution
**Example:** "Overwhelmed by Scale" abstract  
**Use When:** Audience is likely in the problem state you started in

### Pattern 3: The Provocative Question
**Structure:** Challenge assumption → Reframe question → Provide framework → Invite to learn
**Example:** "What the heck is Platform-as-a-Product?" abstract
**Use When:** Addressing misconceptions or emerging concepts

### Pattern 4: The Scale Achievement
**Structure:** Show impressive scale → Reveal it's a small team → Explain how patterns enabled it
**Example:** "Think Big: Monitoring Stack...Observability Platform at scale" abstract
**Use When:** You have impressive scale metrics to showcase

---

## Length & Format Guidelines

### Standard Conference Abstract Lengths
- **Short:** 150-300 words (1-2 paragraphs)
- **Medium:** 300-600 words (3-4 paragraphs)  
- **Long:** 600-1000 words (4-5 paragraphs with details)

### Character Limits
- Some conferences use character limits (e.g., 1000 chars)
- Count characters including spaces
- Adjust density, not just cut text
- Prioritize: Specifics > Story > Details

### Paragraph Structure
**4-Paragraph Structure (Most Common):**
1. Hook + Transformation (2-3 sentences)
2. Insight + Unique Angle (2-3 sentences)
3. Content + What They'll Learn (3-4 sentences)
4. Audience + Value (1-2 sentences)

**3-Paragraph Structure (Shorter):**
1. Hook + Insight (3-4 sentences)
2. Content + Specifics (4-5 sentences)
3. Audience + Value (2-3 sentences)

---

## Final Quality Standard

### A Dominik-Style Abstract Is:
✅ **Story-Driven:** Clear transformation narrative with before/after
✅ **Specific:** Multiple concrete numbers, technologies, and outcomes
✅ **Honest:** Admits challenges, doesn't oversell or hype
✅ **Differentiated:** Unique angle clearly stated
✅ **Practical:** Actionable takeaways, not just theory
✅ **Authentic:** Sounds like a person, not a corporation
✅ **Credible:** Technical and organizational credibility evident
✅ **Valuable:** Clear who benefits and how

### A Dominik-Style Abstract Is NOT:
❌ Generic corporate speak
❌ Pure technical deep-dive without story
❌ Buzzword bingo
❌ Sales pitch for Giant Swarm
❌ Vague claims without specifics
❌ Success-porn without acknowledging struggles
❌ Theoretical without practical grounding

---

## Notes for AI Generators

### Critical Success Factors:
1. **Specificity over Generality:** Always prefer "150+ clusters" over "many clusters"
2. **Story over Feature List:** Narrative arc beats topic enumeration
3. **Voice over Polish:** Better to sound authentically Dominik than perfectly formal
4. **Differentiation over Similarity:** Explicitly state what makes this unique
5. **Value over Description:** What they can DO after, not just what they'll HEAR about

### When in Doubt:
- Add more specific numbers
- Make the transformation more dramatic
- State the unique angle more explicitly
- Name the target audience more specifically
- Add more characteristic vocabulary
- Remove any buzzwords or corporate language

### Iterate Until:
- Sounds like Dominik wrote it (not AI)
- Tells a compelling transformation story
- Includes 3+ concrete specifics
- Clearly differentiates from other talks
- Makes you want to attend the talk

---

*These rules ensure abstracts sound authentically like Dominik's voice while meeting professional conference standards and standing out in competitive CFP reviews.*


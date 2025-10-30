# Talk Abstract Creation System

AI-powered system for creating conference talk abstracts in Dominik Schmidle's authentic voice with objective quality evaluation.

---

## System Overview

Two-agent system:
1. **Generator Agent** - Creates abstracts following voice/style guidelines
2. **Judge Agent** - Scores abstracts objectively (110-point system)

**Goal:** Iterate until abstract scores 85+ points (publication-ready)

---

## Quick Start

### For AI Generators Creating Abstracts

**Read these files in order:**
1. `generator/abstract-creation-workflow.md` - Follow the 8-step process
2. `generator/abstract-creation-rules.md` - Understand the voice and style
3. `talk-examples.md` - See patterns in real approved abstracts

**⚠️ Critical Rule:** NEVER invent numbers or specifics - ASK for missing information

**Workflow:**
1. Gather context (ask all questions upfront)
2. Generate 3-5 title options
3. Draft abstract (4-paragraph structure from workflow)
4. Self-evaluate
5. Request judge evaluation
6. Revise based on feedback until score ≥85

### For AI Judges Evaluating Abstracts

**Read this file:**
- `judge/eval-metrics.md` - Complete 110-point scoring rubric

**Process:**
1. Score each metric (0-10) systematically
2. Provide specific examples for scores
3. Give structured feedback with improvements
4. Verify no invented specifics (-10 point penalty if found)

**Quality threshold:** 85+ points = Ready to submit

---

## File Guide

| File | Purpose | When to Use |
|------|---------|-------------|
| **generator/abstract-creation-workflow.md** | Step-by-step process with templates | Creating new abstracts |
| **generator/abstract-creation-rules.md** | Voice, style, language rules | Understanding Dominik's voice |
| **judge/eval-metrics.md** | 110-point evaluation framework | Scoring abstract quality |
| **talk-examples.md** | Approved abstracts for reference | Seeing patterns in practice |

---

## Core Principles

### 1. Never Invent Information
- All numbers/metrics must be real and provided
- Missing info = ASK for it, don't make it up
- Penalty: -10 points for invented specifics

### 2. Voice Authenticity Required
- Must sound like Dominik wrote it (90%+ match)
- See `abstract-creation-rules.md` for details

### 3. Concrete Specificity Needed
- Minimum 3+ provable specifics required
- See `abstract-creation-rules.md` for what counts

### 4. Quality Threshold
- Score ≥85/110 to be submission-ready
- See `eval-metrics.md` for scoring system

---

## Evaluation System

**110 Points Total:**
- Style Authenticity: 40 points
- Content Quality: 35 points
- Professional Standards: 25 points
- Impact Potential: 10 points (bonus)

**Score Thresholds:**
- 95-110: Excellent, submit immediately
- 85-94: Strong, minor polish needed
- 70-84: Good, needs targeted work
- <70: Major revision required

See `judge/eval-metrics.md` for complete rubrics.

---

## Typical Workflow Timeline

- Gather context: 15 min
- Generate titles: 10 min
- Draft v0.1: 20 min
- Self-evaluate & iterate: 30 min
- Get judge evaluation: 5 min
- Revise based on feedback: 20 min

**Total: ~2 hours** from context to submission-ready abstract

---

## Files Overview

### `generator/abstract-creation-workflow.md` (383 lines)
**What it contains:**
- 8-step creation process
- Information gathering templates
- Title generation formulas
- 4-paragraph structure templates
- Iteration guidelines
- Troubleshooting tips

### `generator/abstract-creation-rules.md` (524 lines)
**What it contains:**
- Voice and tone characteristics
- Language patterns (use vs avoid)
- Structural patterns for each section
- Concrete specificity standards
- Title patterns with examples
- Differentiation strategies
- Conference-specific adaptations

### `judge/eval-metrics.md` (446 lines)
**What it contains:**
- 110-point scoring system
- Detailed rubrics (0-10) for 15 metrics
- Checklist items for each metric
- Red flag detection with penalties
- Structured feedback format
- Evaluator guidelines

### `talk-examples.md` (203 lines)
**What it contains:**
- 9+ approved conference abstracts
- All successfully submitted/accepted
- Shows voice and patterns in practice
- Annotated with key characteristics

---

## Common Questions

**Q: Abstract doesn't sound like Dominik?**
→ Compare to `talk-examples.md`, check voice rules in `abstract-creation-rules.md`

**Q: What specifics do I need?**
→ See "Concrete Specificity Standards" section in `abstract-creation-rules.md`

**Q: How do I score this metric?**
→ Use detailed rubrics in `eval-metrics.md` with 0-10 scale

**Q: Missing information about the talk?**
→ ASK for it, explain why it matters, offer alternatives - NEVER invent

**Q: Score below 85?**
→ Focus on lowest-scoring category first, rewrite don't patch, iterate

---

## Best Practices

**For Generators:**
- Read ALL files before starting
- Ask ALL questions upfront (gather complete context)
- Use examples from `talk-examples.md` for voice calibration
- Rewrite from scratch when iterating (don't just patch)
- Never invent numbers - ask or use qualitative descriptions

**For Judges:**
- Score every metric systematically
- Quote specific examples when scoring
- Compare voice to `talk-examples.md`
- Verify all numbers were provided in context
- Give specific improvement suggestions

---

## Success Criteria

An abstract is ready when:
- ✅ Score ≥85/110
- ✅ Sounds authentically like Dominik (90%+ match)
- ✅ Contains 3+ concrete, provable specifics
- ✅ Tells clear transformation story
- ✅ Unique angle explicitly stated
- ✅ No invented details or buzzwords

---

*System created October 2025 - For consistent, authentic, measurable quality in conference abstracts.*

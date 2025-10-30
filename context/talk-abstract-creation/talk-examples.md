# Dominik Schmidle's Approved Talk Abstracts

This file contains previously submitted and accepted conference talk abstracts. These serve as reference examples for voice, style, structure, and quality standards.

---

## Example 1: Observability Platform Transformation

**Title:** 
From Alert Fatigue to Platform Product: Scaling Observability Across 150+ Kubernetes Clusters

**Abstract:** 
Two years ago, Giant Swarm's internal monitoring was universally avoided by engineering teams. Fragmented, difficult to use, and noisy. Today, that platform monitors 150+ Kubernetes clusters across 10+ customers on multiple continents and is sold as a standalone product generating revenue.

This talk shares the organizational transformation from a Product Manager's perspective. The core insight: scaling observability is primarily an organizational challenge, not just technical.

You'll learn how platform engineering patterns shaped both technical decisions (multi-tenancy, RBAC, OSS LGTM stack) and organizational transformation (building stakeholder trust, enabling team adoption). These patterns let a small team support massive scale while improving user experience.

This isn't a technical deep-dive but focuses on organizational and product strategy. Ideal for PMs, platform engineers, SREs, and engineering leaders navigating "build, buy, or platform?" decisions.

**Conference:** KubeCon EU (planned)
**Status:** Submitted
**Score Estimate:** 92/110

---

## Example 2: Product Thinking for Platform Teams

**Title:** 
Overwhelmed by Scale: How Product Thinking Fixes Platform Teams

**Abstract:** 
Your platform team started small. You automated Kubernetes cluster provisioning with some Terraform scripts, added useful services, teams adopted your platform. Success! Then reality hit: drowning in tickets, firefighting, endless upgrades. Your small team serves hundreds of developers with no time for strategic work. Leadership sees your platform as a cost center with unclear ROI.

This pattern repeats everywhere. Platform teams get trapped building what's requested, reacting to fires, unable to say no or think strategically. The problem: treating platforms as service desks instead of products.

Drawing from workshops with dozens of organizations, this talk shows how product thinking breaks the cycle. You'll learn to move from firefighting to strategic ownership through vision-driven roadmaps, prioritization enabling saying no, and value communication shifting platforms from cost centers to strategic assets, including practical patterns for restructuring teams.

**Conference:** KubeCon EU (planned)
**Status:** Submitted
**Track:** Platform Engineering

---

## Example 3: CNCF Platform Research

**Title:**
Platform-as-a-Product: First Insights from CNCF Platform Working Group's Ongoing Research

**Abstract:**
After releasing the Platform Engineering Maturity Model, the CNCF Platforms Working Group is now studying how companies enhance their platform maturity. One approach is treating platforms as products—viewing users as customers and ensuring the platform meets their needs.

To explore this, we conducted interviews and created a survey to gather information from various organizations. Our goal was to determine if they apply product thinking principles in their platform engineering efforts.

In this presentation, we will outline our research objectives and data collection methods. We will then share our initial findings, highlighting common strategies, challenges, and best practices in platform engineering. Attendees will learn how other companies build their platforms and how to apply these lessons to improve their own platforms.

Join us to discover our early findings and see how they can help you develop more effective, user-focused platforms in your organization.

**Conference:** KubeCon
**Track:** Platform Engineering
**Co-speakers:** Yes (CNCF Working Group presentation)

---

## Example 4: Sustainability in Cloud

**Title:**
Sustainability in the Cloud - becoming green in 3 easy steps, promised ;)

**Abstract:**
According to marketing all clouds are green. But what does "green" mean anyways? And do you need to do anything to have a sustainable software product, as long as you use one of those "green" clouds? Sadly it's not that easy. With the huge impact the IT sector has in global carbon emissions we need to look beyond the marketing slogans.

In this talk we want to explore 3 easy steps on how you can have a positive impact and make sure your infrastructure and apps are (more) sustainable. From understanding the problem, over measuring your sustainability level to optimising for improvements - here you'll learn about different options and approaches that you can use to make your software greener today.

**Conference:** Developer Conference
**Tone:** Slightly more casual (note the emoji in title)
**Focus:** Educational, practical steps

---

## Example 5: Monitoring to Observability Platform

**Title:**
Think Big: Monitoring Stack was yesterday - Observability Platform at scale!

**Abstract:**
In modern software engineering, monitoring your own systems is already a standardised and interchangeable commodity best purchased cheaply from experts.

However, everyone has probably heard a joke at some point about how expensive these monitoring services can become once a system reaches a certain size. So would you rather build it yourself?

But as the complexity of your own systems increases, so does the effort of your monitoring stack - right up to the organisational question: Is monitoring just one component in every team or is it a separate product after all?

In this talk, we will therefore use the monitoring story of a B2B Kubernetes Cluster Fleet Management Platform (because why not a super complex system?) to explore how the commodity monitoring can be successfully organised across several teams and effectively deliver added value with product thinking and platform patterns, even to the end customer.

**Conference:** Cloud Native / Observability Conference
**Language:** English (translated from German)
**Unique Element:** Uses question format, addresses build vs buy

---

## Example 6: Platform-as-a-Product Concept

**Title:**
What the heck is Platform-as-a-Product? - How product thinking drives your platform maturity

**Abstract:**
The Cloud Native Computing Foundations (CNCF) Platform Engineering Maturity Model has made one thing pretty obvious: In order to have a mature (and successful) platform, you need to handle it as a product. But what does this even mean? If we rename the operations team to product team and stick a "product owner" title on some team member, now we're done and more mature?

Like with platforms in general, in product management, there is no real "one solution fits all", and it strongly depends on your organizational context and individual preferences. There is, sadly, no checklist of tools and processes to simply adopt and be done; there is not even a Backstage for platform product management. There are, however, fundamental product thinking concepts and core values to provide direction and serve as your guide on this journey.

In this talk, we'll explore questions like: What is Platform-as-a-Product? How does product thinking in the platform space work and where can you start?

**Conference:** Platform Engineering / Cloud Native
**Format:** Educational, framework introduction
**Audience:** Platform builders new to product thinking

---

## Example 7: Infrastructure as Product (German)

**Title:**
Infrastruktur als Produkt: Transparenter Wert selbst in komplexesten Umgebungen

**Abstract:**
Alle modernen Anwendungen benötigen Infrastruktur, um für Kunden zugänglich zu sein, und zwar eine ganze Menge davon! Doch Infrastruktur kann ziemlich komplex sein – vor allem, wenn man sie nicht nur als Nutzer, sondern als Anbieter verwalten muss.

In diesem Vortrag betrachten wir daher, wie Infrastrukturanbieter mit einer produktbezogenen Denkweise (dem Product Thinking) auch in diesem herausfordernden Umfeld kontinuierlich Wert für ihre spezifische Zielgruppe liefern können. Am Beispiel von Kubernetes wird hierfür ein hilfreiches Framework vorgestellt, mit dem sich "Value Opportunities" einfach identifizieren und messen lassen.

**Conference:** German Developer Conference
**Language:** German
**Focus:** Value delivery framework for infrastructure

---

## Example 8: Product Journey Value Mapping

**Title:**
Product Journey Value Mapping: Paving the Way for Continuous Value Delivery

**Abstract:**
Product Management is no cakewalk. Identifying the right problems to solve and ensuring everyone understands your product and the value it offers can be quite a challenge. You might have created a compelling vision, learned more about your target audience with Personas and stacked your backlog with lots of epics.

But how do you thread these isolated pieces into a coherent narrative that guides you from vision to execution? More crucially, how do you transparently measure your progress in delivering value?

Join Dominik for this talk, where you will discover a tool that can act as your thread and needle, connecting your vision to execution by converting user interactions into tangible value. He will introduce you to the „Product Journey Value Mapping" framework, which can be directly applied to your products. Together with Dominik you will explore the process of dissecting a product's lifecycle, understanding diverse user perspectives, and creating actionable metrics using a real-world product example.

**Conference:** Product Management Conference
**Format:** Framework introduction with practical example
**Audience:** Product Managers

---

## Example 9: Cloud Abstraction

**Title:**
The Future of Cloud is Abstraction - Why Kubernetes is not the Endgame for STACKIT

**Abstract:**
With the Cloud transformation many companies are introducing self-service portals for infrastructure. The times of writing a ticket to your infrastructure department and then waiting a couple of months until your virtual machine is delivered are (hopefully) over. Especially in combination with the DevOps Mindset development teams can with just a few clicks get the infrastructure they need to host their applications. And orchestration tools just like Kubernetes make sure those apps can scale up, down and out to cover even the highest load peaks with minimal costs.  

But this enablement of development teams to get high performance infrastructure with just a few clicks also comes with some risks! In this talk we want to have a look why your development team might not need Kubernetes, what the idea behind Platform as a Service is and how we use Cloud Foundry to put the consumer experience first in the STACKIT Cloud.

**Conference:** Cloud/Platform Conference
**Unique Element:** Challenges Kubernetes as default, promotes higher abstraction
**Company Context:** STACKIT (previous employer)

---

## Key Patterns Across All Examples

### Structural Patterns:
1. **Opening Hook:** Problem statement or provocative question
2. **Context Setting:** Specific situation or scale
3. **Transformation/Journey:** Clear before/after or exploration path
4. **Value Proposition:** What attendees will learn/gain
5. **Audience Identification:** Who should attend

### Voice Characteristics:
- **Conversational:** "What the heck", "no cakewalk", "(hopefully)"
- **Honest:** Admits complexity, challenges
- **Specific:** Numbers, technologies, real examples
- **Question-Driven:** Often uses questions to engage
- **Practical:** Focus on actionable takeaways

### Content Elements:
- **Concrete Scale:** "150+ clusters", "10+ customers", specific team sizes
- **Specific Tech:** Names tools/stacks explicitly
- **Real Transformation:** Clear before/after states
- **Organizational + Technical:** Balance both perspectives
- **Differentiation:** Often states what this ISN'T (not deep-dive, not just technical)

### Title Patterns:
- Transformation format: "From X to Y"
- Provocative: "What the heck is..."
- Statement: "Think Big: X was yesterday - Y!"
- Scale emphasis: "...at scale", "across X+ clusters"
- Problem + Solution: "X: How Y fixes it"

---

*These examples demonstrate the consistent voice, structure, and quality standards expected in Dominik's conference abstracts.*


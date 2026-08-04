Is idea ko thoda pivot karunga. **"Property Page Generator" mat banao.**

PRD ka product hoga:

# **SalesDeck AI**

### *Create Beautiful Shareable Sales Pages in 60 Seconds*

---

# PRD v1.0

## Vision

Enable any salesperson to create a premium interactive sales presentation without designers, developers or PDFs.

Instead of sending

```
30 Images

↓

WhatsApp

↓

Price

↓

Location
```

they send

```
Beautiful Website

↓

Branding

↓

Analytics

↓

Lead Capture

↓

Book Meeting
```

---

# Problem Statement

Today sales people use

* WhatsApp
* PDFs
* PowerPoint
* Google Drive
* Images

Problems

* ugly presentation
* files get lost
* no analytics
* no branding
* difficult to update
* impossible to know client viewed or not

---

# Solution

Create

↓

Beautiful sales page

↓

Share link

↓

Track views

↓

Capture leads

↓

Close faster

---

# Initial ICP (Don't target everyone)

### Phase 1

Real Estate Agents

### Phase 2

Car Dealers

### Phase 3

Interior Designers

### Phase 4

Solar Companies

### Phase 5

Furniture Sellers

### Phase 6

Insurance Advisors

---

# User Flow

```
Signup

↓

Create Presentation

↓

Select Industry

↓

Choose Template

↓

Upload Images

↓

Fill Details

↓

Publish

↓

Share

↓

Track Views
```

---

# MVP Features

## Authentication

* Google Login
* Email Login

---

## Dashboard

```
Presentations

Drafts

Views

Leads
```

---

## Create Presentation

Industry

* Property
* Car
* Interior

---

### Basic Details

Title

Subtitle

Price

Location

Description

---

### Gallery

Unlimited Images

Video

360 Image (Future)

---

### Amenities

Dynamic Chips

Parking

Lift

Swimming Pool

Power Backup

---

### CTA

Call

WhatsApp

Email

Book Visit

Download Brochure

---

### Lead Form

Name

Phone

Email

Requirement

---

### Share

```
salesdeck.app/p/abc123
```

QR

Short URL

Copy Link

---

### Analytics

Views

Unique Visitors

Time Spent

Clicks

Lead Count

---

# Future Features

## Compare Mode

Client compares

Property A

vs

Property B

vs

Property C

---

## AI Description

Generate better sales copy.

---

## AI Image Enhancement

Improve uploaded images.

---

## Voice Tour

Agent records voice.

Client listens.

---

## AI Translator

Hindi

English

Arabic

French

---

## Team Workspace

Multiple Agents

Roles

Shared Templates

---

## CRM

Lead Pipeline

Meeting

Reminder

Notes

---

# Pricing

## Free

3 Presentations

---

## Starter

₹299/month

50 Presentations

---

## Pro

₹999/month

Unlimited

Analytics

Branding

Custom Domain

---

# Tech Stack

Frontend

* Next.js
* React
* Tailwind
* Shadcn
* Framer Motion

Backend

* Node.js
* PostgreSQL
* Prisma
* Redis

Storage

* S3 / Cloudflare R2

Deployment

* Docker
* Coolify
* AWS

---

# Database

```
Users

Organizations

Templates

Presentations

Sections

Images

Videos

Leads

Analytics

Themes
```

---

# Templates

### Property

Luxury Villa

Apartment

Commercial

Warehouse

---

### Car

Premium

Used

Luxury

Dealer

---

### Interior

Home

Office

Kitchen

---

### Solar

Residential

Industrial

---

### Furniture

Luxury

Office

Home

---

# Public Page

```
Hero

↓

Gallery

↓

Details

↓

Features

↓

Map

↓

Agent

↓

FAQ

↓

Lead Form

↓

Related Items
```

---

# Success Metrics

* Time to create presentation < 3 min
* Share rate > 80%
* View → Lead conversion > 15%
* Returning users > 40%

---

# Biggest Risk (Important)

**After thinking through the business, I think this is the biggest risk—not the technology.**

If users create a presentation **only once when they get a new property**, they may not stay subscribed. A low-frequency workflow leads to higher churn.

To reduce that risk, the product should become the agent's **daily sales workspace**, not just a page builder.

Examples:

* Lead inbox
* Visit scheduling
* Client shortlists
* Property comparison
* View analytics
* Reusable templates
* QR codes for offline marketing

Those features increase daily usage and make a subscription easier to justify.

---

# What I would change before writing code

I would narrow the product even further.

Instead of:

> **SalesDeck AI**

I would launch as:

> **PropertyDeck – Create beautiful property presentations in 60 seconds**

Only after getting **100+ paying real-estate users** would I expand into cars, interiors, solar, and other industries.

That keeps the product focused, simplifies marketing, and gives you a much better chance of finding product–market fit before becoming a horizontal platform.

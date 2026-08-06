# CFO Considerations — Full Question Bank

Questions per report section. Use these to interrogate the inputs; unanswered
questions become **Open questions & assumptions** entries, never silence.

**The labeling rule applies to every answer these questions produce.** A figure
that came from the input documents or the user is **[sourced]** with its location
cited; anything you derived, benchmarked, or reasoned to is **[estimate]** with
the basis stated. These questions are designed to surface which of the two you
are holding — several of them ask whether a number *exists* rather than what it
is, and that distinction is the point.

---

## Business model & revenue streams

- What are all the ways money comes in, and which one is expected to carry the
  business?
- Who actually pays — the user, an advertiser, a platform, an enterprise buyer?
  Are payer and user the same person?
- What revenue is being deliberately left on the table (ethical positioning,
  brand, regulation), and has that cost been quantified?
- Is revenue recurring, transactional, or one-time? What is the natural
  repurchase or renewal rhythm?
- What does the platform take (app store 15–30%, marketplace fees, payment
  processing)?

## Unit economics

- What is the price point or ARPU, and what comps justify it?
- What does one customer cost to acquire (CAC), by channel? Which channels are
  proven versus hoped-for?
- What is a customer worth over their lifetime (LTV), and what retention curve
  does that assume?
- LTV:CAC ratio and payback period — is there a stated payback policy, e.g.
  recover CAC by month N?
- Contribution margin per unit after COGS, platform fees, and support — is each
  sale actually profitable?
- Which single variable moves the model most: price, conversion, retention, or
  CAC?

## Cost structure

- What does it cost to build to first revenue: headcount, months,
  contractor/content/licensing line items?
- Fixed versus variable: what scales with users (infra, support, moderation,
  payment fees) and what does not?
- What are the hidden cost bombs — content production, voice/art/animation,
  localization, compliance, moderation staffing?
- Buy versus build: which capabilities are commodity (auth, payments, analytics,
  LiveOps) and should not consume custom-build budget?
- What standing opex does the plan commit to post-launch (live content, support,
  infra), and is it staffed and priced?

## Cash flow, burn & runway

- Current cash, monthly burn, and runway — to the next milestone, not just to
  zero.
- What must be true before the next tranche of spend is released? Are there
  kill or pivot gates?
- What is the working-capital shape — do costs land before revenue (inventory,
  content, UA spend)?
- Is spend front-loaded before the riskiest assumption is validated? Capital
  spent before the thesis is tested is the most expensive kind.

## Pricing & monetization

- Is pricing anchored to value delivered, to comps, or to guesswork?
- What willingness-to-pay evidence exists, if any?
- Discounting and free-tier policy: what converts free to paid, and what is the
  expected conversion rate against benchmarks?
- Price-increase path: can pricing grow with value, or is it locked?

## Scenarios & break-even

- Base, upside, downside: what revenue and cost assumptions define each?
- What does break-even require in each scenario — customers, conversion rate,
  months?
- At what point does the downside scenario demand a decision: shut down, pivot,
  or raise?

## Risks & sensitivities

- Rank risks by what breaks the model first, not by likelihood alone.
- Platform risk: policy change, fee change, rating or featuring loss, account
  termination.
- Regulatory risk: loot boxes, data privacy, age ratings, financial regulation —
  and where the no-go lines are.
- Concentration risk: one channel, one customer, one platform, one key person.
- What assumption, if wrong by 2x, kills the business?

## KPIs

Per KPI: metric, target threshold, measurement source, and what spend it gates.
Prefer a small set that actually gates decisions over a dashboard of vanity
metrics.

---

## Domain-specific prompts

Select the set matching the business type. Applying the wrong set produces
metrics that sound rigorous and do not describe this business.

**SaaS** — MRR/ARR, net revenue retention, gross margin (target 70%+), churn
(logo versus revenue), magic number or burn multiple, expansion revenue.

**Mobile game / F2P** — ARPDAU, conversion % to payer, D1/D7/D30 retention, CPI
by geo and audience, whale-dependence of the revenue curve, UA payback window
(D90/D180), LiveOps run-rate, and the soft-launch cohort sizes needed for
statistically valid gate metrics — including what that UA spend costs.

**Marketplace** — take rate, GMV versus net revenue (never conflate the two),
liquidity and fill rate, which side is subsidized and for how long,
disintermediation risk.

**Hardware / physical** — BOM cost and margin, MOQ and inventory risk, landed
cost, warranty and returns rate, channel margin stacking.

**Services / agency** — utilization rate, effective hourly rate, pipeline
coverage, concentration of top clients, and the scalability ceiling of
headcount-driven revenue.

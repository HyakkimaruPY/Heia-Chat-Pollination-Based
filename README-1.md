<div align="center">

<img src="https://raw.githubusercontent.com/pollinations/pollinations/main/assets/logo.svg" width="120" alt="Pollinations.AI Logo" />

# 🌸 HEIA — AI Chat Interface

**A free, open-source AI chat interface powered by Pollinations.AI**

[![Built with Pollinations](https://img.shields.io/badge/Built%20with-Pollinations-8a2be2?style=for-the-badge&logo=data:image/png;base64,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&logoColor=white&labelColor=6a0dad)](https://pollinations.ai)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<br />

> 🔑 **A free Pollinations public API key is required to use this app.**  
> Get yours at [enter.pollinations.ai](https://enter.pollinations.ai) — no credit card needed.

</div>

---

## Table of Contents

- [About](#about)
- [Requirements — Public API Key](#requirements--public-api-key)
- [Pollinations Credit System (Pollen)](#pollinations-credit-system-pollen)
- [Access Tiers](#access-tiers)
- [How to Level Up](#how-to-level-up)
- [Rate Limits](#rate-limits)
- [Getting Started](#getting-started)
- [Submit Your App to Pollinations](#submit-your-app-to-pollinations)

---

## About

HEIA is a web-based AI chat interface for language models and image generation, built entirely on the free and open API from [Pollinations.AI](https://pollinations.ai). It supports multiple models (GPT, Claude, Gemini, DeepSeek, Grok and more) without requiring proprietary API keys from each provider individually.

Built with pure **HTML, CSS and vanilla JavaScript** — no build step, no framework, no backend.

---

## Requirements — Public API Key

> ⚠️ **This project does not support anonymous/unauthenticated access.**  
> A Pollinations public API key is required to authenticate requests and unlock usable rate limits.

**How to get your free key — takes under 2 minutes:**

1. Go to **[enter.pollinations.ai](https://enter.pollinations.ai)**
2. Sign in with your **GitHub account** (OAuth, no password needed)
3. Copy your **public API key** from the dashboard
4. Open HEIA and paste it on the login screen

Your key grants you a daily Pollen balance and higher rate limits than anonymous access, completely free.

---

## Pollinations Credit System (Pollen)

Pollinations uses a credit system called **Pollen** to manage API usage fairly across all users.

| Concept | Detail |
|---|---|
| Conversion rate | `1 Pollen ≈ $1 USD` |
| Free models | Available without auth (heavily rate-limited) |
| Daily Pollen | Granted automatically based on your tier — resets daily |
| Purchased Pollen | Never expires; spent after daily balance runs out |
| Crypto Pollen | Final fallback after tier and purchased Pollen |

### Spend order per request

```
1st → tier_balance    (free daily Pollen from your tier)
2nd → pack_balance    (Pollen purchased with card)
3rd → crypto_balance  (Pollen purchased with cryptocurrency)
```

> ⚠️ **Daily Pollen does not accumulate.** Unused balance expires at midnight every day.  
> Purchased Pollen never expires.

---

## Access Tiers

Pollinations uses a progressive tier system. Each tier unlocks more free daily Pollen and better rate limits.

| Tier | Pollen / day | Rate Limit | How to get it |
|---|---|---|---|
| 🦠 `microbe` | 0 | — | GitHub activity milestone (pre-baseline) |
| 🌱 `spore` | 0 | 1 req / 15s | Default on signup — every new user starts here |
| 🌿 `seed` | 1 / day | 1 req / 5s | GitHub activity on the Pollinations repo |
| 🌸 `flower` | 10 / day | 1 req / 3s | Submit and get an app approved |
| 🍯 `nectar` | 100 / day | No limit* | Manual review by platform maintainers |
| 🔀 `router` | Unlimited | No limit | Infrastructure partners / internal only |

> *Some premium models may have additional access restrictions regardless of tier.

### Key rules

- All new users start at **`spore`** upon GitHub OAuth registration
- Users at `spore` **cannot submit apps** — you must reach `seed` first
- Upgrades to `nectar` and `router` are **manual** and reserved for significant contributors
- Tiers **never go down** automatically — the system has downgrade protection built in

---

## How to Level Up

```
spore  →  seed     Star/fork the Pollinations repo, open issues or submit PRs
seed   →  flower   Submit an app and get it approved via GitHub Issue
flower →  nectar   Manual review — become a core contributor
nectar →  router   Infrastructure partners only, not publicly available
```

### Reaching 🌿 Seed

1. Sign in at [enter.pollinations.ai](https://enter.pollinations.ai) with GitHub
2. Engage with the Pollinations repository — star it, open issues, submit PRs
3. The upgrade is applied **automatically** via GitHub Actions when activity is detected

### Reaching 🌸 Flower

1. You must already have `seed` tier (required — `spore` is blocked from submitting)
2. Submit your app via the [official GitHub Issue template](https://github.com/pollinations/pollinations/issues/new?template=tier-app-submission.yml)
3. An AI agent validates your submission and enriches metadata automatically
4. Maintainers review and merge the PR
5. Your tier is **automatically upgraded to `flower`** when the PR is merged

---

## Rate Limits

| Tier | Image generation | Text generation |
|---|---|---|
| Anonymous / `spore` | 1 req / 15s | 1 req / 15s |
| `seed` | 1 req / 5s | 1 req / 5s |
| `flower` | 1 req / 3s | 1 req / 3s |
| `nectar` / `router` | No limit | No limit |

> 💡 Use **exponential backoff** when hitting limits — wait 1s, then 2s, then 4s, etc.

---

## Getting Started

### Run locally

```bash
# Requires a local HTTP server — file:// won't work due to CORS
python3 -m http.server 8080
# or
npx serve .
```

Open `http://localhost:8080` in your browser and paste your Pollinations key on the login screen.

### Direct API usage (without HEIA)

```bash
# Generate an image (anonymous, rate-limited)
curl 'https://image.pollinations.ai/prompt/a%20beautiful%20sunset'

# Generate text with your key (OpenAI-compatible endpoint)
curl 'https://text.pollinations.ai/openai' \
  -H 'Authorization: Bearer YOUR_PUBLIC_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "openai",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

---

## Submit Your App to Pollinations

Want to earn the **🌸 Flower** tier and 10 free Pollen/day? Submit your app:

👉 **[Open a Submission Issue](https://github.com/pollinations/pollinations/issues/new?template=tier-app-submission.yml)**

### Required fields

| Field | Description |
|---|---|
| `app-name` | Name of the application |
| `app-description` | What your app does and how it uses Pollinations |
| `app-url` | Public URL (live site or GitHub repository) |
| `other-contact` | Email or other contact method |

### Optional fields

| Field | Description |
|---|---|
| `github-repo` | Repository URL if different from the app URL |
| `discord-contact` | Your Discord username |
| `app-language` | ISO language code (e.g. `en`, `pt`, `es`) |

### What happens after you submit

```
1. Issue created automatically with TIER-APP label
2. Automated validation (must be registered, at seed tier, no duplicates)
3. AI agent enriches metadata (category, platform, emoji, description)
4. Pull Request created automatically by the Polly bot
5. Maintainers review and approve the PR
6. Tier automatically upgraded to 🌸 Flower on merge
```

---

## Links

| Resource | Link |
|---|---|
| 🏠 Official website | [pollinations.ai](https://pollinations.ai) |
| 🔑 Sign up & API Keys | [enter.pollinations.ai](https://enter.pollinations.ai) |
| 📖 API Documentation | [APIDOCS.md](https://github.com/pollinations/pollinations/blob/master/APIDOCS.md) |
| 📋 App Submission | [Issue Template](https://github.com/pollinations/pollinations/issues/new?template=tier-app-submission.yml) |
| 💬 Discord Community | [discord.gg/pollinations](https://discord.gg/pollinations) |
| 🐙 GitHub | [github.com/pollinations/pollinations](https://github.com/pollinations/pollinations) |
| 🐦 Twitter / X | [@pollinations_ai](https://twitter.com/pollinations_ai) |

---

<div align="center">

Made with 🌸 using

[![Built with Pollinations](https://img.shields.io/badge/Built%20with-Pollinations-8a2be2?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAC61BMVEUAAAAdHR0AAAD+/v7X19cAAAD8/Pz+/v7+/v4AAAD+/v7+/v7+/v75+fn5+fn+/v7+/v7Jycn+/v7+/v7+/v77+/v+/v77+/v8/PwFBQXp6enR0dHOzs719fXW1tbu7u7+/v7+/v7+/v79/f3+/v7+/v78/Pz6+vr19fVzc3P9/f3R0dH+/v7o6OicnJwEBAQMDAzh4eHx8fH+/v7n5+f+/v7z8/PR0dH39/fX19fFxcWvr6/+/v7IyMjv7+/y8vKOjo5/f39hYWFoaGjx8fGJiYlCQkL+/v69vb13d3dAQEAxMTGoqKj9/f3X19cDAwP4+PgCAgK2traTk5MKCgr29vacnJwAAADx8fH19fXc3Nz9/f3FxcXy8vLAwMDJycnl5eXPz8/6+vrf39+5ubnx8fHt7e3+/v61tbX39/fAwMDR0dHe3t7BwcHQ0NCysrLW1tb09PT+/v6bm5vv7+/b29uysrKWlpaLi4vh4eGDg4PExMT+/v6rq6vn5+d8fHxycnL+/v76+vq8vLyvr6+JiYlnZ2fj4+Nubm7+/v7+/v7p6enX19epqamBgYG8vLydnZ3+/v7U1NRYWFiqqqqbm5svLy+fn5+RkZEpKSkKCgrz8/OsrKwcHByVlZVUVFT5+flKSkr19fXDw8Py8vLJycn4+Pj8/PywsLDg4ODb29vFxcXp6ene3t7r6+v29vbj4+PZ2dnS0tL09PTGxsbo6Ojg4OCvr6/Gxsbu7u7a2trn5+fExMSjo6O8vLz19fWNjY3e3t6srKzz8/PBwcHY2Nj19fW+vr6Pj4+goKCTk5O7u7u0tLTT09ORkZHe3t7CwsKDg4NsbGyurq5nZ2fOzs7GxsZlZWVcXFz+/v5UVFRUVFS8vLx5eXnY2NhYWFipqanX19dVVVXGxsampqZUVFRycnI6Ojr+/v4AAAD////8/Pz6+vr29vbt7e3q6urS0tLl5eX+/v7w8PD09PTy8vLc3Nzn5+fU1NTdRJUhAAAA6nRSTlMABhDJ3A72zYsJ8uWhJxX66+bc0b2Qd2U+KQn++/jw7sXBubCsppWJh2hROjYwJyEa/v38+O/t7Onp5t3VyMGckHRyYF1ZVkxLSEJAOi4mJSIgHBoTEhIMBvz6+Pb09PLw5N/e3Nra19bV1NLPxsXFxMO1sq6urqmloJuamZWUi4mAfnx1dHNycW9paWdmY2FgWVVVVEpIQjQzMSsrKCMfFhQN+/f38O/v7u3s6+fm5eLh3t3d1dPR0M7Kx8HAu7q4s7Oxraelo6OflouFgoJ/fn59e3t0bWlmXlpYVFBISEJAPDY0KignFxUg80hDAAADxUlEQVRIx92VVZhSQRiGf0BAQkEM0G3XddPu7u7u7u7u7u7u7u7u7u7W7xyEXfPSGc6RVRdW9lLfi3k+5uFl/pn5D4f+OTIsTbKSKahWEo0RwCFdkowHuDAZfZJi2NBeRwNwxXfjvblZNSJFUTz2WUnjqEiMWvmbvPXRmIDhUiiPrpQYxUJUKpU2JG1UCn0hBUn0wWxbeEYVI6R79oRKO3syRuAXmIRZJFNLo8Fn/xZsPsCRLaGSuiAfFe+m50WH+dLUSiM+DVtQm8dwh4dVtKnkYNiZM8jlZAj+3Mn+UppM/rFGQkUlKylwtbKwfQXvGZSMRomfiqfCZKUKitNdDCKagf4UgzGJKJaC8Qr1+LKMLGuyky1eqeF9laoYQvQCo1Pw2ymHSGk2reMD/UadqMxpGtktGZPb2KYbdSFS5O8eEZueKJ1QiWjRxEyp9dAarVXdwvLkZnwtGPS5YwE7LJOoZw4lu9iPTdrz1vGnmDQQ/Pevzd0pB4RTlWUlC5rNykYjxQX05tYWFB2AMkSlgYtEKXN1C4fzfEUlGfZR7QqdMZVkjq1eRvQUl1jUjRKBIqwYEz/eCAhxx1l9FINh/Oo26ci9TFdefnM1MSpvhTiH6uhxj1KuQ8OSxDE6lhCNRMlfWhLTiMbhMnGWtkUrxUo97lNm+JWVr7cXG3IV0sUrdbcFZCVFmwaLiZM1CNdJj7lV8FUySPV1CdVXxVaiX4gW29SlV8KumsR53iCgvEGIDBbHk4swjGW14Tb9xkx0qMqGltHEmYy8GnEz+kl3kIn1Q4YwDKQ/mCZqSlN0XqSt7rpsMFrzlHJino8lKKYwMxIwrxWCbYuH5tT0iJhQ2moC4s6Vs6YLNX85+iyFEX5jyQPqUc2RJ6wtXMQBgpQ2nG2H2F4LyTPq6aeTbSyQL1WXvkNMAPoOOty5QGBgvm430lNi1FMrFawd7blz5yzKf0XJPvpAyrTo3zvfaBzIQj5Qxzq4Z7BJ6Eeh3+mOiMKhg0f8xZuRB9+cjY88Ym3vVFOFk42d34ChiZVmRetS1ZRqHjM6lXxnympPiuCEd6N6ro5KKUmKzBlM8SLIj61MqJ+7bVdoinh9PYZ8yipH3rfx2ZLjtZeyCguiprx8zFpBCJjtzqLdc2lhjlJzzDuk08n8qdQ8Q6C0m+Ti+AotG9b2pBh2Exljpa+lbsE1qbG0fmyXcXM9Kb0xKernqyUc46LM69WuHIFr5QxNs3tSau4BmlaU815gVVn5KT8I+D/00pFlIt1/vLoyke72VUy9mZ7+T34APOliYxzwd1sAAAAASUVORK5CYII=&logoColor=white&labelColor=6a0dad)](https://pollinations.ai)

*Open generative AI, free for everyone.*

</div>

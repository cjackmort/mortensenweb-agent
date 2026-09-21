# mortensenweb-agent

The shared part of the change pipeline that every client site repository
calls: the agent's workflow, the deploy workflow, the skills the agent reads,
and the checks a site must pass before a client sees it.

| Path | What it is |
| --- | --- |
| `.github/workflows/client-change.yml` | The agent run. Reads the portal's issue, makes the change, opens a pull request. |
| `.github/workflows/client-deploy.yml` | Build, verify, screenshot, deploy: a `pr-<n>` preview on pull requests, production on `main`. |
| `agent/skills/` | Skills copied into each agent run. `site-change` is the procedure for every request. |
| `agent/verify/` | `check.mjs` (links, images, alt text, titles) and `screenshot.mjs` (preview pictures and the portal tile). |

A client repository calls these with two short files:

```yaml
# .github/workflows/claude.yml
jobs:
  implement:
    if: github.event.label.name == 'claude'
    uses: cjackmort/mortensenweb-agent/.github/workflows/client-change.yml@main
    with:
      issue_number: ${{ github.event.issue.number }}
      labels: ${{ join(github.event.issue.labels.*.name, ',') }}
    secrets: inherit

# .github/workflows/deploy.yml
jobs:
  deploy:
    uses: cjackmort/mortensenweb-agent/.github/workflows/client-deploy.yml@main
    secrets: inherit
```

The full callers, with their triggers and permissions, are in the portal's
`templates/client-repo/.github/workflows/`. A site on Node 22 passes
`node-version: "22"` under `with:`.

## Why this is public

The portal's repository is private. A workflow running in a client repository
gets a token that can read that client's repository and nothing else, so it
cannot download files from a private one — and every agent run would fail at
the step that fetches the skills.

So this repository holds only what is safe to publish: instructions and
checking scripts. **Never add client content, portal code, credentials, or
anything read from a client's request.** Client secrets reach these workflows
through `secrets: inherit` at run time; they are never stored here.

## Editing

Callers pin `@main`. Merging to `main` changes every client's next run, so
treat a change here as a deploy.

If a client leaves, delete the two caller files from their repository. Nothing
else in their site depends on this repository.

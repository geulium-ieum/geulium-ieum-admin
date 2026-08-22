# Admin console app structure

This app is a **UI-design-only scaffold** for the 그리움-이음 admin backoffice, built against
`openapi.json` (admin-only endpoints + auth). No API calls, auth guards, or mutations are wired up —
every page renders static mock data. Wiring real data fetching/mutations is out of scope here and
left for a follow-up pass.

## Directory shape mirrors the API

- `(auth)/` — public, unauthenticated pages: `login`, `find-id`, `password-reset`,
  `password-reset/verify`. Deliberately excludes `register`, `kakao/login`, `naver/login` — those
  are consumer-facing signup/SNS flows from `openapi.json`'s `Auth`/`Kakao Auth`/`Naver Auth` tags
  that don't apply to an internal backoffice (confirmed with the user).
- `(admin)/` — everything behind the sidebar shell (`AdminShell`), one top-level route per
  `Admin *` openapi tag: `dashboard`, `users`, `memorials`, `content/{tributes,guestbooks}`,
  `announcements`, `audit-logs`. Tabs/sub-routes follow the actual distinct endpoints (e.g.
  `/memorials` has "전체"/"승인 대기" tabs because `admin/memorial/all` and
  `admin/memorial/pending/list` are separate endpoints — not a client-side filter).
- List pages only expose the query params the API actually supports (`page`/`size`, plus
  `action`/`targetType`/`userId`/`from`/`to` on `/audit-logs`). Don't add search/filter UI that
  isn't backed by a real query param.

## Known gap: no admin announcement list endpoint

`openapi.json` has no `GET` list endpoint for admin announcements (only create/update/delete/publish
by id). The `/announcements` list page was still built against mock data since an announcement
manager is unusable without a list — flag this to whoever wires up the real API; either a list
endpoint needs to be added, or this page needs to reuse the public `GET /announcement/list` once
that's added back to the spec.

## Mock data / types

- `src/types/api.ts` — hand-mirrored TS types for every openapi schema actually used by a page.
  Keep in sync with `openapi.json` if the spec changes.
- `src/lib/mock/*` — static sample data per domain, plus `toSlice()` which fakes the `Slice<T>`
  paging shape so list pages/pagination can be reviewed with realistic data. Delete/replace with
  real fetches together, page by page.

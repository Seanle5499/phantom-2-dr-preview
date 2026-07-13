---
type: sop
brand: shared
status: active
owner: Son Le
tags: [admanage, meta-ads, supabase, internal-tool]
created: "2026-06-17"
updated: "2026-07-01"
---

# AdLauncher (AdManage) — Takeover Doc

## Overview
Internal Pati web app for managing Meta ads. Used across all brands (Wellness Nest, SouthEDC).

| Component | Detail |
|-----------|--------|
| Stack | Next.js + Supabase + Vercel |
| Repo | `dev-pati/New-Ads-Launcher` (GitHub) |
| Supabase project | `vrnstjkxumaaduqswkji` |
| Supabase login | `dev@patigroup.com` |
| DB schema | `ads_launcher` (custom, not `public`) |
| Lark handover doc | [F5ZwdzKQSoTfDDxb3qjlL5wQgDc](https://paticreativeagency.sg.larksuite.com/docx/F5ZwdzKQSoTfDDxb3qjlL5wQgDc) |

## Architecture — Upload Flows

### Video Upload (works ✅)
Browser uploads directly to Meta API via chunked XHR:
```
Browser → graph.facebook.com/v25.0/act_{id}/advideos → save metadata to DB
```
No Supabase Storage involved — that's why video worked even without the bucket.

### Image Upload (fixed ✅ 2026-06-17)
Browser uploads through Supabase Storage first, then server sends to Meta:
```
Browser → /api/creatives/upload-sign (get signed URL)
       → /api/creatives/upload-proxy (stream to Supabase Storage via signed URL)
       → /api/creatives/finalize (fetch from Storage → base64 → POST /adimages to Meta → save to DB)
```
Meta's `/adimages` endpoint requires base64-encoded image via server, unlike video which supports direct browser upload.

### Key API Routes
| Route | Purpose |
|-------|---------|
| `/api/creatives/upload-sign` | Creates signed Supabase Storage upload URL |
| `/api/creatives/upload-proxy` | CORS proxy: streams file to Supabase Storage |
| `/api/creatives/finalize` | Fetches from Storage → uploads to Meta API → saves to DB |
| `/api/creatives/upload-binary` | Alternative: upload to Storage + Meta in one request |

### Key Files
| File | What it does |
|------|-------------|
| `app/(dashboard)/launch/page.tsx` | Launch page with both upload flows |
| `lib/facebook.ts` | `uploadImageToMeta` — base64 encode → POST to Meta `/adimages` |
| `lib/supabase/admin.ts` | Admin client with service_role key, bypasses RLS |
| `components/bulk-upload-dialog.tsx` | Bulk upload — uploads images directly to Meta from browser |

## Bug Fix Log

### 2026-06-17: Image upload fails — "The related resource does not exist"
**Symptom:** Video upload works, image upload fails with `PNG 0B / 2.25MB · The related resource does not exist`

**Root cause:** Supabase Storage bucket `ad-media` didn't exist on Cloud. The SQL migration (`INSERT INTO storage.buckets`) ran but didn't properly register with the Storage service — Storage requires bucket creation through its API/Dashboard, not raw SQL.

**Fix applied:**
1. Created bucket `ad-media` via Supabase Dashboard (Storage → New Bucket)
   - Name: `ad-media`, Public: true, Size limit: 500MB
   - MIME types: image/jpeg, image/png, image/webp, image/gif, video/mp4, video/quicktime
2. Added 4 RLS policies via SQL Editor:
   - `ad-media public read` — SELECT for public
   - `ad-media authenticated upload` — INSERT for authenticated
   - `ad-media authenticated update` — UPDATE for authenticated
   - `ad-media authenticated delete` — DELETE for authenticated

**Verification:** Storage → Buckets shows `ad-media` with Policies: 4 ✅

## Environment & Config Notes
- `next.config.mjs`: `bodySizeLimit: "1gb"`, `proxyClientMaxBodySize: "1gb"` — supports large video uploads
- Supabase admin client uses `SUPABASE_SERVICE_ROLE_KEY` + optional Cloudflare Access headers
- DB schema is `ads_launcher` (set via `NEXT_PUBLIC_SUPABASE_DB_SCHEMA`)

## Asset Storage Audit — 2026-06-18

### Verdict
**Asset creative hiện đang lưu 100% trong Supabase Storage (bucket `ad-media`). KHÔNG có integration Cloudflare R2 nào trong codebase.**

BOM direction: asset (video/image) → Cloudflare R2; Supabase chỉ giữ DB + link. → Hiện tại **lệch hoàn toàn cho image**, video thì chỉ tồn tại trên Meta (không có archive).

### Bằng chứng
| File | Dòng | Hành vi |
|------|------|---------|
| `app/api/creatives/upload-sign/route.ts` | 26, 29 | `admin.storage.from("ad-media").createSignedUploadUrl()` + `getPublicUrl()` → signed URL trỏ vào Supabase Storage |
| `app/api/creatives/upload-binary/route.ts` | 28, 38 | `admin.storage.from("ad-media").upload()` → upload binary vào Supabase Storage |
| `app/api/creatives/finalize/route.ts` | 131-132 | DB `creatives` lưu `file_url = publicUrl` (Supabase URL) + `storage_path` (bucket path) |
| Grep `cloudflare\|r2\|R2_\|CLOUDFLARE_` toàn repo | — | Chỉ thấy **Cloudflare Access (Zero Trust)** bảo vệ Supabase API, KHÔNG phải R2/CDN storage |

### Rủi ro nếu giữ nguyên
1. **Cost & quota:** Supabase Storage egress + storage đắt hơn R2 nhiều lần, có quota cứng theo plan.
2. **Vendor lock:** Asset gắn chặt Supabase project — migrate về sau phải rewrite + backfill thủ công.
3. **Video không có archive:** Video chỉ tồn tại trên Meta. Meta disable account / xoá creative → mất sạch raw file.

---

## Migration Plan — Supabase Storage → Cloudflare R2

### Mục tiêu kiến trúc
```
Image:  Browser → R2 (presigned PUT)        → server fetch → Meta /adimages → DB lưu R2 URL
Video:  Browser → Meta /advideos (direct)   → server archive copy to R2     → DB lưu R2 URL + Meta video_id
```
Supabase: bỏ bucket `ad-media`, chỉ giữ schema `ads_launcher` (DB).

### Phase 0 — Setup Cloudflare R2 (1 ngày)
- [x] Tạo R2 bucket `pati-ad-media` + `pati-ad-media-dev` (APAC, Standard) — done 2026-06-18.
  - Account: `Tuanquang269@gmail.com's Account` (ID `c54883564a4dfc6e29eb8b27c5cfc982`)
  - Public r2.dev URL bật sẵn:
    - prod: `https://pub-bb2dcf83a7f04c44a5322d51ed56c317.r2.dev`
    - dev: `https://pub-30a6171098a44a5ba8c803cbec127b57.r2.dev`
- [x] CORS config (origin: `https://adlauncher.patigroup.com`, `http://localhost:3000`; methods: GET/PUT/HEAD) — done 2026-06-18.
- [x] **Tạo R2 S3 API Token** — done 2026-06-18 (User API Token, scope = All buckets vì User-level không scope theo bucket được).
  - Credentials lưu trong Lark/1Password vault, entry: `AdLauncher — Cloudflare R2 (Tuanquang269 account)`.
  - Endpoint: `https://c54883564a4dfc6e29eb8b27c5cfc982.r2.cloudflarestorage.com`
- [ ] **TODO khi prod-ready:** nhờ Tuấn Quang (Super Admin) tạo **Account API Token** scope đúng 2 bucket → swap vào Vercel env → revoke User API Token hiện tại.
- [ ] (Optional, làm sau) Gắn custom domain `cdn.adlauncher.patigroup.com` thay cho URL r2.dev:
  - R2 bucket → Settings → Custom Domains → Connect Domain.
  - Cần DNS record CNAME của `patigroup.com` (nhờ team DNS).

### Phase 1 — Code refactor (2-3 ngày)
- [ ] Add env vars (cả `.env.example` và Vercel):
  ```
  R2_ACCOUNT_ID=
  R2_ACCESS_KEY_ID=
  R2_SECRET_ACCESS_KEY=
  R2_BUCKET=pati-ad-media
  R2_PUBLIC_BASE_URL=https://cdn.adlauncher.patigroup.com
  ```
- [ ] Install `@aws-sdk/client-s3` + `@aws-sdk/s3-request-presigner` (R2 = S3-compatible).
- [ ] Tạo `lib/r2.ts`:
  - `r2Client()` — S3 client trỏ `https://<account_id>.r2.cloudflarestorage.com`.
  - `createR2PresignedPutUrl(key, contentType)` — trả presigned PUT URL (TTL 5 phút).
  - `r2PublicUrl(key)` — ghép `R2_PUBLIC_BASE_URL` + key.
  - `r2Upload(key, buffer, contentType)` — server-side upload (cho video archive).
- [ ] Refactor 3 route:
  - `upload-sign/route.ts` — thay `admin.storage.from("ad-media").createSignedUploadUrl()` bằng `createR2PresignedPutUrl()`. Trả `{ signedUrl, storagePath, publicUrl }` giống cũ để FE không phải đổi nhiều.
  - `upload-proxy/route.ts` — đổi target URL từ Supabase Storage sang presigned R2 URL.
  - `upload-binary/route.ts` — thay `admin.storage.from(...).upload()` bằng `r2Upload()`.
  - `finalize/route.ts` — `fetch(publicUrl)` giờ trỏ R2; logic Meta + DB giữ nguyên (`file_url` vẫn là public URL, chỉ đổi domain).
- [ ] Refactor `app/api/creatives/[id]/media/route.ts` (route serve media về browser) — bỏ logic CF Access header cho storage, đổi sang fetch trực tiếp R2 public URL.
- [ ] Video archive: trong `app/api/facebook/video-upload/finish/route.ts`, sau khi Meta upload thành công, fetch lại source từ Meta `source_url` rồi `r2Upload()` → save R2 URL vào DB column mới `archive_url`.
- [ ] Cập nhật bulk-upload-dialog (`components/bulk-upload-dialog.tsx`) nếu có direct upload Supabase.

### Phase 2 — DB & Backfill (1-2 ngày)
- [ ] Migration SQL: thêm column `archive_url` vào bảng `creatives` (cho video archive).
- [ ] Script `scripts/backfill-supabase-to-r2.ts`:
  - List tất cả object trong bucket Supabase `ad-media`.
  - Stream từng file → upload lên R2 với cùng `storage_path`.
  - Update `creatives.file_url` từ Supabase URL → R2 URL (UPDATE … WHERE storage_path = $1).
  - Idempotent: skip nếu đã exist trên R2 + DB đã update.
- [ ] Chạy dry-run staging trước, đối chiếu số lượng + checksum mẫu, rồi mới chạy prod.

### Phase 3 — Cutover & cleanup (1 ngày)
- [ ] Deploy code mới lên prod (Vercel) — toggle env `STORAGE_BACKEND=r2`.
- [ ] Smoke test: upload 1 image + 1 video, check DB record có URL R2, mở URL load được.
- [ ] Monitor 48h: error rate, latency, R2 cost dashboard.
- [ ] Sau khi confirm ổn:
  - Đặt Supabase bucket `ad-media` về private (chặn write, vẫn cho read fallback 30 ngày).
  - Sau 30 ngày → xoá bucket Supabase.
- [ ] Update doc này, ghi log trong section "Bug Fix Log".

### Rollback
- Toàn bộ object đã backfill song song 2 nơi → có thể trỏ `R2_PUBLIC_BASE_URL` → Supabase URL pattern và disable R2 client tạm thời nếu R2 down trong tuần đầu.

### Effort ước tính
~5-7 ngày dev work (1 dev FE+BE quen Next.js). Phần lớn rủi ro nằm ở backfill — cần dry-run kỹ.

---

## Onboarding — Login with Lark cho nhân viên mới

### Cơ chế login
- AdManage dùng **Lark Custom App tên `Timcook`** (Lark OAuth ở tầng application).
- **KHÔNG** phải Supabase Auth provider (đã verify 2026-07-01: Supabase Dashboard → Auth → Providers chỉ bật Email; Custom Providers rỗng).
- Flow: user bấm "Login with Lark" trên adlauncher.patigroup.com → redirect sang OAuth screen của app Timcook → nếu user nằm trong Visible Range của app thì được Authorize và tạo session.

### Quy trình onboard user mới
Cần Admin Lark của tenant PATI GROUP (Thuận / dev-pati / anh Quang) làm:

1. Mở Lark Developer Console: https://open.larksuite.com/app → chọn app **Timcook**.
2. Vào **Version Management & Release** (hoặc **Availability**) → chỉnh **Visible Range** thêm user mới, hoặc set "Available to all members" của tenant PATI GROUP.
3. Nếu cần duyệt version → Lark Admin Console: https://sg-admin.larksuite.com → Workplace → Custom Apps → Timcook → Approve.
4. User logout Lark → login lại → màn OAuth hiện nút Authorize → login vào AdManage OK.

### Triệu chứng khi user chưa được add
Màn OAuth hiện: *"You don't have the access to Timcook. You are currently logged in as <user> (PATI GROUP), the following accounts have no permission to authorize login"* → không phải bug của AdManage, mà là user chưa nằm trong Visible Range của Lark app.

### Fallback: Invite qua email (Resend)
Chỉ dùng khi user KHÔNG nằm trong tenant Lark PATI GROUP (freelancer, agency ngoài).

- **Trạng thái hiện tại (2026-07-01): BROKEN.** From-domain đang set là `sonkieu.site` chưa verify trên Resend → email invitation không gửi được, báo lỗi `Email delivery failed: The sonkieu.site domain is not verified`.
- **Fix:** verify DNS record cho `sonkieu.site` trên https://resend.com/domains (SPF/DKIM/DMARC), hoặc đổi from-domain sang domain đã verify của Pati (nếu có).

## Takeover Checklist
- [x] Access source code (GitHub repo)
- [x] Access Supabase Dashboard
- [x] Understand app architecture & upload flows
- [x] Fix image upload (bucket + RLS policies)
- [ ] Test image upload end-to-end on live app
- [ ] Review all env vars and credentials
- [ ] Understand ad campaign creation flow
- [ ] Understand reporting/insights features
- [ ] Document remaining features (audience targeting, budget management)
- [ ] Check Vercel deployment config

## Links
- [[Operations MOC]]

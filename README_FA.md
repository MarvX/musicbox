# MUSIC BOX V9.0.1 — DJ Pro Hot Cues & Loops

نسخهٔ V9.0.1 نخستین مرحلهٔ توسعهٔ DJ Pro است و قابلیت‌های قبلی V8.5.6 را حفظ می‌کند.

## تغییرات V9.0.1

- چهار Hot Cue مستقل برای هر Deck (A و B)
- ثبت نقطهٔ Hot Cue از موقعیت فعلی Cue همان Deck و پخش مستقیم از آن
- نمایش نشانگرهای رنگی Hot Cue روی Overview Waveform
- Loop شنیداری یک‌بار و چهاربار بر اساس BPM تشخیص‌داده‌شده یا BPM دستی
- ذخیرهٔ Hot Cueها همراه Session و Auto Draft
- انتقال Hot Cueها همراه فایل پروژهٔ قابل‌حمل `.mbdj`
- جابه‌جایی درست Hot Cueها هنگام Swap کردن Deck A و B
- حفظ پنل Lyrics و واسط هم‌دامنهٔ LRCLIB با پشتیبانی از Vercel SSO

## قابلیت‌های قبلی که حفظ شده‌اند

- Auto Draft و Session قابل‌ویرایش در IndexedDB
- فایل مستقل `.mbdj` همراه فایل‌های صوتی هر Deck
- بکاپ MBX که پیش‌نویس جاری را پیش از ساخت آرشیو ذخیره می‌کند
- خروجی MP3 و WAV؛ در صورت نبود انکودر MP3، WAV به‌عنوان master نگه داشته می‌شود
- تبدیل فایل میکس ذخیره‌شده به MP3 یا WAV
- افزودن خروجی WAV یا MP3 به کتابخانه بدون تبدیل اجباری
- LRCLIB از طریق Vercel Function هم‌دامنه و بدون ارسال credentials به دامنهٔ خارجی

## استفاده از Hot Cue و Loop

1. یک فایل صوتی در Deck A یا B بارگذاری کن.
2. با اسلایدر Cue همان Deck، موقعیت موردنظر را انتخاب کن.
3. روی «ثبت» یکی از چهار Hot Cue بزن.
4. با دکمهٔ شماره‌دار همان نقطه را پخش کن.
5. برای تکرار از موقعیت فعلی Cue، گزینهٔ «لوپ ۱ بار» یا «لوپ ۴ بار» را انتخاب کن. طول Loop با BPM همان Deck محاسبه می‌شود.

Hot Cueها در Session و Auto Draft ذخیره می‌شوند و هنگام Export/Import فایل `.mbdj` همراه پروژه منتقل خواهند شد.

## انتشار و بازیابی

- تغییرات این مرحله روی شاخهٔ توسعه انجام شده‌اند؛ قبل از ادغام، Preview را با دو فایل صوتی واقعی آزمایش کن.
- برای آزمون بازیابی، یک Session با Hot Cue بساز، صفحه را Refresh کن و Session را دوباره باز کن.
- سپس همان Session را به `.mbdj` صادر و در یک محیط آزمایشی Import کن.
- قبل از Restore هر بکاپ روی داده‌های اصلی، یک MBX جدید از وضعیت فعلی بگیر.
- Production فقط پس از تأیید تست‌های Preview و بکاپ به‌روزرسانی شود.

## LRCLIB

واسط `/api/lrclib` فقط درخواست‌های GET به endpointهای مجاز `get` و `search` را عبور می‌دهد. کوکی نشست فقط برای درخواست هم‌دامنه به Vercel Function ارسال می‌شود و درخواست مستقیم به LRCLIB بدون credentials باقی می‌ماند.


## V9.0.1 — Now Playing & Lyrics Experience
- Persistent mini-player dock with quick access to the full Now Playing drawer.
- Dedicated desktop drawer beside the workspace with track artwork, title, artist and synchronized lyrics.
- Mobile-friendly expanded Now Playing surface that leaves the mini-player and bottom navigation accessible.
- Lyrics lookup, LRCLIB relay, manual editing/import and cached lyric records remain on the existing playback and persistence pipeline.
- The drawer is a presentation layer; it does not create a second audio player or a second playback engine.

### UI validation
1. Play a library track and open Now Playing from the mini-player.
2. Confirm artwork, title and artist update when switching tracks.
3. Confirm synchronized lyrics follow playback and tapping a lyric seeks the same audio element.
4. Close and reopen the drawer while navigating Home, Library and DJ Pro; playback must continue uninterrupted.
5. Test narrow/mobile viewport: drawer should fit above the mini-player and bottom navigation.
6. Verify no regression in DJ Pro deck playback, Hot Cues, loops, sessions or MBX backup.

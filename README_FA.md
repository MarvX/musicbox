# MUSIC BOX V9.2.0 — Immersive Player & Motion System

## V9.2.0 — رابط کاربری و پلیر
- پنل EQ/FX به‌صورت دیالوگ مرکزی و واکنش‌گرا نمایش داده می‌شود؛ backdrop، بستن با Escape و بازگرداندن فوکوس اضافه شده است.
- لایه‌بندی EQ/FX اصلاح شده تا روی Now Playing قرار بگیرد، نه پشت آن.
- Mini Player ثابت در تمام بخش‌ها کنترل Shuffle، Repeat، Volume و Mute دارد و وضعیتش با پلیر تمام‌صفحه همگام است.
- انیمیشن‌های تغییر بخش، ورود کارت‌ها، Hover، مودال‌ها، صف پخش و Lyrics یکپارچه شده‌اند.
- تم بصری با کنتراست بالاتر، accent نئونی سبز، glow محدود و سطوح شیشه‌ای تقویت شده است.
- انیمیشن‌ها به تنظیمات `prefers-reduced-motion` احترام می‌گذارند.
- موتور پخش صوتی و ساختار ذخیره‌سازی/پلی‌لیست/Session تغییر نکرده‌اند.

### تست‌های Preview موردنیاز
1. از Home، Library، DJ Pro، Saved و Backup جابه‌جا شو و انیمیشن تغییر بخش را بررسی کن.
2. EQ/FX را از نوار بالایی و از Now Playing باز کن؛ باید وسط صفحه و بالاتر از پلیر باشد. با X، کلیک بیرون و Escape ببند.
3. از Mini Player، Shuffle، Repeat و Volume را تغییر بده؛ سپس Now Playing را باز کن و همگام‌بودن وضعیت‌ها را بررسی کن.
4. Lyrics همگام، انتخاب خط، جست‌وجوی LRCLIB و ویرایش/ورود LRC را تست کن.
5. روی موبایل، اندازه‌ی Mini Player، EQ/FX و منوی پایین را بررسی کن.
6. Hot Cue، Loop، Session، `.mbdj`، MBX و خروجی MP3/WAV را مجدداً تست کن.


نسخهٔ V9.1.0 نخستین مرحلهٔ توسعهٔ DJ Pro است و قابلیت‌های قبلی V8.5.6 را حفظ می‌کند.

## تغییرات V9.1.0

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


## V9.1.0 — Immersive Now Playing
- Clicking the artwork in the persistent mini-player opens a full-screen player; there is no extra launcher button.
- A shared-element View Transition morphs the mini-player artwork into the large player artwork, with a reduced-motion fallback.
- Desktop layout: synchronized lyrics on the left, artwork and playback controls in the center, and the upcoming queue on the right.
- Active lyric is centered with two previous and two upcoming lines visible; tapping a timed line seeks the same audio element.
- Queue view shows the current and upcoming playlist tracks, supports direct playback and drag-to-reorder.
- Full controls include seek, previous/next, play/pause, volume/mute, shuffle, repeat off/all/one, and a classic pitch fader.
- Pitch fader changes playback speed and pitch together, as a classic DJ pitch control; EQ & FX opens the existing audio effects sheet.
- The full player is responsive on mobile and keeps the existing audio engine, LRCLIB lookup, lyric editor/import/cache and playback persistence.
- No second audio engine or duplicated player is introduced.

### UI validation
1. Click the mini-player artwork; verify the cover morphs into the main artwork and the player opens without interrupting audio.
2. Close using Back or Escape; verify the reverse transition returns to the mini-player.
3. Confirm timed lyrics remain centered, neighboring lines are visible, and tapping a line seeks correctly.
4. Test queue playback, drag reorder, shuffle, repeat all/one/off, volume/mute, pitch and EQ/FX.
5. Test desktop, tablet and mobile sizes, including reduced-motion settings.
6. Verify DJ Pro, Hot Cues, loops, session save/reopen, .mbdj import/export, MBX backup and MP3/WAV export.

# Azərbaycan Mədəniyyəti 2040

Orijinal HTML/CSS layihəsinin React + Tailwind CSS versiyası.

## Texnologiyalar

- React 18 + Vite
- Tailwind CSS 3 (rəng, şrift, breakpoint və animasiyalar `tailwind.config.js` → `theme.extend`)
- React Router DOM 6 (`createBrowserRouter` + `Outlet`, səhifələr üçün `lazy`)
- Axios (mərkəzi instance, `lang` header interceptor-u)
- i18next + react-i18next (az / en)

## Quraşdırma

```bash
npm install
```

Kökdə `.env` faylı olmalıdır (`.env.example`-dan kopyalayın):

```
VITE_API_BASE_URL=https://2040api.culture.az/api/v1
```

## İşə salmaq

```bash
npm run dev
```

## Build və lint

```bash
npm run build
```

```bash
npm run lint
```

## API

Base URL yalnız `.env`-dən oxunur (`src/api/axiosInstance.js`):

```
VITE_API_BASE_URL=https://2040api.culture.az/api/v1
```

Media URL-ləri üçün lazım olan origin də həmin dəyişəndən çıxarılır
(`API_ORIGIN`), `http://` isə `https://`-ə normallaşdırılır.

Hər sorğuya interceptor aktiv dili `lang: az` / `lang: en` header-i kimi əlavə
edir; başlıqlar, tarix etiketləri və kateqoriya adları serverdə tərcümə olunur.
Dil dəyişəndə açıq səhifədəki bütün data yenidən sorğulanır.

### Qoşulmuş endpoint-lər

| Endpoint | Servis funksiyası | İstifadə yeri |
| --- | --- | --- |
| `GET /news` | `newsService.getNews({ page, perPage, category, q, featured })` | Xəbərlər siyahısı |
| `GET /news/{slug}` | `newsService.getNewsBySlug(slug)` | Xəbər detalı |
| `GET /news` (perPage) | `newsService.getLatestNews(limit)` | Ana səhifə, İrs, «Digər xəbərlər» |
| `GET /news-categories` | `newsService.getCategories()` | Hazırda UI-da istifadə olunmur |
| `GET /documents` | `documentService.getAll()` | Sənədlər arxivi |
| `GET /documents/{slug}` | `documentService.getBySlug(slug)` | Deep link üçün hazır |
| `GET /document-types` | `documentService.getTypes()` | «Növ» filtri |
| `GET /document-organs` | `documentService.getOrgans()` | «Orqan» filtri |

### API məhdudiyyətləri

- `per_page` maksimum **50**-dir; 51 və yuxarı boş cavab qaytarır
  (`MAX_PER_PAGE` sabiti ilə məhdudlaşdırılır).
- Axtarış parametri **`q`**-dur (`search` işləmir).
- `/documents` sıralama və tarix aralığı parametrlərini dəstəkləmir, ona görə
  sıralama, tarix presetləri və səhifələmə klient tərəfdədir. Arxiv 50 sənədi
  keçəndə API-yə `sort` və tarix filtri əlavə olunmalıdır.
- Slug-lar dilə görə fərqlidir, lakin API hər iki dilin slug-ını həll edir;
  xəbər detalı dil dəyişəndə URL-i yeni slug-a yönləndirir.

## Dil

- Default dil `az`, seçim `localStorage["lang"]`-də saxlanılır.
- `<html lang="...">` avtomatik yenilənir.
- Tərcümələr: `src/locales/az.json`, `src/locales/en.json` (açarlar hər iki
  faylda eynidir).
- Dil dəyişdirici header-dədir (`src/layouts/Header/LanguageSwitcher.jsx`).

## Folder strukturu

```
src/
├── api/
│   ├── axiosInstance.js     baseURL + lang header + xəta normallaşdırması
│   └── services/            newsService, documentService
├── assets/
│   ├── icons/icons.jsx      bütün SVG ikonlar
│   └── images/images.js     bütün şəkillər
├── components/              təkrar istifadə olunan UI
│   └── documents/           sənədlər arxivinin komponentləri
├── constants/               nav, route-lar, səhifə quruluşları, filtr sabitləri
├── hooks/                   useAsyncData, useDocumentArchive, useScrolled, ...
├── i18n/i18n.js             i18next konfiqurasiyası
├── layouts/
│   ├── Header/              Header, NavDropdown, LanguageSwitcher
│   ├── Footer/Footer.jsx
│   └── MainLayout.jsx
├── locales/                 az.json, en.json
├── pages/                   Home, Konsepsiya, Irs, Senedler, NewsList,
│                            NewsDetail, Login, Register, NotFound
├── router/router.jsx
├── utils/                   media (URL normallaşdırma), nav (aktiv element)
├── App.jsx
├── index.css
└── main.jsx
```

`@` alias `src/` qovluğuna işarə edir (`vite.config.js` + `jsconfig.json`).

## Route-lar

| Path                                   | Səhifə                 |
| -------------------------------------- | ---------------------- |
| `/`                                    | Ana səhifə             |
| `/konsepsiya`                          | Konsepsiya haqqında    |
| `/istiqametler/medeni-irsin-qorunmasi` | Mədəni irsin qorunması |
| `/senedler`                            | Sənədlər arxivi        |
| `/xeberler`                            | Xəbərlər               |
| `/xeberler/:slug`                      | Xəbər detalı           |
| `/giris`                               | myCulture giriş        |
| `/qeydiyyat`                           | myCulture qeydiyyat    |

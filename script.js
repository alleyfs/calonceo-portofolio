/*
 * CalonCEO portfolio interactions and editable content.
 * Update siteConfig and the gallery arrays below; the page structure can stay as-is.
 */

const siteConfig = {
  // Gunakan URL profil publik yang benar. Biarkan string kosong sampai siap dipublikasikan.
  links: {
    github: "",
    email: "",
    instagram: "",
    youtube: ""
  }
};

/*
 * Add a photo object here for each original work:
 * {
 *   src: "images/photography/nama-foto.jpg",
 *   title: "Judul foto",
 *   description: "Deskripsi singkat yang benar.",
 *   category: "Nature / Street / Portrait",
 *   device: "Opsional: perangkat yang digunakan",
 *   technique: "Opsional: teknik yang digunakan"
 * }
 */
const photographyItems = [];

/*
 * Add a video object here for each original work:
 * {
 *   title: "Judul video",
 *   description: "Deskripsi singkat yang benar.",
 *   category: "Cinematic / Dokumentasi / Short video / Eksperimen visual",
 *   thumbnail: "images/videography/nama-thumbnail.jpg",
 *   videoUrl: "https://youtu.be/ID_VIDEO" // or "videos/nama-video.mp4"
 * }
 * Local MP4s should be small enough for a static site; large videos are better hosted elsewhere.
 */
const videographyItems = [];

const select = (selector, scope = document) => scope.querySelector(selector);
const selectAll = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function isLocalAssetPath(value) {
  if (typeof value !== "string" || value.trim() === "") return false;
  const path = value.trim();
  // Do not treat schemes such as javascript: or data: as local files.
  if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith("//")) return false;
  return !path.startsWith("/")
    && !path.startsWith("\\")
    && !path.split("/").includes("..");
}

function isSafePublicUrl(value, allowMailto = false) {
  if (typeof value !== "string" || value.trim() === "") return false;
  try {
    const parsed = new URL(value, window.location.href);
    if (allowMailto && parsed.protocol === "mailto:") return true;
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function openImageLightbox(src, alt, caption = "") {
  const dialog = select("#image-lightbox");
  const image = select("#lightbox-image");
  const captionElement = select("#lightbox-caption");
  if (!dialog || !image || !src) return;
  image.src = src;
  image.alt = alt || "Pratinjau gambar";
  captionElement.textContent = caption;
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    window.open(src, "_blank", "noopener,noreferrer");
  }
}

function setUpTheme() {
  const themeButton = select(".theme-toggle");
  const root = document.documentElement;
  let savedTheme = "dark";
  try {
    const stored = window.localStorage.getItem("calonceo-theme");
    if (stored === "light" || stored === "dark") savedTheme = stored;
  } catch {
    // Storage may be unavailable; dark mode remains the default.
  }
  root.dataset.theme = savedTheme;
  updateThemeButton(themeButton, savedTheme);

  themeButton?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    updateThemeButton(themeButton, nextTheme);
    try {
      window.localStorage.setItem("calonceo-theme", nextTheme);
    } catch {
      // The selected theme still applies for the current page session.
    }
  });
}

function updateThemeButton(button, theme) {
  if (!button) return;
  const nextLabel = theme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap";
  button.setAttribute("aria-label", nextLabel);
  button.setAttribute("title", nextLabel);
}

function setUpMobileNavigation() {
  const toggle = select(".menu-toggle");
  const nav = select("#primary-navigation");
  if (!toggle || !nav) return;

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Buka navigasi");
    nav.classList.remove("is-open");
  };

  toggle.addEventListener("click", () => {
    const willOpen = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(willOpen));
    toggle.setAttribute("aria-label", willOpen ? "Tutup navigasi" : "Buka navigasi");
    nav.classList.toggle("is-open", willOpen);
  });

  selectAll("a", nav).forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 761px)").matches) closeMenu();
  });
}

function setUpPosterPreview() {
  const image = select("#poster-image");
  const fallback = select("#poster-fallback");
  const openButton = select("#poster-open");
  const missingNote = select("#poster-missing-note");
  if (!image || !fallback || !openButton) return;

  image.addEventListener("load", () => {
    if (!image.naturalWidth || !image.naturalHeight) return;
    image.style.display = "block";
    fallback.style.display = "none";
    openButton.disabled = false;
    if (missingNote) missingNote.hidden = true;
  });

  image.addEventListener("error", () => {
    image.style.display = "none";
    fallback.style.display = "flex";
    openButton.disabled = true;
    if (missingNote) missingNote.hidden = false;
  });

  openButton.addEventListener("click", () => {
    if (image.complete && image.naturalWidth > 0) {
      openImageLightbox(image.src, image.alt, "Bijaklah dalam Bermedsos! — poster asli");
    }
  });

  // Handle the unlikely case that the image was cached before listeners were attached.
  if (image.complete) {
    if (image.naturalWidth > 0) image.dispatchEvent(new Event("load"));
    else image.dispatchEvent(new Event("error"));
  }
}

function renderContactLinks() {
  const container = select("#contact-links");
  const hint = select("#contact-config-hint");
  if (!container) return;

  const linkDefinitions = [
    { key: "github", label: "GitHub", url: siteConfig.links.github, external: true },
    { key: "email", label: "Email", url: siteConfig.links.email, external: false },
    { key: "instagram", label: "Instagram", url: siteConfig.links.instagram, external: true },
    { key: "youtube", label: "YouTube", url: siteConfig.links.youtube, external: true }
  ];

  const activeLinks = linkDefinitions.filter((item) => {
    if (!item.url || typeof item.url !== "string") return false;
    return isSafePublicUrl(item.url, item.key === "email");
  });

  container.innerHTML = activeLinks.map((item) => {
    const attributes = item.external ? ' target="_blank" rel="noopener noreferrer"' : "";
    const arrow = item.external ? '<span class="contact-link-arrow" aria-hidden="true">↗</span>' : "";
    return `<a class="contact-link" href="${escapeHTML(item.url)}"${attributes}>${escapeHTML(item.label)} ${arrow}</a>`;
  }).join("");

  if (hint) {
    hint.hidden = activeLinks.length > 0;
  }
}

function photoDetails(item) {
  const details = [];
  if (item.device) details.push(`Perangkat: ${item.device}`);
  if (item.technique) details.push(`Teknik: ${item.technique}`);
  return details.join(" · ");
}

function renderPhotography() {
  const grid = select("#photography-grid");
  const empty = select("#photography-empty");
  const count = select("#photo-count");
  if (!grid || !empty) return;

  const items = photographyItems.filter((item) => item
    && typeof item.title === "string"
    && typeof item.description === "string"
    && isLocalAssetPath(item.src));

  if (count) count.textContent = String(items.length);
  empty.hidden = items.length > 0;
  grid.innerHTML = items.map((item, index) => {
    const src = escapeHTML(item.src);
    const title = escapeHTML(item.title);
    const description = escapeHTML(item.description);
    const category = escapeHTML(item.category || "Photography");
    const alt = escapeHTML(item.alt || item.title);
    const details = escapeHTML(photoDetails(item));
    return `<article class="gallery-card">
      <div class="gallery-media"><button class="gallery-image-button" type="button" data-photo-index="${index}" aria-label="Lihat foto ${title} ukuran penuh"><img src="${src}" alt="${alt}" loading="lazy" decoding="async"></button></div>
      <div class="gallery-card-body"><span class="gallery-category">${category}</span><h3>${title}</h3><p>${description}</p>${details ? `<p class="gallery-details">${details}</p>` : ""}</div>
    </article>`;
  }).join("");

  selectAll("[data-photo-index]", grid).forEach((button) => {
    button.addEventListener("click", () => {
      const item = items[Number(button.dataset.photoIndex)];
      if (item) openImageLightbox(item.src, item.alt || item.title, item.title);
    });
  });

  selectAll("img", grid).forEach((image) => {
    image.addEventListener("error", () => {
      const card = image.closest(".gallery-card");
      if (card) card.remove();
      const visibleCards = selectAll(".gallery-card", grid).length;
      if (count) count.textContent = String(visibleCards);
      empty.hidden = visibleCards > 0;
    }, { once: true });
  });
}

function isVideoFile(path) {
  return typeof path === "string" && /\.(mp4|webm|ogg)(\?.*)?$/i.test(path);
}

function renderVideography() {
  const grid = select("#videography-grid");
  const empty = select("#videography-empty");
  const count = select("#video-count");
  if (!grid || !empty) return;

  const items = videographyItems.filter((item) => item
    && typeof item.title === "string"
    && typeof item.description === "string"
    && (isSafePublicUrl(item.videoUrl) || isLocalAssetPath(item.videoUrl)));

  if (count) count.textContent = String(items.length);
  empty.hidden = items.length > 0;
  grid.innerHTML = items.map((item) => {
    const title = escapeHTML(item.title);
    const description = escapeHTML(item.description);
    const category = escapeHTML(item.category || "Videography");
    const thumbnail = isLocalAssetPath(item.thumbnail) ? escapeHTML(item.thumbnail) : "";
    const videoUrl = escapeHTML(item.videoUrl);
    let media = '<div class="gallery-video-fallback"><span aria-hidden="true">▷</span></div>';

    if (isVideoFile(item.videoUrl) && isLocalAssetPath(item.videoUrl)) {
      media = `<video controls preload="metadata"${thumbnail ? ` poster="${thumbnail}"` : ""} aria-label="Video ${title}"><source src="${videoUrl}">Browser ini tidak mendukung pemutaran video.</video>`;
    } else if (thumbnail) {
      media = `<a class="gallery-image-button" href="${videoUrl}" target="_blank" rel="noopener noreferrer" aria-label="Tonton video ${title}"><img src="${thumbnail}" alt="Thumbnail video ${title}" loading="lazy" decoding="async"></a>`;
    }

    const watch = isVideoFile(item.videoUrl) && isLocalAssetPath(item.videoUrl)
      ? ""
      : `<a class="gallery-watch" href="${videoUrl}" target="_blank" rel="noopener noreferrer">Tonton video ↗</a>`;
    return `<article class="gallery-card"><div class="gallery-media">${media}</div><div class="gallery-card-body"><span class="gallery-category">${category}</span><h3>${title}</h3><p>${description}</p>${watch}</div></article>`;
  }).join("");

  selectAll("img", grid).forEach((image) => image.addEventListener("error", () => {
    const media = image.closest(".gallery-media");
    if (media) media.innerHTML = '<div class="gallery-video-fallback"><span aria-hidden="true">▧</span></div>';
  }, { once: true }));
}

function setUpGalleryTabs() {
  const tabs = selectAll("[data-gallery-tab]");
  const panels = selectAll("[data-gallery-panel]");
  if (!tabs.length || !panels.length) return;

  const activate = (name, moveFocus = false) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.galleryTab === name;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && moveFocus) tab.focus();
    });
    panels.forEach((panel) => {
      const active = panel.dataset.galleryPanel === name;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.galleryTab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      activate(tabs[nextIndex].dataset.galleryTab, true);
    });
  });
}

function setUpLightbox() {
  const dialog = select("#image-lightbox");
  if (!dialog) return;
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    const image = select("#lightbox-image");
    if (image) image.removeAttribute("src");
  });
}

function setUpRevealAnimations() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;
  const elements = selectAll(".reveal");
  if (!elements.length) return;
  document.documentElement.classList.add("motion-ready");
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
  elements.forEach((element) => observer.observe(element));
}

function setUpCurrentYear() {
  const year = select("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());
}

function initializePortfolio() {
  setUpTheme();
  setUpMobileNavigation();
  setUpPosterPreview();
  renderContactLinks();
  renderPhotography();
  renderVideography();
  setUpGalleryTabs();
  setUpLightbox();
  setUpCurrentYear();
  setUpRevealAnimations();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePortfolio, { once: true });
} else {
  initializePortfolio();
}

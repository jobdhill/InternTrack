import { useEffect } from "react";

const SITE_URL = "https://internnext.com";

type Meta = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
};

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useDocumentMeta({ title, description, path, index = true }: Meta) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    setMeta("name", "description", description);
    setCanonical(url);
    setMeta(
      "name",
      "robots",
      index ? "index, follow, max-image-preview:large" : "noindex, follow",
    );

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);

    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
  }, [title, description, path, index]);
}

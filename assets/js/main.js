const year = document.getElementById("year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const navLinks = Array.from(document.querySelectorAll(".nav-list a[data-menu-index]"));

for (const link of navLinks) {
  const index = Number(link.getAttribute("data-menu-index"));
  const shortcut = link.getAttribute("data-shortcut");

  if (shortcut) {
    link.setAttribute("title", shortcut);
  }

  if (Number.isInteger(index) && index > 0 && index < 10) {
    link.setAttribute("aria-keyshortcuts", `Control+${index}`);
  }
}

document.addEventListener("keydown", (event) => {
  const target = event.target;

  if (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT")
  ) {
    return;
  }

  if (!event.ctrlKey || event.altKey) {
    return;
  }

  const match = event.key.match(/^[1-9]$/);

  if (!match) {
    return;
  }

  const index = Number(match[0]);
  const link = navLinks.find((item) => Number(item.dataset.menuIndex) === index);

  if (!link) {
    return;
  }

  event.preventDefault();
  link.focus();
  link.classList.add("shortcut-active");
  window.setTimeout(() => link.classList.remove("shortcut-active"), 150);
  link.click();
});

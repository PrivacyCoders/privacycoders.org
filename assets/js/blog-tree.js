(function () {
  const tree = document.getElementById("blog-tree");
  const modal = document.getElementById("post-modal");
  const modalTitle = document.getElementById("post-modal-title");
  const modalBody = document.getElementById("post-modal-body");
  const closeButton = document.getElementById("post-modal-close");

  if (!tree || !modal || !modalTitle || !modalBody || !closeButton || !window.jQuery) {
    return;
  }

  const $ = window.jQuery;
  const treeItems = Array.from(tree.querySelectorAll(".tree-post-item"));
  let activeIndex = Math.max(
    0,
    treeItems.findIndex((item) => item.tabIndex === 0)
  );
  let lastFocusedItem = treeItems[activeIndex] || null;

  function setActiveItem(index) {
    if (treeItems.length === 0) {
      return;
    }

    activeIndex = Math.min(Math.max(index, 0), treeItems.length - 1);
    treeItems.forEach((item, itemIndex) => {
      item.tabIndex = itemIndex === activeIndex ? 0 : -1;
      item.classList.toggle("tree-active", itemIndex === activeIndex);
    });

    const activeItem = treeItems[activeIndex];
    activeItem.focus();
    lastFocusedItem = activeItem;
  }

  function setExpanded(item, expanded) {
    const toggle = item.querySelector(".tree-toggle");
    const description = item.querySelector(".tree-description");

    item.setAttribute("aria-expanded", expanded ? "true" : "false");

    if (toggle) {
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      toggle.textContent = expanded ? "-" : "+";
    }

    if (description) {
      description.hidden = !expanded;
    }
  }

  function toggleExpanded(item) {
    const expanded = item.getAttribute("aria-expanded") === "true";
    setExpanded(item, !expanded);
  }

  function openModalFromItem(item) {
    const url = item.getAttribute("data-post-url");
    const title = item.getAttribute("data-post-title") || "Post";

    if (!url) {
      return;
    }

    modalTitle.textContent = title;
    modalBody.innerHTML = "<p>Loading post...</p>";
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");

    $.get(url)
      .done((html) => {
        const parsed = $("<div>").append($.parseHTML(html));
        const postTitle = parsed.find(".post-article h1").first().text().trim();
        const postContent = parsed.find(".post-content").first().html();

        modalTitle.textContent = postTitle || title;

        if (postContent) {
          modalBody.innerHTML = postContent;
        } else {
          modalBody.innerHTML = "<p>Unable to load post content.</p>";
        }
      })
      .fail(() => {
        modalBody.innerHTML = "<p>Failed to load post. Please try again.</p>";
      });

    closeButton.focus();
  }

  function closeModal() {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");

    if (lastFocusedItem) {
      lastFocusedItem.focus();
    }
  }

  treeItems.forEach((item, index) => {
    setExpanded(item, false);

    item.addEventListener("focus", () => {
      activeIndex = index;
      treeItems.forEach((node, nodeIndex) => {
        node.classList.toggle("tree-active", nodeIndex === index);
      });
      lastFocusedItem = item;
    });

    const toggle = item.querySelector(".tree-toggle");
    const opener = item.querySelector(".tree-open");

    if (toggle) {
      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleExpanded(item);
      });
    }

    if (opener) {
      opener.addEventListener("click", (event) => {
        event.stopPropagation();
        openModalFromItem(item);
      });
    }

    item.addEventListener("dblclick", () => {
      openModalFromItem(item);
    });
  });

  tree.addEventListener("keydown", (event) => {
    if (treeItems.length === 0) {
      return;
    }

    const activeItem = treeItems[activeIndex];

    switch (event.key) {
      case "ArrowDown":
      case "j":
        event.preventDefault();
        setActiveItem(activeIndex + 1);
        break;
      case "ArrowUp":
      case "k":
        event.preventDefault();
        setActiveItem(activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        setActiveItem(0);
        break;
      case "End":
        event.preventDefault();
        setActiveItem(treeItems.length - 1);
        break;
      case "ArrowRight":
      case "+":
        event.preventDefault();
        setExpanded(activeItem, true);
        break;
      case "ArrowLeft":
      case "-":
        event.preventDefault();
        setExpanded(activeItem, false);
        break;
      case " ":
        event.preventDefault();
        toggleExpanded(activeItem);
        break;
      case "Enter":
      case "o":
        event.preventDefault();
        openModalFromItem(activeItem);
        break;
      default:
        break;
    }
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  closeButton.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });

  if (treeItems.length > 0) {
    setActiveItem(activeIndex);
  }
})();

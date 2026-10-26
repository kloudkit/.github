// Progressive enhancements. The page renders fine without any of this.
(function () {
  "use strict";

  const enhancements = {
    // Keep the footer year current without a rebuild.
    year() {
      const el = document.getElementById("year");

      if (el) {
        el.textContent = new Date().getFullYear();
      }
    },

    // Each "Try it" command copies itself when clicked, unless text is being selected.
    copy() {
      if (!navigator.clipboard) {
        return;
      }

      const status = document.createElement("span");

      status.className = "vh";
      status.setAttribute("aria-live", "polite");
      document.body.append(status);

      for (const pre of document.querySelectorAll(".tool__try pre")) {
        const code = pre.querySelector("code");
        const badge = document.createElement("span");
        const name = pre.closest(".tool").querySelector(".tool__name").textContent;

        badge.className = "copy";
        badge.textContent = "Copy";
        badge.setAttribute("aria-hidden", "true");

        pre.classList.add("is-copyable");
        pre.tabIndex = 0;
        pre.setAttribute("role", "button");
        pre.setAttribute("aria-label", `Copy the ${name} command`);
        pre.append(badge);

        let timer;

        const show = (text) => {
          clearTimeout(timer);
          badge.textContent = text;
          status.textContent = `${name} command ${text.toLowerCase()}`;
          pre.dataset.copied = "";
          timer = setTimeout(() => {
            badge.textContent = "Copy";
            delete pre.dataset.copied;
          }, 1600);
        };

        // When the clipboard refuses, select the command so it can be copied by hand.
        const copy = async () => {
          if (getSelection().toString()) {
            return;
          }

          try {
            await navigator.clipboard.writeText(code.textContent);
            show("Copied");
          } catch {
            getSelection().selectAllChildren(code);
            show("Selected");
          }
        };

        pre.addEventListener("click", copy);
        pre.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            copy();
          }
        });
      }
    },
  };

  for (const run of Object.values(enhancements)) {
    try {
      run();
    } catch (err) {
      console.error(err);
    }
  }
})();

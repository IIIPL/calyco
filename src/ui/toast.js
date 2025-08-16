// Simple global toast dispatcher
export const toast = (message, type = "success") => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("calyco:toast", {
        detail: { id: Date.now() + Math.random(), message, type },
      })
    );
  };
  
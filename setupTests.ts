//* Adds custom matchers like:
//* toBeInTheDocument()
//* toHaveTextContent()
//* toHaveAttribute()
//* toBeVisible()
import "@testing-library/jest-dom";

//* Mocking scrollIntoView to prevent errors in tests for radix
Object.defineProperty(window.HTMLElement.prototype, "scrollIntoView", {
  value: () => {},
  writable: true,
});

//* Mocking hasPointerCapture to prevent errors in tests for radix
window.HTMLElement.prototype.hasPointerCapture = () => false;

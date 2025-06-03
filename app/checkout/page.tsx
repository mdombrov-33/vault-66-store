"use client";

import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

function CheckoutPage() {
  return (
    <section>
      <div id="checkout">
        <Suspense fallback={<p>Loading checkout...</p>}>
          <CheckoutClient />
        </Suspense>
      </div>
    </section>
  );
}

export default CheckoutPage;

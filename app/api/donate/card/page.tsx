export default function CardPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl text-center">
      <h1 className="text-3xl font-bold mb-6">Complete Your Donation via Card</h1>
      <p className="mb-4">
        You will be redirected to our{" "}
        <strong>secure card payment provider (Stripe/Flutterwave)</strong>.
      </p>
      <p>
        Please have your card ready. Once completed, you’ll receive a
        confirmation email and receipt.
      </p>
    </div>
  );
}

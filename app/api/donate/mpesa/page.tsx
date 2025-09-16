export default function MpesaPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl text-center">
      <h1 className="text-3xl font-bold mb-6">Complete Your Donation via M-Pesa</h1>
      <p className="mb-4">
        You will be redirected to <strong>M-Pesa’s secure checkout</strong>.
      </p>
      <p>
        Use <strong>Paybill: 123456</strong>, Account: <strong>BBF</strong>.
        Once payment is confirmed, we’ll send you a receipt.
      </p>
    </div>
  );
}

Step 8: Update proposal after payment

In payment-success/page.jsx, call your API:

await updateProposalStatus(
  proposalId,
  "accepted"
);

or create a payment collection:

{
   proposalId:"...",
   taskId:"...",
   amount:"600",
   paymentIntentId:"pi_..."
}
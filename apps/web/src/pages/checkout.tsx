import IframePage from '../components/IframePage';
export default function CheckoutPage() {
  return (
    <IframePage
      title="Checkout | Lumina Bites"
      description="Complete your order."
      desktopSrc="/stitch/checkout_desktop.html"
      mobileSrc="/stitch/checkout_mobile.html"
    />
  );
}

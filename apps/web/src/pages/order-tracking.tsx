import IframePage from '../components/IframePage';
export default function OrderTrackingPage() {
  return (
    <IframePage
      title="Order Tracking | Lumina Bites"
      description="Track your premium order."
      desktopSrc="/stitch/order_tracking_desktop.html"
      mobileSrc="/stitch/order_tracking_mobile.html"
    />
  );
}

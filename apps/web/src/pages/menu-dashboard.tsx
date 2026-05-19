import IframePage from '../components/IframePage';
export default function MenuDashboardPage() {
  return (
    <IframePage
      title="Menu | Lumina Bites"
      description="Explore the Lumina Bites premium menu."
      desktopSrc="/stitch/menu_dashboard_desktop.html"
      mobileSrc="/stitch/menu_dashboard.html"
    />
  );
}

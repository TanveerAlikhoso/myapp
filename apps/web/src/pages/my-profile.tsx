import IframePage from '../components/IframePage';
export default function MyProfilePage() {
  return (
    <IframePage
      title="My Profile | Lumina Bites"
      description="View your profile."
      desktopSrc="/stitch/my_profile_desktop.html"
      mobileSrc="/stitch/my_profile.html"
    />
  );
}

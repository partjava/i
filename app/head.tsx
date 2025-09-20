export default function Head() {
  return (
    <>
      {/* PWA Meta Tags */}
      <meta name="application-name" content="学习笔记分享平台" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="PartJava" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="msapplication-tap-highlight" content="no" />

      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
      <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-192x192.png" />

      {/* Splash Screens */}
      <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png" />
    </>
  );
}
import { ANALYTICS_MEASUREMENT_ID } from '@/src/lib/constants';

export default function GoogleAnalytics() {
  if (process.env.NODE_ENV === 'development') {
    return <script />;
  }

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_MEASUREMENT_ID}`}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${ANALYTICS_MEASUREMENT_ID}');
          `,
        }}
      ></script>
    </>
  );
}

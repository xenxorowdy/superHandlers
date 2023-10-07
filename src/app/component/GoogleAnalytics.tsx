import Script from "next/script";

export function GoogleAnalytics() {
    const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID;
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${gaMeasurementId});
          `}
        </Script>
      </>
    );
    }
    export default GoogleAnalytics;
  
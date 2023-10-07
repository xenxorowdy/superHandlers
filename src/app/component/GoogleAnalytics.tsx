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
            gtag('config', '${gaMeasurementId}');
            window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
            ga('create', 'UA-XXXXX-Y', 'auto');
            ga('send', 'pageview');
            
          `}
        </Script>
      </>
    );
    }
    export default GoogleAnalytics;
  
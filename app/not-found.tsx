import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><span>404</span><h1>This page has left the harbour.</h1><p>Return to the market and start again.</p><Link className="primary-cta coral-cta" href="/en">Back to Poissonnerie Sherbrooke <i className="cta-arrow">↗</i></Link></main>;
}

import TransitionLink from "@/components/TransitionLink";
import { Arrow } from "@/components/effects";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[100svh] flex-col justify-center gap-8 pt-32">
      <div className="eyebrow text-mute">404</div>
      <h1 className="display text-[clamp(56px,10vw,160px)]">Off the <span className="text-red">stairs.</span></h1>
      <p className="max-w-[480px] text-[18px] text-[#b5b5b5]">That page doesn&apos;t exist. Let&apos;s get you back on track.</p>
      <TransitionLink href="/" className="btn btn-red w-fit">Back to home <Arrow /></TransitionLink>
    </section>
  );
}

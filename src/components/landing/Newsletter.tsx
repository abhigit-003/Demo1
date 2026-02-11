import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24">
      <div className={`mx-auto max-w-3xl px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="rounded-3xl border border-border bg-card p-10 text-center sm:p-14">
          <h2 className="text-3xl font-bold text-card-foreground sm:text-4xl">Join the Inner Circle</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            Receive exclusive access to new drops, beauty insights, and member-only privileges.
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                placeholder="you@example.com"
                className="h-12 w-full rounded-lg border border-border bg-surface pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="h-12 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">No spam · Unsubscribe anytime</p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

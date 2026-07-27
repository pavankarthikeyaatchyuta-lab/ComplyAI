import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  DatabaseZap,
  FileCheck2,
  FileText,
  Gauge,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UploadCloud
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

const workflowSteps = [
  "Upload",
  "Extraction",
  "Planner",
  "Executor",
  "Reviewer",
  "Report"
];

const features = [
  {
    icon: FileText,
    title: "Structured GST extraction",
    description:
      "Identify notice numbers, GSTIN, tax periods, due dates, demand amounts, and missing information from uploaded documents."
  },
  {
    icon: Gauge,
    title: "Action-first planning",
    description:
      "Convert compliance issues into prioritized actions, checklists, and response requirements for the next step."
  },
  {
    icon: BadgeCheck,
    title: "Verified outputs",
    description:
      "Review generated artifacts before producing a final report, with a controlled one-revision workflow."
  },
  {
    icon: ClipboardCheck,
    title: "Report-ready results",
    description:
      "Generate a final compliance action report that can be reviewed, exported, and shared with stakeholders."
  }
];

const documents = [
  "GST Notice DRC-01",
  "GST Notice GSTR-3A",
  "GST Notice ASMT-10",
  "GST Invoice",
  "Tax Reminder"
];

const faqs = [
  {
    question: "Is ComplyAI a chatbot?",
    answer:
      "No. ComplyAI is a structured workflow application that turns uploaded compliance documents into verified action plans."
  },
  {
    question: "Who is this designed for?",
    answer:
      "Small business owners, chartered accountants, and MSME operators who need fast clarity from GST notices and reminders."
  },
  {
    question: "What happens after upload?",
    answer:
      "The workflow extracts facts, plans actions, generates compliance artifacts, reviews them, and prepares a final report."
  },
  {
    question: "Can users revise the result?",
    answer:
      "Yes. The product allows one controlled revision before the final compliance report is generated."
  }
];

function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="mx-auto max-w-3xl text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={fadeUp}
      transition={{ duration: 0.45 }}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg">
        {description}
      </p>
    </motion.div>
  );
}

function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 26 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-sky-300/50 shadow-[0_0_18px_rgba(125,211,252,0.65)]"
          style={{
            left: `${(index * 37) % 100}%`,
            top: `${(index * 23) % 100}%`
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.18, 0.7, 0.18],
            scale: [1, 1.4, 1]
          }}
          transition={{
            duration: 4 + (index % 5),
            repeat: Infinity,
            delay: index * 0.13,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/70 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-emerald shadow-glow">
            <ShieldCheck className="h-5 w-5 text-white" />
          </span>
          <span className="text-lg font-bold text-white">ComplyAI</span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#workflow" className="transition hover:text-white">
            Workflow
          </a>
          <a href="#security" className="transition hover:text-white">
            Security
          </a>
          <a href="#faq" className="transition hover:text-white">
            FAQ
          </a>
        </div>
        <a
          href="#/upload"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:-translate-y-0.5 hover:bg-slate-100"
        >
          Analyze Document
        </a>
      </nav>
    </header>
  );
}

function HeroPreview() {
  return (
    <motion.div
      className="relative mx-auto max-w-5xl"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.25 }}
    >
      <div className="absolute -left-8 top-12 hidden rounded-3xl border border-emerald/30 bg-emerald/10 p-4 shadow-glass backdrop-blur-xl lg:block">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald" />
          <div>
            <p className="text-sm font-semibold text-white">Verified</p>
            <p className="text-xs text-slate-300">Reviewer passed</p>
          </div>
        </div>
      </div>
      <div className="absolute -right-8 bottom-16 hidden rounded-3xl border border-sky-300/30 bg-sky-400/10 p-4 shadow-glass backdrop-blur-xl lg:block">
        <div className="flex items-center gap-3">
          <DatabaseZap className="h-5 w-5 text-sky-300" />
          <div>
            <p className="text-sm font-semibold text-white">6 artifacts</p>
            <p className="text-xs text-slate-300">Saved to workflow</p>
          </div>
        </div>
      </div>
      <div className="glass-panel overflow-hidden rounded-[2rem]">
        <div className="border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Workflow</p>
              <h3 className="text-lg font-semibold text-white">
                DRC-01 Notice Review
              </h3>
            </div>
            <span className="rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
              Ready for report
            </span>
          </div>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="p-6">
            <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
              {workflowSteps.map((step, index) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div
                    className={`mb-3 h-1.5 rounded-full ${
                      index < 5
                        ? "bg-gradient-to-r from-sky-400 to-emerald"
                        : "bg-white/15"
                    }`}
                  />
                  <p className="text-xs font-semibold text-white">{step}</p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {index < 5 ? "Complete" : "Next"}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <FileCheck2 className="h-5 w-5 text-sky-300" />
                  <p className="font-semibold text-white">Compliance Summary</p>
                </div>
                <div className="space-y-3">
                  <div className="h-3 rounded-full bg-white/20" />
                  <div className="h-3 w-4/5 rounded-full bg-white/15" />
                  <div className="h-3 w-2/3 rounded-full bg-white/10" />
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <ClipboardCheck className="h-5 w-5 text-emerald" />
                  <p className="font-semibold text-white">Required Actions</p>
                </div>
                <div className="space-y-3 text-sm text-slate-300">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald" />
                    Verify GSTIN and notice number
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald" />
                    Prepare draft response
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 bg-white/[0.03] p-6 lg:border-l lg:border-t-0">
            <div className="rounded-3xl border border-white/10 bg-navy/40 p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-semibold text-white">Uploaded Document</p>
                <span className="rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-amber">
                  DRC-01
                </span>
              </div>
              <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.04] p-6">
                <FileText className="mb-5 h-10 w-10 text-slate-300" />
                <div className="space-y-3">
                  <div className="h-2.5 rounded-full bg-white/20" />
                  <div className="h-2.5 w-5/6 rounded-full bg-white/15" />
                  <div className="h-2.5 w-3/5 rounded-full bg-white/10" />
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">GSTIN</span>
                  <span className="font-medium text-white">Detected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Due date</span>
                  <span className="font-medium text-amber">Due soon</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Risk</span>
                  <span className="font-medium text-emerald">Reviewed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HeroSection() {
  return (
    <section id="upload" className="relative overflow-hidden px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-44">
      <ParticleField />
      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.55 }}
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-slate-200 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-emerald" />
            Built for GST notice workflows, not chat threads
          </div>
          <h1 className="text-5xl font-extrabold leading-[1.05] text-white md:text-7xl">
            Turn GST Notices into{" "}
            <span className="bg-gradient-to-r from-sky-300 via-white to-emerald bg-clip-text text-transparent">
              Verified Action Plans
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-slate-300 md:text-2xl">
            Upload once.
            <br />
            Understand instantly.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#/upload"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-emerald px-7 py-4 text-base font-bold text-white shadow-glow transition hover:-translate-y-1 sm:w-auto"
            >
              Analyze Document
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#workflow"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-7 py-4 text-base font-semibold text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/12 sm:w-auto"
            >
              <Code2 className="h-5 w-5" />
              Developer Mode
            </a>
          </div>
        </motion.div>
        <div className="mt-16">
          <HeroPreview />
        </div>
      </div>
    </section>
  );
}

function FeatureSection() {
  return (
    <section id="features" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Features"
          title="Everything is structured, traceable, and report-ready."
          description="ComplyAI converts messy compliance documents into clear artifacts that a business owner, CA, or MSME operator can act on."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              className="glass-panel rounded-3xl p-6 transition hover:-translate-y-1 hover:border-white/25"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <feature.icon className="h-7 w-7 text-emerald" />
              <h3 className="mt-6 text-xl font-bold text-white">{feature.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section id="workflow" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Agent Workflow"
          title="A compliance pipeline with visible stages."
          description="The page never hides behind an open chat box. Each stage has a job, an output, and a review trail."
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-6">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step}
              className="relative glass-panel rounded-3xl p-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-emerald text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-bold text-white">{step}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {index === 0 && "Start with a GST notice, invoice, or reminder."}
                {index === 1 && "Read key facts, dates, identifiers, and gaps."}
                {index === 2 && "Map the issue into required compliance actions."}
                {index === 3 && "Generate summary, checklist, and draft response."}
                {index === 4 && "Verify completeness before final output."}
                {index === 5 && "Package the final compliance action report."}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SecuritySection() {
  return (
    <section id="security" className="px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow="Security"
          title="Designed for sensitive compliance workflows."
          description="Secrets stay in environment variables, artifacts remain traceable, and every generated report passes through review."
        />
        <motion.div
          className="glass-panel rounded-[2rem] p-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          transition={{ duration: 0.45 }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Environment secrets", "Provider keys are configured outside the repository."],
              ["Verified reports", "Reviewer stage checks artifacts before final output."],
              ["Audit trail", "Each stage can save structured intermediate data."],
              ["Controlled revision", "One revision keeps the workflow focused."]
            ].map(([title, description]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <LockKeyhole className="h-6 w-6 text-emerald" />
                <h3 className="mt-4 font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ReportPreviewSection() {
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Compliance Report Preview"
          title="The final output is a professional action report."
          description="Users receive a structured deliverable with summary, required actions, missing information, checklist, draft response, and reviewer verification."
        />
        <motion.div
          className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-[2rem] border border-white/12 bg-slate-950/70 shadow-glass"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <div className="border-b border-white/10 bg-white/[0.04] px-6 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-400">Final Compliance Action Report</p>
                <h3 className="text-2xl font-bold text-white">GST Notice DRC-01</h3>
              </div>
              <span className="w-fit rounded-full border border-emerald/30 bg-emerald/10 px-4 py-2 text-sm font-bold text-emerald">
                Reviewer verified
              </span>
            </div>
          </div>
          <div className="grid gap-0 lg:grid-cols-[1fr_320px]">
            <div className="space-y-5 p-6">
              {[
                "Compliance Summary",
                "Required Actions",
                "Missing Information",
                "Compliance Checklist",
                "Draft Response",
                "Reviewer Verification"
              ].map((section, index) => (
                <div key={section} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-bold text-white">
                      {index + 1}. {section}
                    </h4>
                    <CheckCircle2 className="h-5 w-5 text-emerald" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-2.5 rounded-full bg-white/16" />
                    <div className="h-2.5 w-4/5 rounded-full bg-white/10" />
                  </div>
                </div>
              ))}
            </div>
            <aside className="border-t border-white/10 bg-white/[0.03] p-6 lg:border-l lg:border-t-0">
              <h4 className="font-bold text-white">Report Metadata</h4>
              <div className="mt-5 space-y-4 text-sm">
                {[
                  ["Document", "DRC-01"],
                  ["Status", "Approved"],
                  ["Revision", "0 of 1 used"],
                  ["Risk", "Medium"],
                  ["Export", "PDF ready"]
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-b border-white/10 pb-3">
                    <span className="text-slate-400">{label}</span>
                    <span className="font-semibold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SupportedDocumentsSection() {
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Supported Documents"
          title="Start with the GST documents teams handle every week."
          description="ComplyAI focuses on practical compliance inputs used by small businesses, CAs, and MSME operators."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-5">
          {documents.map((document) => (
            <motion.div
              key={document}
              className="glass-panel rounded-3xl p-5 text-center"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <UploadCloud className="mx-auto h-7 w-7 text-sky-300" />
              <p className="mt-4 text-sm font-bold text-white">{document}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Built for clarity before filing decisions."
          description="The product helps users understand compliance documents and prepare action plans through a reviewed workflow."
        />
        <div className="mt-14 grid gap-4">
          {faqs.map((faq) => (
            <motion.div
              key={faq.question}
              className="glass-panel rounded-3xl p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-lg font-bold text-white">{faq.question}</h3>
              <p className="mt-3 leading-7 text-slate-300">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>ComplyAI - ChatGPT Codex India Hackathon 2026</p>
        <div className="flex gap-5">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#workflow" className="transition hover:text-white">
            Workflow
          </a>
          <a href="#security" className="transition hover:text-white">
            Security
          </a>
        </div>
      </div>
    </footer>
  );
}

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-navy text-white">
      <SiteHeader />
      <HeroSection />
      <FeatureSection />
      <WorkflowSection />
      <SecuritySection />
      <ReportPreviewSection />
      <SupportedDocumentsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}

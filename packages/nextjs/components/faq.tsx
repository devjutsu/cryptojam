import { FaqItem } from "~~/components/faq-item";
import { Accordion } from "~~/components/ui/accordion";

export function Faq() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">Faq</span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center">
          Frequently Asked Questions
        </h2>
      </div>
      <p className="text-lg text-muted-foreground text-balance max-w-lg text-center">
        For any other questions, please feel free to contact us.
      </p>
      <Accordion type="single" collapsible className="mt-6 w-full divide-y max-w-3xl">
        <FaqItem
          answer="Reweb is focused on developers and it's built on top of Next.js, Tailwind CSS and Shadcn UI, the most popular tech stack for building landing pages in the React ecosystem. This means that you can export your Reweb website to a Next.js project and continue building your app with the same tech stack."
          question="How is Reweb different than tools like Framer or Webflow?"
        />
        <FaqItem
          answer="Reweb is built on top of popular technologies that most frontend developers are familiar with. You don't have to learn new mental models or frameworks. If you're familiar with HTML, React & Tailwind, building with Reweb will feel like writing code but visually."
          question="What is the learning curve for Reweb?"
        />
        <FaqItem
          answer="Yes, we care a lot about giving you code that you can easily mantain and customize. If you're familiar with Next.js and Tailwind, the code will be very familiar and you'll be able to customize it with no issues."
          question="Is the generated code high quality?"
        />
        <FaqItem
          answer="Yes! We're planning to add a lot more sections and templates for landing pages & marketing websites. If you have specific requests, feel free to ask in our Discord."
          question="Do you plan to add more sections and templates?"
        />
        <FaqItem
          answer="Yes, the exported website will look exactly like you see in the editor and in the preview."
          question="Will the exported website look exactly like the preview?"
        />
      </Accordion>
    </section>
  );
}

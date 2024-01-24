import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'

const FaqSection = () => {
  return (
    <section className="my-10 w-11/12 rounded-lg bg-slate-200 pt-5 dark:bg-slate-700 sm:mx-4 md:w-5/6 lg:w-2/5">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Frequently Asked Questions
      </h2>
      <div className="w-full rounded-b-lg bg-white p-12 shadow-lg dark:bg-slate-900">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-bold hover:no-underline">
              How often are new flavors updated?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-400">
              We update our flavor list weekly to ensure you get the latest and
              greatest from Crumbl Cookies! Our web scraping technology fetches
              new flavors as soon as they're announced, so you're always in the
              loop.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-bold hover:no-underline">
              Will I be able to receive notifications for specific flavors?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-400">
              We're baking up something exciting! Notification features are
              currently in the oven, and soon you'll be able to receive alerts
              when your most craved flavors make a return. Stay tuned for
              updates on this feature's release.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl font-bold hover:no-underline">
              What options will be available for my favorites?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-400">
              Your future dashboard will be a delicious hub for all your
              preferred flavors. While this feature is still being perfected,
              you'll soon be able to 'favorite' flavors and revisit them
              anytime. We're working hard to ensure you can curate your cookie
              experience to your taste!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl font-bold hover:no-underline">
              How will the review and rating system enhance my experience?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-400">
              In the upcoming features, you'll have the opportunity to join a
              community of cookie connoisseurs by reviewing and rating the
              flavors you've tried. Your feedback will not only guide others in
              their cookie adventures but also contribute to the overall
              enjoyment of the Crumbl Craver experience. Keep an eye out for
              this feature!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-xl font-bold hover:no-underline">
              Where can I stay up to date on the project's development?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-400">
              For the freshest updates and a sneak peek into our development
              kitchen, visit our GitHub page. There, you'll find the latest
              project milestones, feature developments, and you can even
              contribute to the Crumbl Craver community. Your insights are
              invaluable as we continue to enhance your cookie discovery
              journey!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-xl font-bold hover:no-underline">
              What should I do if I notice incorrect information?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-400">
              Our flavor list is curated with care, but if you spot an error or
              a missing flavor, please let us know through our email{' '}
              <Link
                href={'mailto:support@crumblcraver.com'}
                className="font-bold"
              >
                support@crumblcraver.com
              </Link>
              . We strive for accuracy and appreciate your help in keeping our
              database up-to-date.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}

export default FaqSection

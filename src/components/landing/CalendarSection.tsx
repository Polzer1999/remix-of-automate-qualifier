 import { useLanguage } from "@/i18n/LanguageContext";
 
 export const CalendarSection = () => {
   const { t } = useLanguage();
 
  return (
    <section id="calendrier" className="py-10 md:py-[60px] px-4 md:px-5 text-center">
      <h2 className="text-[28px] md:text-[32px] font-semibold text-foreground mb-3">
         {t.calendar.title}
      </h2>
      <p className="text-base text-[#9CA3AF] mb-10">
         {t.calendar.subtitle}
      </p>
      
      <div className="max-w-[800px] mx-auto rounded-xl overflow-hidden bg-white">
        <iframe 
          className="block bg-white"
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2HBmZmHiPcgY2v_EgpbDKJjMAovbOicgDd2cbFblBSM9NIC0qfXlyfLH6ubjE630_olQvmDWi-?gv=true"
          width="100%"
          height="600"
          frameBorder="0"
          title="Réserver un rendez-vous"
        />
      </div>
    </section>
  );
};

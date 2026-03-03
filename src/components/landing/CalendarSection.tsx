import { useLanguage } from "@/i18n/LanguageContext";

export const CalendarSection = () => {
  const { t } = useLanguage();

  return (
    <section id="calendrier" className="py-16 md:py-24 px-4 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
        {t.calendar.title}
      </h2>
      <p className="text-sm text-muted-foreground mb-10">
        {t.calendar.subtitle}
      </p>
      
      <div className="max-w-[800px] mx-auto rounded-xl overflow-hidden glass-card p-1">
        <iframe 
          className="block rounded-lg"
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2HBmZmHiPcgY2v_EgpbDKJjMAovbOicgDd2cbFblBSM9NIC0qfXlyfLH6ubjE630_olQvmDWi-?gv=true"
          width="100%"
          height="600"
          frameBorder="0"
          title="Réserver un rendez-vous"
          style={{ background: 'white' }}
        />
      </div>
    </section>
  );
};

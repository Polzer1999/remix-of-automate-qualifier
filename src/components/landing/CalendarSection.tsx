export const CalendarSection = () => {
  return (
    <section id="calendar-section" className="py-20 md:py-24 px-4 md:px-5 mt-24 md:mt-28 bg-background">
      <div className="max-w-[800px] mx-auto text-center">
        <h2 className="text-2xl md:text-[32px] font-semibold text-foreground mb-3 font-[Poppins]">
          Réserver un créneau
        </h2>
        <p className="text-muted-foreground mb-10 text-base">
          Choisissez un horaire qui vous convient — 30 min, sans engagement.
        </p>
        
        <div className="rounded-xl overflow-hidden border border-primary/30 bg-card">
          <iframe
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2HBmZmHiPcgY2v_EgpbDKJjMAovbOicgDd2cbFblBSM9NIC0qfXlyfLH6ubjE630_olQvmDWi-?gv=true"
            style={{ border: 0 }}
            width="100%"
            height="600"
            frameBorder="0"
            title="Réserver un créneau avec Parrit.ai"
            className="block w-full min-h-[600px] md:min-h-[600px]"
          />
        </div>
      </div>
    </section>
  );
};

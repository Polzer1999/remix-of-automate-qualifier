export const CalendarSection = () => {
  return (
    <section id="calendar-section" className="py-20 md:py-24 px-4 mt-24 md:mt-28">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-[28px] md:text-[32px] font-semibold text-foreground mb-3">
          Réserver un créneau
        </h2>
        <p className="text-muted-foreground mb-10 text-base">
          Choisissez un horaire qui vous convient — 30 min, sans engagement.
        </p>
        
        <div className="rounded-xl overflow-hidden border border-primary/30">
          <iframe
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2HBmZmHiPcgY2v_EgpbDKJjMAovbOicgDd2cbFblBSM9NIC0qfXlyfLH6ubjE630_olQvmDWi-?gv=true"
            style={{ border: 0 }}
            width="100%"
            height="600"
            frameBorder="0"
            title="Réserver un créneau avec Parrit.ai"
            className="bg-card"
          />
        </div>
      </div>
    </section>
  );
};

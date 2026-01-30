export const CalendarSection = () => {
  return (
    <section id="calendrier" className="py-20 px-5 text-center">
      <h2 className="text-[32px] font-semibold text-white mb-3">
        Réserver un créneau
      </h2>
      <p className="text-base text-[#9CA3AF] mb-10">
        Choisissez un horaire qui vous convient — 15 min, sans engagement.
      </p>
      
      <div className="max-w-[900px] mx-auto rounded-xl overflow-hidden">
        <iframe 
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

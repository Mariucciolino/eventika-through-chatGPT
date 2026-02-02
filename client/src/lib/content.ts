export type Language = 'en' | 'sv';

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
}

export const content = {
  en: {
    nav: {
      home: "home",
      location: "location",
      events: "events",
      experiences: "experiences",
      booking: "booking"
    },
    hero: {
      title: "where unforgettable memories take shape",
      cta: "Book Your Event"
    },
    events: {
      title: "events",
      standardPrice: {
        title: "standard price",
        locationCharge: {
          label: "Location charge",
          price: "8 000 SEK"
        },
        adultGuest: {
          label: "per adult guest",
          price: "200 SEK"
        },
        childGuest: {
          label: "per child over 12 years of age",
          price: "100 SEK"
        }
      },
      includes: {
        title: "Includes:",
        items: [
          "72sqm party tent on a terrace with a grandiose view of the lake (May-September). Alternatively, inside Salon.",
          "access to additional inside Salon in case of rain and for music between 22:00 and 01:00 (no additional cost)",
          "reserved bathroom(s)",
          "initial set-up: tables, chairs, white tablecloths",
          "technology: smart TV, projector and screen (no cost), connection (your own music library from YouTube or Spotify) to B&O sound system",
          "parking on private lot for up to 30 cars",
          "for children: trampoline, swings, playhouse, etc.",
          "large fridge to cool down food/drinks",
          "access: 24 hours before the start and 24 hours after the event, to allow for preparations and packing up",
          "Deposit = Location charge 8000 SEK. The deposit is paid to block the date and confirm the booking. The deposit is refundable if cancellation occurs 90 days or more before the event date"
        ]
      },
      optionals: {
        title: "event optionals",
        items: [
          { title: "catering", description: "you set the budget and you will get to choose from 3 menus from our favorite caterer", price: "350-650 SEK/pers" },
          { title: "kitchen", description: "if you bring your own food or caterer: use of our kitchen with its equipment: 6 hot-plates, oven, micro-oven, industrial dishwasher, fridge, freezer, mixers, etc", price: "2500 SEK" },
          { title: "grill", description: "BBQ grill with gas", price: "350 SEK" },
          { title: "table-dressing", description: "plates, glasses, cutlery, tablecloths, dishwashing, etc", price: "75 SEK/pers" },
          { title: "Overnighting", description: "per adult per night", price: "750 SEK" },
          { title: "unlimited toy-package", description: "unlimited access for all participants during the event to a selection of the 'toys' described under EXPERIENCES", price: "3000 SEK" },
          { title: "cleaning", description: "professional cleaning service after your event", price: "3500 SEK" }
        ]
      },
      cta: {
        title: "Ready to Book Your Event?",
        button: "Get Started"
      }
    },
    experiences: {
      title: "experiences",
      items: [
        {
          title: "SPA & SWIMMING",
          description: "soak at 40deg C in the jacuzzi, take a sauna and jump into the lake, or simply enjoy swimming.",
          prices: [
            { label: "sauna", price: "300 SEK for up to 6p" },
            { label: "jacuzzi 1-2 persons", price: "275 SEK" },
            { label: "jacuzzi 3 persons", price: "375 SEK" },
            { label: "jacuzzi 4 persons", price: "475 SEK" }
          ]
        },
        {
          title: "RELAX\n(on the lake)",
          description: "silently sail under electric power in \"El-Bote\", or use your muscle-power in one of our kayaks, and possibly combine it with fishing pike or perch.",
          prices: [
            { label: "boat electric motor", price: "300 SEK/2h" },
            { label: "one-seater kayak", price: "150 SEK/2h" },
            { label: "kayak 2 adults+1 kid", price: "250 SEK/2h" }
          ]
        },
        {
          title: "SAFARI IN THE WOODS",
          description: "Go for a ride with a scooter on the gravel lanes/paths in the woods around Eskilsby and Inseros",
          prices: [
            { label: "scooter only", price: "150 SEK/1h" },
            { label: "guide", price: "200 SEK/1h" }
          ]
        },
        {
          title: "ISLAND SAFARI",
          description: "Mario will be your captain for a half-day safari around the islands of the amazing Göteborg archipelago.",
          prices: [
            { label: "5h safari with guide", price: "2500 SEK + cost of petrol" }
          ]
        },
        {
          title: "GO NUTS!\n(on the lake)",
          description: "zap across the lake at 50kmh on an electric jet-board, water-ski behind a speedboat or bounce around in a ring.",
          prices: [
            { label: "electric jet-board+equipment", price: "900 SEK/20min" },
            { label: "water-ski or ring", price: "500 SEK/20min\n(incl. driver+equipment+petrol)" }
          ]
        },
        {
          title: "...AND THE FREE STUFF\nof course",
          description: "activities adults and children can enjoy at no cost between the paid experiences",
          prices: []
        }
      ]
    },
    location: {
      title: "the location",
      spaces: {
        title: "SPACES FOR EVENTS",
        items: [
          { label: "72sqm party tent on the terrace overlooking the lake (May-September), capacity 90 seats" },
          { label: "80sqm indoor Salon, capacity 40 seats, alternatively dance floor" },
          { label: "200sqm terrace facing the lake, capacity 40 seats" },
          { label: "3000sqm gardens, for photography, games, etc" },
          { label: "Parking for up to 30 cars" }
        ]
      },
      where: {
        title: "WHERE?",
        address: "Östra Eskilsbyvägen 246, Eskilsby, 43893 Landvetter, Sweden",
        distances: "Göteborg: 29km, Landvetter airport: 16km",
        transport: {
          title: "public transport",
          options: [
            "A) train from Göteborg C to Lindome + bus 762 to Inseros + 1km walking distance",
            "B) bus X6 to Landvetter + bus 620 to Eskilsby skola + 1km walking distance"
          ]
        }
      },
      sections: [
        {
          title: "close to nature",
          content: "Although only 20min from the second largest city in Sweden, amazing as it may sound, Eventika overlooks \"Västra Ingsjön\" a stunning lake and, is surrounded by vast and pristine woods with a varied wildlife. If you are tactical enough, you can spot moose, deer, boar, hare, red squirrels, owls and other bird species."
        },
        {
          title: "stay overnight",
          content: "Eventika is located on the same property as Évika cottage hotel with its 5 cozy cottages and a total 17 beds. It is therefore also possible to overnight here in connection with your activity or event. "
        },
        {
          title: "the owner",
          content: "the Eventika event location is owned by Glestar AB and run by Mario Hytten, who owns the Évika cottage hotel at the same location. Swedish by birth, his previous sports career brought him to live in several European countries, with the consequence that he is fluent in five languages*. He lives on the same property and is therefore always available to assist or advise you to the best of his abilities.\n\n* English, Swedish, Italian, French, Norwegian"
        }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "How do I book the venue?",
          answer: "Fill out our booking request form with your event details, preferred date, and guest count. We'll respond within 24 hours with availability confirmation and next steps. A deposit of 8,000 SEK (location charge) is required to secure your date."
        },
        {
          question: "What is your cancellation policy?",
          answer: "The 8,000 SEK deposit (location charge) is fully refundable if you cancel 90 days or more before your event date. Cancellations made less than 90 days before the event will forfeit the deposit."
        },
        {
          question: "What is included in the standard price?",
          answer: "The standard price includes: 72sqm party tent with lake view, access to indoor Salon, reserved bathrooms, tables and chairs with white tablecloths, Smart TV and projector, B&O sound system, parking for 30 cars, children's play equipment (trampoline, swings, playhouse), large fridge, and 24-hour access before and after your event for setup and cleanup."
        },
        {
          question: "Can we bring our own food and drinks?",
          answer: "Yes! You can bring your own food and caterer with access to our fully equipped kitchen for 2,500 SEK. All drinks must be provided by you and can be stored in our large fridge the day before your event at no additional cost. Alternatively, we can arrange catering through our recommended caterer."
        },
        {
          question: "Is accommodation available?",
          answer: "Yes, we offer overnight accommodation at our Évika cottage hotel located on the same property. We have 5 units ranging from 2-4 person capacity, priced from 1,500-3,000 SEK per night. Perfect for guests traveling from afar or for a weekend celebration."
        },
        {
          question: "What is the maximum capacity?",
          answer: "The 72sqm party tent comfortably accommodates up to 60 guests for a seated dinner. It can also fit up to 90 people with table rows in three lines, naturally with less space between rows. The indoor Salon provides additional space and can be used simultaneously or as a backup in case of rain."
        },
        {
          question: "Do you provide catering services?",
          answer: "We work with a recommended professional caterer who can provide full-service catering. Menu styles and budgets are flexible - just let us know your preferences and budget per person when you submit your booking request, and we'll coordinate with the caterer."
        },
        {
          question: "What equipment is included?",
          answer: "We provide Smart TV, projector with 4m wall screen, and B&O sound system (connect your Spotify or YouTube) at no extra cost. Just indicate what you need in your booking request so we can prepare everything."
        },
        {
          question: "Is there parking available?",
          answer: "Yes, we have a private parking lot that accommodates up to 30 cars, included in the standard price at no additional cost."
        },
        {
          question: "What are the noise restrictions?",
          answer: "Music is permitted in the outdoor tent until 22:00. After 22:00, music must move to the indoor Salon where you can continue until 01:00. This allows you to celebrate while respecting our neighbors."
        },
        {
          question: "Can we decorate the venue?",
          answer: "Absolutely! You have 24-hour access before your event to decorate and set up as you wish. We provide the basic setup (tables, chairs, white tablecloths), and you're welcome to add your own decorations, flowers, and personal touches."
        },
        {
          question: "What cleaning services are available?",
          answer: "We offer professional cleaning service for 3,500 SEK. This includes full cleanup after your event so you can relax and enjoy. If you prefer to handle cleanup yourself, you have 24 hours after the event to restore the venue."
        }
      ]
    }
  },
  sv: {
    nav: {
      home: "hem",
      location: "stället",
      events: "evenemang",
      experiences: "upplevelser",
      booking: "bokningsförfrågan"
    },
    hero: {
      title: "där oförglömliga minnen tar form",
      cta: "Beskriv ditt evenemang"
    },
    events: {
      title: "evenemang",
      standardPrice: {
        title: "standardpris",
        locationCharge: {
          label: "Anläggningsavgift",
          price: "8 000 SEK"
        },
        adultGuest: {
          label: "per vuxen gäst",
          price: "200 SEK"
        },
        childGuest: {
          label: "per barn över 12 år",
          price: "100 SEK"
        }
      },
      includes: {
        title: "Inkluderar:",
        items: [
          "72kvm partytält på altan med storslagen utsikt över sjön (maj-september). Alternativt, salong inomhus.",
          "tillgång till extra salong inomhus vid regn och för musik mellan 22:00 och 01:00 (ingen extra kostnad)",
          "reserverad(e) toalett(er)",
          "grunduppställning: bord, stolar, vita dukar",
          "teknik: smart TV, projektor och duk (ingen kostnad), anslutning (ditt eget musikbibliotek från YouTube eller Spotify) till B&O ljudsystem",
          "parkering på privat tomt för upp till 30 bilar",
          "för barn: studsmatta, gungor, lekstuga, etc.",
          "stor kyl för att kyla mat/dryck",
          "tillgång: 24 timmar före start och 24 timmar efter evenemanget, för att möjliggöra förberedelser och ihopplockning",
          "Lokalhyran betalas som deposition för att förbehålla datumet. Återbetalas om avbokning sker 90+ dagar före evenemanget. Deposition = Lokalhyra 8000kr"
        ]
      },
      optionals: {
        title: "evenemangstillval",
        items: [
          { title: "catering", description: "du sätter budgeten och får välja mellan 3 menyer från vår favoritcaterare", price: "350-650 SEK/pers" },
          { title: "kök", description: "om du tar med egen mat eller caterare: användning av vårt kök med utrustning: 6 kokplattor, ugn, mikrovågsugn, industriell diskmaskin, kyl, frys, mixers, etc", price: "2500 SEK" },
          { title: "grill", description: "BBQ-grill med gasol", price: "350 SEK" },
          { title: "dukning", description: "tallrikar, glas, bestick, dukar, diskning, etc", price: "75 SEK/pers" },
          { title: "Övernattning", description: "per vuxen per natt", price: "750 SEK" },
          { title: "obegränsat leksakspaket", description: "obegränsad tillgång för alla deltagare under evenemanget till ett urval av 'leksakerna' som beskrivs under UPPLEVELSER", price: "3000 SEK" },
          { title: "städning", description: "professionell städservice efter ditt evenemang", price: "3500 SEK" }
        ]
      },
      cta: {
        title: "Redo att Beskriva ditt evenemang?",
        button: "Kom Igång"
      }
    },
    experiences: {
      title: "upplevelser",
      items: [
        {
          title: "SPA & BAD",
          description: "bada i 40 grader i jacuzzin, basta och hoppa i sjön, eller njut helt enkelt av att simma.",
          prices: [
            { label: "bastu", price: "300 SEK för upp till 6p" },
            { label: "jacuzzi 1-2 personer", price: "275 SEK" },
            { label: "jacuzzi 3 personer", price: "375 SEK" },
            { label: "jacuzzi 4 personer", price: "475 SEK" }
          ]
        },
        {
          title: "KOPPLA AV\n(på sjön)",
          description: "segla tyst med eldrift i \"El-Bote\", eller använd din muskelkraft i en av våra kajaker, och kombinera eventuellt med fiske av gädda eller abborre.",
          prices: [
            { label: "båt med elmotor", price: "300 SEK/2h" },
            { label: "enmanskajak", price: "150 SEK/2h" },
            { label: "kajak 2 vuxna+1 barn", price: "250 SEK/2h" }
          ]
        },
        {
          title: "SAFARI I SKOGEN",
          description: "Ta en tur med en scooter på grusvägarna/stigarna i skogen runt Eskilsby och Inseros",
          prices: [
            { label: "endast scooter", price: "150 SEK/1h" },
            { label: "guide", price: "200 SEK/1h" }
          ]
        },
        {
          title: "Ö-SAFARI",
          description: "Mario blir din kapten för en halvdags safari runt öarna i den fantastiska Göteborgs skärgård.",
          prices: [
            { label: "5h safari med guide", price: "2500 SEK + bensinkostnad" }
          ]
        },
        {
          title: "GÖR NÅGOT HELT GALET!\n(på sjön)",
          description: "swisha över sjön i 50km/h på en elektrisk jet-board, åk vattenskidor bakom en motorbåt eller studsa runt i en ring.",
          prices: [
            { label: "elektrisk jet-board+utrustning", price: "900 SEK/20min" },
            { label: "vattenskidor eller ring", price: "500 SEK/20min\n(inkl. förare+utrustning+bensin)" }
          ]
        },
        {
          title: "...OCH DET SOM ÄR GRATIS\nsåklart",
          description: "aktiviteter vuxna och barn kan njuta av utan kostnad mellan de betalda upplevelserna",
          prices: []
        }
      ]
    },
    location: {
      title: "stället",
      spaces: {
        title: "UTRYMMEN FÖR EVENEMANG",
        items: [
          { label: "72kvm partytält på altanen med utsikt över sjön (maj-september), kapacitet 90 sittplatser" },
          { label: "80kvm inomhus Salong, kapacitet 40 sittplatser, alternativt dansgolv" },
          { label: "200kvm altan mot sjön, kapacitet 40 sittplatser" },
          { label: "3000kvm trädgårdar, för fotografering, lekar, etc" },
          { label: "Parkering för upp till 30 bilar" }
        ]
      },
      where: {
        title: "VAR?",
        address: "Östra Eskilsbyvägen 246, Eskilsby, 43893 Landvetter, Sverige",
        distances: "Avstånd: Göteborg: 29km, Landvetter flygplats: 16km",
        transport: {
          title: "kollektivtrafik",
          options: [
            "A) tåg från Göteborg C till Lindome + buss 762 till Inseros + 1km gångavstånd",
            "B) buss X6 till Landvetter + buss 620 till Eskilsby skola + 1km gångavstånd"
          ]
        }
      },
      sections: [
        {
          title: "nära naturen",
          content: "Även om det bara är 20 minuter från Sveriges näst största stad, hur otroligt det än kan låta, blickar Eventika ut över \"Västra Ingsjön\", en fantastisk sjö, och är omgivet av vidsträckta och orörda skogar med ett varierat djurliv. Om du är taktisk nog kan du få syn på älg, rådjur, vildsvin, hare, ekorrar, ugglor och andra fågelarter."
        },
        {
          title: "övernatta",
          content: "Eventika ligger på samma ställe som Évika stughotell med sina 5 mysiga stugor och totalt 17 bäddar. Det är därför också möjligt att övernatta här i samband med din aktivitet eller evenemang."
        },
        {
          title: "ägaren",
          content: "Eventika evenemangsplats ägs av Glestar AB och drivs av Mario Hytten, som äger Évika stughotell på samma ställe. Svensk till börd, men hans tidigare sportkarriär tog honom till att bo i flera europeiska länder, med följden att han talar fem språk flytande*. Han bor på samma ställe och är därför alltid tillgänglig för att hjälpa eller ge råd efter bästa förmåga.\n\n* Engelska, Svenska, Italienska, Franska, Norska"
        }
      ]
    },
    faq: {
      title: "Vanliga frågor",
      items: [
        {
          question: "Hur bokar jag lokalen?",
          answer: "Fyll i vårt bokningsformulär med dina eventdetaljer, önskat datum och antal gäster. Vi svarar inom 24 timmar med bekräftelse på tillgänglighet och nästa steg. En deposition på 8 000 SEK (lokalhyra) krävs för att säkra ditt datum."
        },
        {
          question: "Vad är er avbokningspolicy?",
          answer: "Depositionen på 8 000 SEK (lokalhyra) återbetalas fullt ut om du avbokar 90 dagar eller mer före ditt eventdatum. Avbokningar som görs mindre än 90 dagar före evenemanget förlorar depositionen."
        },
        {
          question: "Vad ingår i standardpriset?",
          answer: "Standardpriset inkluderar: 72kvm festtält med sjöutsikt, tillgång till inomhus Salon, reserverade toaletter, bord och stolar med vita dukar, Smart TV och projektor, B&O-ljudsystem, parkering för 30 bilar, lekutrustning för barn (studsmatta, gungor, lekstuga), stort kylskåp, och 24-timmars tillgång före och efter ditt event för förberedelser och städning."
        },
        {
          question: "Kan vi ta med egen mat och dryck?",
          answer: "Ja! Du kan ta med egen mat och cateringfirma med tillgång till vårt fullt utrustade kök för 2 500 SEK. Alla drycker måste tillhandahållas av er och kan förvaras i vårt stora kylskåp dagen före evenemanget utan extra kostnad. Alternativt kan vi ordna catering genom vår rekommenderade cateringfirma."
        },
        {
          question: "Finns boende tillgängligt?",
          answer: "Ja, vi erbjuder övernattning på vårt Évika stughotell som ligger på samma ställe. Vi har 5 enheter med kapacitet för 2-4 personer, prissatta från 1 500-3 000 SEK per natt. Perfekt för gäster som reser långväga eller för en helgfirande."
        },
        {
          question: "Vad är maximal kapacitet?",
          answer: "72kvm festtältet rymmer bekvämt upp till 60 gäster för en sittande middag. Det går också upp till 90 personer med bordlänger i tre rader, naturligtvis då med mindre avrum mellan raderna. Inomhus Salon ger extra utrymme och kan användas samtidigt eller som backup vid regn."
        },
        {
          question: "Erbjuder ni cateringtjänster?",
          answer: "Vi samarbetar med en rekommenderad professionell cateringfirma som kan tillhandahålla fullservice catering. Menystilar och budgetar är flexibla - låt oss bara veta dina preferenser och budget per person när du skickar din bokningsförfrågan, så koordinerar vi med cateringfirman."
        },
        {
          question: "Vilken utrustning ingår?",
          answer: "Vi tillhandahåller Smart TV, projektor med 4m väggduk, och B&O-ljudsystem (anslut din Spotify eller YouTube) utan extra kostnad. Ange bara vad du behöver i din bokningsförfrågan så förbereder vi allt."
        },
        {
          question: "Finns parkering tillgänglig?",
          answer: "Ja, vi har en privat parkeringsplats som rymmer upp till 30 bilar, ingår i standardpriset utan extra kostnad."
        },
        {
          question: "Vad är bullerrestriktionerna?",
          answer: "Musik är tillåten i utomhustältet till 22:00. Efter 22:00 måste musiken flyttas till inomhus Salon där ni kan fortsätta till 01:00. Detta gör att ni kan fira samtidigt som vi respekterar våra grannar."
        },
        {
          question: "Kan vi dekorera lokalen?",
          answer: "Absolut! Du har 24-timmars tillgång före ditt event för att dekorera och ställa i ordning som du önskar. Vi tillhandahåller grunduppsättningen (bord, stolar, vita dukar), och du är välkommen att lägga till egna dekorationer, blommor och personliga detaljer."
        },
        {
          question: "Vilka städtjänster finns tillgängliga?",
          answer: "Vi erbjuder professionell städservice för 3 500 SEK. Detta inkluderar fullständig städning efter ditt event så du kan slappna av och njuta. Om du föredrar att hantera städningen själv har du 24 timmar efter evenemanget för att återställa lokalen."
        }
      ]
    }
  },
  media: {
    home: {
      heroImage: "/images/home/Home(1).jpg",
      // heroVideo: "/images/home/Home(2).mp4" // Temporarily removed - re-upload via File Storage
    },
    events: {
      main: [
        { type: "image" as const, src: "/images/events/main/events(1).jpg", alt: "Event setup" },
        { type: "image" as const, src: "/images/events/main/events(2).jpg", alt: "Celebration" },
        { type: "image" as const, src: "/images/events/main/events(3).jpg", alt: "Party atmosphere" },
        { type: "image" as const, src: "/images/events/main/events(4).jpg", alt: "Table setting" },
        { type: "image" as const, src: "/images/events/main/events(6).jpg", alt: "Event decoration" },
        { type: "image" as const, src: "/images/events/main/events(7).jpg", alt: "Outdoor event" },
        ],
      catering: [
        { type: "image" as const, src: "/images/events/catering/catering(1).jpg", alt: "Catering 1" },
        { type: "image" as const, src: "/images/events/catering/catering(5).jpg", alt: "Catering 5" },
        { type: "image" as const, src: "/images/events/catering/catering(6).jpg", alt: "Catering 6" },
        { type: "image" as const, src: "/images/events/catering/catering(7).jpg", alt: "Catering 7" }
      ],
      grill: [
        { type: "image" as const, src: "/images/events/grill/grill(1).jpg", alt: "Grill 1" },
        { type: "image" as const, src: "/images/events/grill/grill(2).JPG", alt: "Grill 2" },
        { type: "video" as const, src: "/images/events/grill/grill(1).MP4", alt: "Grill video" }
      ],
      table: [
        { type: "image" as const, src: "/images/events/table/tabledressing.jpg", alt: "Table dressing" }
      ],
      kitchen: [
        { type: "image" as const, src: "/images/events/kitchen/kitchen.jpg", alt: "Kitchen" }
      ],
      toys: [
        { type: "image" as const, src: "/images/events/toys/toypackage(1).jpg", alt: "Toy package 1" },
        { type: "image" as const, src: "/images/events/toys/toypackage(2).jpeg", alt: "Toy package 2" },
        { type: "image" as const, src: "/images/events/toys/toypackage(3).jpg", alt: "Toy package 3" },
        { type: "image" as const, src: "/images/events/toys/toypackage(4).jpg", alt: "Toy package 4" },
        { type: "image" as const, src: "/images/events/toys/toypackage(5).jpg", alt: "Toy package 5" },
        { type: "image" as const, src: "/images/events/toys/toypackage(9).jpg", alt: "Toy package 9" },
        { type: "image" as const, src: "/images/events/toys/toypackage(10).jpg", alt: "Toy package 10" },
        { type: "image" as const, src: "/images/events/toys/toypackage(11).jpg", alt: "Toy package 11" }
      ]
    },
    experiences: {
      spa: [
        { type: "image" as const, src: "/images/experiences/spa/spa(0).jpg", alt: "Spa 0" },
        { type: "image" as const, src: "/images/experiences/spa/spa(1).jpg", alt: "Spa 1" },
        { type: "image" as const, src: "/images/experiences/spa/spa(4).jpg", alt: "Spa 4" },
        { type: "image" as const, src: "/images/experiences/spa/spa(5).jpg", alt: "Spa 5" },
        { type: "image" as const, src: "/images/experiences/spa/spa(6).jpeg", alt: "Spa 6" }
      ],
      gonuts: [
        { type: "image" as const, src: "/images/experiences/gonuts/gonuts(3).jpg", alt: "Jetboard girl" },
        { type: "image" as const, src: "/images/experiences/gonuts/gonuts(2).jpg", alt: "Waterski from boat" },
        { type: "image" as const, src: "/images/experiences/gonuts/gonuts(7).jpg", alt: "Shore equipment" }
      ],
      relax: [
        { type: "image" as const, src: "/images/experiences/relax/relaxonthelake(1).jpg", alt: "Relax 1" },
        { type: "image" as const, src: "/images/experiences/relax/relaxonthelake(1a).jpg", alt: "Relax 1a" },
        { type: "image" as const, src: "/images/experiences/relax/relaxonthelake(4).jpg", alt: "Relax 4" },
        { type: "image" as const, src: "/images/experiences/relax/relaxonthelake(10).jpg", alt: "Relax 10" }
      ],
      safari: [
        { type: "image" as const, src: "/images/experiences/safari/safariinthewoods.jpg", alt: "Scooter safari" }
      ],
      island: [
        { type: "image" as const, src: "/images/experiences/island/islandsafari(0).jpg", alt: "Island 0" },
        { type: "image" as const, src: "/images/experiences/island/islandsafari(2).jpg", alt: "Island 2" },
        { type: "image" as const, src: "/images/experiences/island/islandsafari(4).jpg", alt: "Island 4" },
        { type: "image" as const, src: "/images/experiences/island/islandsafari(5).jpg", alt: "Island 5" },
        { type: "image" as const, src: "/images/experiences/island/islandsafari(6).jpeg", alt: "Island 6" },
        { type: "image" as const, src: "/images/experiences/island/islandsafari(7).JPG", alt: "Island 7" }
      ],
      free: [
        { type: "image" as const, src: "/images/events/toys/freestuff(1).jpg", alt: "Free stuff 1" },
        { type: "image" as const, src: "/images/events/toys/freestuff(2).jpg", alt: "Free stuff 2" },
        { type: "image" as const, src: "/images/events/toys/freestuff(2a).jpg", alt: "Free stuff 2a" },
        { type: "image" as const, src: "/images/events/toys/freestuff(3).jpg", alt: "Free stuff 3" },
        { type: "image" as const, src: "/images/events/toys/freestuff(4).jpg", alt: "Free stuff 4" },
        { type: "image" as const, src: "/images/events/toys/freestuff.JPG", alt: "Free stuff main" }
      ]
    },
    location: {
      tent: [
        { type: "image" as const, src: "/images/location/tent/tent(1).jpg", alt: "Tent 1" },
        { type: "image" as const, src: "/images/location/tent/tent(4).jpg", alt: "Tent 4" },
        { type: "image" as const, src: "/images/location/tent/tent(15).jpg", alt: "Tent 15" },
        { type: "image" as const, src: "/images/location/tent/tent(16).jpg", alt: "Tent 16" },
        { type: "image" as const, src: "/images/location/tent/tent(17).jpg", alt: "Tent 17" },
        { type: "image" as const, src: "/images/location/tent/tent(18).jpg", alt: "Tent 18" },
        { type: "image" as const, src: "/images/location/tent/tent(19).jpg", alt: "Tent 19" },
        { type: "image" as const, src: "/images/location/tent/tent(20).jpg", alt: "Tent 20" },
        { type: "image" as const, src: "/images/location/tent/tent(21).jpg", alt: "Tent 21" },
        { type: "image" as const, src: "/images/location/tent/tent(22).jpg", alt: "Tent 22" },
        { type: "image" as const, src: "/images/location/tent/tent(23).jpg", alt: "Tent 23" },
        { type: "image" as const, src: "/images/location/tent/tent(24).jpg", alt: "Tent 24" },
        { type: "image" as const, src: "/images/location/tent/tent(25).jpg", alt: "Tent 25" },
        { type: "image" as const, src: "/images/location/tent/tent(26).jpg", alt: "Tent 26" },
        { type: "image" as const, src: "/images/location/tent/tent(27).jpg", alt: "Tent 27" },
        { type: "image" as const, src: "/images/location/tent/tent(28).jpg", alt: "Tent 28" }
      ],
      salon: [
        { type: "image" as const, src: "/images/location/salon/Salon(2).JPG", alt: "Salon 2" },
        { type: "image" as const, src: "/images/location/salon/Salon(3).JPG", alt: "Salon 3" },
        { type: "image" as const, src: "/images/location/salon/Salon(5).JPG", alt: "Salon 5" },
        { type: "image" as const, src: "/images/location/salon/Salon(5a).JPG", alt: "Salon 5a" },
        { type: "image" as const, src: "/images/location/salon/Salon(6).jpg", alt: "Salon 6" },
        { type: "image" as const, src: "/images/location/salon/Salon(7).jpg", alt: "Salon 7" },
        { type: "image" as const, src: "/images/location/salon/Salon(9).jpg", alt: "Salon 9" }
      ],
      altan: [
        { type: "image" as const, src: "/images/location/altan/altanen(0).jpg", alt: "Altan 0" },
        { type: "image" as const, src: "/images/location/altan/Altanen(0a).jpg", alt: "Altan 0a" },
        { type: "image" as const, src: "/images/location/altan/Altanen(2).jpg", alt: "Altan 2" },
        { type: "image" as const, src: "/images/location/altan/Altanen(3).jpg", alt: "Altan 3" },
        { type: "image" as const, src: "/images/location/altan/Altanen(3a).jpg", alt: "Altan 3a" },
        { type: "image" as const, src: "/images/location/altan/Altanen(5).jpg", alt: "Altan 5" },
        { type: "image" as const, src: "/images/location/altan/altanen(6).jpg", alt: "Altan 6" }
      ],
      gardens: [
        { type: "image" as const, src: "/images/location/gardens/closetonature(8).jpg", alt: "Garden games" } // Placeholder until video is re-uploaded
      ],
      closetonature: [
        { type: "image" as const, src: "/images/location/gardens/closetonature(0).jpg", alt: "Nature 0" },
        { type: "image" as const, src: "/images/location/gardens/closetonature(1).jpg", alt: "Nature 1" },
        { type: "image" as const, src: "/images/location/gardens/closetonature(1).jpeg", alt: "Nature 1b" },
        { type: "image" as const, src: "/images/location/gardens/closetonature(3).jpg", alt: "Nature 3" },
        { type: "image" as const, src: "/images/location/gardens/closetonature(3a).jpg", alt: "Nature 3a" },
        { type: "image" as const, src: "/images/location/gardens/closetonature(5).jpg", alt: "Nature 5" },
        { type: "image" as const, src: "/images/location/gardens/closetonature(7).jpg", alt: "Nature 7" },
        { type: "image" as const, src: "/images/location/gardens/closetonature(8).jpg", alt: "Nature 8" },
        { type: "image" as const, src: "/images/location/gardens/closetonature(11).jpg", alt: "Nature 11" },
        { type: "image" as const, src: "/images/location/gardens/closetonature(12).jpg", alt: "Nature 12" },
        { type: "image" as const, src: "/images/location/gardens/closetonature(13).jpg", alt: "Nature 13" },
        { type: "image" as const, src: "/images/location/gardens/closetonature(14).jpg", alt: "Nature 14" }
      ],
      where: [
        { type: "image" as const, src: "/images/location/where/where(10).jpg", alt: "Where 10" },
        { type: "image" as const, src: "/images/location/where/where(20).jpg", alt: "Where 20" },
        { type: "image" as const, src: "/images/location/where/where(30).jpg", alt: "Where 30" }
      ],
      overnight: [
        { type: "image" as const, src: "/images/location/overnight/cottagehotel_drone.jpg", alt: "Cottage hotel drone view" },
        { type: "image" as const, src: "/images/location/overnight/overnighting(1).jpg", alt: "Overnight 1" },
        { type: "image" as const, src: "/images/location/overnight/overnighting(2a).jpg", alt: "Overnight 2a" },
        { type: "image" as const, src: "/images/location/overnight/overnighting(3).jpg", alt: "Overnight 3" },
        { type: "image" as const, src: "/images/location/overnight/overnighting(4).jpg", alt: "Overnight 4" },
        { type: "image" as const, src: "/images/location/overnight/overnighting(5).jpg", alt: "Overnight 5" },
        { type: "image" as const, src: "/images/location/overnight/overnighting(6).jpg", alt: "Overnight 6" },
        { type: "image" as const, src: "/images/location/overnight/overnighting(7).jpg", alt: "Overnight 7" }
      ]
    }
  }
} as const;

export type Content = typeof content.en;

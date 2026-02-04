import { useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  date: z.string().min(1, 'Date is required'),
  alternativeDates: z.string(),
  adults: z.string().min(1, 'Number of adults is required'),
  children: z.string(),
  message: z.string(),
  
  // Food options (mutually exclusive, but optional)
  foodOption: z.enum(['ownCooking', 'catering', '']).optional(),
  cateringMenuStyle: z.string(),
  cateringBudget: z.string(),
  
  // Equipment (free but must be requested)
  smartTV: z.boolean(),
  projector: z.boolean(),
  soundSystem: z.boolean(),
  
  // Food equipment
  tableDressing: z.boolean(),
  grill: z.boolean(),
  
  // Overnight - Évika accommodations
  overnight: z.boolean(),
  evika1: z.boolean(), // 2 persons - 1500 SEK
  evika2: z.boolean(), // 4 persons - 3000 SEK
  evika3: z.boolean(), // 3 persons - 2250 SEK
  evika4: z.boolean(), // 4 persons - 3000 SEK
  evika5: z.boolean(), // 4 persons - 3000 SEK
  
  // Other optionals
  toys: z.boolean(),
  cleaning: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

type BookingFormProps = {
  selectedDate?: Date;
  onDateChange?: (date: Date | undefined) => void;
};

export function BookingForm({ selectedDate, onDateChange }: BookingFormProps) {
  const { language } = useLanguage();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: '',
      alternativeDates: '',
      adults: '',
      children: '0',
      message: '',
      foodOption: '',
      cateringMenuStyle: '',
      cateringBudget: '',
      smartTV: false,
      projector: false,
      soundSystem: false,
      tableDressing: false,
      grill: false,
      overnight: false,
      evika1: false,
      evika2: false,
      evika3: false,
      evika4: false,
      evika5: false,
      toys: false,
      cleaning: false,
    },
  });

  const watchedValues = form.watch();
  
  // Calculate total price using useMemo to avoid infinite loops
  const totalPrice = useMemo(() => {
    let total = 0;
    const adults = parseInt(watchedValues.adults || '0') || 0;
    const children = parseInt(watchedValues.children || '0') || 0;
    const totalGuests = adults + children;

    // Standard Price
    total += 8000; // Location charge
    total += adults * 200; // Adult guest charge
    total += children * 100; // Child guest charge

    // Food options
    if (watchedValues.foodOption === 'ownCooking') {
      total += 2500; // Kitchen use
    } else if (watchedValues.foodOption === 'catering') {
      // Add catering budget × total guests
      const budget = parseInt(watchedValues.cateringBudget || '0') || 0;
      if (budget > 0) {
        total += budget * totalGuests;
      }
    }

    // Equipment (free)
    // smartTV, projector, soundSystem are free

    // Food equipment
    if (watchedValues.tableDressing) total += totalGuests * 75;
    if (watchedValues.grill) total += 350;

    // Évika accommodations
    if (watchedValues.overnight) {
      if (watchedValues.evika1) total += 1500;
      if (watchedValues.evika2) total += 3000;
      if (watchedValues.evika3) total += 2250;
      if (watchedValues.evika4) total += 3000;
      if (watchedValues.evika5) total += 3000;
    }
    
    if (watchedValues.toys) total += 3000;
    if (watchedValues.cleaning) total += 3500;
    
    return total;
  }, [watchedValues.adults, watchedValues.children, watchedValues.foodOption, watchedValues.cateringBudget, watchedValues.tableDressing, watchedValues.grill, watchedValues.overnight, watchedValues.evika1, watchedValues.evika2, watchedValues.evika3, watchedValues.evika4, watchedValues.evika5, watchedValues.toys, watchedValues.cleaning]);

  const formatDateForInput = (d: Date): string => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  // Sync calendar selection into the form's date field
  useEffect(() => {
    if (!selectedDate) return;
    form.setValue('date', formatDateForInput(selectedDate), { shouldValidate: true });
  }, [selectedDate]);

  function onSubmit(values: FormValues) {
    // Guaranteed delivery: open a prefilled email to mario@eventika.se.
    // This avoids reliance on any server-side notification service.
    const subject = encodeURIComponent(`Booking request - ${values.name} - ${values.date}`);
    const lines: string[] = [];
    lines.push(`NEW BOOKING REQUEST`);
    lines.push(``);
    lines.push(`CONTACT DETAILS`);
    lines.push(`Name: ${values.name}`);
    lines.push(`Email: ${values.email}`);
    lines.push(`Phone: ${values.phone}`);
    lines.push(``);
    lines.push(`EVENT DETAILS`);
    lines.push(`Date: ${values.date}`);
    lines.push(`Alternative dates: ${values.alternativeDates || 'None'}`);
    lines.push(`Adults: ${values.adults}`);
    lines.push(`Children (>12y): ${values.children || '0'}`);
    lines.push(``);
    lines.push(`FOOD & DRINKS`);
    if (values.foodOption === 'ownCooking') {
      lines.push(`Own cooking/caterer (Kitchen use: 2500 SEK)`);
    } else if (values.foodOption === 'catering') {
      lines.push(`Catering requested`);
      lines.push(`  Menu style: ${values.cateringMenuStyle || 'Not specified'}`);
      lines.push(`  Budget per person: ${values.cateringBudget || 'Not specified'} SEK`);
    } else {
      lines.push(`Not specified`);
    }
    lines.push(``);
    lines.push(`EQUIPMENT REQUESTED (no cost)`);
    const equipment: string[] = [];
    if (values.smartTV) equipment.push('Smart TV');
    if (values.projector) equipment.push('Projector on 4m wall');
    if (values.soundSystem) equipment.push('B&O Sound System');
    lines.push(equipment.length ? equipment.join(', ') : 'None');
    lines.push(``);
    lines.push(`OTHER OPTIONALS`);
    const optionals: string[] = [];
    if (values.tableDressing) optionals.push('Table dressing');
    if (values.grill) optionals.push('BBQ gas grill');
    if (values.toys) optionals.push('Unlimited Toy Package');
    if (values.cleaning) optionals.push('Cleaning Service');
    lines.push(optionals.length ? optionals.join(', ') : 'None');
    lines.push(``);
    lines.push(`ESTIMATED TOTAL: ${totalPrice.toLocaleString()} SEK`);
    lines.push(``);
    lines.push(`MESSAGE`);
    lines.push(values.message || '');

    const body = encodeURIComponent(lines.join('\n'));
    const mailto = `mailto:mario@eventika.se?subject=${subject}&body=${body}`;

    window.location.href = mailto;

    toast.success(language === 'en'
      ? 'Your email app will open with a prefilled booking request. Please press Send.'
      : 'Din e-post öppnas med en förifylld bokningsförfrågan. Skicka mejlet.');

    form.reset();
    onDateChange?.(undefined);
  }

  const includedItems = language === 'en' ? [
    "3000sqm garden for games etc.",
    "Reserved bathroom(s) for guests",
    "Parking on private lot for up to 20 cars",
    "Access to 200sqm terrace with grandiose view of the lake",
    "For children: trampoline, swings, playhouse, etc.",
    "Large fridge to cool down drinks before the event",
    "24h access before event to prepare/decorate, and day after to pack up"
  ] : [
    "3000kvm trädgård för spel etc.",
    "Reserverade toalett(er) för gäster",
    "Parkering på privat tomt för upp till 20 bilar",
    "Tillgång till 200kvm altan med storslagen utsikt över sjön",
    "För barn: studsmatta, gungor, lekstuga, etc.",
    "Stort kylskåp för att kyla drycker före evenemanget",
    "24h tillgång före event för förberedelser, och dagen efter för packning"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Details */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-bold text-primary mb-6 uppercase">
                {language === 'en' ? 'Contact Details' : 'Kontaktuppgifter'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'en' ? 'Name' : 'Namn'}</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'en' ? 'Phone' : 'Telefon'}</FormLabel>
                      <FormControl>
                        <Input placeholder="+46 70 123 45 67" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'en' ? 'Event Date' : 'Eventdatum'}</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            // keep calendar in sync if user types the date
                            if (e.target.value) {
                              const d = new Date(`${e.target.value}T00:00:00`);
                              onDateChange?.(d);
                            } else {
                              onDateChange?.(undefined);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alternativeDates"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'en' ? 'Alternative Dates (optional)' : 'Alternativa datum (valfritt)'}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={language === 'en' ? 'e.g., June 15, June 22, or July 1' : 't.ex. 15 juni, 22 juni eller 1 juli'}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Guest Count */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-bold text-primary mb-6 uppercase">
                {language === 'en' ? 'Guests' : 'Gäster'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="adults"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'en' ? 'Adults (200 SEK/pp)' : 'Vuxna (200 SEK/pp)'}</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="children"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'en' ? 'Children >12y (100 SEK/pp)' : 'Barn >12år (100 SEK/pp)'}</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Included in Standard Price */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-bold text-primary mb-6 uppercase">
                {language === 'en' ? 'Included in Standard Price' : 'Ingår i standardpriset'}
              </h3>
              <div className="space-y-3">
                {includedItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment - checkboxes for free items */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-bold text-primary mb-6 uppercase">
                {language === 'en' ? 'Equipment' : 'Utrustning'}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'en' 
                  ? 'Please tick what you need so we can prepare (no cost)' 
                  : 'Vänligen kryssa i vad du behöver så vi kan förbereda (ingen kostnad)'}
              </p>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="smartTV"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none flex-1">
                        <FormLabel>Smart TV</FormLabel>
                        <p className="text-green-600 font-medium text-sm">{language === 'en' ? 'no cost' : 'ingen kostnad'}</p>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projector"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none flex-1">
                        <FormLabel>{language === 'en' ? 'Projector on 4m wall' : 'Projektor på 4m vägg'}</FormLabel>
                        <p className="text-green-600 font-medium text-sm">{language === 'en' ? 'no cost' : 'ingen kostnad'}</p>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="soundSystem"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none flex-1">
                        <FormLabel>{language === 'en' ? 'Connect music library (Spotify, YouTube) to B&O sound system' : 'Anslut musikbibliotek (Spotify, YouTube) till B&O-ljudsystem'}</FormLabel>
                        <p className="text-green-600 font-medium text-sm">{language === 'en' ? 'no cost' : 'ingen kostnad'}</p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Food and Drinks */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-bold text-primary mb-6 uppercase">
                {language === 'en' ? 'Food and Drinks' : 'Mat och dryck'}
              </h3>
              
              <div className="space-y-4">
                {/* Food option radio group */}
                <FormField
                  control={form.control}
                  name="foodOption"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="space-y-4"
                        >
                          <div className="flex items-start space-x-3 rounded-md border p-4">
                            <RadioGroupItem value="" id="noFood" />
                            <div className="flex-1">
                              <Label htmlFor="noFood" className="font-medium cursor-pointer">
                                {language === 'en' 
                                  ? 'No food service needed' 
                                  : 'Ingen mattjänst behövs'}
                              </Label>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3 rounded-md border p-4">
                            <RadioGroupItem value="ownCooking" id="ownCooking" />
                            <div className="flex-1">
                              <Label htmlFor="ownCooking" className="font-medium cursor-pointer">
                                {language === 'en' 
                                  ? 'Own cooking/own caterer: access to our kitchen with its equipment' 
                                  : 'Egen matlagning/egen cateringfirma: tillgång till vårt kök med utrustning'}
                              </Label>
                              <p className="text-primary font-bold mt-1">2500 SEK</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3 rounded-md border p-4">
                            <RadioGroupItem value="catering" id="catering" />
                            <div className="flex-1">
                              <Label htmlFor="catering" className="font-medium cursor-pointer">
                                {language === 'en' 
                                  ? 'Catering by our recommended caterer' 
                                  : 'Catering av vår rekommenderade cateringfirma'}
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Catering details (shown when catering is selected) */}
                {watchedValues.foodOption === 'catering' && (
                  <div className="ml-8 space-y-4 pt-2 border-l-2 border-primary/30 pl-4">
                    <FormField
                      control={form.control}
                      name="cateringMenuStyle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'en' ? 'Style/theme of the menu' : 'Stil/tema för menyn'}
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={language === 'en' 
                                ? "e.g., Mediterranean, Swedish traditional, BBQ, Vegetarian..." 
                                : "t.ex. Medelhavs, Svensk traditionell, BBQ, Vegetarisk..."}
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cateringBudget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'en' 
                              ? 'Set a tentative budget per person' 
                              : 'Ange en preliminär budget per person'}
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Input 
                                type="number" 
                                min="0" 
                                placeholder="350-650" 
                                {...field} 
                              />
                              <span className="text-muted-foreground whitespace-nowrap">SEK/pers</span>
                            </div>
                          </FormControl>
                          <p className="text-sm text-muted-foreground mt-2">
                            {language === 'en'
                              ? 'You will receive 2-3 menu proposals for your appraisal'
                              : 'Du kommer att få 2-3 menyförslag för din bedömning'}
                          </p>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Table dressing */}
                <FormField
                  control={form.control}
                  name="tableDressing"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none flex-1">
                        <FormLabel>
                          {language === 'en' 
                            ? 'Choice of plates, glasses, cutlery, tablecloths, including dishwashing' 
                            : 'Val av tallrikar, glas, bestick, dukar, inklusive diskning'}
                        </FormLabel>
                        <p className="text-primary font-bold">75 SEK/pers</p>
                      </div>
                    </FormItem>
                  )}
                />

                {/* BBQ Grill */}
                <FormField
                  control={form.control}
                  name="grill"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none flex-1">
                        <FormLabel>
                          {language === 'en' ? 'BBQ gas grill' : 'BBQ gasgrill'}
                        </FormLabel>
                        <p className="text-primary font-bold">350 SEK</p>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Drinks note */}
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-md">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground text-sm">
                    {language === 'en'
                      ? 'All drinks must be provided by the client. Can be stored in our fridge the day before the event (no cost)'
                      : 'Alla drycker tillhandahålls av kunden. Kan förvaras i vårt kylskåp dagen före evenemanget (ingen kostnad)'}
                  </p>
                </div>
              </div>
            </div>

            {/* Overnight Stay - Évika */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-bold text-primary mb-6 uppercase">
                {language === 'en' ? 'Overnight Stay' : 'Övernattning'}
              </h3>
              
              <FormField
                control={form.control}
                name="overnight"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mb-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none flex-1">
                      <FormLabel>
                        {language === 'en' ? 'Yes, we need accommodation' : 'Ja, vi behöver boende'}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              {watchedValues.overnight && (
                <div className="space-y-4 mt-4">
                  {/* Évika Logo and Info */}
                  <a 
                    href="https://www.evika.se" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 hover:border-green-400 transition-colors">
                      <img 
                        src="/images/evika_logo.jpg" 
                        alt="Évika Boutique Hotel" 
                        className="w-24 h-24 object-contain"
                      />
                      <div>
                        <p className="font-medium text-foreground">
                          {language === 'en' 
                            ? 'Accommodation in our cabin hotel' 
                            : 'Boende i vårt stughotell'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en'
                            ? 'Beds for up to 17 people divided into 3 cottages, 1 apartment and a luxury caravan'
                            : 'Bäddar för upp till 17 personer fördelat på 3 stugor, 1 lägenhet och en lyxhusvagn'}
                        </p>
                        <p className="text-xs text-primary mt-1">www.evika.se →</p>
                      </div>
                    </div>
                  </a>

                  {/* Évika Units */}
                  <div className="space-y-3 ml-4 border-l-2 border-primary/30 pl-4">
                    <FormField
                      control={form.control}
                      name="evika1"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none flex-1">
                            <FormLabel className="font-medium">Évika 1</FormLabel>
                            <p className="text-sm text-muted-foreground">
                              {language === 'en' 
                                ? 'Double bed apartment, 2 persons' 
                                : 'Lägenhet med dubbelsäng, 2 personer'}
                            </p>
                            <p className="text-primary font-bold">1 500 SEK</p>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="evika2"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none flex-1">
                            <FormLabel className="font-medium">Évika 2</FormLabel>
                            <p className="text-sm text-muted-foreground">
                              {language === 'en' 
                                ? 'Cottage with one double bed, one double sofa-bed, 4 persons' 
                                : 'Stuga med en dubbelsäng, en dubbel bäddsoffa, 4 personer'}
                            </p>
                            <p className="text-primary font-bold">3 000 SEK</p>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="evika3"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none flex-1">
                            <FormLabel className="font-medium">Évika 3</FormLabel>
                            <p className="text-sm text-muted-foreground">
                              {language === 'en' 
                                ? 'Cottage with one double bed, one sofa-bed, 3 persons' 
                                : 'Stuga med en dubbelsäng, en bäddsoffa, 3 personer'}
                            </p>
                            <p className="text-primary font-bold">2 250 SEK</p>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="evika4"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none flex-1">
                            <FormLabel className="font-medium">Évika 4</FormLabel>
                            <p className="text-sm text-muted-foreground">
                              {language === 'en' 
                                ? 'Cottage with one double bed, one double sofa-bed, 4 persons' 
                                : 'Stuga med en dubbelsäng, en dubbel bäddsoffa, 4 personer'}
                            </p>
                            <p className="text-primary font-bold">3 000 SEK</p>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="evika5"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none flex-1">
                            <FormLabel className="font-medium">Évika 5</FormLabel>
                            <p className="text-sm text-muted-foreground">
                              {language === 'en' 
                                ? 'Luxury caravan with one double bed, one double sofa-bed, 4 persons' 
                                : 'Lyxhusvagn med en dubbelsäng, en dubbel bäddsoffa, 4 personer'}
                            </p>
                            <p className="text-primary font-bold">3 000 SEK</p>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <p className="text-sm text-muted-foreground italic mt-2">
                    {language === 'en'
                      ? 'Additional rooms can be secured in the vicinity.'
                      : 'Ytterligare rum kan ordnas i närheten.'}
                  </p>
                </div>
              )}
            </div>

            {/* Other Optionals */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-bold text-primary mb-6 uppercase">
                {language === 'en' ? 'Other Optionals' : 'Övriga tillval'}
              </h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="toys"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none flex-1">
                        <FormLabel>
                          {language === 'en' ? 'Unlimited Toy Package' : 'Obegränsat lekpaket'}
                        </FormLabel>
                        <p className="text-primary font-bold">3000 SEK</p>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cleaning"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none flex-1">
                        <FormLabel>
                          {language === 'en' ? 'Cleaning Service' : 'Städservice'}
                        </FormLabel>
                        <p className="text-primary font-bold">3500 SEK</p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Message */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-bold text-primary mb-6 uppercase">
                {language === 'en' ? 'Additional Message' : 'Ytterligare meddelande'}
              </h3>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder={language === 'en' 
                          ? "Any special requests or questions..." 
                          : "Eventuella önskemål eller frågor..."}
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

           <Button
  type="submit"
  size="lg"
  className="w-full"
>
  {language === 'en' ? 'Open email to send request' : 'Öppna e-post för att skicka förfrågan'}
</Button>
          </form>
        </Form>
      </div>

      {/* Price Summary Sidebar */}
      <div className="lg:col-span-2">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle className="text-primary uppercase">
              {language === 'en' ? 'Price Summary' : 'Prisöversikt'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Location charge' : 'Lokalhyra'}</span>
                <span className="font-medium">8 000 SEK</span>
              </div>
              {parseInt(watchedValues.adults || '0') > 0 && (
                <div className="flex justify-between">
                  <span>{watchedValues.adults} {language === 'en' ? 'adults' : 'vuxna'} × 200 SEK</span>
                  <span className="font-medium">{parseInt(watchedValues.adults || '0') * 200} SEK</span>
                </div>
              )}
              {parseInt(watchedValues.children || '0') > 0 && (
                <div className="flex justify-between">
                  <span>{watchedValues.children} {language === 'en' ? 'children' : 'barn'} × 100 SEK</span>
                  <span className="font-medium">{parseInt(watchedValues.children || '0') * 100} SEK</span>
                </div>
              )}
              
              {watchedValues.foodOption === 'ownCooking' && (
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Kitchen use' : 'Köksanvändning'}</span>
                  <span className="font-medium">2 500 SEK</span>
                </div>
              )}
              {watchedValues.foodOption === 'catering' && parseInt(watchedValues.cateringBudget || '0') > 0 && (
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Catering' : 'Catering'} ({parseInt(watchedValues.adults || '0') + parseInt(watchedValues.children || '0')} × {watchedValues.cateringBudget} SEK)</span>
                  <span className="font-medium">{(parseInt(watchedValues.adults || '0') + parseInt(watchedValues.children || '0')) * parseInt(watchedValues.cateringBudget || '0')} SEK</span>
                </div>
              )}
              {watchedValues.tableDressing && (
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Table dressing' : 'Dukning'}</span>
                  <span className="font-medium">{(parseInt(watchedValues.adults || '0') + parseInt(watchedValues.children || '0')) * 75} SEK</span>
                </div>
              )}
              {watchedValues.grill && (
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'BBQ grill' : 'BBQ grill'}</span>
                  <span className="font-medium">350 SEK</span>
                </div>
              )}
              
              {/* Évika accommodations */}
              {watchedValues.overnight && watchedValues.evika1 && (
                <div className="flex justify-between">
                  <span>Évika 1 (2 pers)</span>
                  <span className="font-medium">1 500 SEK</span>
                </div>
              )}
              {watchedValues.overnight && watchedValues.evika2 && (
                <div className="flex justify-between">
                  <span>Évika 2 (4 pers)</span>
                  <span className="font-medium">3 000 SEK</span>
                </div>
              )}
              {watchedValues.overnight && watchedValues.evika3 && (
                <div className="flex justify-between">
                  <span>Évika 3 (3 pers)</span>
                  <span className="font-medium">2 250 SEK</span>
                </div>
              )}
              {watchedValues.overnight && watchedValues.evika4 && (
                <div className="flex justify-between">
                  <span>Évika 4 (4 pers)</span>
                  <span className="font-medium">3 000 SEK</span>
                </div>
              )}
              {watchedValues.overnight && watchedValues.evika5 && (
                <div className="flex justify-between">
                  <span>Évika 5 (4 pers)</span>
                  <span className="font-medium">3 000 SEK</span>
                </div>
              )}
              
              {watchedValues.toys && (
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Toy package' : 'Lekpaket'}</span>
                  <span className="font-medium">3 000 SEK</span>
                </div>
              )}
              {watchedValues.cleaning && (
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Cleaning' : 'Städning'}</span>
                  <span className="font-medium">3 500 SEK</span>
                </div>
              )}
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-baseline">
                <span className="text-base font-bold">{language === 'en' ? 'Estimated Total' : 'Uppskattat totalt'}</span>
                <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString()} SEK</span>
              </div>
              {watchedValues.foodOption === 'catering' && !watchedValues.cateringBudget && (
                <p className="text-xs text-muted-foreground mt-2">
                  {language === 'en' 
                    ? '* Enter catering budget to see full estimate' 
                    : '* Ange cateringbudget för att se fullständig uppskattning'}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

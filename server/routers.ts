import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  date: z.string().min(1),
  alternativeDates: z.string(),
  adults: z.string().min(1),
  children: z.string(),
  message: z.string(),
  
  // Food options
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
  evika1: z.boolean(),
  evika2: z.boolean(),
  evika3: z.boolean(),
  evika4: z.boolean(),
  evika5: z.boolean(),
  
  // Other optionals
  toys: z.boolean(),
  cleaning: z.boolean(),
  
  totalEstimate: z.number(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  booking: router({
    submit: publicProcedure
      .input(bookingSchema)
      .mutation(async ({ input }) => {
        // Build equipment list
        const equipmentList: string[] = [];
        if (input.smartTV) equipmentList.push("Smart TV");
        if (input.projector) equipmentList.push("Projector on 4m wall");
        if (input.soundSystem) equipmentList.push("B&O Sound System");
        
        // Build food details
        let foodDetails = "";
        if (input.foodOption === 'ownCooking') {
          foodDetails = "Own cooking/caterer (Kitchen use: 2500 SEK)";
        } else if (input.foodOption === 'catering') {
          foodDetails = `Catering requested\n  Menu style: ${input.cateringMenuStyle || 'Not specified'}\n  Budget per person: ${input.cateringBudget || 'Not specified'} SEK`;
        }
        
        // Build accommodation list
        const accommodationList: string[] = [];
        if (input.overnight) {
          if (input.evika1) accommodationList.push("Évika 1 - Apartment (2 pers) - 1500 SEK");
          if (input.evika2) accommodationList.push("Évika 2 - Cottage (4 pers) - 3000 SEK");
          if (input.evika3) accommodationList.push("Évika 3 - Cottage (3 pers) - 2250 SEK");
          if (input.evika4) accommodationList.push("Évika 4 - Cottage (4 pers) - 3000 SEK");
          if (input.evika5) accommodationList.push("Évika 5 - Luxury Caravan (4 pers) - 3000 SEK");
        }
        
        // Build optionals list
        const optionalsList: string[] = [];
        if (input.tableDressing) optionalsList.push(`Table dressing (75 SEK × ${parseInt(input.adults || '0') + parseInt(input.children || '0')} guests)`);
        if (input.grill) optionalsList.push("BBQ gas grill (350 SEK)");
        if (input.toys) optionalsList.push("Unlimited Toy Package (3000 SEK)");
        if (input.cleaning) optionalsList.push("Cleaning Service (3500 SEK)");

        const content = `
NEW BOOKING REQUEST
====================

CONTACT DETAILS
---------------
Name: ${input.name}
Email: ${input.email}
Phone: ${input.phone}

EVENT DETAILS
-------------
Date: ${input.date}
Alternative Dates: ${input.alternativeDates || 'None provided'}
Adults: ${input.adults}
Children (>12y): ${input.children || '0'}

FOOD & DRINKS
-------------
${foodDetails}

EQUIPMENT REQUESTED (no cost)
-----------------------------
${equipmentList.length > 0 ? equipmentList.join(', ') : 'None requested'}

ACCOMMODATION (Évika Cottage Hotel)
------------------------------------
${accommodationList.length > 0 ? accommodationList.join('\n') : 'Not requested'}

OTHER OPTIONALS
---------------
${optionalsList.length > 0 ? optionalsList.join('\n') : 'None selected'}

ESTIMATED TOTAL: ${input.totalEstimate.toLocaleString()} SEK
${input.foodOption === 'catering' && !input.cateringBudget ? '(Catering cost not included - awaiting budget)' : ''}

ADDITIONAL MESSAGE
------------------
${input.message || 'No additional message'}

---
This booking request was submitted via the Eventika website.
Reply directly to ${input.email} to respond to this inquiry.
        `.trim();

        const success = await notifyOwner({
          title: `New Booking Request from ${input.name}`,
          content,
        });

        if (!success) {
          console.error("Failed to send booking notification");
        }

        return { success: true };
      }),
  }),

  analytics: router({
    getStats: publicProcedure
      .input(z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      }))
      .query(async ({ input, ctx }) => {
        // Only allow owner to access analytics
        if (!ctx.user || ctx.user.openId !== process.env.OWNER_OPEN_ID) {
          throw new Error('Unauthorized: Only the owner can access analytics');
        }

        const websiteId = process.env.VITE_ANALYTICS_WEBSITE_ID;
        const endpoint = process.env.VITE_ANALYTICS_ENDPOINT;
        
        if (!websiteId || !endpoint) {
          return {
            totalPageViews: 0,
            uniqueVisitors: 0,
            popularPages: [],
            referrers: [],
            dailyStats: [],
          };
        }

        try {
          // Fetch analytics data from Manus analytics endpoint
          const response = await fetch(`${endpoint}/api/websites/${websiteId}/stats`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            console.error('Failed to fetch analytics:', response.statusText);
            return {
              totalPageViews: 0,
              uniqueVisitors: 0,
              popularPages: [],
              referrers: [],
              dailyStats: [],
            };
          }

          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching analytics:', error);
          return {
            totalPageViews: 0,
            uniqueVisitors: 0,
            popularPages: [],
            referrers: [],
            dailyStats: [],
          };
        }
      }),
   }),
  debug: router({
    checkOwner: publicProcedure.query((opts) => {
      const { user } = opts.ctx;
      return {
        isLoggedIn: !!user,
        userName: user?.name,
        userOpenId: user?.openId,
        ownerOpenId: process.env.OWNER_OPEN_ID,
        isMatch: user?.openId === process.env.OWNER_OPEN_ID,
      };
    }),
  }),
  calendar: router({
    // Get all booked dates (public endpoint)
    getBookedDates: publicProcedure.query(async (opts) => {
      const { getDb, bookedDates } = await import("./db");
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const dates = await db.select().from(bookedDates);
      return dates.map((d: any) => d.date);
    }),
    // Add a booked date (owner only)
    addBookedDate: publicProcedure
      .input(z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        note: z.string().optional(),
      }))
      .mutation(async (opts) => {
        const { user } = opts.ctx;
        if (!user || user.openId !== process.env.OWNER_OPEN_ID) {
          throw new Error("Unauthorized");
        }
        const { getDb, bookedDates } = await import("./db");
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const insertData: any = {
          date: opts.input.date,
          note: opts.input.note || null,
        };
        if (user.id) {
          insertData.createdBy = user.id;
        }
        await db.insert(bookedDates).values(insertData);
        return { success: true };
      }),
    // Update a booked date's note (owner only)
    updateBookedDate: publicProcedure
      .input(z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        note: z.string().max(12).optional(),
      }))
      .mutation(async (opts) => {
        const { user } = opts.ctx;
        if (!user || user.openId !== process.env.OWNER_OPEN_ID) {
          throw new Error("Unauthorized");
        }
        const { getDb, bookedDates } = await import("./db");
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const { eq } = await import("drizzle-orm");
        await db.update(bookedDates)
          .set({ note: opts.input.note })
          .where(eq(bookedDates.date, opts.input.date));
        return { success: true };
      }),
    // Remove a booked date (owner only)
    removeBookedDate: publicProcedure
      .input(z.object({ date: z.string() }))
      .mutation(async (opts) => {
        const { user } = opts.ctx;
        if (!user || user.openId !== process.env.OWNER_OPEN_ID) {
          throw new Error("Unauthorized");
        }
        const { getDb, bookedDates } = await import("./db");
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const { eq } = await import("drizzle-orm");
        await db.delete(bookedDates).where(eq(bookedDates.date, opts.input.date));
        return { success: true };
      }),
    // Get all booked dates with details (owner only)
    getBookedDatesAdmin: publicProcedure.query(async (opts) => {
      const { user } = opts.ctx;
      if (!user || user.openId !== process.env.OWNER_OPEN_ID) {
        throw new Error("Unauthorized");
      }
      const { getDb, bookedDates } = await import("./db");
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      return await db.select().from(bookedDates);
    }),
  }),
});
export type AppRouter = typeof appRouter;

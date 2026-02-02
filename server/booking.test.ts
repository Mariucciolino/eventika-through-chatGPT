import { describe, it, expect, vi } from 'vitest';

// Mock the notification module
vi.mock('./_core/notification', () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import { appRouter } from './routers';
import { notifyOwner } from './_core/notification';

describe('Booking Router', () => {
  const mockCtx = {
    req: {} as any,
    res: {
      clearCookie: vi.fn(),
    } as any,
    user: null,
  };

  const caller = appRouter.createCaller(mockCtx);

  it('should submit a booking request successfully', async () => {
    const bookingData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+46 70 123 45 67',
      date: '2025-01-15',
      adults: '10',
      children: '5',
      message: 'Test booking message',
      catering: true,
      kitchen: true,
      grill: false,
      tableDressing: true,
      overnight: false,
      toys: true,
      cleaning: true,
      totalEstimate: 25000,
    };

    const result = await caller.booking.submit(bookingData);

    expect(result).toEqual({ success: true });
    expect(notifyOwner).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining('Test User'),
        content: expect.stringContaining('test@example.com'),
      })
    );
  });

  it('should reject invalid email', async () => {
    const invalidBooking = {
      name: 'Test User',
      email: 'invalid-email',
      phone: '+46 70 123 45 67',
      date: '2025-01-15',
      adults: '10',
      children: '5',
      message: '',
      catering: false,
      kitchen: false,
      grill: false,
      tableDressing: false,
      overnight: false,
      toys: false,
      cleaning: false,
      totalEstimate: 8000,
    };

    await expect(caller.booking.submit(invalidBooking)).rejects.toThrow();
  });

  it('should reject missing required fields', async () => {
    const incompleteBooking = {
      name: '',
      email: 'test@example.com',
      phone: '+46 70 123 45 67',
      date: '2025-01-15',
      adults: '10',
      children: '5',
      message: '',
      catering: false,
      kitchen: false,
      grill: false,
      tableDressing: false,
      overnight: false,
      toys: false,
      cleaning: false,
      totalEstimate: 8000,
    };

    await expect(caller.booking.submit(incompleteBooking)).rejects.toThrow();
  });
});

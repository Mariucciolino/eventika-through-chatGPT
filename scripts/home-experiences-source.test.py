"""Non-browser source contracts; these do not prove rendered layout."""
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


class HomeLayoutTests(unittest.TestCase):
    def test_all_actions_share_lower_rock_region(self):
        home = (ROOT / 'client/src/pages/Home.tsx').read_text(encoding='utf-8')
        self.assertIn('object-bottom', home)
        self.assertIn('min-h-[max(720px,80svh,56vw)]', home)
        self.assertIn('sm:min-h-[max(560px,80svh,56vw)]', home)
        actions = home.split('data-home-actions', 1)
        self.assertEqual(len(actions), 2, 'All three links need one bottom action group')
        for href in ['/booking', '/location#virtual-tour', '/jetboard']:
            self.assertIn(f'href="{href}"', actions[1])
            self.assertNotIn(f'href="{href}"', actions[0])
        self.assertIn('mt-auto', home)
        self.assertIn('grid-cols-2 sm:grid-cols-3', actions[1])
        self.assertNotIn('lg:absolute', home)


class ExperiencesContactTests(unittest.TestCase):
    def test_same_bilingual_linked_instructions_replace_booking_cta(self):
        page = (ROOT / 'client/src/pages/Experiences.tsx').read_text(encoding='utf-8')
        self.assertNotIn('href="/booking"', page)
        self.assertEqual(page.count('{bookingInstructions}'), 2)
        self.assertIn('href="mailto:mario@eventika.se"', page)
        self.assertIn('href="tel:+46760345328"', page)
        self.assertIn('0760 345 328</a>', page)
        self.assertIn('To book individual experiences, simply email (', page)
        self.assertIn(') or call Mario (', page)
        self.assertIn(') with desired experience, number of participants and date. Payment will take place on the day either with debit card, swish or cash.', page)
        self.assertIn('För att boka enskilda upplevelser, mejla (', page)
        self.assertIn(') eller ring Mario (', page)
        self.assertIn('Betalning sker på plats samma dag med betalkort, Swish eller kontanter.', page)


if __name__ == '__main__':
    unittest.main()

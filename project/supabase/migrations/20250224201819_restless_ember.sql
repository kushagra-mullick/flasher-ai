/*
  # Add newsletter subscribers table

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `subscribed_at` (timestamp)
      - `unsubscribed_at` (timestamp, nullable)
      - `status` (text, default: 'active')

  2. Security
    - Enable RLS on `newsletter_subscribers` table
    - Add policy for admins to manage subscribers
    - Add policy for public to subscribe
*/

CREATE TABLE newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz,
  status text DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow admins to manage all subscribers
CREATE POLICY "Admins can manage all subscribers"
  ON newsletter_subscribers
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Allow public to subscribe
CREATE POLICY "Anyone can subscribe"
  ON newsletter_subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create function to handle unsubscribe
CREATE OR REPLACE FUNCTION unsubscribe_email(subscriber_email text)
RETURNS void AS $$
BEGIN
  UPDATE newsletter_subscribers
  SET status = 'unsubscribed',
      unsubscribed_at = now()
  WHERE email = subscriber_email
  AND status = 'active';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
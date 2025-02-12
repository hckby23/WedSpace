-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Venues table
create table venues (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price_range text,
  capacity integer,
  location text,
  image_url text,
  amenities text[],
  rating numeric,
  contact_phone text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Vendors table
create table vendors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text,
  description text,
  price_range text,
  rating numeric,
  location text,
  image_url text,
  contact_phone text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Cart items table
create table cart_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users,
  item_id uuid,
  item_type text,
  quantity integer,
  price numeric,
  name text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Add RLS (Row Level Security) policies
alter table venues enable row level security;
alter table vendors enable row level security;
alter table cart_items enable row level security;

-- Venues policy (anyone can read)
create policy "Venues are viewable by everyone"
on venues for select
to anon
using (true);

-- Vendors policy (anyone can read)
create policy "Vendors are viewable by everyone"
on vendors for select
to anon
using (true);

-- Cart items policies (only authenticated users can manage their own cart)
create policy "Users can view their own cart items"
on cart_items for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own cart items"
on cart_items for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own cart items"
on cart_items for update
to authenticated
using (auth.uid() = user_id);

create policy "Users can delete their own cart items"
on cart_items for delete
to authenticated
using (auth.uid() = user_id);

-- Insert sample venues data
insert into venues (name, description, price_range, capacity, location, image_url, amenities, rating, contact_phone) values
-- Indirapuram Venues
('The Grand Celebration', 'Luxurious banquet hall with modern amenities and elegant decor', '₹1,50,000-3,00,000', 500, 'Ahinsa Khand 2, Indirapuram', 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3', ARRAY['Valet Parking', 'Air Conditioning', 'In-house Catering', 'DJ'], 4.8, '+91-9876543210'),

('Royal Wedding Palace', 'Magnificent venue with traditional and contemporary fusion design', '₹2,00,000-4,00,000', 700, 'Vaibhav Khand, Indirapuram', 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3', ARRAY['Lawn', 'Banquet Hall', 'Rooftop', 'Decoration'], 4.7, '+91-9876543211'),

('Emerald Gardens', 'Beautiful outdoor venue with lush green surroundings', '₹1,00,000-2,50,000', 400, 'Niti Khand, Indirapuram', 'https://images.unsplash.com/photo-1601907560526-c1dc9c7eac51', ARRAY['Garden', 'Stage', 'Power Backup', 'Parking'], 4.6, '+91-9876543212'),

('The Roseate Banquet', 'Elegant indoor venue with crystal chandeliers', '₹1,75,000-3,50,000', 550, 'Gyan Khand 1, Indirapuram', 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611', ARRAY['Premium Decor', 'Catering', 'Valet', 'Wi-Fi'], 4.9, '+91-9876543213'),

('Celebrations Convention', 'Modern convention center with state-of-the-art facilities', '₹2,50,000-5,00,000', 1000, 'Shakti Khand 2, Indirapuram', 'https://images.unsplash.com/photo-1505236858219-8359eb29e329', ARRAY['Multiple Halls', 'Parking', 'Security', 'Catering'], 4.8, '+91-9876543214'),

('Marigold Meadows', 'Picturesque outdoor venue with manicured gardens', '₹1,25,000-2,75,000', 350, 'Ahinsa Khand 1, Indirapuram', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed', ARRAY['Garden', 'Gazebo', 'Lighting', 'Parking'], 4.5, '+91-9876543215'),

('The Velvet Room', 'Boutique venue with sophisticated interiors', '₹1,00,000-2,00,000', 200, 'Niti Khand 2, Indirapuram', 'https://images.unsplash.com/photo-1507504031003-b417219a0fde', ARRAY['AC', 'Bar', 'Dance Floor', 'Sound System'], 4.6, '+91-9876543216'),

('Platinum Plaza', 'Premium venue with multiple event spaces', '₹2,00,000-4,50,000', 800, 'Vaibhav Khand, Indirapuram', 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3', ARRAY['Multiple Venues', 'Parking', 'Catering', 'Decoration'], 4.7, '+91-9876543217'),

('Heritage Manor', 'Classic venue with traditional architecture', '₹1,50,000-3,25,000', 450, 'Gyan Khand 2, Indirapuram', 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3', ARRAY['Heritage Design', 'Garden', 'Catering', 'Valet'], 4.8, '+91-9876543218'),

('The Crystal Palace', 'Modern glass-facade venue with stunning views', '₹2,25,000-4,75,000', 600, 'Shakti Khand 3, Indirapuram', 'https://images.unsplash.com/photo-1601907560526-c1dc9c7eac51', ARRAY['Glass Architecture', 'View', 'AC', 'Premium Sound'], 4.9, '+91-9876543219'),

-- Nearby Areas (Vasundhara, Vaishali, Noida)
('Vasundhara Grand', 'Spacious venue with modern amenities', '₹1,75,000-3,75,000', 550, 'Sector 1, Vasundhara', 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611', ARRAY['Banquet', 'Lawn', 'Parking', 'Catering'], 4.7, '+91-9876543220'),

('Vaishali Greens', 'Eco-friendly venue with natural surroundings', '₹1,25,000-2,50,000', 300, 'Sector 4, Vaishali', 'https://images.unsplash.com/photo-1505236858219-8359eb29e329', ARRAY['Green Space', 'Sustainable', 'Outdoor', 'Parking'], 4.6, '+91-9876543221'),

('Noida Convention Center', 'Large-scale venue for grand celebrations', '₹3,00,000-6,00,000', 1200, 'Sector 62, Noida', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed', ARRAY['Convention Hall', 'Exhibition Space', 'Parking', 'Security'], 4.8, '+91-9876543222'),

('The Wedding Villa', 'Intimate villa venue with personal touch', '₹1,00,000-2,25,000', 250, 'Sector 3, Vasundhara', 'https://images.unsplash.com/photo-1507504031003-b417219a0fde', ARRAY['Villa', 'Garden', 'Pool', 'Catering'], 4.5, '+91-9876543223'),

('Royal Orchid', 'Premium venue with exotic decor', '₹2,50,000-5,50,000', 750, 'Sector 5, Vaishali', 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3', ARRAY['Premium Decor', 'Multiple Halls', 'Valet', 'Bar'], 4.9, '+91-9876543224'),

-- More Indirapuram Venues
('Sunshine Celebration Hub', 'Modern venue with rooftop garden', '₹1,50,000-3,00,000', 400, 'Ahinsa Khand 2, Indirapuram', 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3', ARRAY['Rooftop', 'Garden', 'Bar', 'Catering'], 4.7, '+91-9876543225'),

('The Grand Pavilion', 'Elegant venue with colonial architecture', '₹2,00,000-4,25,000', 600, 'Niti Khand 3, Indirapuram', 'https://images.unsplash.com/photo-1601907560526-c1dc9c7eac51', ARRAY['Colonial Style', 'Lawn', 'Parking', 'Security'], 4.8, '+91-9876543226'),

('Starlight Banquets', 'Contemporary venue with modern lighting', '₹1,75,000-3,50,000', 500, 'Shakti Khand 4, Indirapuram', 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611', ARRAY['Modern Lighting', 'Sound System', 'Dance Floor', 'Bar'], 4.6, '+91-9876543227'),

('The Empress', 'Luxury venue with royal ambiance', '₹2,75,000-5,75,000', 850, 'Gyan Khand 3, Indirapuram', 'https://images.unsplash.com/photo-1505236858219-8359eb29e329', ARRAY['Royal Decor', 'Multiple Halls', 'Valet', 'Premium Catering'], 4.9, '+91-9876543228'),

('Green Valley Resort', 'Resort venue with multiple facilities', '₹2,25,000-4,50,000', 700, 'Ahinsa Khand 1, Indirapuram', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed', ARRAY['Resort', 'Pool', 'Rooms', 'Restaurant'], 4.7, '+91-9876543229'),

-- Additional Nearby Venues
('Bliss Celebration Point', 'Modern venue with city views', '₹1,50,000-3,25,000', 450, 'Sector 2, Vaishali', 'https://images.unsplash.com/photo-1507504031003-b417219a0fde', ARRAY['City View', 'Modern Design', 'Parking', 'Catering'], 4.6, '+91-9876543230'),

('The Grandeur', 'Opulent venue with classic design', '₹2,50,000-5,00,000', 800, 'Sector 6, Vasundhara', 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3', ARRAY['Classic Design', 'Multiple Halls', 'Valet', 'Premium Services'], 4.8, '+91-9876543231'),

('Paradise Gardens', 'Lush green venue with outdoor spaces', '₹1,25,000-2,75,000', 350, 'Sector 63, Noida', 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3', ARRAY['Gardens', 'Outdoor Space', 'Parking', 'Catering'], 4.5, '+91-9876543232'),

('The White House', 'Contemporary white-themed venue', '₹2,00,000-4,00,000', 600, 'Sector 1, Vaishali', 'https://images.unsplash.com/photo-1601907560526-c1dc9c7eac51', ARRAY['White Theme', 'Modern Design', 'AC', 'Sound System'], 4.7, '+91-9876543233'),

('Royal Crown', 'Premium venue with royal decor', '₹2,75,000-5,50,000', 750, 'Sector 4, Vasundhara', 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611', ARRAY['Royal Theme', 'Multiple Halls', 'Valet', 'Premium Catering'], 4.8, '+91-9876543234'),

-- Final Set of Indirapuram Venues
('Celebration Square', 'Modern multipurpose venue', '₹1,75,000-3,75,000', 550, 'Niti Khand 1, Indirapuram', 'https://images.unsplash.com/photo-1505236858219-8359eb29e329', ARRAY['Multipurpose Hall', 'Modern Amenities', 'Parking', 'Catering'], 4.6, '+91-9876543235'),

('The Imperial', 'Luxury venue with imperial design', '₹2,50,000-5,25,000', 900, 'Shakti Khand 2, Indirapuram', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed', ARRAY['Imperial Design', 'Multiple Halls', 'Valet', 'Premium Services'], 4.9, '+91-9876543236'),

('Garden Grove', 'Natural setting with modern facilities', '₹1,50,000-3,00,000', 400, 'Ahinsa Khand 3, Indirapuram', 'https://images.unsplash.com/photo-1507504031003-b417219a0fde', ARRAY['Garden', 'Modern Facilities', 'Parking', 'Catering'], 4.7, '+91-9876543237'),

('The Regal', 'Classic venue with modern touches', '₹2,25,000-4,75,000', 650, 'Gyan Khand 2, Indirapuram', 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3', ARRAY['Classic Design', 'Modern Amenities', 'Valet', 'Bar'], 4.8, '+91-9876543238'),

('Emerald Bay', 'Waterfront venue with scenic views', '₹2,00,000-4,25,000', 500, 'Niti Khand 2, Indirapuram', 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3', ARRAY['Waterfront', 'Scenic Views', 'Outdoor Space', 'Catering'], 4.7, '+91-9876543239');

-- Insert sample vendors data
insert into vendors (name, category, description, price_range, rating, location, image_url, contact_phone) values
('Perfect Shots', 'photographer', 'Professional wedding photography with creative style', '₹50,000-1,50,000', 4.8, 'Indirapuram', 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914', '+91-9876543240'),
('Delicious Catering', 'caterer', 'Gourmet wedding catering with diverse menu options', '₹1,000-2,500 per plate', 4.9, 'Vaishali', 'https://images.unsplash.com/photo-1555244162-803834f70033', '+91-9876543241'),
('Floral Dreams', 'decorator', 'Stunning wedding decorations and themes', '₹1,00,000-3,00,000', 4.7, 'Indirapuram', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622', '+91-9876543242'),
('Melodious Events', 'music', 'Professional DJ and live music services', '₹50,000-1,50,000', 4.8, 'Noida', 'https://images.unsplash.com/photo-1501612780327-45045538702b', '+91-9876543243'),
('Makeup by Priya', 'makeup', 'Professional bridal makeup and hair styling', '₹25,000-75,000', 4.9, 'Indirapuram', 'https://images.unsplash.com/photo-1560800000-e6dbd5b4982c', '+91-9876543244'),
('Divine Weddings', 'planner', 'Complete wedding planning and coordination', '₹2,00,000-5,00,000', 4.8, 'Vaishali', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622', '+91-9876543245');

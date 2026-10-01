const seedGear = [
  {
    id: "gear-1",
    title: "Sony Alpha A7 IV Full-Frame Camera Kit",
    category: "cameras",
    brand: "Sony",
    dailyRate: 45,
    securityDeposit: 250,
    replacementValue: 2498,
    location: "Bengaluru, Indiranagar",
    city: "Bengaluru",
    rating: 4.95,
    reviewCount: 38,
    available: true,
    condition: "Like New",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The ultimate hybrid camera for cinematic video (4K 60p 10-bit 4:2:2) and 33MP high-res photography. Comes fully kitted with 2 original batteries, dual fast chargers, and a Pelican-style rugged case.",
    specs: [
      "33MP Full-Frame Exmor R CMOS Sensor",
      "4K 60p 10-Bit 4:2:2 Video in S-Cinetone",
      "Real-time Eye AF (Human, Animal, Bird)",
      "759-Point Phase Detection AF",
      "Active Mode 5-Axis In-Body Stabilization"
    ],
    includedInBox: [
      "Sony A7 IV Body",
      "2x NP-FZ100 Batteries",
      "128GB Sony Tough V90 SDXC Card (300MB/s)",
      "Dual USB-C Rapid Charger",
      "Peak Design Camera Strap",
      "Protective Hard Shell Carry Case"
    ],
    owner: {
      id: "user-lender-1",
      name: "Arunachalam V.",
      rating: 4.98,
      completedRentals: 42,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      responseRate: "100%",
      responseTime: "< 15 mins",
      verified: true
    },
    reviews: [
      {
        id: "rev-1",
        userName: "Vikram K.",
        rating: 5,
        date: "2026-09-15",
        comment: "Flawless condition! Sensor was spotless, batteries were at 100%. Handover was seamless in Indiranagar. Shot a wedding film with this beast."
      },
      {
        id: "rev-2",
        userName: "Sneha Rao",
        rating: 5,
        date: "2026-09-02",
        comment: "Arunachalam even included a micro-HDMI adapter. Very professional lender."
      }
    ]
  },
  {
    id: "gear-2",
    title: "DJI Mavic 3 Pro Cine Drone Kit (Triple Camera)",
    category: "drones",
    brand: "DJI",
    dailyRate: 75,
    securityDeposit: 400,
    replacementValue: 3899,
    location: "Chennai, Adyar",
    city: "Chennai",
    rating: 4.98,
    reviewCount: 29,
    available: true,
    condition: "Mint",
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Industry standard cinema aerial platform featuring Hasselblad 4/3 CMOS main sensor, 70mm medium tele, and 166mm telephoto camera. Apple ProRes 422 HQ recording supported directly to internal 1TB SSD.",
    specs: [
      "Triple-Camera System (24mm Hasselblad, 70mm, 166mm)",
      "Apple ProRes 422 HQ / D-Log M 10-bit",
      "43-minute Max Flight Time per battery",
      "Omnidirectional Obstacle Sensing with APAS 5.0",
      "15km O3+ HD Video Transmission"
    ],
    includedInBox: [
      "DJI Mavic 3 Pro Aircraft (1TB SSD)",
      "DJI RC Pro Ultra-Bright Controller",
      "3x Intelligent Flight Batteries",
      "Battery Charging Hub + 100W GaN Adapter",
      "Full ND Filter Set (ND8/16/32/64)",
      "Safety Propeller Guards & Hard Case"
    ],
    owner: {
      id: "user-lender-2",
      name: "Divya Krishnan",
      rating: 5.0,
      completedRentals: 31,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      responseRate: "98%",
      responseTime: "< 30 mins",
      verified: true
    },
    reviews: [
      {
        id: "rev-3",
        userName: "Karthik Raja",
        rating: 5,
        date: "2026-09-20",
        comment: "The 3x and 7x zoom cameras opened up shots that ordinary drones simply cannot get. RC Pro screen was easily visible in direct sunlight."
      }
    ]
  },
  {
    id: "gear-3",
    title: "Sony FE 24-70mm f/2.8 GM II Lens",
    category: "lenses",
    brand: "Sony G-Master",
    dailyRate: 30,
    securityDeposit: 180,
    replacementValue: 2298,
    location: "Puducherry, White Town",
    city: "Puducherry",
    rating: 4.92,
    reviewCount: 22,
    available: true,
    condition: "Like New",
    imageUrl: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The lightest and sharpest 24-70mm standard zoom ever created. Incredible corner-to-corner clarity, buttery smooth f/2.8 bokeh, and lightning-fast XD Linear motor autofocus.",
    specs: [
      "Constant f/2.8 Maximum Aperture",
      "Four XD Linear Autofocus Motors",
      "Aperture Ring with Click / De-click Switch",
      "Nano AR Coating II minimizes flare & ghosting",
      "Dust and Moisture-Resistant Construction"
    ],
    includedInBox: [
      "Sony 24-70mm GM II Lens",
      "B+W 82mm MRC Nano UV Filter (installed)",
      "ALC-SH168 Lens Hood",
      "Front and Rear Lens Caps",
      "Padded Soft Carrying Pouch"
    ],
    owner: {
      id: "user-lender-3",
      name: "Dhayanandham A.",
      rating: 5.0,
      completedRentals: 19,
      avatar: "/dhayanandham.jpg",
      responseRate: "100%",
      responseTime: "< 10 mins",
      verified: true
    },
    reviews: [
      {
        id: "rev-4",
        userName: "Manish Sharma",
        rating: 5,
        date: "2026-09-18",
        comment: "Rented this in Pondicherry for a commercial beach shoot. Crystal clear optics! Dhayanandham was super helpful and punctual."
      }
    ]
  },
  {
    id: "gear-4",
    title: "RØDE Wireless PRO Dual Wireless Mic System (32-Bit Float)",
    category: "audio",
    brand: "RØDE",
    dailyRate: 20,
    securityDeposit: 100,
    replacementValue: 399,
    location: "Bengaluru, Koramangala",
    city: "Bengaluru",
    rating: 4.97,
    reviewCount: 45,
    available: true,
    condition: "Mint",
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Never worry about audio clipping again! Features onboard 32-bit float audio recording with 32GB internal memory per transmitter. Includes broadcast-grade Lavalier II mics and timecode synchronization.",
    specs: [
      "Dual-channel Wireless Microphone System",
      "32-Bit Float On-Board Recording (never clips)",
      "32GB Internal Storage per Transmitter (>40 hours)",
      "Timecode Generation for Multi-Camera Sync",
      "260m Transmission Range with Series IV 2.4GHz"
    ],
    includedInBox: [
      "2x TX Transmitters + 1x RX Receiver",
      "Smart Charging Case with Battery Meter",
      "2x RØDE Lavalier II Premium Microphones",
      "3.5mm TRS to TRS Coiled Cable + USB-C Cable",
      "Lightning to USB-C Mobile Adapter",
      "Fur Windshields & MagClip GO Magnets"
    ],
    owner: {
      id: "user-lender-1",
      name: "Arunachalam V.",
      rating: 4.98,
      completedRentals: 42,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      responseRate: "100%",
      responseTime: "< 15 mins",
      verified: true
    },
    reviews: [
      {
        id: "rev-5",
        userName: "Ananya Sen",
        rating: 5,
        date: "2026-09-12",
        comment: "Saved our outdoor podcast interview when wind picked up! 32-bit float rescued all sudden loud laughter spikes."
      }
    ]
  },
  {
    id: "gear-5",
    title: "Aputure Light Storm 300d Mark II Cinematic LED Light",
    category: "lighting",
    brand: "Aputure",
    dailyRate: 35,
    securityDeposit: 150,
    replacementValue: 1099,
    location: "Chennai, T. Nagar",
    city: "Chennai",
    rating: 4.88,
    reviewCount: 16,
    available: true,
    condition: "Good",
    imageUrl: "https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Massive 55,000 lux output daylight balanced (5500K) continuous LED light. Perfect for studio key lights, music videos, and cinematic narrative scenes. Includes wireless Sidus Link app control and Dome softbox.",
    specs: [
      "55,000 Lux @ 0.5m with Fresnel 2X",
      "Daylight Balanced 5500K CCT (CRI 96+, TLCI 97+)",
      "0%–100% Stepless Dimming",
      "Bowens Mount for endless modifier options",
      "Dual V-Mount Battery or AC Wall Powered"
    ],
    includedInBox: [
      "LS 300d II Lamp Head + Reflector",
      "All-In-One Control Box & Quick Release Clamp",
      "Light Dome II 35-Inch Parabolic Softbox",
      "Heavy Duty C-Stand with Boom Arm",
      "Neutrik PowerCON AC Cable",
      "Durable Padded Roller Case"
    ],
    owner: {
      id: "user-lender-2",
      name: "Divya Krishnan",
      rating: 5.0,
      completedRentals: 31,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      responseRate: "98%",
      responseTime: "< 30 mins",
      verified: true
    },
    reviews: [
      {
        id: "rev-6",
        userName: "Devendran P.",
        rating: 5,
        date: "2026-08-28",
        comment: "Super quiet fan, worked all day on a short film shoot without getting excessively hot. Light Dome gave gorgeous soft portraits."
      }
    ]
  },
  {
    id: "gear-6",
    title: "Meta Quest 3 512GB Mixed Reality VR Headset Kit",
    category: "gaming-vr",
    brand: "Meta",
    dailyRate: 28,
    securityDeposit: 120,
    replacementValue: 649,
    location: "Bengaluru, HSR Layout",
    city: "Bengaluru",
    rating: 4.96,
    reviewCount: 34,
    available: true,
    condition: "Mint",
    imageUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Next-generation mixed reality headset with dual color passthrough cameras, Snapdragon XR2 Gen 2 processor, and 4K+ Infinite Display. Pre-loaded with top VR demos, spatial development SDKs, and Elite Battery strap.",
    specs: [
      "4K+ Infinite Display (2064 x 2208 per eye)",
      "High-fidelity Full Color Passthrough Cameras",
      "Snapdragon XR2 Gen 2 Chipset (2x GPU performance)",
      "Touch Plus Ringless Haptic Controllers",
      "Spatial Audio with 40% louder volume range"
    ],
    includedInBox: [
      "Meta Quest 3 512GB Headset",
      "Official Elite Strap with Extra Battery Pack",
      "2x Touch Plus Controllers + Lanyards",
      "Silicone Sweat-Proof Face Interface",
      "5-meter High Speed USB-C Link Cable (PC-VR)",
      "Sanitized Hard Travel Case"
    ],
    owner: {
      id: "user-lender-4",
      name: "Rohit Verma",
      rating: 4.94,
      completedRentals: 27,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      responseRate: "95%",
      responseTime: "< 20 mins",
      verified: true
    },
    reviews: [
      {
        id: "rev-7",
        userName: "Gautam S.",
        rating: 5,
        date: "2026-09-24",
        comment: "Rented this for a client architecture demo in Unreal Engine. Passthrough and PC-VR link worked smoothly. Clean and sanitised!"
      }
    ]
  },
  {
    id: "gear-7",
    title: "Blackmagic Pocket Cinema Camera 6K Pro",
    category: "cameras",
    brand: "Blackmagic",
    dailyRate: 55,
    securityDeposit: 280,
    replacementValue: 2595,
    location: "Puducherry, Lawspet",
    city: "Puducherry",
    rating: 4.91,
    reviewCount: 18,
    available: true,
    condition: "Like New",
    imageUrl: "https://images.unsplash.com/photo-1589872765304-a69f83969222?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1589872765304-a69f83969222?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Hollywood-grade digital cinema camera featuring Super 35 HDR sensor, built-in motorized ND filters (2, 4, 6 stops), adjustable tilting HDR screen, and dual native ISO up to 25,600.",
    specs: [
      "Super 35 6144 x 3456 HDR Sensor",
      "Built-in 2, 4, and 6-stop IR ND Filters",
      "Gen 5 Color Science with Blackmagic RAW 12-Bit",
      "Dual Mini XLR Mic Inputs with 48V Phantom Power",
      "Tilting 1500 nit Daylight Viewable Touchscreen"
    ],
    includedInBox: [
      "BMPCC 6K Pro Cinema Body (EF Mount)",
      "SmallRig Full Camera Cage + Top Handle",
      "Samsung T7 Shield 1TB SSD + Mount Bracket",
      "4x NP-F570 Batteries + Dual Charger",
      "D-Tap to 2-Pin Power Cable",
      "Pelican Storm iM2400 Waterproof Hard Case"
    ],
    owner: {
      id: "user-lender-3",
      name: "Dhayanandham A.",
      rating: 5.0,
      completedRentals: 19,
      avatar: "/dhayanandham.jpg",
      responseRate: "100%",
      responseTime: "< 10 mins",
      verified: true
    },
    reviews: [
      {
        id: "rev-8",
        userName: "Suresh Menon",
        rating: 5,
        date: "2026-09-10",
        comment: "Blackmagic RAW workflow in DaVinci Resolve is unbeatable. Built-in ND filters made outdoor shooting effortless."
      }
    ]
  },
  {
    id: "gear-8",
    title: "DJI RS 3 Pro 3-Axis Camera Gimbal Stabilizer",
    category: "cameras",
    brand: "DJI",
    dailyRate: 32,
    securityDeposit: 140,
    replacementValue: 869,
    location: "Bengaluru, Indiranagar",
    city: "Bengaluru",
    rating: 4.89,
    reviewCount: 25,
    available: true,
    condition: "Good",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Extended carbon fiber axis arms accommodate heavy cinema camera setups up to 4.5kg payload. Features automated axis locks, LiDAR autofocus compatibility, and SuperSmooth stabilization mode.",
    specs: [
      "4.5kg (10 lbs) Tested Payload Capacity",
      "Carbon Fiber Axis Arms for Extra Rigidity",
      "Automated Axis Locks for Rapid Setup & Packdown",
      "1.8-inch Full Color OLED Touchscreen",
      "12-Hour Battery Grip with Fast PD Charging"
    ],
    includedInBox: [
      "DJI RS 3 Pro Gimbal",
      "BG30 Battery Grip + Extended Tripod Foot",
      "Quick-Release Plate (Arca-Swiss / Manfrotto)",
      "Focus Gear Strip & Camera Control Cables",
      "Briefcase Handle for Low Angle Shots",
      "Custom Molded Hard Carry Case"
    ],
    owner: {
      id: "user-lender-1",
      name: "Arunachalam V.",
      rating: 4.98,
      completedRentals: 42,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      responseRate: "100%",
      responseTime: "< 15 mins",
      verified: true
    },
    reviews: [
      {
        id: "rev-9",
        userName: "Preethi S.",
        rating: 5,
        date: "2026-09-08",
        comment: "Balanced our FX3 with 24-70 GM effortlessly. The automated axis locks are pure magic when moving between locations."
      }
    ]
  }
];

const seedUsers = [
  {
    id: "user-renter-1",
    name: "Kavya Patel",
    email: "kavya@gmail.com",
    role: "renter",
    phone: "+91 9876543210",
    city: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    verifiedId: true
  },
  {
    id: "user-lender-3",
    name: "Dhayanandham A.",
    email: "dhayanandham80808@gmail.com",
    role: "lender",
    phone: "+91 6383275813",
    city: "Puducherry",
    avatar: "/dhayanandham.jpg",
    verifiedId: true,
    bio: "ECE Engineer & Filmmaker. Maintaining gear to pristine broadcast standards in Puducherry."
  },
  {
    id: "user-admin-1",
    name: "GearShare Administrator",
    email: "admin@gearshare.io",
    role: "admin",
    phone: "+91 9999900000",
    city: "HQ",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    verifiedId: true
  }
];

const seedBookings = [
  {
    id: "book-101",
    gearId: "gear-1",
    gearTitle: "Sony Alpha A7 IV Full-Frame Camera Kit",
    gearImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
    renterId: "user-renter-1",
    renterName: "Kavya Patel",
    renterEmail: "kavya@gmail.com",
    lenderId: "user-lender-1",
    lenderName: "Arunachalam V.",
    startDate: "2026-10-04",
    endDate: "2026-10-07",
    rentalDays: 3,
    dailyRate: 45,
    rentalFee: 135,
    securityDeposit: 250,
    insuranceFee: 15,
    totalPaid: 400,
    status: "Confirmed",
    handoverCode: "GS-7842",
    conditionVerified: true,
    pickupLocation: "Indiranagar Metro Station Exit C, Bengaluru",
    createdAt: "2026-09-28T10:14:00Z"
  },
  {
    id: "book-102",
    gearId: "gear-3",
    gearTitle: "Sony FE 24-70mm f/2.8 GM II Lens",
    gearImage: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=400&q=80",
    renterId: "user-renter-1",
    renterName: "Kavya Patel",
    renterEmail: "kavya@gmail.com",
    lenderId: "user-lender-3",
    lenderName: "Dhayanandham A.",
    startDate: "2026-09-22",
    endDate: "2026-09-24",
    rentalDays: 2,
    dailyRate: 30,
    rentalFee: 60,
    securityDeposit: 180,
    insuranceFee: 10,
    totalPaid: 250,
    status: "Completed",
    handoverCode: "GS-4198",
    conditionVerified: true,
    pickupLocation: "White Town Promenade, Puducherry",
    createdAt: "2026-09-18T14:30:00Z"
  }
];

module.exports = { seedGear, seedUsers, seedBookings };

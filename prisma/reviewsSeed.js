const reviews = [
  {
    clerkId: "clerk-001",
    rating: 5,
    comment:
      "THE WASTELAND SURVIVAL GUIDE SAVED MY LIFE MORE TIMES THAN I CAN COUNT. ESSENTIAL FOR ANYONE VENTURING OUTSIDE THE VAULT.",
    authorName: "VAULT EXPLORER",
    authorImageUrl: "https://i.pravatar.cc/150?img=12",
    productId: "48ee3221-4223-4a93-b4d4-6dda02a94910",
  },
  {
    clerkId: "clerk-002",
    rating: 4,
    comment:
      "The Sentry Bot Action Figure is a great conversation piece and brings back memories of old security systems.",
    authorName: "Collector Joe",
    authorImageUrl: "https://i.pravatar.cc/150?img=7",
    productId: "5291f149-ba8e-4e84-9956-9d27b56e8722",
  },
  {
    clerkId: "clerk-003",
    rating: 3,
    comment:
      "Survival Dice Set is nice for passing time, but don't rely on them when facing Deathclaws.",
    authorName: "Gambler Sam",
    authorImageUrl: "https://i.pravatar.cc/150?img=24",
    productId: "5cec76bc-ef75-468e-82ec-d24fab846a9e",
  },
  {
    clerkId: "clerk-004",
    rating: 5,
    comment:
      "Vault-Tec Supervisor's Glasses give you that authority look. Perfect for leading your crew through the wasteland.",
    authorName: "Commander Lee",
    authorImageUrl: "https://i.pravatar.cc/150?img=3",
    productId: "a0e565fc-baa2-47bf-981b-afb1bd240206",
  },
  {
    clerkId: "clerk-005",
    rating: 5,
    comment:
      "POWER ARMOR HELMET MAY BE PRICEY, BUT THE PROTECTION IT PROVIDES IS WORTH EVERY CAP. FEEL LIKE A TRUE WASTELAND LEGEND.",
    authorName: "IRONCLAD",
    authorImageUrl: "https://i.pravatar.cc/150?img=16",
    productId: "a5a20b4a-8e07-4167-aac2-53dab1a9f6d9",
  },
  {
    clerkId: "clerk-006",
    rating: 4,
    comment:
      "Laser pistol shoots straight and packs a punch. Great for fending off hostile creatures in the dark.",
    authorName: "Sharpshooter",
    authorImageUrl: "https://i.pravatar.cc/150?img=9",
    productId: "c3a6c478-dc08-463a-ad6e-b4aae2334bc8",
  },
  {
    clerkId: "clerk-007",
    rating: 5,
    comment:
      "Nuka-Cola is the perfect pick-me-up after a long day of scavenging. Sweet and refreshing as always.",
    authorName: "Wanderer Kate",
    authorImageUrl: "https://i.pravatar.cc/150?img=21",
    productId: "cdd3376b-faeb-4271-a660-40ad107ec92d",
  },
  {
    clerkId: "clerk-008",
    rating: 4,
    comment:
      "Jet Rush gives you the boost you need when escaping dangerous situations. Use with caution.",
    authorName: "Speedster",
    authorImageUrl: "https://i.pravatar.cc/150?img=18",
    productId: "f7e135d6-fd35-4abc-82b6-5b369fcb8874",
  },
  // new reviews below
  {
    clerkId: "clerk-009",
    rating: 2,
    comment:
      "Meh, survival dice are okay but I lost all my caps gambling with these. Use at your own risk!",
    authorName: "Lucky Larry",
    authorImageUrl: "https://i.pravatar.cc/150?img=35",
    productId: "5cec76bc-ef75-468e-82ec-d24fab846a9e",
  },
  {
    clerkId: "clerk-010",
    rating: 5,
    comment:
      "THE LASER PISTOL IS LIT!!! HIT EVERYTHING FROM RADROACH TO DEATHCLAW WITH EASE! WHO NEEDS BULLETS ANYWAY?!",
    authorName: "Blazing Betty",
    authorImageUrl: "https://i.pravatar.cc/150?img=40",
    productId: "c3a6c478-dc08-463a-ad6e-b4aae2334bc8",
  },
  {
    clerkId: "clerk-011",
    rating: 4,
    comment:
      "I wore the Vault-Tec glasses on a trading run and made some serious caps. Looks cool, works cool!",
    authorName: "Trader Tom",
    authorImageUrl: "https://i.pravatar.cc/150?img=27",
    productId: "a0e565fc-baa2-47bf-981b-afb1bd240206",
  },
  {
    clerkId: "clerk-012",
    rating: 5,
    comment:
      "Nuka-Cola saved my life once. The real deal, folks. Always keep a stash in your pack!",
    authorName: "Scout Nina",
    authorImageUrl: "https://i.pravatar.cc/150?img=52",
    productId: "cdd3376b-faeb-4271-a660-40ad107ec92d",
  },
  {
    clerkId: "clerk-013",
    rating: 3,
    comment:
      "Power Armor Helmet looks cool but boy is it heavy. Took me a while to get used to the weight.",
    authorName: "Heavy Hank",
    authorImageUrl: "https://i.pravatar.cc/150?img=22",
    productId: "a5a20b4a-8e07-4167-aac2-53dab1a9f6d9",
  },
  {
    clerkId: "clerk-014",
    rating: 1,
    comment:
      "I tried the Jet Rush once... felt like I was gonna explode! Not for the faint of heart.",
    authorName: "Crazy Carl",
    authorImageUrl: "https://i.pravatar.cc/150?img=3",
    productId: "f7e135d6-fd35-4abc-82b6-5b369fcb8874",
  },
  {
    clerkId: "clerk-015",
    rating: 5,
    comment:
      "THE SENTRY BOT FIGURE IS A MASTERPIECE. I SWEAR IT WINKED AT ME ONCE. SPOOKY BUT AWESOME!",
    authorName: "Toyman Tim",
    authorImageUrl: "https://i.pravatar.cc/150?img=8",
    productId: "5291f149-ba8e-4e84-9956-9d27b56e8722",
  },
  {
    clerkId: "clerk-016",
    rating: 4,
    comment:
      "Survival Dice Set is fun to roll, and perfect for when you’re holed up in the Vault waiting for trouble.",
    authorName: "Vault Dweller Vicky",
    authorImageUrl: "https://i.pravatar.cc/150?img=17",
    productId: "5cec76bc-ef75-468e-82ec-d24fab846a9e",
  },
  {
    clerkId: "clerk-017",
    rating: 4,
    comment:
      "Love the Vault-Tec Supervisor's Glasses. Makes me feel like a true leader in the wasteland.",
    authorName: "Boss Ben",
    authorImageUrl: "https://i.pravatar.cc/150?img=30",
    productId: "a0e565fc-baa2-47bf-981b-afb1bd240206",
  },
  {
    clerkId: "clerk-018",
    rating: 5,
    comment:
      "Power Armor Helmet saved my hide during a raider attack. Best investment in caps I've ever made!",
    authorName: "Steel Sarah",
    authorImageUrl: "https://i.pravatar.cc/150?img=66",
    productId: "a5a20b4a-8e07-4167-aac2-53dab1a9f6d9",
  },
  {
    clerkId: "clerk-019",
    rating: 3,
    comment:
      "Jet Rush is okay but it makes me jittery after a while. Use sparingly if you like your heart beating.",
    authorName: "Nervous Ned",
    authorImageUrl: "https://i.pravatar.cc/150?img=45",
    productId: "f7e135d6-fd35-4abc-82b6-5b369fcb8874",
  },
  {
    clerkId: "clerk-020",
    rating: 4,
    comment:
      "I keep a Nuka-Cola in my backpack at all times. It’s like a sweet little piece of home out here.",
    authorName: "Wasteland Willy",
    authorImageUrl: "https://i.pravatar.cc/150?img=58",
    productId: "cdd3376b-faeb-4271-a660-40ad107ec92d",
  },
];
module.exports = reviews;

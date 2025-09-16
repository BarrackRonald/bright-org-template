// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function ensureSiteSettings() {
  // Prefer upsert by title if present, otherwise create a new.
  const existing = await prisma.siteSettings.findFirst();
  if (existing) {
    return await prisma.siteSettings.update({
      where: { id: existing.id },
      data: {
        title: "Bright Beginner Foundation",
        tagline: "Empowering young minds for a brighter tomorrow",
        description:
          "BBF is a youth-driven organization committed to education, empowerment, and climate action for sustainable development.",
        contactEmail: "info@brightbeginner.org",
        contactPhone: "+254 700 000 000",
        address: "Nairobi, Kenya",
        logoUrl: "/logo.png",
        heroImageUrl: "/hero.jpg",
      },
    });
  } else {
    return await prisma.siteSettings.create({
      data: {
        title: "Bright Beginner Foundation",
        tagline: "Empowering young minds for a brighter tomorrow",
        description:
          "BBF is a youth-driven organization committed to education, empowerment, and climate action for sustainable development.",
        contactEmail: "info@brightbeginner.org",
        contactPhone: "+254 700 000 000",
        address: "Nairobi, Kenya",
        logoUrl: "/logo.png",
        heroImageUrl: "/hero.jpg",
      },
    });
  }
}

async function upsertAbout(settingsId) {
  // There is normally a single About record — match by (no unique) so use findFirst then update/create
  const existing = await prisma.about.findFirst();
  if (existing) {
    return await prisma.about.update({
      where: { id: existing.id },
      data: {
        history:
          "Bright Beginner Foundation (BBF) was founded with the mission of creating opportunities for young people and underserved communities. Through education, mentorship, and environmental action, BBF builds pathways for empowerment.",
        mission:
          "To empower youth and communities through education, skills, and climate action initiatives.",
        vision: "A society where every young person has equal access to opportunities and resources for growth.",
        objectives:
          "• Promote quality education\n• Foster youth leadership\n• Champion environmental conservation\n• Provide mentorship and skills development\n• Advocate for social inclusion",
        coreValues: "Integrity, Inclusion, Innovation, Sustainability, Collaboration",
        // link settings if not linked
        siteSettings: { connect: { id: settingsId } },
      },
    });
  } else {
    return await prisma.about.create({
      data: {
        history:
          "Bright Beginner Foundation (BBF) was founded with the mission of creating opportunities for young people and underserved communities. Through education, mentorship, and environmental action, BBF builds pathways for empowerment.",
        mission:
          "To empower youth and communities through education, skills, and climate action initiatives.",
        vision: "A society where every young person has equal access to opportunities and resources for growth.",
        objectives:
          "• Promote quality education\n• Foster youth leadership\n• Champion environmental conservation\n• Provide mentorship and skills development\n• Advocate for social inclusion",
        coreValues: "Integrity, Inclusion, Innovation, Sustainability, Collaboration",
        siteSettings: { connect: { id: settingsId } },
      },
    });
  }
}

async function upsertTeamMembers() {
  // Use name as the unique key for upsert here (ok for seed context)
  const members = [
    {
      name: "Dr. Kennedy Okoth, Ph.D.",
      role: "Founder and Chief Executive Officer",
      bio:
        "Dr. Kennedy Okoth is the Founder and Chief Executive Officer of the Bright Beginner Foundation. A dedicated scientist and community leader, he combines his expertise in academia with a passion for community development and youth empowerment.",
      photoUrl: "/team/Adoda.jpg",
      orderNum: 1,
    },
    {
      name: "Mr. Aloo Denish",
      role: "Co-Founder, Director of Finance & Project Management",
      bio:
        "Aloo Denish is the Co-Founder and Director of Finance & Project Management at the Bright Beginner Foundation, where he oversees financial stewardship, resource allocation, and project implementation.",
      photoUrl: "/team/Aloo.jpg",
      orderNum: 2,
    },
    {
      name: "Mr. Christopher Odhiambo",
      role: "Co-Founder, Director of Administration & Communication",
      bio:
        "Mr. Christopher Odhiambo is the Co-Founder and Director of Administration & Communication at the Bright Beginner Foundation, ensuring smooth governance and stakeholder communications.",
      photoUrl: "/team/odhiambo.jpg",
      orderNum: 3,
    },
    // add the previous placeholders as well (if you had them)
    {
      name: "Ronald Odhiambo",
      role: "Founder & CEO",
      bio: "Passionate about empowering youth and communities through education and sustainable development.",
      photoUrl: "/team/ronald.jpg",
      orderNum: 4,
    },
    {
      name: "Jane Doe",
      role: "Director of Programs",
      bio: "Oversees program design, partnerships, and impact measurement.",
      photoUrl: "/team/jane.jpg",
      orderNum: 5,
    },
    {
      name: "John Smith",
      role: "Climate Action Coordinator",
      bio: "Leads environmental programs, tree planting drives, and awareness campaigns.",
      photoUrl: "/team/john.jpg",
      orderNum: 6,
    },
  ];

  const results = [];
  for (const m of members) {
    const found = await prisma.teamMember.findFirst({ where: { name: m.name } });
    if (found) {
      results.push(
        await prisma.teamMember.update({
          where: { id: found.id },
          data: {
            role: m.role,
            bio: m.bio,
            photoUrl: m.photoUrl,
            orderNum: m.orderNum,
          },
        })
      );
    } else {
      results.push(
        await prisma.teamMember.create({
          data: m,
        })
      );
    }
  }
  return results;
}

async function upsertPartners() {
  const partners = [
    { name: "UNICEF", website: "https://unicef.org", logoUrl: null },
    { name: "Global Green Alliance", website: "https://globalgreen.org", logoUrl: null },
    { name: "Kenya Youth Network", website: "https://kenyayouthnetwork.org", logoUrl: null },
  ];

  for (const p of partners) {
    await prisma.partner.upsert({
      where: { name: p.name },
      update: { website: p.website, logoUrl: p.logoUrl },
      create: p,
    });
  }
}

async function upsertImpactStats() {
  const stats = [
    { label: "Students Supported", value: 57, description: "Scholarships and school support beneficiaries" },
    { label: "Trees Planted", value: 1200, description: "Across Kenya under climate action initiative" },
    { label: "Workshops Conducted", value: 20, description: "Health and empowerment workshops" },
  ];

  for (const s of stats) {
    await prisma.impactStat.upsert({
      where: { label: s.label },
      update: { value: s.value, description: s.description },
      create: s,
    });
  }
}

async function upsertGalleryItems() {
  const items = [
    { title: "Youth Mentorship Session", imageUrl: "/gallery/mentorship.jpg", category: "program" },
    { title: "Tree Planting Drive", imageUrl: "/gallery/treeplanting.jpg", category: "event" },
    { title: "Health Awareness Campaign", imageUrl: "/gallery/health.jpg", category: "program" },
  ];

  for (const g of items) {
    await prisma.galleryItem.upsert({
      where: { title: g.title },
      update: { imageUrl: g.imageUrl, category: g.category },
      create: g,
    });
  }
}

async function upsertFAQs() {
  const faqs = [
    { question: "How can I volunteer?", answer: "Fill out our volunteer form and our team will contact you.", orderNum: 1 },
    { question: "How are donations used?", answer: "100% of donations go directly into supporting education, climate, and health programs.", orderNum: 2 },
    { question: "Where is BBF located?", answer: "Our headquarters are in Nairobi, Kenya.", orderNum: 3 },
  ];

  for (const f of faqs) {
    await prisma.fAQ.upsert({
      where: { question: f.question },
      update: { answer: f.answer, orderNum: f.orderNum },
      create: f,
    });
  }
}

async function upsertArticles() {
  const articles = [
    {
      title: "BBF Launches New Youth Program",
      slug: "launch-youth-program",
      excerpt: "Our new initiative empowers youth with digital and leadership skills.",
      content:
        "Bright Beginner Foundation launched a Youth Empowerment initiative focusing on mentorship and entrepreneurship for marginalized youth.",
      isPublished: true,
      publishedAt: new Date(),
    },
    {
      title: "Climate Action: Tree Planting Success",
      slug: "climate-action-success",
      excerpt: "Over 1,200 trees planted across Nairobi and Kisumu.",
      content: "The BBF Climate Action initiative engaged hundreds of volunteers to plant trees and raise climate awareness.",
      isPublished: true,
      publishedAt: new Date(),
    },
  ];

  for (const a of articles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        isPublished: a.isPublished,
        publishedAt: a.publishedAt,
      },
      create: a,
    });
  }
}

async function upsertEvents() {
  const events = [
    {
      title: "Youth Leadership Workshop",
      slug: "youth-leadership-workshop",
      summary: "Leadership skills workshop for 100 young leaders.",
      content: "A 3-day residential workshop bringing together youth leaders from across Kenya.",
      location: "Nairobi, Kenya",
      startDate: new Date("2025-06-10"),
      endDate: new Date("2025-06-12"),
    },
    {
      title: "Community Tree Planting Day",
      slug: "community-tree-planting-day",
      summary: "Mobilizing the community to plant trees for sustainability.",
      content: "BBF partnered with schools and local leaders to plant 500 trees in Kisumu County.",
      location: "Kisumu, Kenya",
      startDate: new Date("2025-07-15"),
      endDate: null,
    },
  ];

  for (const e of events) {
    await prisma.event.upsert({
      where: { slug: e.slug },
      update: {
        summary: e.summary,
        content: e.content,
        location: e.location,
        startDate: e.startDate,
        endDate: e.endDate,
      },
      create: e,
    });
  }
}

async function upsertProgramsAndExtras(teamMap) {
  // Programs data with richer content and extras
  const programsData = [
    {
      title: "Youth Empowerment",
      slug: "youth-empowerment",
      summary: "Mentorship, skills training, and leadership development for youth.",
      content:
        "The Youth Empowerment Program is BBF's flagship initiative that equips young people with life skills, leadership, and entrepreneurship training. We run mentorship circles, digital skills bootcamps, internship placements, and a yearly youth leadership forum. The program focusses on marginalized youth, helping them access education, career guidance, and seed support for micro-business ideas.",
      imageUrl: "/programs/youth.jpg",
      coordinatorName: "Dr. Kennedy Okoth, Ph.D.",
      gallery: [
        { mediaUrl: "/programs/youth1.jpg", type: "image", caption: "Mentorship session" },
        { mediaUrl: "/programs/youth2.jpg", type: "image", caption: "Entrepreneurship bootcamp" },
      ],
      impactStats: [
        { label: "Youth Trained", value: 300, description: "Beneficiaries of mentorship and skills bootcamps" },
        { label: "Mentorship Hours", value: 2000, description: "One-on-one and group mentorship hours" },
      ],
      testimonials: [
        { name: "Alice W.", role: "Youth Participant", message: "The mentorship program gave me confidence to pursue my dreams.", photoUrl: "/testimonials/alice.jpg" },
      ],
    },
    {
      title: "Climate Action",
      slug: "climate-action",
      summary: "Tree planting and climate education campaigns.",
      content:
        "BBF's Climate Action program mobilizes communities for tree planting, clean-ups and climate education. We partner with schools, county governments and local groups to plant indigenous trees, set up school tree nurseries, and run workshops on climate-smart agriculture and waste management.",
      imageUrl: "/programs/climate.jpg",
      coordinatorName: "Mr. Christopher Odhiambo",
      gallery: [
        { mediaUrl: "/programs/climate1.jpg", type: "image", caption: "Tree planting drive" },
        { mediaUrl: "/programs/climate2.mp4", type: "video", caption: "Climate action event" },
      ],
      impactStats: [
        { label: "Trees Planted", value: 1200, description: "Trees planted in community drives" },
        { label: "Schools Engaged", value: 12, description: "Schools participating in climate education" },
      ],
      testimonials: [
        { name: "Peter M.", role: "Volunteer", message: "Being part of the climate action program changed how I view the environment.", photoUrl: "/testimonials/peter.jpg" },
      ],
    },
    {
      title: "Health Awareness",
      slug: "health-awareness",
      summary: "Promoting wellness and awareness on STIs & HIV.",
      content:
        "The Health Awareness program focuses on community health education, sexual and reproductive health, and wellness. BBF runs peer-education sessions, school outreach on SRH (sexual and reproductive health), and provides referral pathways for counseling and testing services.",
      imageUrl: "/programs/health.jpg",
      coordinatorName: "Mr. Aloo Denish",
      gallery: [
        { mediaUrl: "/programs/health1.jpg", type: "image", caption: "Community health workshop" },
      ],
      impactStats: [
        { label: "Workshops Conducted", value: 15, description: "Health awareness events and workshops" },
      ],
      testimonials: [
        { name: "Sarah K.", role: "Community Member", message: "The health awareness sessions helped me understand how to protect my family.", photoUrl: "/testimonials/sarah.jpg" },
      ],
    },
  ];

  const createdPrograms = [];
  for (const pd of programsData) {
    // find coordinator id by name from provided teamMap (teamMap: name -> id)
    const coordId = teamMap[pd.coordinatorName] ?? null;

    const program = await prisma.program.upsert({
      where: { slug: pd.slug },
      update: {
        title: pd.title,
        summary: pd.summary,
        content: pd.content,
        imageUrl: pd.imageUrl,
        coordinatorId: coordId,
        isPublished: true,
        position: pd.position ?? 0,
      },
      create: {
        title: pd.title,
        slug: pd.slug,
        summary: pd.summary,
        content: pd.content,
        imageUrl: pd.imageUrl,
        coordinatorId: coordId,
        isPublished: true,
        position: pd.position ?? 0,
      },
      include: { },
    });

    // ProgramGallery: create if absent (by mediaUrl + programId)
    for (const g of pd.gallery) {
      const exists = await prisma.programGallery.findFirst({
        where: { programId: program.id, mediaUrl: g.mediaUrl },
      });
      if (!exists) {
        await prisma.programGallery.create({
          data: {
            programId: program.id,
            mediaUrl: g.mediaUrl,
            type: g.type,
            caption: g.caption,
          },
        });
      }
    }

    // ProgramImpactStat: create or update by programId + label
    for (const s of pd.impactStats) {
      const exists = await prisma.programImpactStat.findFirst({
        where: { programId: program.id, label: s.label },
      });
      if (exists) {
        await prisma.programImpactStat.update({
          where: { id: exists.id },
          data: { value: s.value, description: s.description },
        });
      } else {
        await prisma.programImpactStat.create({
          data: {
            programId: program.id,
            label: s.label,
            value: s.value,
            description: s.description,
          },
        });
      }
    }

    // ProgramTestimonial: create if absent by programId + name + message
    for (const t of pd.testimonials) {
      const exists = await prisma.programTestimonial.findFirst({
        where: { programId: program.id, name: t.name, message: t.message },
      });
      if (!exists) {
        await prisma.programTestimonial.create({
          data: {
            programId: program.id,
            name: t.name,
            role: t.role,
            message: t.message,
            photoUrl: t.photoUrl,
          },
        });
      }
    }

    createdPrograms.push(program);
  }

  return createdPrograms;
}

async function upsertGeneralTestimonials() {
  const items = [
    { name: "Mary Achieng", role: "Student Beneficiary", message: "Thanks to BBF, I got mentorship and school support that changed my life." },
    { name: "Kevin Otieno", role: "Community Volunteer", message: "Planting trees with BBF gave me hope for a greener future." },
  ];
  for (const t of items) {
    await prisma.testimonial.upsert({
      where: { name: t.name },
      update: { role: t.role, message: t.message },
      create: t,
    });
  }
}

async function ensureAdminUser() {
  const email = "admin@brightbeginner.org";
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // update password only if different (we won't overwrite hashed value)
    return existing;
  } else {
    const hashedPassword = await bcrypt.hash("Admin@12345", 10);
    return await prisma.user.create({
      data: { email, password: hashedPassword, role: "ADMIN" },
    });
  }
}

async function buildTeamMap() {
  // build a map name -> id for coordinator lookup
  const members = await prisma.teamMember.findMany();
  const map = {};
  for (const m of members) {
    map[m.name] = m.id;
  }
  return map;
}

async function main() {
  console.log("🌱 Starting safe seed (non-destructive) ...");

  // 1) Site settings & About
  const settings = await ensureSiteSettings();
  await upsertAbout(settings.id);

  // 2) Team members (will update or create)
  const teamResults = await upsertTeamMembers();
  const teamMap = await buildTeamMap();

  // 3) Partners
  await upsertPartners();

  // 4) General impact stats (global)
  await upsertImpactStats();

  // 5) General gallery items
  await upsertGalleryItems();

  // 6) FAQs
  await upsertFAQs();

  // 7) Articles
  await upsertArticles();

  // 8) Events
  await upsertEvents();

  // 9) Programs and their program-specific extras
  await upsertProgramsAndExtras(teamMap);

  // 10) Program-independent testimonials
  await upsertGeneralTestimonials();

  // 11) Ensure admin user exists
  await ensureAdminUser();

  console.log("✅ Safe seed complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });

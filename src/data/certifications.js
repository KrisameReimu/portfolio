import placeholderImages from "../placeholderImages";

const R2_BASE = "https://img.chenchen-echo.com";

const cert = file => `${R2_BASE}/certifications/${file}`;
const award = file => `${R2_BASE}/awards/${file}`;

// Portfolio certifications and awards (Cloudflare R2)
export const certificationCards = [
  {
    title: "Oxford AI & ML Programme",
    subtitle:
      "Lady Margaret Hall, University of Oxford (Summer Programme 2024).",
    image: placeholderImages.oxfordLogo,
    imageAlt: "Oxford Certificate",
    footerLink: [
      {
        name: "View PDF",
        url: cert("cert-oxford-lmh-ai-summer-school.pdf")
      }
    ]
  },
  {
    title: "Sasakawa Cup 2024 Prize",
    subtitle: "Award recognition in the 2024 Japan Sasakawa Cup.",
    image: placeholderImages.polyuAward,
    imageAlt: "Sasakawa Cup 2024 Prize",
    footerLink: [
      {
        name: "View PDF",
        url: award("award-sasakawa-cup-2024.pdf")
      }
    ]
  },
  {
    title: "Gold Award - WPDF",
    subtitle:
      "Gold Award for youth mobility and poverty issues in Hong Kong project.",
    image: placeholderImages.polyuAward,
    imageAlt: "Gold Award WPDF",
    footerLink: [
      {
        name: "View PDF",
        url: award("award-gold-wpdf-youth-mobility.pdf")
      }
    ]
  },
  {
    title: "Silver Award - WPDF",
    subtitle: "Silver Award in Whole Person Development Fund competition.",
    image: placeholderImages.polyuAward,
    imageAlt: "Silver Award WPDF",
    footerLink: [
      {
        name: "View PDF",
        url: award("award-silver-wpdf.pdf")
      }
    ]
  },
  {
    title: "Special Award - WPDF",
    subtitle: "Special Award in Whole Person Development Fund competition.",
    image: placeholderImages.polyuAward,
    imageAlt: "Special Award WPDF",
    footerLink: [
      {
        name: "View PDF",
        url: award("award-special-wpdf.pdf")
      }
    ]
  },
  {
    title: "EDB Finalist Merit Award",
    subtitle:
      "Finalist Merit Award from Hong Kong Education Bureau related competition.",
    image: placeholderImages.polyuAward,
    imageAlt: "EDB Finalist Merit Award",
    footerLink: [
      {
        name: "View PDF",
        url: award("award-edb-finalist-merit-basic-law.pdf")
      }
    ]
  },
  {
    title: "NTU Summer Law Certificate",
    subtitle:
      "Summer law programme certificate with focus on law and data topics.",
    image: placeholderImages.oxfordLogo,
    imageAlt: "NTU Summer Law Certificate",
    footerLink: [
      {
        name: "View PDF",
        url: cert("cert-ntu-summer-law.pdf")
      }
    ]
  },
  {
    title: "IET YMP Certificate",
    subtitle:
      "Certificate of appreciation for contribution to IET Young Member Programme.",
    image: placeholderImages.ietLogo,
    imageAlt: "IET YMP Certificate",
    footerLink: [
      {
        name: "View PDF",
        url: cert("cert-iet-ymp.pdf")
      }
    ]
  },
  {
    title: "Certificate of Appreciation (EEE)",
    subtitle:
      "Appreciation certificate related to EEE academic/service contributions.",
    image: placeholderImages.polyuLogo,
    imageAlt: "EEE Appreciation Certificate",
    footerLink: [
      {
        name: "View PDF",
        url: cert("cert-appreciation-eee.pdf")
      }
    ]
  },
  {
    title: "Certificate of Appreciation (SA)",
    subtitle:
      "Appreciation certificate for Student Assistant work and campus support.",
    image: placeholderImages.polyuLogo,
    imageAlt: "SA Appreciation Certificate",
    footerLink: [
      {
        name: "View PDF",
        url: cert("cert-appreciation-sa.pdf")
      }
    ]
  }
];

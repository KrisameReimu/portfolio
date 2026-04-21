import ietLogo from "../assets/images/ietLogo.png";
import oxfordLogo from "../assets/images/oxfordLogo.png";
import polyuAward from "../assets/images/polyuAward.png";
import polyuLogo from "../assets/images/polyuLogo.png";

const R2_BASE = "https://img.chenchen-echo.com";

// R2 object keys are case-sensitive. Keep folder names aligned with Cloudflare.
const cert = file => `${R2_BASE}/certifications/${file}`;
const award = file => `${R2_BASE}/Awards/${file}`;

// Portfolio certifications and awards (Cloudflare R2)
export const certificationCards = [
  {
    title: "Oxford AI & ML Programme",
    subtitle:
      "Lady Margaret Hall, University of Oxford (Summer Programme 2024).",
    group: "research",
    image: oxfordLogo,
    imageAlt: "Oxford Certificate",
    previewUrl: cert("cert-oxford-lmh-ai-summer-school.pdf"),
    previewAspectRatio: 0.84,
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
    group: "multimedia",
    image: polyuAward,
    imageAlt: "Sasakawa Cup 2024 Prize",
    previewUrl: award("award-sasakawa-cup-2024.pdf"),
    previewAspectRatio: 1.34,
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
    group: "multimedia",
    image: polyuAward,
    imageAlt: "Gold Award WPDF",
    previewUrl: award("award-gold-wpdf-youth-mobility.pdf"),
    previewAspectRatio: 1.34,
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
    group: "multimedia",
    image: polyuAward,
    imageAlt: "Silver Award WPDF",
    previewUrl: award("award-silver-wpdf.pdf"),
    previewAspectRatio: 1.34,
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
    group: "multimedia",
    image: polyuAward,
    imageAlt: "Special Award WPDF",
    previewUrl: award("award-special-wpdf.pdf"),
    previewAspectRatio: 1.34,
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
    group: "research",
    image: polyuAward,
    imageAlt: "EDB Finalist Merit Award",
    previewUrl: award("award-edb-finalist-merit-basic-law.pdf"),
    previewAspectRatio: 1.34,
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
    group: "research",
    image: oxfordLogo,
    imageAlt: "NTU Summer Law Certificate",
    previewUrl: cert("cert-ntu-summer-law.pdf"),
    previewAspectRatio: 0.84,
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
    group: "service",
    image: ietLogo,
    imageAlt: "IET YMP Certificate",
    previewUrl: cert("cert-iet-ymp.pdf"),
    previewAspectRatio: 1.12,
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
    group: "service",
    image: polyuLogo,
    imageAlt: "EEE Appreciation Certificate",
    previewUrl: cert("cert-appreciation-eee.pdf"),
    previewAspectRatio: 0.84,
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
    group: "service",
    image: polyuLogo,
    imageAlt: "SA Appreciation Certificate",
    previewUrl: cert("cert-appreciation-sa.pdf"),
    previewAspectRatio: 0.84,
    footerLink: [
      {
        name: "View PDF",
        url: cert("cert-appreciation-sa.pdf")
      }
    ]
  }
];

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parent.parent
PUBLIC_OUTPUT = ROOT / "public" / "tushar-singh-resume.pdf"
ARCHIVE_OUTPUT = ROOT / "output" / "pdf" / "tushar-singh-resume.pdf"


def section_title(text, styles):
    return Paragraph(text, styles["SectionTitle"])


def paragraph(text, styles):
    return Paragraph(text, styles["Body"])


def build_resume(output_path: Path):
    output_path.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        rightMargin=16 * mm,
        leftMargin=16 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
    )

    base_styles = getSampleStyleSheet()
    styles = {
        "Name": ParagraphStyle(
            "Name",
            parent=base_styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=24,
            leading=28,
            textColor=colors.HexColor("#15120f"),
            spaceAfter=4,
        ),
        "Role": ParagraphStyle(
            "Role",
            parent=base_styles["BodyText"],
            fontName="Helvetica",
            fontSize=10.5,
            leading=14,
            textColor=colors.HexColor("#35564f"),
            spaceAfter=8,
        ),
        "Body": ParagraphStyle(
            "Body",
            parent=base_styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.6,
            leading=14,
            textColor=colors.HexColor("#4f4439"),
        ),
        "SectionTitle": ParagraphStyle(
            "SectionTitle",
            parent=base_styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=14,
            textColor=colors.HexColor("#7e4630"),
            spaceAfter=4,
        ),
        "Meta": ParagraphStyle(
            "Meta",
            parent=base_styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.8,
            leading=12,
            textColor=colors.HexColor("#62594d"),
        ),
    }

    story = [
        Paragraph("Tushar Singh", styles["Name"]),
        Paragraph("React Developer and Frontend Engineer", styles["Role"]),
        Paragraph(
            "hello@yourdomain.dev | github.com/your-username | linkedin.com/in/your-linkedin-handle",
            styles["Meta"],
        ),
        Spacer(1, 7),
        section_title("Profile", styles),
        paragraph(
            "Frontend developer focused on responsive React interfaces, motion-led UI, and polished user experiences. I enjoy building websites and product surfaces that feel intentional, fast, and easy to navigate across devices.",
            styles,
        ),
        Spacer(1, 9),
        section_title("Core Skills", styles),
        paragraph(
            "React, JavaScript, HTML5, CSS3, Framer Motion, responsive design, accessibility, component architecture, design systems, performance optimization, GitHub.",
            styles,
        ),
        Spacer(1, 9),
        section_title("Selected Projects", styles),
    ]

    project_rows = [
        [
            Paragraph(
                "<b>Aurora Analytics</b><br/>Dashboard experience concept for analytics-heavy product teams.",
                styles["Body"],
            ),
            Paragraph(
                "React, chart UI, modular widgets, strong hierarchy for data-dense screens.",
                styles["Body"],
            ),
        ],
        [
            Paragraph(
                "<b>Studio Commerce</b><br/>Premium storefront concept with editorial product presentation.",
                styles["Body"],
            ),
            Paragraph(
                "Responsive e-commerce flow, motion-led UI details, mobile-first purchase path.",
                styles["Body"],
            ),
        ],
        [
            Paragraph(
                "<b>Drift Travel Planner</b><br/>Trip planning interface for itineraries, budgets, and activity discovery.",
                styles["Body"],
            ),
            Paragraph(
                "Simple navigation model, calm visual design, layout patterns tuned for mobile browsing.",
                styles["Body"],
            ),
        ],
    ]

    project_table = Table(project_rows, colWidths=[80 * mm, 96 * mm], hAlign="LEFT")
    project_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#fff8f0")),
                ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#d8c9b8")),
                ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#d8c9b8")),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    story.extend([project_table, Spacer(1, 9)])

    story.extend(
        [
            section_title("How I Work", styles),
            paragraph(
                "I care about the details that make interfaces feel finished: spacing, typography, motion timing, clean hover states, semantic structure, and implementation that stays maintainable as a project grows.",
                styles,
            ),
            Spacer(1, 9),
            section_title("Resume Notes", styles),
            paragraph(
                "This PDF is a starter resume included for the portfolio demo. Replace the contact details, project links, and experience points with your own information before sending applications.",
                styles,
            ),
        ]
    )

    doc.build(story)


def main():
    build_resume(PUBLIC_OUTPUT)
    build_resume(ARCHIVE_OUTPUT)


if __name__ == "__main__":
    main()
